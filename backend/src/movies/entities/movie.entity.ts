import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm';

@Entity('movies')
export class Movie {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: 160 })
  title: string;

  @Column({ type: 'text' })
  synopsis: string;

  @Column({ length: 50 })
  genre: string;

  @Column({ name: 'duration_minutes', type: 'integer' })
  durationMinutes: number;

  @Column({ length: 20 })
  rating: string;

  @Column({ name: 'poster_url', length: 255 })
  posterUrl: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;
}
