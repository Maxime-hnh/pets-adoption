import { Expose, Type } from "class-transformer";
import { IsInt, IsNotEmpty, ValidateNested } from "class-validator";
import { AnimalDto } from "src/modules/animals/dto/animal.dto";

export class FavoriteDto {

  @Expose()
  @IsInt()
  @IsNotEmpty()
  userId: number;

  @Expose()
  @IsInt()
  @IsNotEmpty()
  animalId: number;
}
