import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { AnimalsService } from './animals.service';
import { JwtAuthGuard } from '../auth/auth.guard';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';
import { AnimalDto, CreateAnimalDto, UpdateAnimalDto } from './dto';
import { Species } from '@prisma/client';

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

  @Get('filtered')
  async getAllWithFilters(@Body() where: any): Promise<AnimalDto[]> {
    return await this.animalsService.findAllWithFilters(where);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles("SUPERADMIN")
  @Post()
  async create(@Body() body: CreateAnimalDto): Promise<AnimalDto> {
    return await this.animalsService.create(body);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles("SUPERADMIN")
  @Put(':id')
  async update(@Param('id') id: string, @Body() body: UpdateAnimalDto): Promise<AnimalDto> {
    return await this.animalsService.updateById(+id, body);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles("SUPERADMIN")
  @Delete(':id')
  async delete(@Param('id') id: string): Promise<void> {
    return await this.animalsService.deleteById(+id);
  }

  @Get(':id')
  async getById(@Param('id') id: string): Promise<AnimalDto> {
    return await this.animalsService.findByIdOrThrow(+id);
  }
}
