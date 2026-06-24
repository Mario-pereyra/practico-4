import { IsString, IsNotEmpty, IsInt, Min, Max, MaxLength } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateRoomDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  name: string;

  @Type(() => Number)
  @IsInt()
  @Min(1)
  @Max(26) // Restrict to A-Z for simplicity in row labeling
  rows: number;

  @Type(() => Number)
  @IsInt()
  @Min(1)
  @Max(50)
  columns: number;
}
