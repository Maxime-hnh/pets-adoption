import { Module } from '@nestjs/common';
import { AnimalsService } from './animals.service';
import { AnimalsController } from './animals.controller';
import { PrismaModule } from '../prisma/prisma.module';
import { AuditLogsModule } from '../audit-logs/audit-logs.module';

@Module({
  imports: [
    PrismaModule,
    AuditLogsModule
  ],
  providers: [AnimalsService],
  controllers: [AnimalsController],
  exports: [AnimalsService]
})
export class AnimalsModule { }
