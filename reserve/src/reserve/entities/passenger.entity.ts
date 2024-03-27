import { Column, Entity, Index, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'passengers' })
export class Passenger {
  @PrimaryGeneratedColumn({ type: 'int' })
  id: number;

  @Index('users_IDX_1')
  @Column({ type: 'varchar', length: 128 })
  name: string;

  @Index('users_IDX_2')
  @Column({ type: 'varchar', name: 'lastname', length: 128})
  lastname: string;

  @Index('users_IDX_3')
  @Column({ type: 'char', length: 8 })
  document: string;

  @Index('users_IDX_4')
  @Column({ type : 'varchar', length : 256, nullable : true })
  baggage : string;

  @Index('users_IDX_5')
  @Column({ type: 'timestamp', name: 'created_at', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @Index('users_IDX_6')
  @Column({ type: 'timestamp', name: 'updated_at', default: () => 'CURRENT_TIMESTAMP' })
  updatedAt: Date;
}
