import { IsUUID, IsNotEmpty, IsDate, Min, IsNumber } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateShowtimeDto {
  @IsUUID()
  @IsNotEmpty()
  movieId: string;

  @IsUUID()
  @IsNotEmpty()
  roomId: string;

  @Type(() => Date)
  @IsDate()
  @IsNotEmpty()
  startsAt: Date;

  @Type(() => Number)
  @IsNumber({ maxDecimalPlaces: 2 })
  @Min(0.01)
  price: number;
}
