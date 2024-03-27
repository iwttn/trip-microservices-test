import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Passenger } from './passenger.entity';
import { Trip } from './trip.entity';

@Entity({ name: 'reserves' })
export class Reserve {
  @PrimaryGeneratedColumn({ type: 'int' })
  id: number;

  @Index('reserves_IDX_1')
  @ManyToOne(() => Trip, (trip) => trip.id, {
    nullable: false,
    onDelete: 'RESTRICT',
    onUpdate: 'RESTRICT',
  })
  @JoinColumn({ name: 'id_trip' })
  idTrip: Trip;

  @Index('reserves_IDX_2')
  @ManyToOne(() => Passenger, (passenger) => passenger.id, {
    nullable: false,
    onDelete: 'RESTRICT',
    onUpdate: 'RESTRICT',
  })
  @JoinColumn({ name: 'id_passenger' })
  idPassenger: Passenger;

  @Index('reserves_IDX_3')
  @Column({
    type: 'timestamp',
    name: 'created_at',
    default: () => 'CURRENT_TIMESTAMP',
  })
  createdAt: Date;

  @Index('reserves_IDX_4')
  @Column({
    type: 'timestamp',
    name: 'updated_at',
    default: () => 'CURRENT_TIMESTAMP',
  })
  updatedAt: Date;
}