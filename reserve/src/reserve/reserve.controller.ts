import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
} from '@nestjs/common';
import { ReserveService } from './reserve.service';
import { createReserveDto } from './dto/create-reserve.dto';

@Controller({
  path: '/reserve',
})
export class ReserveController {
  constructor(private reserveService: ReserveService) {}

  @Get('/get-untaken-seats-by-trip/:id')
  async getAllSeats(@Param('id', ParseIntPipe) idTrip: number) {
    const untakenSeats =
      await this.reserveService.getUntakenSeatsByIdTrip(idTrip);
    return untakenSeats;
  }

  @Get()
  getReserve() {
    return this.reserveService.getAllReserves();
  }

  @Post()
  postReserve(@Body() reserve: createReserveDto) {
    const reserveCreated = this.reserveService.createReserve(reserve);
    return reserveCreated;
  }
}
