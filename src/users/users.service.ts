import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto) {
    try {
      const user = this.userRepository.create(createUserDto);
      return await this.userRepository.save(user);
    } catch (error) {
      throw new BadRequestException('Failed to create user');
    }
  }

  async findAll() {
    try {
      return await this.userRepository.find();
    } catch (error) {
      throw new BadRequestException('Failed to fetch users');
    }
  }

  async findOne(id: number) {
    try {
      const user = await this.userRepository.findOne({ where: { id }, relations: ['department', 'projects'] });

      if (!user) {
        throw new NotFoundException(`User with id ${id} not found`);
      }

      return user;
    } catch (error) {
      throw new BadRequestException('Failed to fetch user');
    }
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    try {
      const user = await this.userRepository.findOne({ where: { id } });

      if (!user) {
        throw new NotFoundException(`User with id ${id} not found`);
      }

      const updatedUser = this.userRepository.merge(user, updateUserDto);
      return await this.userRepository.save(updatedUser);
    } catch (error) {
      throw new BadRequestException('Failed to update user');
    }
  }

  async remove(id: number) {
    try {
      const user = await this.userRepository.findOne({ where: { id } });

      if (!user) {
        throw new NotFoundException(`User with id ${id} not found`);
      }

      await this.userRepository.remove(user);
      return { message: `User with id ${id} has been deleted` };
    } catch (error) {
      throw new BadRequestException('Failed to delete user');
    }
  }
}
