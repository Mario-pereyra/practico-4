import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, MoreThanOrEqual } from 'typeorm';

import { Movie } from './entities/movie.entity';
import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';
import { Showtime } from '../showtimes/entities/showtime.entity';

@Injectable()
export class MoviesService {
  constructor(
    @InjectRepository(Movie)
    private readonly movieRepository: Repository<Movie>,
    @InjectRepository(Showtime)
    private readonly showtimeRepository: Repository<Showtime>,
  ) {}

  async findAll(search?: string, genre?: string): Promise<Movie[]> {
    const query = this.movieRepository.createQueryBuilder('movie');
    
    if (search) {
      query.andWhere('LOWER(movie.title) LIKE :search', {
        search: `%${search.toLowerCase()}%`,
      });
    }
    
    if (genre) {
      query.andWhere('LOWER(movie.genre) = :genre', {
        genre: genre.toLowerCase(),
      });
    }

    // Newest movies first
    query.orderBy('movie.createdAt', 'DESC');

    return query.getMany();
  }

  async findOne(id: string): Promise<Movie> {
    const movie = await this.movieRepository.findOne({ where: { id } });
    if (!movie) {
      throw new NotFoundException(`La película con ID ${id} no existe.`);
    }
    return movie;
  }

  async getPublicMovieDetail(id: string): Promise<any> {
    const movie = await this.movieRepository.findOne({ where: { id } });
    if (!movie) {
      throw new NotFoundException({
        statusCode: 404,
        code: 'MOVIE_NOT_FOUND',
        message: 'La película no existe.',
      });
    }

    const now = new Date();
    const showtimes = await this.showtimeRepository.find({
      where: {
        movieId: id,
        startsAt: MoreThanOrEqual(now),
      },
      relations: { room: true },
      order: {
        startsAt: 'ASC',
      },
    });

    return {
      id: movie.id,
      title: movie.title,
      synopsis: movie.synopsis,
      genre: movie.genre,
      durationMinutes: movie.durationMinutes,
      rating: movie.rating,
      posterUrl: movie.posterUrl,
      showtimes: showtimes.map((st) => ({
        id: st.id,
        startsAt: st.startsAt.toISOString(),
        endsAt: st.endsAt.toISOString(),
        price: Number(st.price),
        currency: 'BOB',
        room: {
          id: st.room.id,
          name: st.room.name,
        },
      })),
    };
  }

  async create(dto: CreateMovieDto): Promise<Movie> {
    const movie = this.movieRepository.create(dto);
    return this.movieRepository.save(movie);
  }

  async update(id: string, dto: UpdateMovieDto): Promise<Movie> {
    const movie = await this.findOne(id);
    
    // Update fields
    Object.assign(movie, dto);
    
    return this.movieRepository.save(movie);
  }

  async remove(id: string): Promise<void> {
    const movie = await this.findOne(id);

    // Check if there are scheduled showtimes
    const hasShowtimes = await this.showtimeRepository.findOne({
      where: { movieId: id },
    });

    if (hasShowtimes) {
      throw new ConflictException(
        'No se puede eliminar la película porque tiene funciones programadas asociadas.',
      );
    }

    await this.movieRepository.remove(movie);
  }
}
