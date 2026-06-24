import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ShowtimesService } from './showtimes.service';
import { ShowtimesController } from './showtimes.controller';
import { Showtime } from './entities/showtime.entity';
import { Movie } from '../movies/entities/movie.entity';
import { Room } from '../rooms/entities/room.entity';
import { Reservation } from '../reservations/entities/reservation.entity';
import { Seat } from '../rooms/entities/seat.entity';
import { ReservationSeat } from '../reservations/entities/reservation-seat.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Showtime, Movie, Room, Reservation, Seat, ReservationSeat])],
  controllers: [ShowtimesController],
  providers: [ShowtimesService],
  exports: [ShowtimesService],
})
export class ShowtimesModule {}
