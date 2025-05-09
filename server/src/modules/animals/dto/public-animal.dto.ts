import { Expose } from "class-transformer";
import { IsInt, IsNotEmpty, IsString } from "class-validator";
import { Gender, AnimalStatus, PlacementType } from "@prisma/client";

export class PublicAnimalDto {

  @Expose()
  @IsInt()
  @IsNotEmpty()
  id: number;

  @Expose()
  @IsString()
  @IsNotEmpty()
  name: string;

  @Expose()
  @IsString()
  @IsNotEmpty()
  species: string;


  @Expose()
  @IsString()
  @IsNotEmpty()
  gender: Gender;

  @Expose()
  @IsString()
  @IsNotEmpty()
  status: AnimalStatus;

  @Expose()
  @IsString()
  @IsNotEmpty()
  placementType: PlacementType;

  @Expose()
  @IsString()
  @IsNotEmpty()
  photos: string;
}