import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { AnimalDto, CreateAnimalDto, UpdateAnimalDto } from './dto';
import { Animal, Prisma, Species } from '@prisma/client';
import { plainToInstance } from 'class-transformer';
import { toDto } from 'src/utils/dto-transformer';
import { toDtos } from 'src/utils/dtos-transfomer';
import { AnimalsWithIncompatibility } from './animals.type';

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

    const { incompatibilityIds, ...animalData } = data;

    await this.prisma.animal.update({
      where: { id },
      data: animalData
    })

    if (incompatibilityIds) {
      const currentLinks = await this.prisma.animalIncompatibility.findMany({
        where: { animalId: id },
        select: { incompatibilityId: true }
      })
      const currentIds = currentLinks.map(link => link.incompatibilityId)
      const toDelete = currentIds.filter(id => !incompatibilityIds.includes(id));
      const toAdd = incompatibilityIds.filter(id => !currentIds.includes(id));

      if (toDelete.length > 0) {
        await this.prisma.animalIncompatibility.deleteMany({
          where: {
            animalId: id,
            incompatibilityId: { in: toDelete }
          }
        })
      };
      if (toAdd.length > 0) {
        await this.prisma.animalIncompatibility.createMany({
          data: toAdd.map(incompatibilityId => ({
            animalId: id,
            incompatibilityId
          }))
        })
      }
    };

    const updatedAnimal = await this.findById(id);
    return toDto(AnimalDto, updatedAnimal);
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

  async findByIdOrThrow(id: number): Promise<AnimalDto> {
    const animal = await this.prisma.animal.findUniqueOrThrow({
      where: { id },
      include: {
        animalIncompatibilities: {
          include: { incompatibility: true }
        }
      }
    });
    return toDto(AnimalDto, animal)
  };

  async findById(id: number): Promise<AnimalsWithIncompatibility | null> {
    return await this.prisma.animal.findUnique({
      where: { id },
      include: {
        animalIncompatibilities: {
          include: { incompatibility: true }
        }
      }
    })
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
