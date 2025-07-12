import { Body, Controller, Delete, Get, Param, Patch, Post, Req, UseGuards } from '@nestjs/common';
import { MessagesService } from './messages.service';
import { JwtAuthGuard } from '../auth/security-road/auth.guard';
import { RolesGuard } from '../auth/security-road/roles.guard';
import { CreateMessageDto, DeleteManyDto, MessageDto, UpdateNoteDto, UpdateStatusDto } from './dto/message.dto';
import { CurrentUser } from '../auth/decorator/current-user.decorator';
import { UserWithRole } from '../users/users.types';
import { Roles } from '../auth/decorator/roles.decorator';

@Controller('messages')
export class MessagesController {

  constructor(
    private readonly messagesService: MessagesService
  ) { }


  @Post()
  async create(@Body() body: CreateMessageDto): Promise<MessageDto> {
    return await this.messagesService.create(body)
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('SUPERADMIN')
  @Patch('status/:id')
  async updateStatus(
    @Param('id') id: string,
    @Body() dto: UpdateStatusDto,
    @CurrentUser() admin: UserWithRole
  ): Promise<MessageDto> {
    return await this.messagesService.updateStatus(+id, dto.status, admin.id)
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('SUPERADMIN')
  @Patch('note/:id')
  async updateInternalNotes(
    @Param('id') id: string,
    @Body() dto: UpdateNoteDto,
    @CurrentUser() admin: UserWithRole
  ): Promise<MessageDto> {
    return await this.messagesService.updateNote(+id, dto.internalNotes, admin.id)
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('SUPERADMIN')
  @Delete('unique/:id')
  async delete(
    @Param('id') id: string,
    @CurrentUser() admin: UserWithRole
  ): Promise<void> {
    return await this.messagesService.deleteById(+id, admin.id)
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('SUPERADMIN')
  @Delete('many')
  async deleteMany(
    @Body() dto: DeleteManyDto,
    @CurrentUser() admin: UserWithRole
  ): Promise<void> {
    return await this.messagesService.deleteMany(dto.ids, admin.id)
  }

  @Get('all')
  async getAll(): Promise<MessageDto[]> {
    return await this.messagesService.findAll()
  }

  @UseGuards(JwtAuthGuard)
  @Get('mine')
  async getMyMessages(
    @CurrentUser() user: UserWithRole
  ): Promise<MessageDto[]> {
    return await this.messagesService.getMyMessages(user.id)
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('SUPERADMIN')
  @Get(':id')
  async getById(@Param('id') id: string): Promise<MessageDto> {
    return await this.messagesService.findByIdOrThrow(+id);
  }

}
