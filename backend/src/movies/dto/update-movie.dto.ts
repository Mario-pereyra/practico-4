import { IsString, IsInt, Min, MaxLength, IsOptional } from 'class-validator';
import { Type } from 'class-transformer';

export class UpdateMovieDto {
  @IsString()
  @IsOptional()
  @MaxLength(160)
  title?: string;

  @IsString()
  @IsOptional()
  synopsis?: string;

  @IsString()
  @IsOptional()
  @MaxLength(50)
  genre?: string;

  @Type(() => Number)
  @IsInt()
  @IsOptional()
  @Min(1)
  durationMinutes?: number;

  @IsString()
  @IsOptional()
  @MaxLength(20)
  rating?: string;

  @IsString()
  @IsOptional()
  posterUrl?: string;
}
