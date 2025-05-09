import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateAuditLogDto } from './dto/audit-log.dto';

@Injectable()
export class AuditLogsService {
  constructor(private readonly prisma: PrismaService) { }

  async create(data: CreateAuditLogDto): Promise<void> {
    await this.prisma.auditLog.create({ data })
  }
}
