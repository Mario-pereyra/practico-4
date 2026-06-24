import { Controller, Get, Post, Body, Param, Query, UseGuards } from '@nestjs/common';
import { ReservationsService } from './reservations.service';
import { CreateReservationDto } from './dto/create-reservation.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { GetUser } from '../auth/decorators/get-user.decorator';
import { User } from '../users/entities/user.entity';

@Controller('reservations')
export class ReservationsController {
  constructor(private readonly reservationsService: ReservationsService) {}

  @Get()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('ADMIN')
  async findAll() {
    return this.reservationsService.findAll();
  }

  @Get('my')
  @UseGuards(JwtAuthGuard)
  async findMy(
    @GetUser() user: User,
    @Query('page') page?: number,
    @Query('limit') limit?: number,
  ) {
    return this.reservationsService.findByUser(user.id, page, limit);
  }

  @Get(':reservationId')
  @UseGuards(JwtAuthGuard)
  async findOne(@GetUser() user: User, @Param('reservationId') reservationId: string) {
    return this.reservationsService.findOneByUser(reservationId, user.id);
  }

  @Get('showtime/:showtimeId/seats')
  async getSeatMap(@Param('showtimeId') showtimeId: string) {
    return this.reservationsService.getSeatMap(showtimeId);
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  async create(@GetUser() user: User, @Body() createReservationDto: CreateReservationDto) {
    return this.reservationsService.create(user.id, createReservationDto);
  }
}
