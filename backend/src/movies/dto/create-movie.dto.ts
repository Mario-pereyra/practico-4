import { IsString, IsNotEmpty, IsInt, Min, MaxLength, IsOptional } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateMovieDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(160)
  title: string;

  @IsString()
  @IsNotEmpty()
  synopsis: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(50)
  genre: string;

  @Type(() => Number)
  @IsInt()
  @Min(1)
  durationMinutes: number;

  @IsString()
  @IsNotEmpty()
  @MaxLength(20)
  rating: string;

  @IsString()
  @IsOptional()
  posterUrl?: string;
}
