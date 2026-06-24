import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { ConflictException, NotFoundException } from '@nestjs/common';
import { MoviesService } from './movies.service';
import { Movie } from './entities/movie.entity';
import { Showtime } from '../showtimes/entities/showtime.entity';

describe('MoviesService', () => {
  let service: MoviesService;
  let movieRepositoryMock: any;
  let showtimeRepositoryMock: any;

  beforeEach(async () => {
    movieRepositoryMock = {
      createQueryBuilder: jest.fn().mockReturnValue({
        andWhere: jest.fn().mockReturnThis(),
        orderBy: jest.fn().mockReturnThis(),
        getMany: jest.fn().mockResolvedValue([]),
      }),
      findOne: jest.fn(),
      create: jest.fn(),
      save: jest.fn(),
      remove: jest.fn(),
    };

    showtimeRepositoryMock = {
      findOne: jest.fn(),
      find: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        MoviesService,
        {
          provide: getRepositoryToken(Movie),
          useValue: movieRepositoryMock,
        },
        {
          provide: getRepositoryToken(Showtime),
          useValue: showtimeRepositoryMock,
        },
      ],
    }).compile();

    service = module.get<MoviesService>(MoviesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('getPublicMovieDetail', () => {
    it('should throw NotFoundException if movie does not exist', async () => {
      movieRepositoryMock.findOne.mockResolvedValue(null);
      await expect(service.getPublicMovieDetail('some-id')).rejects.toThrow(NotFoundException);
    });

    it('should return movie details with future showtimes sorted by startsAt', async () => {
      const mockMovie = {
        id: 'movie-id',
        title: 'Test Movie',
        synopsis: 'Synopsis',
        genre: 'ACTION',
        durationMinutes: 120,
        rating: 'ALL_AGES',
        posterUrl: '/uploads/poster.webp',
      };
      movieRepositoryMock.findOne.mockResolvedValue(mockMovie);

      const mockShowtimes = [
        {
          id: 'showtime-1',
          startsAt: new Date('2026-06-25T18:00:00Z'),
          endsAt: new Date('2026-06-25T20:00:00Z'),
          price: '45.00',
          room: { id: 'room-1', name: 'Sala 1' },
        },
        {
          id: 'showtime-2',
          startsAt: new Date('2026-06-25T21:00:00Z'),
          endsAt: new Date('2026-06-25T23:00:00Z'),
          price: '50.00',
          room: { id: 'room-2', name: 'Sala 2' },
        },
      ];
      showtimeRepositoryMock.find.mockResolvedValue(mockShowtimes);

      const result = await service.getPublicMovieDetail('movie-id');

      expect(movieRepositoryMock.findOne).toHaveBeenCalledWith({ where: { id: 'movie-id' } });
      expect(showtimeRepositoryMock.find).toHaveBeenCalled();
      expect(result).toEqual({
        id: 'movie-id',
        title: 'Test Movie',
        synopsis: 'Synopsis',
        genre: 'ACTION',
        durationMinutes: 120,
        rating: 'ALL_AGES',
        posterUrl: '/uploads/poster.webp',
        showtimes: [
          {
            id: 'showtime-1',
            startsAt: '2026-06-25T18:00:00.000Z',
            endsAt: '2026-06-25T20:00:00.000Z',
            price: 45,
            currency: 'BOB',
            room: { id: 'room-1', name: 'Sala 1' },
          },
          {
            id: 'showtime-2',
            startsAt: '2026-06-25T21:00:00.000Z',
            endsAt: '2026-06-25T23:00:00.000Z',
            price: 50,
            currency: 'BOB',
            room: { id: 'room-2', name: 'Sala 2' },
          },
        ],
      });
    });
  });

  describe('remove', () => {
    it('should throw NotFoundException if movie does not exist', async () => {
      movieRepositoryMock.findOne.mockResolvedValue(null);
      await expect(service.remove('some-id')).rejects.toThrow(NotFoundException);
    });

    it('should throw ConflictException if movie has showtimes', async () => {
      const mockMovie = { id: 'some-id', title: 'Test Movie' };
      movieRepositoryMock.findOne.mockResolvedValue(mockMovie);
      showtimeRepositoryMock.findOne.mockResolvedValue({ id: 'showtime-id' }); // Movie has showtime

      await expect(service.remove('some-id')).rejects.toThrow(ConflictException);
      expect(movieRepositoryMock.remove).not.toHaveBeenCalled();
    });

    it('should delete movie if it has no showtimes', async () => {
      const mockMovie = { id: 'some-id', title: 'Test Movie' };
      movieRepositoryMock.findOne.mockResolvedValue(mockMovie);
      showtimeRepositoryMock.findOne.mockResolvedValue(null); // No showtimes

      await service.remove('some-id');
      expect(movieRepositoryMock.remove).toHaveBeenCalledWith(mockMovie);
    });
  });
});
