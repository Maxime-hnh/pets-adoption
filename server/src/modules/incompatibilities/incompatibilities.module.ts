import { Module } from '@nestjs/common';
import { IncompatibilitiesService } from './incompatibilities.service';
import { IncompatibilitiesController } from './incompatibilities.controller';

@Module({
  providers: [IncompatibilitiesService],
  controllers: [IncompatibilitiesController]
})
export class IncompatibilitiesModule {}
