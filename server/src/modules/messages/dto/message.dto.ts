import { MessageStatus } from '@prisma/client';
import { Expose, Type } from 'class-transformer';
import { IsArray, ArrayNotEmpty, IsEmail, IsEnum, IsInt, IsNotEmpty, IsOptional, IsString, IsUUID } from 'class-validator';
import { UserDto } from 'src/modules/users/dto/user.dto';

export class MessageDto {
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
  subject: string;

  @Expose()
  @IsString()
  @IsNotEmpty()
  content: string;

  @Expose()
  @IsEmail()
  @IsNotEmpty()
  emailSender: string;

  @Expose()
  @IsString()
  @IsNotEmpty()
  nameSender: string;

  @Expose()
  @IsEnum(MessageStatus)
  status: MessageStatus;

  @Expose()
  @IsString()
  @IsOptional()
  internalNotes?: string;

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

  @Expose()
  @Type(() => Date)
  @IsOptional()
  deletedAt?: Date;
}

export class CreateMessageDto {
  @IsString()
  @IsNotEmpty()
  subject: string;

  @IsString()
  @IsNotEmpty()
  content: string;

  @IsEmail()
  @IsNotEmpty()
  emailSender: string;

  @IsString()
  @IsNotEmpty()
  nameSender: string;

  @IsEnum(MessageStatus)
  @IsOptional()
  status?: MessageStatus;

  @IsString()
  @IsOptional()
  internalNotes?: string;

  @IsInt()
  @IsOptional()
  userId?: number;
}

export class UpdateMessageDto {
  @IsString()
  @IsOptional()
  subject?: string;

  @IsString()
  @IsOptional()
  content?: string;

  @IsEmail()
  @IsOptional()
  emailSender?: string;

  @IsString()
  @IsOptional()
  nameSender?: string;

  @IsEnum(MessageStatus)
  @IsOptional()
  status?: MessageStatus;

  @IsString()
  @IsOptional()
  internalNotes?: string;

  @IsInt()
  @IsOptional()
  userId?: number;
}

export class UpdateStatusDto {
  @IsEnum(MessageStatus)
  status: MessageStatus;
}

export class UpdateNoteDto {
  @IsString()
  internalNotes: string;
}