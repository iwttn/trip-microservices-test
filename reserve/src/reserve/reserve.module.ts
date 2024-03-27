import { Module } from '@nestjs/common';
import { ReserveController } from './reserve.controller';
import { ReserveService } from './reserve.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Reserve } from './entities/reserve.entity';
import { Passenger } from './entities/passenger.entity';
import { Seat } from './entities/seat.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Reserve, Seat, Passenger])],
  controllers: [ReserveController],
  providers: [ReserveService],
})
export class ReserveModule {}
