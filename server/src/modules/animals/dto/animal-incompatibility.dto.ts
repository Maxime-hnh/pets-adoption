import { Expose, Type } from 'class-transformer';
import { IsInt, IsString } from 'class-validator';
import { IncompatibilitiesDto } from 'src/modules/incompatibilities/dto/incompatibilities.dto';

export class AnimalIncompatibilityDto {
  @Expose()
  @IsInt()
  incompatibilityId: number;


  @Expose()
  @Type(() => IncompatibilitiesDto)
  incompatibility: IncompatibilitiesDto;
}
