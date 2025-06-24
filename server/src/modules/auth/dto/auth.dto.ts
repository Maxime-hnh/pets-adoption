import { Expose } from "class-transformer";
import { IsEmail, IsInt, IsNotEmpty, IsString } from "class-validator";


export class FullAuthDto {
  @Expose()
  @IsInt()
  @IsNotEmpty()
  id: number;

  @Expose()
  @IsEmail()
  email: string;

  @Expose()
  @IsString()
  @IsNotEmpty()
  role: string;

  @Expose()
  @IsString()
  @IsNotEmpty()
  accessToken: string;

  @Expose()
  @IsString()
  @IsNotEmpty()
  refreshToken: string;
}


export class ShortAuthDto {
  @Expose()
  @IsInt()
  @IsNotEmpty()
  id: number;

  @Expose()
  @IsEmail()
  email: string;

  @Expose()
  @IsString()
  @IsNotEmpty()
  role: string;
}

export class PayloadDto {

  @Expose()
  @IsInt()
  @IsNotEmpty()
  id: number;

  @Expose()
  @IsEmail()
  email: string;

  @Expose()
  @IsString()
  @IsNotEmpty()
  role: string;

  @Expose()
  @IsInt()
  @IsNotEmpty()
  iat: number;

  @Expose()
  @IsInt()
  @IsNotEmpty()
  exp: number;
};
