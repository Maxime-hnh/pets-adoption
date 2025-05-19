import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { ShortIncompatibilitiesDto } from './dto/incompatibilities.dto';
import { toDtos } from 'src/utils/dtos-transfomer';

@Injectable()
export class IncompatibilitiesService {
  constructor(private readonly prisma: PrismaService) { }


  async getAll() {
    const incompatibilities = await this.prisma.incompatibility.findMany();
    return toDtos(ShortIncompatibilitiesDto, incompatibilities)
  }
}
