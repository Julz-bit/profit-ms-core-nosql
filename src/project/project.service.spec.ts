import { ProjectService } from './project.service';
import { Model } from 'mongoose';
import { Project } from './interfaces/project.interface';
import { Test, TestingModule } from '@nestjs/testing';
import { getModelToken } from '@nestjs/mongoose';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';


describe('ProjectService', () => {
  let projectService: ProjectService;
  let projectModel: Model<Project>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProjectService,
        {
          provide: getModelToken('Project'),
          useValue: {
            find: jest.fn(),
            findOne: jest.fn(),
            findByIdAndUpdate: jest.fn(),
            findByIdAndDelete: jest.fn(),
            create: jest.fn(),
          }
        }],
    }).compile();

    projectModel = module.get<Model<Project>>(getModelToken("Project"))
    projectService = module.get<ProjectService>(ProjectService);
  });

  //create function
  describe('create', () => {
    it('should create a new project', async () => {
      //data transfer object
      const createProjectDto: CreateProjectDto = {
        name: 'Project 1',
        description: 'Project 1 Description',
      };

      const currentDate = new Date();

      const expectedResult: Project = {
        _id: '1',
        name: 'Project 1',
        description: 'Project description',
        archieveAt: null,
        createdAt: currentDate,
        updatedAt: currentDate
      }

      // projectModel.create.mockReturnValue(expectedResult);
      const saveSpy = jest.spyOn(projectModel, 'create').mockResolvedValue(expectedResult as any)

      const result = await projectService.create(createProjectDto);

      expect(result).toEqual(expectedResult);
      expect(saveSpy).toHaveBeenCalledTimes(1);
    });
  });

  //findAll function
  describe('findAll', () => {
    it('should return an array of projects', async () => {
      // Mock the return value of the find method
      const currentDate = new Date();
      const expectedResult: Project[] = [
        { _id: '1', name: 'Project 1', description: 'Project description', archieveAt: null, createdAt: currentDate, updatedAt: currentDate },
        { _id: '2', name: 'Project 2', description: 'Project description', archieveAt: null, createdAt: currentDate, updatedAt: currentDate },
      ];
      jest.spyOn(projectModel, 'find').mockResolvedValueOnce(expectedResult);

      // Call the findAll method
      const result = await projectService.findAll();

      // Verify the result
      expect(result).toEqual(expectedResult);
      expect(projectModel.find).toHaveBeenCalledTimes(1);
    });
  });

  //find one function
  describe('findOne', () => {
    it('should find a project by Id', async () => {
      const projectId = 'JULZZZ'
      const currentDate = new Date();
      const expectedResult: Project = {
        _id: projectId,
        name: 'Updated Project',
        description: 'Updated Description',
        archieveAt: null,
        createdAt: currentDate,
        updatedAt: currentDate
      };

      jest.spyOn(projectModel, 'findOne').mockResolvedValueOnce(expectedResult);

      // Call the findAll method
      const result = await projectService.findOne(projectId);

      // Verify the result
      expect(result).toEqual(expectedResult);
      expect(projectModel.findOne).toHaveBeenCalledWith({ _id: projectId });
    })
  });

  //update function
  describe('update', () => {
    it('should update a project', async () => {
      const projectId = 'Julzz';
      const currentDate = new Date();

      const updateProjectDto: UpdateProjectDto = {
        name: 'Updated Project',
        description: 'Updated Description'
      };

      const expectedResult: Project = {
        _id: projectId,
        name: 'Updated Project',
        description: 'Updated Description',
        archieveAt: null,
        createdAt: currentDate,
        updatedAt: currentDate
      };

      jest.spyOn(projectModel, 'findByIdAndUpdate').mockResolvedValueOnce(expectedResult);

      const result = await projectService.update(projectId, updateProjectDto);

      expect(result).toEqual(expectedResult);
      expect(projectModel.findByIdAndUpdate).toHaveBeenCalledTimes(1);
    });
  });

  //remove function 
  describe('remove', () => {
    it('should remove a project by id', async () => {
      const projectId = 'Julzz';
      const currentDate = new Date();

      const expectedResult: Project = {
        _id: projectId,
        name: 'Updated Project',
        description: 'Updated Description',
        archieveAt: null,
        createdAt: currentDate,
        updatedAt: currentDate
      };

      jest.spyOn(projectModel, 'findByIdAndDelete').mockResolvedValueOnce(expectedResult);

      const result = await projectService.remove(projectId);

      expect(result).toEqual(expectedResult);
      expect(projectModel.findByIdAndDelete).toHaveBeenCalledWith(projectId);
    })
  });
});