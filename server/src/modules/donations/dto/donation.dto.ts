import { Currency, DonationStatus } from '@prisma/client';
import { Exclude, Expose, Type } from 'class-transformer';
import { IsEmail, IsEnum, IsInt, IsNotEmpty, IsOptional, IsString, IsUUID } from 'class-validator';
import { UserDto } from 'src/modules/users/dto/user.dto';

export class DonationDto {
  @Expose()
  @IsInt()
  @IsNotEmpty()
  id: number;

  @Expose()
  @IsUUID()
  @IsNotEmpty()
  uid: string;

  @Expose()
  @IsInt()
  @IsNotEmpty()
  amount: number;

  @Expose()
  @IsEnum(Currency)
  currency: Currency;

  @Expose()
  @IsEmail()
  @IsNotEmpty()
  donorEmail: string;

  @Expose()
  @IsString()
  @IsOptional()
  donorName?: string;

  @Expose()
  @IsString()
  @IsOptional()
  message?: string;

  @Expose()
  @IsEnum(DonationStatus)
  status: DonationStatus;

  @Expose()
  @IsInt()
  @IsOptional()
  userId?: number;

  @Expose()
  @Type(() => UserDto)
  @IsOptional()
  user?: UserDto;

  @Expose()
  @Type(() => Date)
  createdAt: Date;

  @Expose()
  @Type(() => Date)
  updatedAt: Date;
}

export class CreateDonationDto {
  @IsInt()
  @IsNotEmpty()
  amount: number;

  @IsEnum(Currency)
  @IsOptional()
  currency?: Currency;

  @IsEmail()
  @IsNotEmpty()
  donorEmail: string;

  @IsString()
  @IsOptional()
  donorName?: string;

  @IsString()
  @IsOptional()
  message?: string;

  @IsEnum(DonationStatus)
  @IsOptional()
  status?: DonationStatus;

  @IsInt()
  @IsOptional()
  userId?: number;
}

export class UpdateDonationDto {
  @IsInt()
  @IsOptional()
  amount?: number;

  @IsEnum(Currency)
  @IsOptional()
  currency?: Currency;

  @IsEmail()
  @IsOptional()
  donorEmail?: string;

  @IsString()
  @IsOptional()
  donorName?: string;

  @IsString()
  @IsOptional()
  message?: string;

  @IsEnum(DonationStatus)
  @IsOptional()
  status?: DonationStatus;

  @IsInt()
  @IsOptional()
  userId?: number;
}

