import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateDepartmentDto } from './dto/create-department.dto';
import { UpdateDepartmentDto } from './dto/update-department.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Department } from './entities/department.entity';
import { Repository } from 'typeorm';

@Injectable()
export class DepartmentsService {
  constructor(
    @InjectRepository(Department)
    private readonly departmentRepository: Repository<Department>,
  ) {}

  async create(createDepartmentDto: CreateDepartmentDto) {
    try {
      const department = this.departmentRepository.create(createDepartmentDto);
      return await this.departmentRepository.save(department);
    } catch (error) {
      throw new BadRequestException('Failed to create department');
    }
  }

  async findAll() {
    try {
      return await this.departmentRepository.find();
    } catch (error) {
      throw new BadRequestException('Failed to fetch departments');
    }
  }

  async findOne(id: number) {
    try {
      const department = await this.departmentRepository.findOne({
        where: { id },
      });

      if (!department) {
        throw new NotFoundException(`Department with id ${id} not found`);
      }

      return department;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new BadRequestException('Failed to fetch department');
    }
  }

  async update(id: number, updateDepartmentDto: UpdateDepartmentDto) {
    try {
      const department = await this.departmentRepository.findOne({
        where: { id },
      });

      if (!department) {
        throw new NotFoundException(`Department with id ${id} not found`);
      }

      const updatedDepartment = this.departmentRepository.merge(
        department,
        updateDepartmentDto,
      );
      return await this.departmentRepository.save(updatedDepartment);
    } catch (error) {
      throw new BadRequestException('Failed to update department');
    }
  }

  async remove(id: number) {
    try {
      const department = await this.departmentRepository.findOne({
        where: { id },
      });

      if (!department) {
        throw new NotFoundException(`Department with id ${id} not found`);
      }

      await this.departmentRepository.remove(department);
      return { message: `Department with id ${id} has been deleted` };
    } catch (error) {
      throw new BadRequestException('Failed to delete department');
    }
  }
}
