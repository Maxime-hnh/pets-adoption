import { Controller, Delete, Get, Param, Post, UseGuards } from '@nestjs/common';
import { FavoritesService } from './favorites.service';
import { JwtAuthGuard } from '../auth/auth.guard';
import { CurrentUser } from '../auth/current-user.decorator';
import { User } from '@prisma/client';
import { PublicAnimalDto } from '../animals/dto';

@Controller('favorites')
export class FavoritesController {

  constructor(
    private readonly favoritesService: FavoritesService
  ) { }

  @UseGuards(JwtAuthGuard)
  @Post(':animalId')
  create(
    @Param('animalId') animalId: string,
    @CurrentUser() user: User
  ): Promise<void> {
    return this.favoritesService.create(user.id, +animalId);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':animalId')
  removeLink(
    @Param('animalId') animalId: string,
    @CurrentUser() user: User
  ): Promise<void> {
    return this.favoritesService.removeLink(user.id, +animalId);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  getFavoritesByUserId(
    @CurrentUser() user: User
  ): Promise<PublicAnimalDto[]> {
    return this.favoritesService.getFavoritesByUserId(user.id);
  }
}
