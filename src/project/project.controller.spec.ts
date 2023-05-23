import { Test, TestingModule } from '@nestjs/testing';
import { ProjectController } from './project.controller';
import { ProjectService } from './project.service';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';

describe('ProjectController', () => {
  let controller: ProjectController;
  let projectService: ProjectService;

  const currentDate = new Date();

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProjectController],
      providers: [{
        provide: ProjectService,
        useValue: {
          create: jest.fn()
            .mockImplementation((createProjectDto: CreateProjectDto) =>
              Promise.resolve({ _id: 'uuid', ...createProjectDto, archieveAt: null, createdAt: currentDate, updatedAt: currentDate })),
          findAll: jest.fn()
            .mockResolvedValue([
              { _id: '1', name: 'Project 1', description: 'Project description', archieveAt: null, createdAt: currentDate, updatedAt: currentDate },
              { _id: '2', name: 'Project 2', description: 'Project description', archieveAt: null, createdAt: currentDate, updatedAt: currentDate },
            ]),
          findOne: jest.fn()
            .mockImplementation((id: string) =>
              Promise.resolve({ _id: id, name: 'Project 1', description: 'Project description', archieveAt: null, createdAt: currentDate, updatedAt: currentDate })),
          update: jest.fn()
            .mockImplementation((id: string, updateProjectDto: UpdateProjectDto) =>
              Promise.resolve({ _id: id, ...updateProjectDto, archieveAt: null, createdAt: currentDate, updatedAt: currentDate })),
          remove: jest.fn()
            .mockImplementation((id: string) =>
              Promise.resolve({ _id: id, name: 'Project 1', description: 'Project description', archieveAt: null, createdAt: currentDate, updatedAt: currentDate }))
        }
      }],
    }).compile();

    controller = module.get<ProjectController>(ProjectController);
    projectService = module.get<ProjectService>(ProjectService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    it('should create a project and return it', async () => {
      const createProjectDto: CreateProjectDto = {
        name: 'Project 1',
        description: 'Project 1 description'
      };

      expect(controller.create(createProjectDto)).resolves.toEqual({
        _id: 'uuid',
        ...createProjectDto,
        archieveAt: null,
        createdAt: currentDate,
        updatedAt: currentDate
      });
    });
  });

  describe('findAll', () => {
    it('should get an array of projects', () => {
      expect(controller.findAll()).resolves.toEqual([
        { _id: '1', name: 'Project 1', description: 'Project description', archieveAt: null, createdAt: currentDate, updatedAt: currentDate },
        { _id: '2', name: 'Project 2', description: 'Project description', archieveAt: null, createdAt: currentDate, updatedAt: currentDate },
      ])
    });
  });

  describe('findOne', () => {
    it('should get a single project by Id', () => {
      expect(controller.findOne('uuid')).resolves.toEqual({
        _id: 'uuid', name: 'Project 1', description: 'Project description', archieveAt: null, createdAt: currentDate, updatedAt: currentDate
      });
    });
  });

  describe('update', () => {
    it('should update a project', () => {
      const updateProjectDto: UpdateProjectDto = {
        name: 'New Name',
        description: 'New Name',
      };
      expect(controller.update('uuid', updateProjectDto)).resolves.toEqual({
        _id: 'uuid', name: 'New Name', description: 'New Name', archieveAt: null, createdAt: currentDate, updatedAt: currentDate
      })
    });
  });

  describe('remove', () => {
    it('should remove a single project by Id', () => {
      expect(controller.remove('uuid')).resolves.toEqual({
        _id: 'uuid', name: 'Project 1', description: 'Project description', archieveAt: null, createdAt: currentDate, updatedAt: currentDate
      });
    });
  });
});
