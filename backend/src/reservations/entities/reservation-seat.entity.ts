import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, Index } from 'typeorm';
import { Reservation } from './reservation.entity';
import { Showtime } from '../../showtimes/entities/showtime.entity';
import { Seat } from '../../rooms/entities/seat.entity';

@Entity('reservation_seats')
@Index(['showtimeId', 'seatId'], { unique: true })
@Index(['reservation', 'seatId'], { unique: true })
export class ReservationSeat {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Reservation, (reservation) => reservation.details, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'reservation_id' })
  reservation: Reservation;

  @Column({ name: 'reservation_id' })
  reservationId: string;

  @ManyToOne(() => Showtime, { onDelete: 'RESTRICT' })
  @JoinColumn({ name: 'showtime_id' })
  showtime: Showtime;

  @Column({ name: 'showtime_id' })
  showtimeId: string;

  @ManyToOne(() => Seat, { onDelete: 'RESTRICT' })
  @JoinColumn({ name: 'seat_id' })
  seat: Seat;

  @Column({ name: 'seat_id' })
  seatId: string;

  @Column({ name: 'unit_price', type: 'numeric', precision: 10, scale: 2 })
  unitPrice: number;
}
