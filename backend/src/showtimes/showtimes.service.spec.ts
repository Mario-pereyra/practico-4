import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { ConflictException, NotFoundException, BadRequestException } from '@nestjs/common';
import { ShowtimesService } from './showtimes.service';
import { Showtime } from './entities/showtime.entity';
import { Movie } from '../movies/entities/movie.entity';
import { Room } from '../rooms/entities/room.entity';
import { Reservation } from '../reservations/entities/reservation.entity';
import { Seat } from '../rooms/entities/seat.entity';
import { ReservationSeat } from '../reservations/entities/reservation-seat.entity';

describe('ShowtimesService', () => {
  let service: ShowtimesService;
  let showtimeRepositoryMock: any;
  let movieRepositoryMock: any;
  let roomRepositoryMock: any;
  let reservationRepositoryMock: any;
  let seatRepositoryMock: any;
  let reservationSeatRepositoryMock: any;

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

    seatRepositoryMock = {
      find: jest.fn(),
    };

    reservationSeatRepositoryMock = {
      find: jest.fn(),
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
        {
          provide: getRepositoryToken(Seat),
          useValue: seatRepositoryMock,
        },
        {
          provide: getRepositoryToken(ReservationSeat),
          useValue: reservationSeatRepositoryMock,
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

  describe('getSeatMap', () => {
    it('should throw NotFoundException if showtime does not exist', async () => {
      showtimeRepositoryMock.findOne.mockResolvedValue(null);
      await expect(service.getSeatMap('some-id')).rejects.toThrow(NotFoundException);
    });

    it('should throw ConflictException if showtime has already started', async () => {
      const mockShowtime = {
        id: 'showtime-id',
        startsAt: new Date(Date.now() - 3600 * 1000), // in the past
      };
      showtimeRepositoryMock.findOne.mockResolvedValue(mockShowtime);
      await expect(service.getSeatMap('showtime-id')).rejects.toThrow(ConflictException);
    });

    it('should return seat map with correct availability statuses', async () => {
      const mockShowtime = {
        id: 'showtime-id',
        startsAt: new Date(Date.now() + 3600 * 1000), // in the future
        endsAt: new Date(Date.now() + 5400 * 1000),
        price: '45.00',
        roomId: 'room-id',
        movie: {
          id: 'movie-id',
          title: 'Movie Title',
          genre: 'ACTION',
          durationMinutes: 120,
          rating: 'ALL_AGES',
          posterUrl: '/poster.png',
        },
        room: {
          id: 'room-id',
          name: 'Sala 1',
          rows: 1,
          columns: 2,
          capacity: 2,
        },
      };
      showtimeRepositoryMock.findOne.mockResolvedValue(mockShowtime);

      const mockSeats = [
        { id: 'seat-1', roomId: 'room-id', rowLabel: 'A', columnNumber: 1, code: 'A1' },
        { id: 'seat-2', roomId: 'room-id', rowLabel: 'A', columnNumber: 2, code: 'A2' },
      ];
      seatRepositoryMock.find.mockResolvedValue(mockSeats);

      const mockReservationSeats = [
        { id: 'rs-1', seatId: 'seat-1', showtimeId: 'showtime-id' },
      ];
      reservationSeatRepositoryMock.find.mockResolvedValue(mockReservationSeats);

      const result = await service.getSeatMap('showtime-id');

      expect(showtimeRepositoryMock.findOne).toHaveBeenCalledWith({
        where: { id: 'showtime-id' },
        relations: { movie: true, room: true },
      });
      expect(seatRepositoryMock.find).toHaveBeenCalledWith({
        where: { roomId: 'room-id' },
        order: { rowLabel: 'ASC', columnNumber: 'ASC' },
      });
      expect(reservationSeatRepositoryMock.find).toHaveBeenCalledWith({
        where: { showtimeId: 'showtime-id' },
      });

      expect(result).toEqual({
        showtimeId: 'showtime-id',
        movie: {
          id: 'movie-id',
          title: 'Movie Title',
          genre: 'ACTION',
          durationMinutes: 120,
          rating: 'ALL_AGES',
          posterUrl: '/poster.png',
        },
        room: {
          id: 'room-id',
          name: 'Sala 1',
          rows: 1,
          columns: 2,
          capacity: 2,
        },
        startsAt: mockShowtime.startsAt.toISOString(),
        endsAt: mockShowtime.endsAt.toISOString(),
        price: 45,
        currency: 'BOB',
        seats: [
          { id: 'seat-1', roomId: 'room-id', rowLabel: 'A', columnNumber: 1, code: 'A1', status: 'RESERVED' },
          { id: 'seat-2', roomId: 'room-id', rowLabel: 'A', columnNumber: 2, code: 'A2', status: 'AVAILABLE' },
        ],
      });
    });
  });
});
