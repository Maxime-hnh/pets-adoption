import { AuditAction, AuditEntity } from '@prisma/client';
import { Exclude, Expose, Type } from 'class-transformer';
import { IsEnum, IsInt, IsNotEmpty, IsOptional, IsString, IsUUID } from 'class-validator';
import { UserDto } from 'src/modules/users/dto/user.dto';

export class AuditLogDto {
  @Expose()
  @IsInt()
  @IsNotEmpty()
  id: number;

  @Expose()
  @IsUUID()
  @IsNotEmpty()
  uid: string;

  @Expose()
  @IsEnum(AuditAction)
  action: AuditAction;

  @Expose()
  @IsEnum(AuditEntity)
  entity: AuditEntity;

  @Expose()
  @IsInt()
  @IsNotEmpty()
  entityId: number;

  @Expose()
  @IsString()
  @IsOptional()
  description?: string;

  @Expose()
  @Type(() => Date)
  performedAt: Date;

  @Expose()
  @IsInt()
  @IsOptional()
  performedById?: number;

  @Expose()
  @Type(() => UserDto)
  @IsOptional()
  performedBy?: UserDto;
}

export class CreateAuditLogDto {
  @IsEnum(AuditAction)
  @IsNotEmpty()
  action: AuditAction;

  @IsEnum(AuditEntity)
  @IsNotEmpty()
  entity: AuditEntity;

  @IsInt()
  @IsNotEmpty()
  entityId: number;

  @IsString()
  @IsOptional()
  description?: string;

  @IsInt()
  @IsOptional()
  performedById?: number;
}

export class UpdateAuditLogDto {
  @IsEnum(AuditAction)
  @IsOptional()
  action?: AuditAction;

  @IsEnum(AuditEntity)
  @IsOptional()
  entity?: AuditEntity;

  @IsInt()
  @IsOptional()
  entityId?: number;

  @IsString()
  @IsOptional()
  description?: string;

  @IsInt()
  @IsOptional()
  performedById?: number;
}
