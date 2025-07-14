import { Type } from 'class-transformer';
import { IsArray, ArrayNotEmpty, IsInt } from 'class-validator';

export class DeleteManyDto {
  @IsArray()
  @ArrayNotEmpty()
  @IsInt({ each: true })
  @Type(() => Number)
  ids: number[];
}