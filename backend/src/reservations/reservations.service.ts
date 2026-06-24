import { Injectable, NotFoundException, ConflictException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DataSource, In } from 'typeorm';

import { Reservation } from './entities/reservation.entity';
import { ReservationSeat } from './entities/reservation-seat.entity';
import { Showtime } from '../showtimes/entities/showtime.entity';
import { Seat } from '../rooms/entities/seat.entity';
import { CreateReservationDto } from './dto/create-reservation.dto';

@Injectable()
export class ReservationsService {
  constructor(
    @InjectRepository(Reservation)
    private readonly reservationRepository: Repository<Reservation>,
    @InjectRepository(ReservationSeat)
    private readonly reservationSeatRepository: Repository<ReservationSeat>,
    @InjectRepository(Showtime)
    private readonly showtimeRepository: Repository<Showtime>,
    @InjectRepository(Seat)
    private readonly seatRepository: Repository<Seat>,
    private readonly dataSource: DataSource,
  ) {}

  async findAll(): Promise<Reservation[]> {
    return this.reservationRepository.find({
      relations: {
        user: true,
        showtime: {
          movie: true,
          room: true,
        },
        details: {
          seat: true,
        },
      },
      order: { reservedAt: 'DESC' },
    });
  }

  async findByUser(userId: string): Promise<Reservation[]> {
    return this.reservationRepository.find({
      where: { userId },
      relations: {
        showtime: {
          movie: true,
          room: true,
        },
        details: {
          seat: true,
        },
      },
      order: { reservedAt: 'DESC' },
    });
  }

  async getSeatMap(showtimeId: string) {
    const showtime = await this.showtimeRepository.findOne({
      where: { id: showtimeId },
      relations: { room: true },
    });
    if (!showtime) {
      throw new NotFoundException(`La función con ID ${showtimeId} no existe.`);
    }

    const seats = await this.seatRepository.find({
      where: { roomId: showtime.roomId },
      order: { rowLabel: 'ASC', columnNumber: 'ASC' },
    });

    const reservedSeats = await this.reservationSeatRepository.find({
      where: { showtimeId },
    });
    const reservedSeatIds = new Set(reservedSeats.map((rs) => rs.seatId));

    return seats.map((seat) => ({
      id: seat.id,
      code: seat.code,
      rowLabel: seat.rowLabel,
      columnNumber: seat.columnNumber,
      isReserved: reservedSeatIds.has(seat.id),
    }));
  }

  async create(userId: string, dto: CreateReservationDto) {
    if (!dto.seatIds || dto.seatIds.length === 0) {
      throw new BadRequestException('Debe seleccionar al menos un asiento.');
    }

    if (dto.seatIds.length > 20) {
      throw new BadRequestException('No se pueden reservar más de 20 asientos por transacción.');
    }

    const uniqueSeatIds = new Set(dto.seatIds);
    if (uniqueSeatIds.size !== dto.seatIds.length) {
      throw new BadRequestException('No se permiten asientos duplicados en la misma reserva.');
    }

    const showtime = await this.showtimeRepository.findOne({
      where: { id: dto.showtimeId },
    });
    if (!showtime) {
      throw new NotFoundException(`La función con ID ${dto.showtimeId} no existe.`);
    }

    const now = new Date();
    if (showtime.startsAt.getTime() <= now.getTime()) {
      throw new BadRequestException(
        'No se pueden realizar reservas para funciones que ya han comenzado o finalizado.',
      );
    }

    const seats = await this.seatRepository.find({
      where: {
        id: In(dto.seatIds),
        roomId: showtime.roomId,
      },
    });

    if (seats.length !== dto.seatIds.length) {
      throw new BadRequestException(
        'Uno o más asientos seleccionados no pertenecen a la sala de esta función o no existen.',
      );
    }

    // Run transaction
    try {
      return await this.dataSource.transaction(async (manager) => {
        // Locking row selection to prevent double bookings
        const duplicateBookings = await manager
          .createQueryBuilder(ReservationSeat, 'rs')
          .setLock('pessimistic_write')
          .where('rs.showtimeId = :showtimeId', { showtimeId: dto.showtimeId })
          .andWhere('rs.seatId IN (:...seatIds)', { seatIds: dto.seatIds })
          .getMany();

        if (duplicateBookings.length > 0) {
          const takenSeatIds = duplicateBookings.map((db) => db.seatId);
          const takenSeats = seats.filter((s) => takenSeatIds.includes(s.id));
          const takenSeatCodes = takenSeats.map((s) => s.code).join(', ');
          throw new ConflictException({
            statusCode: 409,
            code: 'SEAT_ALREADY_RESERVED',
            message: `Uno o más asientos seleccionados (${takenSeatCodes}) ya han sido reservados por otro usuario.`,
          });
        }

        const total = seats.length * Number(showtime.price);

        const reservation = manager.create(Reservation, {
          userId,
          showtimeId: dto.showtimeId,
          total,
          currency: 'BOB',
        });

        const savedReservation = await manager.save(Reservation, reservation);

        const reservationSeats = seats.map((seat) =>
          manager.create(ReservationSeat, {
            reservationId: savedReservation.id,
            showtimeId: dto.showtimeId,
            seatId: seat.id,
            unitPrice: showtime.price,
          }),
        );

        await manager.save(ReservationSeat, reservationSeats);

        return {
          id: savedReservation.id,
          userId: savedReservation.userId,
          showtimeId: savedReservation.showtimeId,
          reservedAt: savedReservation.reservedAt,
          total: savedReservation.total,
          currency: savedReservation.currency,
          seats: seats.map((s) => ({ id: s.id, code: s.code })),
        };
      });
    } catch (err: any) {
      if (err.code === '23505') {
        throw new ConflictException({
          statusCode: 409,
          code: 'SEAT_ALREADY_RESERVED',
          message: 'Uno o más asientos seleccionados ya han sido reservados por otro usuario.',
        });
      }
      throw err;
    }
  }
}
