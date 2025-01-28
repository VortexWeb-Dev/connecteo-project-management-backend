import {
  IsEmail,
  IsEnum,
  IsInt,
  IsOptional,
  IsString,
  MinLength,
} from 'class-validator';
import { AvailabilityStatus } from '../entities/user.entity';

export class CreateUserDto {
  @IsString()
  @MinLength(2, { message: 'Name must be at least 2 characters long' })
  name: string;

  @IsString()
  registration: string;

  @IsEmail({}, { message: 'Email must be a valid email address' })
  email: string;

  @IsString()
  role: string;

  @IsEnum(AvailabilityStatus)
  availability_status: AvailabilityStatus;

  @IsInt()
  department_id: number;

  @IsOptional()
  @IsInt({ each: true, message: 'Projects must be an array of integers' })
  project_ids?: number[];
}
