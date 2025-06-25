import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { AnimalsService } from './animals.service';
import { JwtAuthGuard } from '../auth/security-road/auth.guard';
import { RolesGuard } from '../auth/security-road/roles.guard';
import { Roles } from '../auth/decorator/roles.decorator';
import { AnimalDto, CreateAnimalDto, UpdateAnimalDto } from './dto';
import { Prisma, Species } from '@prisma/client';
import { UserWithRole } from '../users/users.types';
import { CurrentUser } from '../auth/decorator/current-user.decorator';

@Controller('animals')
export class AnimalsController {

  constructor(private readonly animalsService: AnimalsService) {
  }

  @Get('/species/dogs')
  async getDogs(): Promise<AnimalDto[]> {
    return await this.animalsService.findAllBySpecies(Species.DOG);
  }

  @Get('/species/cats')
  async getCats(): Promise<AnimalDto[]> {
    return await this.animalsService.findAllBySpecies(Species.CAT);
  }

  @Get('/species/others')
  async getOthers(): Promise<AnimalDto[]> {
    return await this.animalsService.findAllBySpecies(Species.OTHER);
  }


  @Get('all')
  async getAll(): Promise<AnimalDto[]> {
    return await this.animalsService.findAll();
  }

  @Post('filtered')
  async getAllWithFilters(@Body() params: Prisma.AnimalFindManyArgs): Promise<AnimalDto[]> {
    return await this.animalsService.findAllWithFilters(params);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles("SUPERADMIN")
  @Post()
  async create(
    @Body() body: CreateAnimalDto,
    @CurrentUser() admin: UserWithRole
  ): Promise<AnimalDto> {
    return await this.animalsService.create(body, admin.id);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles("SUPERADMIN")
  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() body: UpdateAnimalDto,
    @CurrentUser() admin: UserWithRole
  ): Promise<AnimalDto> {
    return await this.animalsService.updateById(+id, body, admin.id);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles("SUPERADMIN")
  @Delete(':id')
  async delete(
    @Param('id') id: string,
    @CurrentUser() admin: UserWithRole
  ): Promise<void> {
    return await this.animalsService.deleteById(+id, admin.id);
  }

  @Get(':id')
  async getById(@Param('id') id: string): Promise<AnimalDto> {
    return await this.animalsService.findByIdOrThrow(+id);
  }
}
