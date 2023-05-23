import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ScopeService } from './scope.service';
import { CreateScopeDto } from './dto/create-scope.dto';
import { UpdateScopeDto } from './dto/update-scope.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Scope CORE API')
@Controller('scope')
export class ScopeController {
  constructor(private readonly scopeService: ScopeService) { }

  @Post()
  async create(@Body() createScopeDto: CreateScopeDto) {
    return await this.scopeService.create(createScopeDto);
  }

  @Get('/collection/:id')
  async findAll(@Param('id') id: string) {
    return await this.scopeService.findAll(id);
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.scopeService.findOne(id);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateScopeDto: UpdateScopeDto) {
    return await this.scopeService.update(id, updateScopeDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.scopeService.remove(id);
  }
}
