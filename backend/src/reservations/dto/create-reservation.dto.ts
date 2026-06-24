import { IsUUID, IsArray, ArrayMinSize, IsNotEmpty } from 'class-validator';

export class CreateReservationDto {
  @IsUUID()
  @IsNotEmpty()
  showtimeId: string;

  @IsArray()
  @IsUUID('all', { each: true })
  @ArrayMinSize(1)
  seatIds: string[];
}
