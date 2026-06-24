import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToOne, JoinColumn, OneToMany } from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { Showtime } from '../../showtimes/entities/showtime.entity';
import { ReservationSeat } from './reservation-seat.entity';

@Entity('reservations')
export class Reservation {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => User, { onDelete: 'RESTRICT' })
  @JoinColumn({ name: 'user_id' })
  user: User;

  @Column({ name: 'user_id' })
  userId: string;

  @ManyToOne(() => Showtime, { onDelete: 'RESTRICT' })
  @JoinColumn({ name: 'showtime_id' })
  showtime: Showtime;

  @Column({ name: 'showtime_id' })
  showtimeId: string;

  @CreateDateColumn({ name: 'reserved_at', type: 'timestamp with time zone' })
  reservedAt: Date;

  @Column({ type: 'numeric', precision: 10, scale: 2 })
  total: number;

  @Column({ length: 10, default: 'BOB' })
  currency: string;

  @OneToMany(() => ReservationSeat, (detail) => detail.reservation, { cascade: true })
  details: ReservationSeat[];
}
