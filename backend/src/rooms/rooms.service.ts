import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DataSource } from 'typeorm';

import { Room } from './entities/room.entity';
import { Seat } from './entities/seat.entity';
import { CreateRoomDto } from './dto/create-room.dto';
import { UpdateRoomDto } from './dto/update-room.dto';
import { Showtime } from '../showtimes/entities/showtime.entity';

@Injectable()
export class RoomsService {
  constructor(
    @InjectRepository(Room)
    private readonly roomRepository: Repository<Room>,
    @InjectRepository(Showtime)
    private readonly showtimeRepository: Repository<Showtime>,
    private readonly dataSource: DataSource,
  ) {}

  async findAll(): Promise<Room[]> {
    return this.roomRepository.find({ order: { name: 'ASC' } });
  }

  async findOne(id: string): Promise<Room> {
    const room = await this.roomRepository.findOne({
      where: { id },
      relations: { seats: true },
    });
    if (!room) {
      throw new NotFoundException(`La sala con ID ${id} no existe.`);
    }
    // Sort seats by row and column for easy frontend displaying
    if (room.seats) {
      room.seats.sort((a, b) => {
        if (a.rowLabel !== b.rowLabel) {
          return a.rowLabel.localeCompare(b.rowLabel);
        }
        return a.columnNumber - b.columnNumber;
      });
    }
    return room;
  }

  async create(dto: CreateRoomDto): Promise<Room> {
    const capacity = dto.rows * dto.columns;

    return this.dataSource.transaction(async (manager) => {
      const room = manager.create(Room, {
        name: dto.name,
        rows: dto.rows,
        columns: dto.columns,
        capacity,
      });

      const savedRoom = await manager.save(Room, room);

      // Generate Seats
      const seats: Seat[] = [];
      for (let r = 0; r < dto.rows; r++) {
        const rowLabel = String.fromCharCode(65 + r); // A, B, C...
        for (let c = 1; c <= dto.columns; c++) {
          const seat = manager.create(Seat, {
            roomId: savedRoom.id,
            rowLabel,
            columnNumber: c,
            code: `${rowLabel}${c}`,
          });
          seats.push(seat);
        }
      }
      await manager.save(Seat, seats);

      savedRoom.seats = seats;
      return savedRoom;
    });
  }

  async update(id: string, dto: UpdateRoomDto): Promise<Room> {
    const room = await this.findOne(id);

    const requiresSeatRegeneration =
      (dto.rows !== undefined && dto.rows !== room.rows) ||
      (dto.columns !== undefined && dto.columns !== room.columns);

    if (requiresSeatRegeneration) {
      // Check if there are scheduled showtimes
      const hasShowtimes = await this.showtimeRepository.findOne({
        where: { roomId: id },
      });
      if (hasShowtimes) {
        throw new ConflictException(
          'No se puede redimensionar la sala porque tiene funciones programadas asociadas.',
        );
      }
    }

    return this.dataSource.transaction(async (manager) => {
      if (dto.name !== undefined) room.name = dto.name;
      if (dto.rows !== undefined) room.rows = dto.rows;
      if (dto.columns !== undefined) room.columns = dto.columns;
      room.capacity = room.rows * room.columns;

      const savedRoom = await manager.save(Room, room);

      if (requiresSeatRegeneration) {
        // Delete existing seats (cascades or delete explicitly)
        await manager.delete(Seat, { roomId: id });

        // Generate new Seats
        const seats: Seat[] = [];
        for (let r = 0; r < room.rows; r++) {
          const rowLabel = String.fromCharCode(65 + r);
          for (let c = 1; c <= room.columns; c++) {
            const seat = manager.create(Seat, {
              roomId: savedRoom.id,
              rowLabel,
              columnNumber: c,
              code: `${rowLabel}${c}`,
            });
            seats.push(seat);
          }
        }
        await manager.save(Seat, seats);
        savedRoom.seats = seats;
      }

      return savedRoom;
    });
  }

  async remove(id: string): Promise<void> {
    const room = await this.findOne(id);

    // Check if there are scheduled showtimes
    const hasShowtimes = await this.showtimeRepository.findOne({
      where: { roomId: id },
    });
    if (hasShowtimes) {
      throw new ConflictException(
        'No se puede eliminar la sala porque tiene funciones programadas asociadas.',
      );
    }

    // Delete room (which will CASCADE delete seats because onDelete: 'CASCADE' is on Seat)
    await this.roomRepository.remove(room);
  }
}
