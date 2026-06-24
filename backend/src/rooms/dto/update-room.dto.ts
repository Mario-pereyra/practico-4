import { IsString, IsInt, Min, Max, MaxLength, IsOptional } from 'class-validator';
import { Type } from 'class-transformer';

export class UpdateRoomDto {
  @IsString()
  @IsOptional()
  @MaxLength(100)
  name?: string;

  @Type(() => Number)
  @IsInt()
  @IsOptional()
  @Min(1)
  @Max(26)
  rows?: number;

  @Type(() => Number)
  @IsInt()
  @IsOptional()
  @Min(1)
  @Max(50)
  columns?: number;
}
