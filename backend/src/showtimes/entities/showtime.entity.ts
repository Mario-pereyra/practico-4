import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Movie } from '../../movies/entities/movie.entity';
import { Room } from '../../rooms/entities/room.entity';

@Entity('showtimes')
export class Showtime {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Movie, { onDelete: 'RESTRICT' })
  @JoinColumn({ name: 'movie_id' })
  movie: Movie;

  @Column({ name: 'movie_id' })
  movieId: string;

  @ManyToOne(() => Room, { onDelete: 'RESTRICT' })
  @JoinColumn({ name: 'room_id' })
  room: Room;

  @Column({ name: 'room_id' })
  roomId: string;

  @Column({ name: 'starts_at', type: 'timestamp with time zone' })
  startsAt: Date;

  @Column({ name: 'ends_at', type: 'timestamp with time zone' })
  endsAt: Date;

  @Column({ type: 'numeric', precision: 10, scale: 2 })
  price: number;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;
}
