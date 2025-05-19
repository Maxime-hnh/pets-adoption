import { PartialType } from "@nestjs/mapped-types";
import { Expose } from "class-transformer";
import { IsInt, IsNotEmpty, IsOptional, IsString, IsUUID } from "class-validator";

export class IncompatibilitiesDto {

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
  @IsNotEmpty()
  label: string;

  @Expose()
  @IsOptional()
  createdAt: Date;

  @Expose()
  @IsOptional()
  updatedAt: Date;
}

export class ShortIncompatibilitiesDto {
  @Expose()
  @IsInt()
  @IsNotEmpty()
  id: number;

  @Expose()
  @IsString()
  @IsNotEmpty()
  label: string;
}

export class createIncompatibilitiesDto {
  @IsString()
  @IsNotEmpty()
  label: string;
}

export class updateIncompatibilitiesDto {
  @IsString()
  @IsNotEmpty()
  label: string;
}

export class PartialIncompatibilitiesDto extends PartialType(IncompatibilitiesDto) { }