import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateMessageDto, MessageDto } from './dto/message.dto';
import { AuditAction, AuditEntity, MessageStatus } from '@prisma/client';
import { toDto } from 'src/utils/dto-transformer';
import { AuditLogsService } from '../audit-logs/audit-logs.service';
import { toDtos } from 'src/utils/dtos-transfomer';

@Injectable()
export class MessagesService {

  constructor(
    private readonly prisma: PrismaService,
    private readonly auditLogsService: AuditLogsService
  ) { }

  async create(data: CreateMessageDto): Promise<MessageDto> {
    const dataToSave = { ...data, status: MessageStatus.RECEIVED }
    const message = await this.prisma.message.create({ data: dataToSave });
    return toDto(MessageDto, message)
  }

  async updateStatus(id: number, status: MessageStatus, adminId: number): Promise<MessageDto> {
    const updatedMessage = await this.prisma.message.update({
      where: { id },
      data: { status }
    })
    await this.auditLogsService.create({
      action: AuditAction.UPDATE_STATUS_MESSAGE,
      entity: AuditEntity.MESSAGE,
      entityId: id,
      description: `Message ${id} updated status`,
      performedById: adminId
    })
    return toDto(MessageDto, updatedMessage)
  }

  async updateNote(id: number, internalNotes: string, adminId: number): Promise<MessageDto> {
    const updatedMessage = await this.prisma.message.update({
      where: { id },
      data: { internalNotes }
    })
    await this.auditLogsService.create({
      action: AuditAction.UPDATE_INTERNAL_NOTES_MESSAGE,
      entity: AuditEntity.MESSAGE,
      entityId: id,
      description: `Message ${id} updated internal notes`,
      performedById: adminId
    })
    return toDto(MessageDto, updatedMessage)
  }

  async deleteById(id: number, userId: number): Promise<void> {
    await this.prisma.message.delete({ where: { id } })
    await this.auditLogsService.create({
      action: AuditAction.DELETE_MESSAGE,
      entity: AuditEntity.MESSAGE,
      entityId: id,
      description: `Message ${id} deleted`,
      performedById: userId
    })
  };

  async deleteMany(ids: number[], userId: number): Promise<void> {
    await this.prisma.message.deleteMany({
      where: {
        id: {
          in: ids
        }
      }
    })
    ids.forEach(id => {
      this.auditLogsService.create({
        action: AuditAction.DELETE_MESSAGE,
        entity: AuditEntity.MESSAGE,
        entityId: id,
        description: `Message ${id} deleted`,
        performedById: userId
      })
    })
  };

  async findByIdOrThrow(id: number): Promise<MessageDto> {
    const message = await this.prisma.message.findUniqueOrThrow({
      where: { id },
      include: {
        user: true
      }
    });
    return toDto(MessageDto, message)
  };

  async findAll(): Promise<MessageDto[]> {
    const messages = await this.prisma.message.findMany(
      {
        orderBy: { createdAt: 'desc' },
        include: {
          user: true
        }
      });
    return toDtos(MessageDto, messages)
  };

  async getMyMessages(userId: number): Promise<MessageDto[]> {
    const messages = await this.prisma.message.findMany({
      where: { userId }
    })
    return toDtos(MessageDto, messages)
  }
}
