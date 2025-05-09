import { Module } from '@nestjs/common';
import { AnimalsService } from './animals.service';
import { AnimalsController } from './animals.controller';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [
    PrismaModule
  ],
  providers: [AnimalsService],
  controllers: [AnimalsController],
  exports: [AnimalsService]
})
export class AnimalsModule { }
