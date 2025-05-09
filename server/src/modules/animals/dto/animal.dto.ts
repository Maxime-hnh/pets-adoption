import { Species, Gender, AnimalStatus, PlacementType } from '@prisma/client';
import { Exclude, Expose, Type } from 'class-transformer';
import { IsString, IsNotEmpty, IsOptional, IsBoolean, IsEnum, IsDate, IsInt, IsUUID } from 'class-validator';

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

  @Exclude()
  deletedAt?: Date;
}
