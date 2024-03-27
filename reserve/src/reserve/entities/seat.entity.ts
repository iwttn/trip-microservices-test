import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  Index,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Trip } from './trip.entity';

@Entity({ name: 'seats' })
export class Seat {
  @PrimaryGeneratedColumn({ type: 'int' })
  id: number;

  @Index('seats_IDX_1')
  @Column({ type: 'int', name: 'seat_number' })
  seatNumber: number;

  @Index('seats_IDX_2')
  @ManyToOne(() => Trip, (trip) => trip.id, {
    nullable: false,
    onDelete: 'RESTRICT',
    onUpdate: 'RESTRICT',
  })
  @JoinColumn({ name: 'id_trip' })
  idTrip: Trip;

  @Index('seats_IDX_3')
  @Column({ type: 'tinyint', name: 'taken', default: () => 0 })
  taken: boolean;

  @Index('seats_IDX_4')
  @Column({
    type: 'timestamp',
    name: 'created_at',
    default: () => 'CURRENT_TIMESTAMP',
  })
  createdAt: Date;

  @Index('seats_IDX_5')
  @Column({
    type: 'timestamp',
    name: 'updated_at',
    default: () => 'CURRENT_TIMESTAMP'
  })
  updatedAt: Date;
}
