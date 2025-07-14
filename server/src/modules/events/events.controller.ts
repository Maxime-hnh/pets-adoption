import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { EventsService } from './events.service';
import { CreateEventDto, EventDto, UpdateEventDto } from './dto/event.dto';
import { JwtAuthGuard } from '../auth/security-road/auth.guard';
import { RolesGuard } from '../auth/security-road/roles.guard';
import { Roles } from '../auth/decorator/roles.decorator';
import { CurrentUser } from '../auth/decorator/current-user.decorator';
import { UserWithRole } from '../users/users.types';
import { DeleteManyDto } from 'src/common/dto/delete-many.dto';

@Controller('events')
export class EventsController {

  constructor(private readonly eventsService: EventsService) { }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('SUPERADMIN')
  @Post()
  async create(@Body() body: CreateEventDto, @CurrentUser() user: UserWithRole) {
    return await this.eventsService.create(body, user.id)
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('SUPERADMIN')
  @Put(':id')
  async updateById(
    @Param('id') id: string,
    @Body() body: UpdateEventDto,
    @CurrentUser() user: UserWithRole
  ) {
    return await this.eventsService.updateById(+id, body, user.id)
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('SUPERADMIN')
  @Delete('unique/:id')
  async deleteById(
    @Param('id') id: string,
    @CurrentUser() user: UserWithRole
  ) {
    return await this.eventsService.deleteById(+id, user.id)
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('SUPERADMIN')
  @Delete('many')
  async deleteMany(
    @Body() dto: DeleteManyDto,
    @CurrentUser() admin: UserWithRole
  ): Promise<void> {
    return await this.eventsService.deleteMany(dto.ids, admin.id)
  }

  @Get('all')
  async findAll(): Promise<EventDto[]> {
    return await this.eventsService.findAll();
  }

  @Get(':id')
  async findById(@Param('id') id: string): Promise<EventDto> {
    return await this.eventsService.findByIdOrThrow(+id);
  }
}
