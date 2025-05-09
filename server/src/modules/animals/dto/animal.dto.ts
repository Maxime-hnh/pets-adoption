import { Species, Gender, AnimalStatus, PlacementType } from '@prisma/client';
import { Exclude, Expose, Transform, Type } from 'class-transformer';
import { IsString, IsNotEmpty, IsOptional, IsBoolean, IsEnum, IsDate, IsInt, IsUUID, IsArray, ValidateNested } from 'class-validator';
import { AnimalIncompatibilityDto } from './animal-incompatibility.dto';

export class AnimalDto {
  @Expose()
  @IsInt()
  @IsNotEmpty()
  id: number;

  @Expose()
  @IsUUID()
  @IsNotEmpty()
  uid: string;

  @Expose()
  @IsString()
  @IsOptional()
  icadNumber?: string;

  @Expose()
  @IsString()
  @IsNotEmpty()
  name: string;

  @Expose()
  @IsBoolean()
  @IsNotEmpty()
  isSterilized: boolean;

  @Expose()
  @IsEnum(Species)
  @IsNotEmpty()
  species: Species;

  @Expose()
  @IsString()
  @IsNotEmpty()
  breed: string;

  @Expose()
  @IsEnum(Gender)
  @IsNotEmpty()
  gender: Gender;

  @Expose()
  @Type(() => Date)
  @IsDate()
  @IsNotEmpty()
  birthDate: Date;

  @Expose()
  @IsString()
  @IsOptional()
  description?: string;

  @Expose()
  @IsEnum(AnimalStatus)
  @IsNotEmpty()
  status: AnimalStatus;

  @Expose()
  @IsEnum(PlacementType)
  @IsNotEmpty()
  placementType: PlacementType;

  @Expose()
  @Type(() => Date)
  @IsDate()
  @IsOptional()
  adoptionDate?: Date;

  @Expose()
  @IsString()
  @IsNotEmpty()
  photos: string[];

  @Expose()
  @IsString()
  @IsOptional()
  internalNotes?: string;

  @Expose()
  @IsBoolean()
  @IsNotEmpty()
  isArchived: boolean;

  @Expose()
  @Type(() => Date)
  @IsDate()
  @IsNotEmpty()
  createdAt: Date;

  @Expose()
  @Type(() => Date)
  @IsDate()
  @IsNotEmpty()
  updatedAt: Date;

  @Expose()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => AnimalIncompatibilityDto)
  animalIncompatibilities: AnimalIncompatibilityDto[]

  @Expose()
  @IsArray()
  @IsString({ each: true })
  @Transform(({ obj }) => obj.animalIncompatibilities?.map((ai) => ai.incompatibility.label))
  incompatibilityLabels: string[];

  @Exclude()
  deletedAt?: Date;
}
