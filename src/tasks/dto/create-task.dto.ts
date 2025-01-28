import {
  IsString,
  IsOptional,
  IsEnum,
  IsDateString,
  IsNumber,
  IsPositive,
  IsDecimal,
} from 'class-validator';
import { TaskStatus } from 'src/tasks/entities/task.entity'; // Adjust import path if needed

export class CreateTaskDto {
  @IsString()
  name: string;

  @IsString()
  description: string;

  @IsOptional()
  @IsNumber()
  parent_task_id?: number;

  @IsDateString()
  start_date: string;

  @IsDateString()
  end_date: string;

  @IsOptional()
  @IsDateString()
  actual_end_date?: string;

  @IsOptional()
  @IsDecimal()
  @IsPositive()
  budget?: number;

  @IsOptional()
  @IsDecimal()
  @IsPositive()
  actual_cost?: number;

  @IsEnum(TaskStatus)
  status: TaskStatus;

  @IsNumber()
  project_id: number; // The ID of the associated project
}
