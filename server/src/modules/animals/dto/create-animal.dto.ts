import { IsArray, IsBoolean, IsDate, IsEnum, IsOptional, IsString, MaxLength, MinLength } from 'class-validator';
import { Species, Gender, AnimalStatus, PlacementType } from '@prisma/client';
import { Type } from 'class-transformer';

export class CreateAnimalDto {
  @IsString()
  @MinLength(1)
  @MaxLength(100)
  name: string;

  @IsOptional()
  @IsString()
  icadNumber?: string;

  @IsBoolean()
  @IsOptional()
  isSterilized?: boolean = false;

  @IsEnum(Species)
  species: Species;

  @IsString()
  breed: string;

  @IsEnum(Gender)
  gender: Gender;

  @IsDate()
  @Type(() => Date)
  birthDate: Date;

  @IsString()
  @IsOptional()
  @MaxLength(2000)
  description?: string;

  @IsEnum(AnimalStatus)
  @IsOptional()
  status?: AnimalStatus = AnimalStatus.AVAILABLE;

  @IsEnum(PlacementType)
  @IsOptional()
  placementType?: PlacementType = PlacementType.STANDARD;

  @IsDate()
  @IsOptional()
  @Type(() => Date)
  adoptionDate?: Date;

  @IsString({ each: true })
  @IsOptional()
  photos?: string[] = [];

  @IsString()
  @IsOptional()
  @MaxLength(2000)
  internalNotes?: string;

  @IsBoolean()
  @IsOptional()
  isArchived?: boolean = false;

  @IsArray()
  @IsOptional()
  incompatibilityIds?: number[];
}
