import { Injectable, OnModuleInit } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DataSource } from 'typeorm';
import * as bcrypt from 'bcrypt';

import { User } from '../users/entities/user.entity';
import { Movie } from '../movies/entities/movie.entity';
import { Room } from '../rooms/entities/room.entity';
import { Seat } from '../rooms/entities/seat.entity';
import { Showtime } from '../showtimes/entities/showtime.entity';

@Injectable()
export class SeedService implements OnModuleInit {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    @InjectRepository(Movie) private readonly movieRepository: Repository<Movie>,
    @InjectRepository(Room) private readonly roomRepository: Repository<Room>,
    @InjectRepository(Showtime) private readonly showtimeRepository: Repository<Showtime>,
    private readonly dataSource: DataSource,
  ) {}

  async onModuleInit() {
    const userCount = await this.userRepository.count();
    if (userCount === 0) {
      console.log('Database is empty. Running seed service...');
      await this.runSeed();
    } else {
      console.log('Database already has data. Skipping seed.');
    }
  }

  private async runSeed() {
    // 1. Create Users
    const passwordHashAdmin = await bcrypt.hash('admin12345', 10);
    const admin = this.userRepository.create({
      name: 'Administrador del Cine',
      email: 'admin@cinereservas.com',
      passwordHash: passwordHashAdmin,
      role: 'ADMIN',
    });
    await this.userRepository.save(admin);

    const passwordHashClient = await bcrypt.hash('client12345', 10);
    const client = this.userRepository.create({
      name: 'Juan Perez',
      email: 'client@cinereservas.com',
      passwordHash: passwordHashClient,
      role: 'CLIENT',
    });
    await this.userRepository.save(client);

    console.log('Seed: Users created successfully.');

    // 2. Create Movies
    const inception = this.movieRepository.create({
      title: 'Inception',
      synopsis: 'Un ladrón que roba secretos corporativos a través del uso de la tecnología de compartir sueños, se le da la tarea inversa de plantar una idea en la mente de un director ejecutivo.',
      genre: 'SCI-FI',
      durationMinutes: 148,
      rating: 'PG-13',
      posterUrl: '/uploads/inception.png',
    });
    await this.movieRepository.save(inception);

    const darkKnight = this.movieRepository.create({
      title: 'The Dark Knight',
      synopsis: 'Cuando la amenaza conocida como el Guasón causa estragos y caos en Gotham, Batman debe aceptar una de las mayores pruebas psicológicas y físicas de su capacidad para luchar contra la injusticia.',
      genre: 'ACTION',
      durationMinutes: 152,
      rating: 'PG-13',
      posterUrl: '/uploads/dark_knight.png',
    });
    await this.movieRepository.save(darkKnight);

    const interstellar = this.movieRepository.create({
      title: 'Interstellar',
      synopsis: 'Un equipo de exploradores viaja a través de un agujero de gusano en el espacio en un intento de asegurar la supervivencia de la humanidad.',
      genre: 'SCI-FI',
      durationMinutes: 169,
      rating: 'PG-13',
      posterUrl: '/uploads/interstellar.png',
    });
    await this.movieRepository.save(interstellar);

    console.log('Seed: Movies created.');

    // 3. Create Rooms and Seats in Transaction
    await this.dataSource.transaction(async (manager) => {
      // Sala 1
      const sala1 = manager.create(Room, {
        name: 'Sala Premium 1',
        rows: 5,
        columns: 10,
        capacity: 50,
      });
      const savedSala1 = await manager.save(Room, sala1);

      const seatsSala1: Seat[] = [];
      for (let r = 0; r < 5; r++) {
        const rowLabel = String.fromCharCode(65 + r); // A, B, C, D, E
        for (let c = 1; c <= 10; c++) {
          const seat = manager.create(Seat, {
            roomId: savedSala1.id,
            rowLabel,
            columnNumber: c,
            code: `${rowLabel}${c}`,
          });
          seatsSala1.push(seat);
        }
      }
      await manager.save(Seat, seatsSala1);

      // Sala 2
      const sala2 = manager.create(Room, {
        name: 'Sala 3D 2',
        rows: 6,
        columns: 8,
        capacity: 48,
      });
      const savedSala2 = await manager.save(Room, sala2);

      const seatsSala2: Seat[] = [];
      for (let r = 0; r < 6; r++) {
        const rowLabel = String.fromCharCode(65 + r); // A, B, C, D, E, F
        for (let c = 1; c <= 8; c++) {
          const seat = manager.create(Seat, {
            roomId: savedSala2.id,
            rowLabel,
            columnNumber: c,
            code: `${rowLabel}${c}`,
          });
          seatsSala2.push(seat);
        }
      }
      await manager.save(Seat, seatsSala2);

      console.log('Seed: Rooms and Seats generated.');

      // 4. Create Showtimes
      const now = new Date();
      
      // Showtime for Inception (tomorrow at 18:00)
      const tomorrow18 = new Date(now);
      tomorrow18.setDate(now.getDate() + 1);
      tomorrow18.setHours(18, 0, 0, 0);
      const endsTomorrow18 = new Date(tomorrow18.getTime() + inception.durationMinutes * 60000);

      const showtime1 = manager.create(Showtime, {
        movieId: inception.id,
        roomId: savedSala1.id,
        startsAt: tomorrow18,
        endsAt: endsTomorrow18,
        price: 45.00,
      });
      await manager.save(Showtime, showtime1);

      // Showtime for Dark Knight (tomorrow at 21:00)
      const tomorrow21 = new Date(now);
      tomorrow21.setDate(now.getDate() + 1);
      tomorrow21.setHours(21, 0, 0, 0);
      const endsTomorrow21 = new Date(tomorrow21.getTime() + darkKnight.durationMinutes * 60000);

      const showtime2 = manager.create(Showtime, {
        movieId: darkKnight.id,
        roomId: savedSala1.id,
        startsAt: tomorrow21,
        endsAt: endsTomorrow21,
        price: 50.00,
      });
      await manager.save(Showtime, showtime2);

      console.log('Seed: Showtimes scheduled.');
    });

    console.log('Seed: Database seeded successfully.');
  }
}
