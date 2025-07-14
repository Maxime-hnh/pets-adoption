import * as request from 'supertest';
import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import { AppModule } from './../src/app.module';
import { JwtService } from '@nestjs/jwt';
import * as cookieParser from 'cookie-parser';
import { PrismaExceptionFilter } from '../src/common/filters/prisma-exception.filter';

describe('MessagesController (e2e)', () => {
  let app: INestApplication;
  let jwtService: JwtService;
  let accessToken: string;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(new ValidationPipe({ whitelist: true }));
    app.useGlobalFilters(new PrismaExceptionFilter());
    app.use(cookieParser());

    await app.init();

    jwtService = moduleFixture.get<JwtService>(JwtService);

    // ⚡ Générer un token simulé
    accessToken = jwtService.sign({
      id: 1,
      email: 'admin@example.com',
      role: 'SUPERADMIN',
    },
      {
        secret: process.env.JWT_SECRET,
        expiresIn: process.env.JWT_EXPIRES_IN,
      });
  });


  afterAll(async () => {
    await app.close();
  });

  describe('/messages (POST)', () => {
    it('should fail when body is invalid', async () => {
      const invalidBody = {
        subject: '',
        content: '',
        emailSender: 'invalid-email',
        nameSender: '',
      };

      const res = await request(app.getHttpServer()).post('/messages').send(invalidBody);
      expect(res.status).toBe(400);
    });

    it('should create a message when body is valid', async () => {
      const validBody = {
        subject: 'Test Subject',
        content: 'Test Content',
        emailSender: 'test@example.com',
        nameSender: 'Tester',
      };

      const res = await request(app.getHttpServer()).post('/messages').send(validBody);
      expect(res.status).toBe(201);
      expect(res.body).toHaveProperty('id');
      expect(res.body.subject).toBe(validBody.subject);
    });
  });

  describe('/messages/all (GET)', () => {
    it('should return an array of messages', async () => {
      const res = await request(app.getHttpServer()).get('/messages/all');
      expect(res.status).toBe(200);
      expect(Array.isArray(res.body)).toBe(true);
    });
  });

  describe('/messages/status/:id (PATCH)', () => {
    it('should update status with valid token', async () => {
      const updateStatusDto = { status: 'OPENED' };

      // Créer un message d'abord
      const createRes = await request(app.getHttpServer())
        .post('/messages')
        .send({
          subject: 'To Update',
          content: 'Content',
          emailSender: 'test@example.com',
          nameSender: 'Tester',
        });

      const messageId = createRes.body.id;

      const res = await request(app.getHttpServer())
        .patch(`/messages/status/${messageId}`)
        .set('Cookie', `accessToken=${accessToken}`)
        .send(updateStatusDto);

      expect(res.status).toBe(200);
      expect(res.body.status).toBe('OPENED');
    });
  });

  describe('/messages/note/:id (PATCH)', () => {
    it('should update internal notes with valid token', async () => {
      const updateNoteDto = { internalNotes: 'New internal note' };

      const createRes = await request(app.getHttpServer())
        .post('/messages')
        .send({
          subject: 'To Note',
          content: 'Content',
          emailSender: 'test@example.com',
          nameSender: 'Tester',
        });

      const messageId = createRes.body.id;

      const res = await request(app.getHttpServer())
        .patch(`/messages/note/${messageId}`)
        .set('Cookie', `accessToken=${accessToken}`)
        .send(updateNoteDto);

      expect(res.status).toBe(200);
      expect(res.body.internalNotes).toBe('New internal note');
    });
  });

  describe('/messages/unique/:id (DELETE)', () => {
    it('should delete a message with valid token', async () => {
      const createRes = await request(app.getHttpServer())
        .post('/messages')
        .send({
          subject: 'To Delete',
          content: 'Content',
          emailSender: 'test@example.com',
          nameSender: 'Tester',
        });

      const messageId = createRes.body.id;

      const res = await request(app.getHttpServer())
        .delete(`/messages/unique/${messageId}`)
        .set('Cookie', `accessToken=${accessToken}`);

      expect(res.status).toBe(200);
    });
  });

  describe('/messages/many (DELETE)', () => {
    it('should delete many messages with valid token', async () => {
      const createRes1 = await request(app.getHttpServer())
        .post('/messages')
        .send({
          subject: 'Batch 1',
          content: 'Content',
          emailSender: 'test@example.com',
          nameSender: 'Tester',
        });

      const createRes2 = await request(app.getHttpServer())
        .post('/messages')
        .send({
          subject: 'Batch 2',
          content: 'Content',
          emailSender: 'test@example.com',
          nameSender: 'Tester',
        });

      const ids = [createRes1.body.id, createRes2.body.id];

      const res = await request(app.getHttpServer())
        .delete('/messages/many')
        .set('Cookie', `accessToken=${accessToken}`)
        .send({ ids });

      expect(res.status).toBe(200);
    });
  });

  describe('/messages/:id (GET)', () => {
    it('should return a message by id with valid token', async () => {
      const createRes = await request(app.getHttpServer())
        .post('/messages')
        .send({
          subject: 'To Get',
          content: 'Content',
          emailSender: 'test@example.com',
          nameSender: 'Tester',
        });

      const messageId = createRes.body.id;

      const res = await request(app.getHttpServer())
        .get(`/messages/${messageId}`)
        .set('Cookie', `accessToken=${accessToken}`);

      expect(res.status).toBe(200);
      expect(res.body.id).toBe(messageId);
    });

    it('should return 404 when message not found', async () => {
      const res = await request(app.getHttpServer())
        .get('/messages/999999')
        .set('Cookie', `accessToken=${accessToken}`);

      expect(res.status).toBe(404);
    });
  });

  describe('/messages/mine (GET)', () => {
    it('should return my messages with valid token', async () => {
      const res = await request(app.getHttpServer())
        .get('/messages/mine')
        .set('Cookie', `accessToken=${accessToken}`);

      expect(res.status).toBe(200);
      expect(Array.isArray(res.body)).toBe(true);
    });
  });
});
