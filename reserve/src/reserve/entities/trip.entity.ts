import { Entity, Column, Index, PrimaryColumn  } from 'typeorm'

@Entity({name : 'trips'})
export class Trip {
    @PrimaryColumn({ type : 'int' })
    id: number;

    @Index('trips_IDX_1')
    @Column({ type : 'timestamp' , name : 'trip_time'})
    tripTime: Date

    @Index('trips_IDX_2')
    @Column({ type: 'timestamp', name: 'created_at' , default: () => 'CURRENT_TIMESTAMP' })
    createdAt: Date;
  
    @Index('trips_IDX_3')
    @Column({ type: 'timestamp', name: 'updated_at',  default: () => 'CURRENT_TIMESTAMP' })
    updatedAt: Date;
}