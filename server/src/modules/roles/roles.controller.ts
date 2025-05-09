import { Body, Controller, Post } from '@nestjs/common';
import { RolesService } from './roles.service';
import { RoleDto } from './roles.dto';

@Controller('roles')
export class RolesController {
  constructor(private readonly rolesService: RolesService) { }

  @Post()
  async create(@Body() body: { name: string }): Promise<RoleDto | void> {
    return this.rolesService.create(body);
  }
}
