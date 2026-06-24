import { IsUUID, IsDate, Min, IsNumber, IsOptional } from 'class-validator';
import { Type } from 'class-transformer';

export class UpdateShowtimeDto {
  @IsUUID()
  @IsOptional()
  movieId?: string;

  @IsUUID()
  @IsOptional()
  roomId?: string;

  @Type(() => Date)
  @IsDate()
  @IsOptional()
  startsAt?: Date;

  @Type(() => Number)
  @IsNumber({ maxDecimalPlaces: 2 })
  @Min(0.01)
  @IsOptional()
  price?: number;
}
