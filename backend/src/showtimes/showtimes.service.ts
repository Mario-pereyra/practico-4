import { Injectable, NotFoundException, ConflictException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, LessThan, MoreThan, Not } from 'typeorm';

import { Showtime } from './entities/showtime.entity';
import { CreateShowtimeDto } from './dto/create-showtime.dto';
import { UpdateShowtimeDto } from './dto/update-showtime.dto';
import { Movie } from '../movies/entities/movie.entity';
import { Room } from '../rooms/entities/room.entity';
import { Reservation } from '../reservations/entities/reservation.entity';
import { Seat } from '../rooms/entities/seat.entity';
import { ReservationSeat } from '../reservations/entities/reservation-seat.entity';

@Injectable()
export class ShowtimesService {
  constructor(
    @InjectRepository(Showtime)
    private readonly showtimeRepository: Repository<Showtime>,
    @InjectRepository(Movie)
    private readonly movieRepository: Repository<Movie>,
    @InjectRepository(Room)
    private readonly roomRepository: Repository<Room>,
    @InjectRepository(Reservation)
    private readonly reservationRepository: Repository<Reservation>,
    @InjectRepository(Seat)
    private readonly seatRepository: Repository<Seat>,
    @InjectRepository(ReservationSeat)
    private readonly reservationSeatRepository: Repository<ReservationSeat>,
  ) {}

  async findAll(movieId?: string, roomId?: string): Promise<Showtime[]> {
    const query = this.showtimeRepository.createQueryBuilder('showtime')
      .leftJoinAndSelect('showtime.movie', 'movie')
      .leftJoinAndSelect('showtime.room', 'room');

    if (movieId) {
      query.andWhere('showtime.movieId = :movieId', { movieId });
    }

    if (roomId) {
      query.andWhere('showtime.roomId = :roomId', { roomId });
    }

    query.orderBy('showtime.startsAt', 'ASC');

    return query.getMany();
  }

  async findOne(id: string): Promise<Showtime> {
    const showtime = await this.showtimeRepository.findOne({
      where: { id },
      relations: { movie: true, room: true },
    });
    if (!showtime) {
      throw new NotFoundException(`La función con ID ${id} no existe.`);
    }
    return showtime;
  }

  async getSeatMap(showtimeId: string): Promise<any> {
    const showtime = await this.showtimeRepository.findOne({
      where: { id: showtimeId },
      relations: { movie: true, room: true },
    });

    if (!showtime) {
      throw new NotFoundException({
        statusCode: 404,
        code: 'SHOWTIME_NOT_FOUND',
        message: 'La función no existe.',
      });
    }

    const now = new Date();
    if (showtime.startsAt.getTime() <= now.getTime()) {
      throw new ConflictException({
        statusCode: 409,
        code: 'SHOWTIME_NOT_BOOKABLE',
        message: 'La función ya inició o no admite nuevas reservas.',
      });
    }

    const seats = await this.seatRepository.find({
      where: { roomId: showtime.roomId },
      order: {
        rowLabel: 'ASC',
        columnNumber: 'ASC',
      },
    });

    const reservedSeats = await this.reservationSeatRepository.find({
      where: { showtimeId },
    });

    const reservedSeatIds = new Set(reservedSeats.map((rs) => rs.seatId));

    const mappedSeats = seats.map((seat) => ({
      id: seat.id,
      roomId: seat.roomId,
      rowLabel: seat.rowLabel,
      columnNumber: seat.columnNumber,
      code: seat.code,
      status: reservedSeatIds.has(seat.id) ? 'RESERVED' : 'AVAILABLE',
    }));

    return {
      showtimeId: showtime.id,
      movie: {
        id: showtime.movie.id,
        title: showtime.movie.title,
        genre: showtime.movie.genre,
        durationMinutes: showtime.movie.durationMinutes,
        rating: showtime.movie.rating,
        posterUrl: showtime.movie.posterUrl,
      },
      room: {
        id: showtime.room.id,
        name: showtime.room.name,
        rows: showtime.room.rows,
        columns: showtime.room.columns,
        capacity: showtime.room.capacity,
      },
      startsAt: showtime.startsAt.toISOString(),
      endsAt: showtime.endsAt.toISOString(),
      price: Number(showtime.price),
      currency: 'BOB',
      seats: mappedSeats,
    };
  }

