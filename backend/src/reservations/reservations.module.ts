import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ReservationsService } from './reservations.service';
import { ReservationsController } from './reservations.controller';
import { Reservation } from './entities/reservation.entity';
import { ReservationSeat } from './entities/reservation-seat.entity';
import { Showtime } from '../showtimes/entities/showtime.entity';
import { Seat } from '../rooms/entities/seat.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Reservation, ReservationSeat, Showtime, Seat]),
  ],
  controllers: [ReservationsController],
  providers: [ReservationsService],
  exports: [ReservationsService],
})
export class ReservationsModule {}
