import { Test, TestingModule } from '@nestjs/testing';
import { MessagesService } from './messages.service';
import { PrismaService } from '../prisma/prisma.service';
import { AuditLogsService } from '../audit-logs/audit-logs.service';
import { CreateMessageDto } from './dto/message.dto';
import { AuditAction, AuditEntity, MessageStatus } from '@prisma/client';



type MockPrismaService = {
  message: {
    create: jest.Mock;
    update: jest.Mock;
    delete: jest.Mock;
    deleteMany: jest.Mock;
    findUniqueOrThrow: jest.Mock;
    findMany: jest.Mock;
  };
  // Ajouter d'autres modèles si nécessaire (par ex: user, comment, etc.)
};

describe('MessagesService', () => {
  let service: MessagesService;
  let prismaService: MockPrismaService;
  let auditLogsService: jest.Mocked<AuditLogsService>;

  // Données de test mockées
  const mockMessageData = {
    id: 1,
    uid: 'test-uid-123',
    subject: 'Test Subject',
    content: 'Test Content',
    emailSender: 'test@example.com',
    nameSender: 'Test Sender',
    status: MessageStatus.RECEIVED,
    internalNotes: null,
    userId: 1,
    createdAt: new Date(),
    updatedAt: new Date(),
    deletedAt: null,
  };

  const mockMessageWithUser = {
    ...mockMessageData,
    user: {
      id: 1,
      uid: 'user-uid-123',
      email: 'user@example.com',
      firstName: 'John',
      lastName: 'Doe',
    },
  };

  const mockCreateMessageDto: CreateMessageDto = {
    subject: 'Test Subject',
    content: 'Test Content',
    emailSender: 'test@example.com',
    nameSender: 'Test Sender',
  };

  beforeEach(async () => {
    // Création des mocks
    const mockPrismaService = {
      message: {
        create: jest.fn(),
        update: jest.fn(),
        delete: jest.fn(),
        deleteMany: jest.fn(),
        findUniqueOrThrow: jest.fn(),
        findMany: jest.fn(),
      },
    };

    const mockAuditLogsService = {
      create: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        MessagesService,
        {
          provide: PrismaService,
          useValue: mockPrismaService,
        },
        {
          provide: AuditLogsService,
          useValue: mockAuditLogsService,
        },
      ],
    }).compile();

    service = module.get<MessagesService>(MessagesService);
    prismaService = module.get(PrismaService) as MockPrismaService;
    auditLogsService = module.get(AuditLogsService) as jest.Mocked<AuditLogsService>;
  });

  it('devrait être défini', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('devrait créer un nouveau message avec le statut RECEIVED par défaut', async () => {
      // Arrange
      prismaService.message.create.mockResolvedValue(mockMessageData);

      // Act
      const result = await service.create(mockCreateMessageDto);

      // Assert
      expect(prismaService.message.create).toHaveBeenCalledWith({
        data: { ...mockCreateMessageDto, status: MessageStatus.RECEIVED },
      });
      expect(result).toBeDefined();
      expect(result.status).toBe(MessageStatus.RECEIVED);
    });

    it('devrait gérer les erreurs lors de la création', async () => {
      // Arrange
      const error = new Error('Erreur de base de données');
      prismaService.message.create.mockRejectedValue(error);

      // Act & Assert
      await expect(service.create(mockCreateMessageDto)).rejects.toThrow('Erreur de base de données');
    });
  });

  describe('updateStatus', () => {
    it('devrait mettre à jour le statut du message et créer un log d\'audit', async () => {
      // Arrange
      const updatedMessage = { ...mockMessageData, status: MessageStatus.OPENED };
      prismaService.message.update.mockResolvedValue(updatedMessage);
      auditLogsService.create.mockResolvedValue(undefined);

      // Act
      const result = await service.updateStatus(1, MessageStatus.OPENED, 2);

      // Assert
      expect(prismaService.message.update).toHaveBeenCalledWith({
        where: { id: 1 },
        data: { status: MessageStatus.OPENED },
      });
      expect(auditLogsService.create).toHaveBeenCalledWith({
        action: AuditAction.UPDATE_STATUS_MESSAGE,
        entity: AuditEntity.MESSAGE,
        entityId: 1,
        description: 'Message 1 updated status',
        performedById: 2,
      });
      expect(result.status).toBe(MessageStatus.OPENED);
    });

    it('devrait gérer les erreurs lors de la mise à jour du statut', async () => {
      // Arrange
      const error = new Error('Message non trouvé');
      prismaService.message.update.mockRejectedValue(error);

      // Act & Assert
      await expect(service.updateStatus(999, MessageStatus.OPENED, 2)).rejects.toThrow('Message non trouvé');
    });
  });

  describe('updateNote', () => {
    it('devrait mettre à jour les notes internes du message et créer un log d\'audit', async () => {
      // Arrange
      const updatedMessage = { ...mockMessageData, internalNotes: 'Note mise à jour' };
      prismaService.message.update.mockResolvedValue(updatedMessage);
      auditLogsService.create.mockResolvedValue(undefined);

      // Act
      const result = await service.updateNote(1, 'Note mise à jour', 2);

      // Assert
      expect(prismaService.message.update).toHaveBeenCalledWith({
        where: { id: 1 },
        data: { internalNotes: 'Note mise à jour' },
      });
      expect(auditLogsService.create).toHaveBeenCalledWith({
        action: AuditAction.UPDATE_INTERNAL_NOTES_MESSAGE,
        entity: AuditEntity.MESSAGE,
        entityId: 1,
        description: 'Message 1 updated internal notes',
        performedById: 2,
      });
      expect(result.internalNotes).toBe('Note mise à jour');
    });

    it('devrait gérer les erreurs lors de la mise à jour des notes', async () => {
      // Arrange
      const error = new Error('Accès refusé');
      prismaService.message.update.mockRejectedValue(error);

      // Act & Assert
      await expect(service.updateNote(1, 'Note', 2)).rejects.toThrow('Accès refusé');
    });
  });

  describe('deleteById', () => {
    it('devrait supprimer un message par ID et créer un log d\'audit', async () => {
      // Arrange
      prismaService.message.delete.mockResolvedValue(mockMessageData);
      auditLogsService.create.mockResolvedValue(undefined);

      // Act
      await service.deleteById(1, 2);

      // Assert
      expect(prismaService.message.delete).toHaveBeenCalledWith({ where: { id: 1 } });
      expect(auditLogsService.create).toHaveBeenCalledWith({
        action: AuditAction.DELETE_MESSAGE,
        entity: AuditEntity.MESSAGE,
        entityId: 1,
        description: 'Message 1 deleted',
        performedById: 2,
      });
    });

    it('devrait gérer les erreurs lors de la suppression', async () => {
      // Arrange
      const error = new Error('Message non trouvé');
      prismaService.message.delete.mockRejectedValue(error);

      // Act & Assert
      await expect(service.deleteById(999, 2)).rejects.toThrow('Message non trouvé');
    });
  });

  describe('deleteMany', () => {
    it('devrait supprimer plusieurs messages et créer des logs d\'audit', async () => {
      // Arrange
      const idsToDelete = [1, 2, 3];
      prismaService.message.deleteMany.mockResolvedValue({ count: 3 });
      auditLogsService.create.mockResolvedValue(undefined);

      // Act
      await service.deleteMany(idsToDelete, 2);

      // Assert
      expect(prismaService.message.deleteMany).toHaveBeenCalledWith({
        where: {
          id: {
            in: idsToDelete,
          },
        },
      });
      expect(auditLogsService.create).toHaveBeenCalledTimes(3);
      idsToDelete.forEach((id) => {
        expect(auditLogsService.create).toHaveBeenCalledWith({
          action: AuditAction.DELETE_MESSAGE,
          entity: AuditEntity.MESSAGE,
          entityId: id,
          description: `Message ${id} deleted`,
          performedById: 2,
        });
      });
    });

    it('devrait gérer les erreurs lors de la suppression multiple', async () => {
      // Arrange
      const error = new Error('Erreur de contrainte');
      prismaService.message.deleteMany.mockRejectedValue(error);

      // Act & Assert
      await expect(service.deleteMany([1, 2], 2)).rejects.toThrow('Erreur de contrainte');
    });
  });

  describe('findByIdOrThrow', () => {
    it('devrait retourner un message avec l\'utilisateur associé', async () => {
      // Arrange
      prismaService.message.findUniqueOrThrow.mockResolvedValue(mockMessageWithUser);

      // Act
      const result = await service.findByIdOrThrow(1);

      // Assert
      expect(prismaService.message.findUniqueOrThrow).toHaveBeenCalledWith({
        where: { id: 1 },
        include: {
          user: true,
        },
      });
      expect(result).toBeDefined();
      expect(result.id).toBe(1);
      expect(result.subject).toBe('Test Subject');
    });

    it('devrait lever une erreur si le message n\'existe pas', async () => {
      // Arrange
      const error = new Error('Message non trouvé');
      prismaService.message.findUniqueOrThrow.mockRejectedValue(error);

      // Act & Assert
      await expect(service.findByIdOrThrow(999)).rejects.toThrow('Message non trouvé');
    });
  });

  describe('findAll', () => {
    it('devrait retourner tous les messages triés par date de création décroissante', async () => {
      // Arrange
      const mockMessages = [mockMessageWithUser, { ...mockMessageWithUser, id: 2 }];
      prismaService.message.findMany.mockResolvedValue(mockMessages);

      // Act
      const result = await service.findAll();

      // Assert
      expect(prismaService.message.findMany).toHaveBeenCalledWith({
        orderBy: { createdAt: 'desc' },
        include: {
          user: true,
        },
      });
      expect(result).toHaveLength(2);
      expect(result[0]).toBeDefined();
      expect(result[0].id).toBe(1);
    });

    it('devrait retourner un tableau vide s\'il n\'y a pas de messages', async () => {
      // Arrange
      prismaService.message.findMany.mockResolvedValue([]);

      // Act
      const result = await service.findAll();

      // Assert
      expect(result).toEqual([]);
    });

    it('devrait gérer les erreurs lors de la récupération', async () => {
      // Arrange
      const error = new Error('Erreur de connexion');
      prismaService.message.findMany.mockRejectedValue(error);

      // Act & Assert
      await expect(service.findAll()).rejects.toThrow('Erreur de connexion');
    });
  });

  describe('getMyMessages', () => {
    it('devrait retourner les messages d\'un utilisateur spécifique', async () => {
      // Arrange
      const mockUserMessages = [mockMessageData, { ...mockMessageData, id: 2 }];
      prismaService.message.findMany.mockResolvedValue(mockUserMessages);

      // Act
      const result = await service.getMyMessages(1);

      // Assert
      expect(prismaService.message.findMany).toHaveBeenCalledWith({
        where: { userId: 1 },
      });
      expect(result).toHaveLength(2);
      expect(result[0]).toBeDefined();
      expect(result[0].id).toBe(1);
    });

    it('devrait retourner un tableau vide si l\'utilisateur n\'a pas de messages', async () => {
      // Arrange
      prismaService.message.findMany.mockResolvedValue([]);

      // Act
      const result = await service.getMyMessages(999);

      // Assert
      expect(result).toEqual([]);
    });

    it('devrait gérer les erreurs lors de la récupération des messages utilisateur', async () => {
      // Arrange
      const error = new Error('Utilisateur non autorisé');
      prismaService.message.findMany.mockRejectedValue(error);

      // Act & Assert
      await expect(service.getMyMessages(1)).rejects.toThrow('Utilisateur non autorisé');
    });
  });
});
