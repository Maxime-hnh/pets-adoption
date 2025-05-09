import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { PublicAnimalDto } from '../animals/dto';
import { toDtos } from 'src/utils/dtos-transfomer';

@Injectable()
export class FavoritesService {

  constructor(
    private readonly prisma: PrismaService
  ) { }

  async create(userId: number, animalId: number): Promise<void> {
    await this.prisma.favorite.create({
      data: {
        user: { connect: { id: userId } },
        animal: { connect: { id: animalId } }
      }
    })
  };

  async removeLink(userId: number, animalId: number): Promise<void> {
    await this.prisma.favorite.delete({
      where: {
        userId_animalId: {
          userId,
          animalId
        }
      }
    })
  };

  async getFavoritesByUserId(userId: number): Promise<PublicAnimalDto[]> {
    const favorites = await this.prisma.favorite.findMany({
      where: {
        userId
      },
      include: {
        animal: true
      }
    })
    return toDtos(PublicAnimalDto, favorites.map(favorite => favorite.animal))
  }
}
