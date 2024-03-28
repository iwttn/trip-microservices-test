import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Reserve } from './entities/reserve.entity';
import { In, Repository } from 'typeorm';
import { Seat } from './entities/seat.entity';
import { createReserveDto } from './dto/create-reserve.dto';
import { Passenger } from './entities/passenger.entity';
import axios from 'axios';

@Injectable()
export class ReserveService {
  constructor(
    @InjectRepository(Reserve) private reserveRepository: Repository<Reserve>,
    @InjectRepository(Seat) private seatRepository: Repository<Seat>,
    @InjectRepository(Passenger)
    private passengerRepository: Repository<Passenger>,
  ) {}

  getAllReserves() {
    return this.reserveRepository.find({
      relations: ['idTrip', 'idPassenger'],
      loadRelationIds: true,
    });
  }

  getUntakenSeatsByIdTrip(idTrip: number) {
    const untakenSeats = this.seatRepository.find({
      where: { idTrip: { id: idTrip }, taken: false },
      select: ['seatNumber'],
    });
    return untakenSeats;
  }

  async createReserve(reserve: createReserveDto) {
    try {
      const { passengers, idTrip } = reserve;
      const passengersData = passengers.map(({ seat, ...rest }) => rest);

      const seatDataToUpdate = passengers.map(({ seat }) => seat);

      const { identifiers: passengerIdentifiers } =
        await this.passengerRepository.insert(passengersData);

      if (!passengerIdentifiers || passengerIdentifiers.length === 0) {
        throw new Error('Error a registrar los pasajeros.');
      }

      const reserveData = passengerIdentifiers.map(({ id: idPassenger }) => ({
        idTrip: { id: idTrip },
        idPassenger: { id: idPassenger },
      }));

      const { identifiers: indentifierReserve } =
        await this.reserveRepository.insert(reserveData);

      if (!indentifierReserve || indentifierReserve.length === 0) {
        throw new Error('Error al generar la reserva.');
      }

      const { data } = await axios.post(`http://localhost:3003/api/payment`, {
        indentifierReserve,
        passengersData,
      });

      await this.seatRepository.update(
        { idTrip: { id: idTrip }, seatNumber: In(seatDataToUpdate) },
        { taken: true },
      );

      return {
        message: 'Reserver creada',
        reserveIds: indentifierReserve,
        paymentCode: data?.paymentCode ?? '',
      };
    } catch (err) {
      console.error(err.message);
      throw new Error(err.message);
    }
  }
}
