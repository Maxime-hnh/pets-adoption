import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class AnimalsService {

  constructor(
    private readonly prisma: PrismaService
  ) { }
}
