import { Injectable } from '@nestjs/common';
import { Role } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { RoleDto } from './roles.dto';
import { toDto } from 'src/utils/dto-transformer';

@Injectable()
export class RolesService {
  constructor(private readonly prisma: PrismaService) { }

  async create(data: { name: string }): Promise<RoleDto> {
    const role = await this.prisma.role.create({ data });
    return toDto(RoleDto, role);
  }
}
