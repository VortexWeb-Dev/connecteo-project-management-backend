import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Task } from './entities/task.entity';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Task)
    private readonly taskRepository: Repository<Task>,
  ) {}

  async create(createTaskDto: CreateTaskDto) {
    try {
      const task = this.taskRepository.create(createTaskDto);
      return await this.taskRepository.save(task);
    } catch (error) {
      throw new BadRequestException('Failed to create task');
    }
  }

  async findAll() {
    try {
      return await this.taskRepository.find();
    } catch (error) {
      throw new BadRequestException('Failed to fetch tasks');
    }
  }

  async findOne(id: number) {
    try {
      const task = await this.taskRepository.findOne({
        where: { id },
        relations: ['project', 'parentTask', 'subTasks'],
      });

      if (!task) {
        throw new NotFoundException(`Task with id ${id} not found`);
      }

      return task;
    } catch (error) {
      throw new BadRequestException('Failed to fetch task');
    }
  }

  async update(id: number, updateTaskDto: UpdateTaskDto) {
    try {
      const task = await this.taskRepository.findOne({ where: { id } });

      if (!task) {
        throw new NotFoundException(`Task with id ${id} not found`);
      }

      const updatedTask = this.taskRepository.merge(task, updateTaskDto);
      return await this.taskRepository.save(updatedTask);
    } catch (error) {
      throw new BadRequestException('Failed to update task');
    }
  }

  async remove(id: number) {
    try {
      const task = await this.taskRepository.findOne({ where: { id } });

      if (!task) {
        throw new NotFoundException(`Task with id ${id} not found`);
      }

      await this.taskRepository.remove(task);
      return { message: `Task with id ${id} has been deleted` };
    } catch (error) {
      throw new BadRequestException('Failed to delete task');
    }
  }
}
