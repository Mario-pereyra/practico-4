import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToOne, JoinColumn, Index } from 'typeorm';
import { Room } from './room.entity';

@Entity('seats')
@Index(['room', 'code'], { unique: true })
@Index(['room', 'rowLabel', 'columnNumber'], { unique: true })
export class Seat {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Room, (room) => room.seats, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'room_id' })
  room: Room;

  @Column({ name: 'room_id' })
  roomId: string;

  @Column({ name: 'row_label', length: 5 })
  rowLabel: string;

  @Column({ name: 'column_number', type: 'integer' })
  columnNumber: number;

  @Column({ length: 10 })
  code: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;
}
