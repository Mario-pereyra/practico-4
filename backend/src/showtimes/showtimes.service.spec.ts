import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { ConflictException, NotFoundException, BadRequestException } from '@nestjs/common';
import { ShowtimesService } from './showtimes.service';
import { Showtime } from './entities/showtime.entity';
import { Movie } from '../movies/entities/movie.entity';
import { Room } from '../rooms/entities/room.entity';
import { Reservation } from '../reservations/entities/reservation.entity';

describe('ShowtimesService', () => {
  let service: ShowtimesService;
  let showtimeRepositoryMock: any;
  let movieRepositoryMock: any;
  let roomRepositoryMock: any;
  let reservationRepositoryMock: any;

  beforeEach(async () => {
    showtimeRepositoryMock = {
      createQueryBuilder: jest.fn(),
      findOne: jest.fn(),
      create: jest.fn(),
      save: jest.fn(),
      remove: jest.fn(),
    };

    movieRepositoryMock = {
      findOne: jest.fn(),
    };

    roomRepositoryMock = {
      findOne: jest.fn(),
    };

    reservationRepositoryMock = {
      findOne: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ShowtimesService,
        {
          provide: getRepositoryToken(Showtime),
          useValue: showtimeRepositoryMock,
        },
        {
          provide: getRepositoryToken(Movie),
          useValue: movieRepositoryMock,
        },
        {
          provide: getRepositoryToken(Room),
          useValue: roomRepositoryMock,
        },
        {
          provide: getRepositoryToken(Reservation),
          useValue: reservationRepositoryMock,
        },
      ],
    }).compile();

    service = module.get<ShowtimesService>(ShowtimesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    const mockDto = {
      movieId: 'movie-id',
      roomId: 'room-id',
      startsAt: new Date(Date.now() + 3600 * 1000), // in 1 hour
      price: 45.0,
    };

    it('should throw NotFoundException if movie does not exist', async () => {
      movieRepositoryMock.findOne.mockResolvedValue(null);
      await expect(service.create(mockDto)).rejects.toThrow(NotFoundException);
    });

    it('should throw NotFoundException if room does not exist', async () => {
      movieRepositoryMock.findOne.mockResolvedValue({ id: 'movie-id', durationMinutes: 120 });
      roomRepositoryMock.findOne.mockResolvedValue(null);
      await expect(service.create(mockDto)).rejects.toThrow(NotFoundException);
    });

    it('should throw BadRequestException if startsAt is in the past', async () => {
      movieRepositoryMock.findOne.mockResolvedValue({ id: 'movie-id', durationMinutes: 120 });
      roomRepositoryMock.findOne.mockResolvedValue({ id: 'room-id' });

      const pastDto = {
        ...mockDto,
        startsAt: new Date(Date.now() - 5000), // 5 seconds ago
      };

      await expect(service.create(pastDto)).rejects.toThrow(BadRequestException);
    });

    it('should throw ConflictException if showtime overlaps in the same room', async () => {
      movieRepositoryMock.findOne.mockResolvedValue({ id: 'movie-id', durationMinutes: 120 });
      roomRepositoryMock.findOne.mockResolvedValue({ id: 'room-id' });
      showtimeRepositoryMock.findOne.mockResolvedValue({ id: 'existing-showtime-id' }); // Mocked overlap

      await expect(service.create(mockDto)).rejects.toThrow(ConflictException);
    });

    it('should save showtime if no overlaps exist', async () => {
      movieRepositoryMock.findOne.mockResolvedValue({ id: 'movie-id', durationMinutes: 120 });
      roomRepositoryMock.findOne.mockResolvedValue({ id: 'room-id' });
      showtimeRepositoryMock.findOne.mockResolvedValue(null); // No overlap
      showtimeRepositoryMock.create.mockReturnValue(mockDto);
      showtimeRepositoryMock.save.mockResolvedValue({ id: 'saved-id' });
      
      jest.spyOn(service, 'findOne').mockResolvedValue({ id: 'saved-id' } as any);

      const result = await service.create(mockDto);
      expect(result).toEqual({ id: 'saved-id' });
      expect(showtimeRepositoryMock.save).toHaveBeenCalled();
    });
  });
});
