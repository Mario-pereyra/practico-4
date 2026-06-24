import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';

import { AppController } from './app.controller';
import { AppService } from './app.service';

import { User } from './users/entities/user.entity';
import { Movie } from './movies/entities/movie.entity';
import { Room } from './rooms/entities/room.entity';
import { Seat } from './rooms/entities/seat.entity';
import { Showtime } from './showtimes/entities/showtime.entity';
import { Reservation } from './reservations/entities/reservation.entity';
import { ReservationSeat } from './reservations/entities/reservation-seat.entity';

import { SeedService } from './database/seed.service';
import { AuthModule } from './auth/auth.module';
import { MoviesModule } from './movies/movies.module';
import { RoomsModule } from './rooms/rooms.module';
import { ShowtimesModule } from './showtimes/showtimes.module';
import { ReservationsModule } from './reservations/reservations.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        type: 'postgres',
        host: config.get<string>('DB_HOST', 'localhost'),
        port: config.get<number>('DB_PORT', 5432),
        username: config.get<string>('DB_USERNAME', 'postgres'),
        password: config.get<string>('DB_PASSWORD', 'postgres'),
        database: config.get<string>('DB_DATABASE', 'cinereservas'),
        entities: [User, Movie, Room, Seat, Showtime, Reservation, ReservationSeat],
        synchronize: true, // Auto-create tables for the university practical environment
      }),
    }),
    TypeOrmModule.forFeature([User, Movie, Room, Seat, Showtime, Reservation, ReservationSeat]),
    ServeStaticModule.forRoot({
      rootPath: join(process.cwd(), 'uploads'),
      serveRoot: '/uploads',
    }),
    AuthModule,
    MoviesModule,
    RoomsModule,
    ShowtimesModule,
    ReservationsModule,
  ],
  controllers: [AppController],
  providers: [AppService, SeedService],
})
export class AppModule {}
