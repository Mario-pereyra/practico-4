import { Injectable, NotFoundException, ConflictException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, LessThan, MoreThan, Not } from 'typeorm';

import { Showtime } from './entities/showtime.entity';
import { CreateShowtimeDto } from './dto/create-showtime.dto';
import { UpdateShowtimeDto } from './dto/update-showtime.dto';
import { Movie } from '../movies/entities/movie.entity';
import { Room } from '../rooms/entities/room.entity';
import { Reservation } from '../reservations/entities/reservation.entity';

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
