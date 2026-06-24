import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, OneToMany } from 'typeorm';
import { Seat } from './seat.entity';

@Entity('rooms')
export class Room {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: 100 })
  name: string;

  @Column({ type: 'integer' })
  rows: number;

  @Column({ type: 'integer' })
  columns: number;

  @Column({ type: 'integer' })
  capacity: number;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @OneToMany(() => Seat, (seat) => seat.room, { cascade: true })
  seats: Seat[];
}
