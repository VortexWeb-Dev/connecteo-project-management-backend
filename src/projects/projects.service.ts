import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Project } from './entities/project.entity';

@Injectable()
export class ProjectsService {
  constructor(
    @InjectRepository(Project)
    private readonly projectRepository: Repository<Project>,
  ) {}

  async create(createProjectDto: CreateProjectDto) {
    try {
      const project = this.projectRepository.create(createProjectDto);
      return await this.projectRepository.save(project);
    } catch (error) {
      throw new BadRequestException('Failed to create project');
    }
  }

  async findAll() {
    try {
      return await this.projectRepository.find();
    } catch (error) {
      throw new BadRequestException('Failed to fetch projects');
    }
  }

  async findOne(id: number) {
    try {
      const project = await this.projectRepository.findOne({
        where: { id },
      });

      if (!project) {
        throw new NotFoundException(`Project with id ${id} not found`);
      }

      return project;
    } catch (error) {
      throw new BadRequestException('Failed to fetch project');
    }
  }

  async update(id: number, updateProjectDto: UpdateProjectDto) {
    try {
      const project = await this.projectRepository.findOne({ where: { id } });

      if (!project) {
        throw new NotFoundException(`Project with id ${id} not found`);
      }

      const updatedProject = this.projectRepository.merge(
        project,
        updateProjectDto,
      );
      return await this.projectRepository.save(updatedProject);
    } catch (error) {
      throw new BadRequestException('Failed to update project');
    }
  }

  async remove(id: number) {
    try {
      const project = await this.projectRepository.findOne({ where: { id } });

      if (!project) {
        throw new NotFoundException(`Project with id ${id} not found`);
      }

      await this.projectRepository.remove(project);
      return { message: `Project with id ${id} has been deleted` };
    } catch (error) {
      throw new BadRequestException('Failed to delete project');
    }
  }
}
