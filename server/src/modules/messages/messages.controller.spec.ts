import { Test, TestingModule } from '@nestjs/testing';
import { MessagesController } from './messages.controller';
import { MessagesService } from './messages.service';
import { CreateMessageDto, UpdateStatusDto, UpdateNoteDto, DeleteManyDto } from './dto/message.dto';
import { MessageStatus } from '@prisma/client';
import { UserWithRole } from '../users/users.types';

describe('MessagesController', () => {
  let controller: MessagesController;
  let service: MessagesService;

  const mockService = {
    create: jest.fn(),
    updateStatus: jest.fn(),
    updateNote: jest.fn(),
    deleteById: jest.fn(),
    deleteMany: jest.fn(),
    findAll: jest.fn(),
    getMyMessages: jest.fn(),
    findByIdOrThrow: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MessagesController],
      providers: [
        {
          provide: MessagesService,
          useValue: mockService,
        },
      ],
    }).compile();

    controller = module.get<MessagesController>(MessagesController);
    service = module.get<MessagesService>(MessagesService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    it('should call messagesService.create', async () => {
      const dto: CreateMessageDto = {
        subject: 'Test',
        content: 'Test content',
        emailSender: 'test@example.com',
        nameSender: 'Tester',
      };
      const result = { ...dto, id: 1 };
      mockService.create.mockResolvedValue(result);

      expect(await controller.create(dto)).toEqual(result);
      expect(service.create).toHaveBeenCalledWith(dto);
    });
  });

  describe('updateStatus', () => {
    it('should call messagesService.updateStatus', async () => {
      const dto: UpdateStatusDto = { status: MessageStatus.OPENED };
      const admin: UserWithRole = { id: 1 } as UserWithRole;
      const result = { id: 1, status: MessageStatus.OPENED };
      mockService.updateStatus.mockResolvedValue(result);

      expect(await controller.updateStatus('1', dto, admin)).toEqual(result);
      expect(service.updateStatus).toHaveBeenCalledWith(1, dto.status, admin.id);
    });
  });

  describe('updateInternalNotes', () => {
    it('should call messagesService.updateNote', async () => {
      const dto: UpdateNoteDto = { internalNotes: 'Note' };
      const admin: UserWithRole = { id: 1 } as UserWithRole;
      const result = { id: 1, internalNotes: 'Note' };
      mockService.updateNote.mockResolvedValue(result);

      expect(await controller.updateInternalNotes('1', dto, admin)).toEqual(result);
      expect(service.updateNote).toHaveBeenCalledWith(1, dto.internalNotes, admin.id);
    });
  });

  describe('delete', () => {
    it('should call messagesService.deleteById', async () => {
      const admin: UserWithRole = { id: 1 } as UserWithRole;
      mockService.deleteById.mockResolvedValue(undefined);

      await controller.delete('1', admin);
      expect(service.deleteById).toHaveBeenCalledWith(1, admin.id);
    });
  });

  describe('deleteMany', () => {
    it('should call messagesService.deleteMany', async () => {
      const dto: DeleteManyDto = { ids: [1, 2, 3] };
      const admin: UserWithRole = { id: 1 } as UserWithRole;
      mockService.deleteMany.mockResolvedValue(undefined);

      await controller.deleteMany(dto, admin);
      expect(service.deleteMany).toHaveBeenCalledWith(dto.ids, admin.id);
    });
  });

  describe('getAll', () => {
    it('should call messagesService.findAll', async () => {
      const result = [{ id: 1 }, { id: 2 }];
      mockService.findAll.mockResolvedValue(result);

      expect(await controller.getAll()).toEqual(result);
      expect(service.findAll).toHaveBeenCalled();
    });
  });

  describe('getMyMessages', () => {
    it('should call messagesService.getMyMessages', async () => {
      const user: UserWithRole = { id: 1 } as UserWithRole;
      const result = [{ id: 1 }, { id: 2 }];
      mockService.getMyMessages.mockResolvedValue(result);

      expect(await controller.getMyMessages(user)).toEqual(result);
      expect(service.getMyMessages).toHaveBeenCalledWith(user.id);
    });
  });

  describe('getById', () => {
    it('should call messagesService.findByIdOrThrow', async () => {
      const result = { id: 1 };
      mockService.findByIdOrThrow.mockResolvedValue(result);

      expect(await controller.getById('1')).toEqual(result);
      expect(service.findByIdOrThrow).toHaveBeenCalledWith(1);
    });
  });
});
