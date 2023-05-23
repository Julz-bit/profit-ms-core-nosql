import { Injectable } from '@nestjs/common';
import { CreateScopeDto } from './dto/create-scope.dto';
import { UpdateScopeDto } from './dto/update-scope.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Scope } from './interfaces/scope.interface';

@Injectable()
export class ScopeService {
  constructor(@InjectModel('Scope') private readonly scopeModel: Model<Scope>) { }

  async create(createScopeDto: CreateScopeDto): Promise<object> {
    let success = 0;
    let failed = 0;

    for (const scope of createScopeDto.scopes) {
      scope['startDate'] = new Date(scope['startDate']);
      scope['endDate'] = new Date(scope['endDate']);
      scope['projectId'] = createScopeDto.projectId;
      try {
        await this.scopeModel.create(scope);
        success += 1;
      } catch (err) {
        failed += 1;
        console.log(err);
      }
    }

    return { success: success, failed: failed };
  }

  async findAll(id: string): Promise<Scope[]> {
    return await this.scopeModel.find({ projectId: id });
  }

  async findOne(id: string): Promise<Scope> {
    return await this.scopeModel.findOne({ _id: id });
  }

  async update(id: string, updateScopeDto: UpdateScopeDto): Promise<Scope> {
    updateScopeDto['startDate'] = new Date(updateScopeDto['startDate']);
    updateScopeDto['endDate'] = new Date(updateScopeDto['endDate']);
    return await this.scopeModel.findByIdAndUpdate(id, updateScopeDto, { new: true });
  }

  async remove(id: string): Promise<Scope> {
    return await this.scopeModel.findByIdAndRemove(id);
  }
}