  async create(dto: CreateShowtimeDto): Promise<Showtime> {
    const movie = await this.movieRepository.findOne({ where: { id: dto.movieId } });
    if (!movie) {
      throw new NotFoundException(`La película con ID ${dto.movieId} no existe.`);
    }

    const room = await this.roomRepository.findOne({ where: { id: dto.roomId } });
    if (!room) {
      throw new NotFoundException(`La sala con ID ${dto.roomId} no existe.`);
    }

    const now = new Date();
    if (dto.startsAt.getTime() <= now.getTime()) {
      throw new BadRequestException('La fecha de inicio de la función debe ser en el futuro.');
    }

    // Calculate endsAt
    const endsAt = new Date(dto.startsAt.getTime() + movie.durationMinutes * 60 * 1000);

    // Check for overlap in the same room
    const overlapping = await this.showtimeRepository.findOne({
      where: {
        roomId: dto.roomId,
        startsAt: LessThan(endsAt),
        endsAt: MoreThan(dto.startsAt),
      },
    });

    if (overlapping) {
      throw new ConflictException(
        'La sala ya está ocupada por otra función programada en ese rango de horario.',
      );
    }

    const showtime = this.showtimeRepository.create({
      movieId: dto.movieId,
      roomId: dto.roomId,
      startsAt: dto.startsAt,
      endsAt,
      price: dto.price,
    });

    const saved = await this.showtimeRepository.save(showtime);
    return this.findOne(saved.id);
  }

  async update(id: string, dto: UpdateShowtimeDto): Promise<Showtime> {
    const showtime = await this.findOne(id);

    let movie = showtime.movie;
    if (dto.movieId && dto.movieId !== showtime.movieId) {
      const foundMovie = await this.movieRepository.findOne({ where: { id: dto.movieId } });
      if (!foundMovie) {
        throw new NotFoundException(`La película con ID ${dto.movieId} no existe.`);
      }
      movie = foundMovie;
      showtime.movieId = dto.movieId;
    }

    if (dto.roomId && dto.roomId !== showtime.roomId) {
      const room = await this.roomRepository.findOne({ where: { id: dto.roomId } });
      if (!room) {
        throw new NotFoundException(`La sala con ID ${dto.roomId} no existe.`);
      }
      showtime.roomId = dto.roomId;
    }

    if (dto.startsAt) {
      const now = new Date();
      if (dto.startsAt.getTime() <= now.getTime()) {
        throw new BadRequestException('La fecha de inicio de la función debe ser en el futuro.');
      }
      showtime.startsAt = dto.startsAt;
    }

    if (dto.price !== undefined) {
      showtime.price = dto.price;
    }

    // Recalculate endsAt based on current startsAt and movie duration
    showtime.endsAt = new Date(showtime.startsAt.getTime() + movie.durationMinutes * 60 * 1000);

    // Check for overlap, excluding this showtime
    const overlapping = await this.showtimeRepository.findOne({
      where: {
        roomId: showtime.roomId,
        startsAt: LessThan(showtime.endsAt),
        endsAt: MoreThan(showtime.startsAt),
        id: Not(id),
      },
    });

    if (overlapping) {
      throw new ConflictException(
        'La sala ya está ocupada por otra función programada en ese rango de horario.',
      );
    }

    await this.showtimeRepository.save(showtime);
    return this.findOne(id);
  }

  async remove(id: string): Promise<void> {
    const showtime = await this.findOne(id);

    // Check if there are reservations
    const hasReservations = await this.reservationRepository.findOne({
      where: { showtimeId: id },
    });

    if (hasReservations) {
      throw new ConflictException(
        'No se puede eliminar la función porque ya existen clientes con reservas para la misma.',
      );
    }

    await this.showtimeRepository.remove(showtime);
  }
}
