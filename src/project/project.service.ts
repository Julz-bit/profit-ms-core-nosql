import { Injectable } from '@nestjs/common';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Project } from './interfaces/project.interface';

@Injectable()
export class ProjectService {
  constructor(@InjectModel('Project') private readonly projectModel: Model<Project>) { }

  async create(createProjectDto: CreateProjectDto): Promise<Project> {
    return await this.projectModel.create(createProjectDto);
  }

  async findAll(): Promise<Project[]> {
    return await this.projectModel.find();
  }

  async findOne(id: string): Promise<Project> {
    return await this.projectModel.findOne({ _id: id });
  }

  async update(id: string, updateProjectDto: UpdateProjectDto) {
    return await this.projectModel.findByIdAndUpdate(id, updateProjectDto, { new: true });
  }

  async remove(id: string) {
    return await this.projectModel.findByIdAndDelete(id);
  }
}
