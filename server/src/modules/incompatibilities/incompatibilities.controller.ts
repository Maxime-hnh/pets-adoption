import { Controller, Get } from '@nestjs/common';
import { IncompatibilitiesService } from './incompatibilities.service';
import { ShortIncompatibilitiesDto } from './dto/incompatibilities.dto';

@Controller('incompatibilities')
export class IncompatibilitiesController {
  constructor(private readonly incompatibilitiesService: IncompatibilitiesService) { }


  @Get('/all')
  async getAll(): Promise<ShortIncompatibilitiesDto[]> {
    return this.incompatibilitiesService.getAll();
  }

}
