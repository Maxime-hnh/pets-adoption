import { Injectable } from '@nestjs/common';
import { CreateEventDto, EventDto, GetAllEventsQueryDto, UpdateEventDto } from './dto/event.dto';
import { PrismaService } from '../prisma/prisma.service';
import { toDto } from 'src/utils/dto-transformer';
import { toDtos } from 'src/utils/dtos-transfomer';
import { AuditLogsService } from '../audit-logs/audit-logs.service';
import { AuditAction, AuditEntity, EventType } from '@prisma/client';

@Injectable()
export class EventsService {

  constructor(
    private readonly prisma: PrismaService,
    private readonly auditLogsService: AuditLogsService
  ) { }


  async create(data: CreateEventDto, userId: number): Promise<EventDto> {
    const event = await this.prisma.event.create({
      data,
    });
    await this.auditLogsService.create({
      action: AuditAction.CREATE_EVENT,
      entity: AuditEntity.EVENT,
      entityId: event.id,
      description: `Event ${event.id} created`,
      performedById: userId
    })
    return toDto(EventDto, event);
  }

  async updateById(id: number, data: UpdateEventDto, userId: number): Promise<EventDto> {
    const event = await this.prisma.event.update({
      where: { id },
      data,
    });
    await this.auditLogsService.create({
      action: AuditAction.UPDATE_EVENT,
      entity: AuditEntity.EVENT,
      entityId: event.id,
      description: `Event ${event.id} updated`,
      performedById: userId
    })
    return toDto(EventDto, event);
  }

  async deleteById(id: number, userId: number): Promise<void> {
    await this.prisma.event.delete({
      where: { id },
    });
    await this.auditLogsService.create({
      action: AuditAction.UPDATE_EVENT,
      entity: AuditEntity.EVENT,
      entityId: id,
      description: `Event ${id} deleted`,
      performedById: userId
    })
  }

  async deleteMany(ids: number[], userId: number): Promise<void> {
    await this.prisma.event.deleteMany({
      where: { id: { in: ids } },
    });
    ids.forEach(id => {
      this.auditLogsService.create({
        action: AuditAction.DELETE_MESSAGE,
        entity: AuditEntity.MESSAGE,
        entityId: id,
        description: `Message ${id} deleted`,
        performedById: userId
      })
    })
  }

  async findAll(query: GetAllEventsQueryDto): Promise<EventDto[]> {

    const events = await this.prisma.event.findMany({
      where: {
        ...(query.type && { type: { in: query.type } }),
        title: {
          contains: query.title,
          mode: 'insensitive'
        },
        city: query.city,
        price: query.price
      },
      orderBy: { createdAt: 'desc' },
      take: query.take
    });
    return toDtos(EventDto, events);
  }

  async findById(id: number): Promise<EventDto> {
    const event = await this.prisma.event.findUnique({
      where: { id },
    });
    return toDto(EventDto, event);
  }

  async findByIdOrThrow(id: number): Promise<EventDto> {
    const event = await this.prisma.event.findUniqueOrThrow({
      where: { id },
    });
    return toDto(EventDto, event);
  }

}
