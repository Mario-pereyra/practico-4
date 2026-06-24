import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { ConflictException, NotFoundException, BadRequestException } from '@nestjs/common';
import { DataSource } from 'typeorm';

import { ReservationsService } from './reservations.service';
import { Reservation } from './entities/reservation.entity';
import { ReservationSeat } from './entities/reservation-seat.entity';
import { Showtime } from '../showtimes/entities/showtime.entity';
import { Seat } from '../rooms/entities/seat.entity';

describe('ReservationsService', () => {
  let service: ReservationsService;
  let reservationRepositoryMock: any;
  let reservationSeatRepositoryMock: any;
  let showtimeRepositoryMock: any;
  let seatRepositoryMock: any;
  let dataSourceMock: any;
  let managerMock: any;

  beforeEach(async () => {
    reservationRepositoryMock = {
      find: jest.fn(),
      findOne: jest.fn(),
    };

    reservationSeatRepositoryMock = {
      find: jest.fn(),
    };

    showtimeRepositoryMock = {
      findOne: jest.fn(),
    };

    seatRepositoryMock = {
      find: jest.fn(),
    };

    managerMock = {
      createQueryBuilder: jest.fn().mockReturnValue({
        setLock: jest.fn().mockReturnThis(),
        where: jest.fn().mockReturnThis(),
        andWhere: jest.fn().mockReturnThis(),
        getMany: jest.fn(),
      }),
      create: jest.fn(),
      save: jest.fn(),
    };

    dataSourceMock = {
      transaction: jest.fn((callback) => callback(managerMock)),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ReservationsService,
        {
          provide: getRepositoryToken(Reservation),
          useValue: reservationRepositoryMock,
        },
        {
          provide: getRepositoryToken(ReservationSeat),
          useValue: reservationSeatRepositoryMock,
        },
        {
          provide: getRepositoryToken(Showtime),
          useValue: showtimeRepositoryMock,
        },
        {
          provide: getRepositoryToken(Seat),
          useValue: seatRepositoryMock,
        },
        {
          provide: DataSource,
          useValue: dataSourceMock,
        },
      ],
    }).compile();

    service = module.get<ReservationsService>(ReservationsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    const mockDto = {
      showtimeId: 'showtime-id',
      seatIds: ['seat-1', 'seat-2'],
    };

    it('should throw NotFoundException if showtime does not exist', async () => {
      showtimeRepositoryMock.findOne.mockResolvedValue(null);
      await expect(service.create('user-id', mockDto)).rejects.toThrow(NotFoundException);
    });

    it('should throw BadRequestException if showtime is in the past', async () => {
      showtimeRepositoryMock.findOne.mockResolvedValue({
        id: 'showtime-id',
        startsAt: new Date(Date.now() - 3600 * 1000), // 1 hour ago
      });
      await expect(service.create('user-id', mockDto)).rejects.toThrow(BadRequestException);
    });

    it('should throw BadRequestException if one or more seats do not belong to the showtime room', async () => {
      showtimeRepositoryMock.findOne.mockResolvedValue({
        id: 'showtime-id',
        roomId: 'room-id',
        startsAt: new Date(Date.now() + 3600 * 1000),
      });

      seatRepositoryMock.find.mockResolvedValue([
        { id: 'seat-1', roomId: 'room-id' },
      ]);

      await expect(service.create('user-id', mockDto)).rejects.toThrow(BadRequestException);
    });

    it('should throw ConflictException if any seat is already reserved (double booking check)', async () => {
      showtimeRepositoryMock.findOne.mockResolvedValue({
        id: 'showtime-id',
        roomId: 'room-id',
        startsAt: new Date(Date.now() + 3600 * 1000),
        price: 45.0,
      });

      seatRepositoryMock.find.mockResolvedValue([
        { id: 'seat-1', roomId: 'room-id', code: 'A1' },
        { id: 'seat-2', roomId: 'room-id', code: 'A2' },
      ]);

      managerMock.createQueryBuilder().getMany.mockResolvedValue([
        { id: 'rs-id', seatId: 'seat-1' },
      ]);

      await expect(service.create('user-id', mockDto)).rejects.toThrow(ConflictException);
    });

    it('should create reservation successfully if all seats are available', async () => {
      showtimeRepositoryMock.findOne.mockResolvedValue({
        id: 'showtime-id',
        roomId: 'room-id',
        startsAt: new Date(Date.now() + 3600 * 1000),
        price: 45.0,
      });

      seatRepositoryMock.find.mockResolvedValue([
        { id: 'seat-1', roomId: 'room-id', code: 'A1' },
        { id: 'seat-2', roomId: 'room-id', code: 'A2' },
      ]);

      managerMock.createQueryBuilder().getMany.mockResolvedValue([]);
      
      const mockSavedReservation = {
        id: 'res-id',
        userId: 'user-id',
        showtimeId: 'showtime-id',
        reservedAt: new Date(),
        total: 90.0,
        currency: 'BOB',
      };
      managerMock.create.mockImplementation((entity, data) => data);
      managerMock.save.mockImplementation(async (entity, data) => {
        if (Array.isArray(data)) return data;
        return { ...data, id: 'res-id', reservedAt: mockSavedReservation.reservedAt };
      });

      const result = await service.create('user-id', mockDto);
      expect(result.id).toBe('res-id');
      expect(result.total).toBe(90.0);
      expect(result.seats).toHaveLength(2);
    });

    it('should throw BadRequestException if more than 20 seats are selected', async () => {
      const tooManySeatsDto = {
        showtimeId: 'showtime-id',
        seatIds: Array.from({ length: 21 }, (_, i) => `seat-${i}`),
      };
      await expect(service.create('user-id', tooManySeatsDto)).rejects.toThrow(BadRequestException);
    });

    it('should throw BadRequestException if duplicate seats are selected', async () => {
      const duplicateSeatsDto = {
        showtimeId: 'showtime-id',
        seatIds: ['seat-1', 'seat-1'],
      };
      await expect(service.create('user-id', duplicateSeatsDto)).rejects.toThrow(BadRequestException);
    });

    it('should translate database unique constraint violation (code 23505) to ConflictException with SEAT_ALREADY_RESERVED', async () => {
      showtimeRepositoryMock.findOne.mockResolvedValue({
        id: 'showtime-id',
        roomId: 'room-id',
        startsAt: new Date(Date.now() + 3600 * 1000),
        price: 45.0,
      });

      seatRepositoryMock.find.mockResolvedValue([
        { id: 'seat-1', roomId: 'room-id', code: 'A1' },
      ]);

      managerMock.createQueryBuilder().getMany.mockResolvedValue([]);
      
      const dbError = new Error('Unique constraint violation');
      (dbError as any).code = '23505';
      managerMock.save.mockRejectedValue(dbError);

      await expect(service.create('user-id', { showtimeId: 'showtime-id', seatIds: ['seat-1'] }))
        .rejects.toThrow(expect.objectContaining({
          response: {
            statusCode: 409,
            code: 'SEAT_ALREADY_RESERVED',
            message: 'Uno o más asientos seleccionados ya han sido reservados por otro usuario.',
          }
        }));
    });
  });
});
