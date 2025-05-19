import { Module } from '@nestjs/common';
import { IncompatibilitiesService } from './incompatibilities.service';
import { IncompatibilitiesController } from './incompatibilities.controller';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
    imports: [
      PrismaModule,
    ],
  providers: [IncompatibilitiesService],
  controllers: [IncompatibilitiesController],
  exports: [IncompatibilitiesService]
})
export class IncompatibilitiesModule {}
