import { Department } from 'src/departments/entities/department.entity';
import { Project } from 'src/projects/entities/project.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  ManyToMany,
  JoinTable,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

export enum AvailabilityStatus {
  AVAILABLE = 'Available',
  UNAVAILABLE = 'Unavailable',
}

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  registration: string;

  @Column({ unique: true })
  email: string;

  @Column()
  role: string;

  @Column({
    type: 'enum',
    enum: AvailabilityStatus,
    default: AvailabilityStatus.AVAILABLE,
  })
  availability_status: AvailabilityStatus;

  @ManyToOne(() => Department, (department) => department.users, {
    eager: true,
  })
  department: Department;

  @ManyToMany(() => Project, (project) => project.users)
  @JoinTable({
    name: 'user_projects',
    joinColumn: { name: 'user_id', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'project_id', referencedColumnName: 'id' },
  })
  projects: Project[];

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
