import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { AnimalDto, CreateAnimalDto, UpdateAnimalDto } from './dto';
import { Animal, Prisma, Species } from '@prisma/client';
import { plainToInstance } from 'class-transformer';
import { toDto } from 'src/utils/dto-transformer';
import { toDtos } from 'src/utils/dtos-transfomer';

@Injectable()
export class AnimalsService {

  constructor(
    private readonly prisma: PrismaService
  ) { }

  async create(data: CreateAnimalDto): Promise<AnimalDto> {
    const animal = await this.prisma.animal.create({ data })
    return toDto(AnimalDto, animal);
  };

  async updateById(id: number, data: UpdateAnimalDto): Promise<AnimalDto> {
    const animal = await this.prisma.animal.update({
      where: { id },
      data
    })
    return toDto(AnimalDto, animal);
  };

  async deleteById(id: number): Promise<void> {
    await this.prisma.animal.delete({ where: { id } })
  };

  async deleteMany(ids: number[]): Promise<void> {
    await this.prisma.animal.deleteMany({
      where: {
        id: {
          in: ids
        }
      }
    })
  };

  async findById(id: number): Promise<AnimalDto> {
    const animal = await this.prisma.animal.findUniqueOrThrow({
      where: { id },
      include: { animalIncompatibilities: true }
    })
    return toDto(AnimalDto, animal);
  };

  async findAll(): Promise<AnimalDto[]> {
    const animals = await this.prisma.animal.findMany();
    return toDtos(AnimalDto, animals)
  };

  async findAllBySpecies(species: Species): Promise<AnimalDto[]> {
    const animals = await this.prisma.animal.findMany({
      where: { species }
    })
    return toDtos(AnimalDto, animals)

  }

  async findAllWithFilters(where: Prisma.AnimalWhereInput): Promise<AnimalDto[]> {
    const animals = await this.prisma.animal.findMany({ where });
    return toDtos(AnimalDto, animals)
  };
}
