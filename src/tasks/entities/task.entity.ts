import { Project } from 'src/projects/entities/project.entity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, OneToMany } from 'typeorm';

export enum TaskStatus {
  NOT_PLANNED = 'Not Planned',
  TO_BE_DONE_THIS_WEEK = 'To Be Done This Week',
  INITIATION = 'Initiation',
  PLANNING = 'Planning',
  EXECUTION = 'Execution',
  MONITORING = 'Monitoring',
  CONTROL = 'Control',
  CLOSING = 'Closing',
}

@Entity('tasks')
export class Task {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Project, (project) => project.tasks, { eager: true })
  @JoinColumn({ name: 'project_id' })
  project: Project;

  @Column()
  name: string;

  @Column('text')
  description: string;

  @ManyToOne(() => Task, { nullable: true })
  @JoinColumn({ name: 'parent_task_id' })
  parentTask: Task;

  @Column({ type: 'date' })
  start_date: Date;

  @Column({ type: 'date' })
  end_date: Date;

  @Column({ type: 'date', nullable: true })
  actual_end_date: Date;

  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: true })
  budget: number;

  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: true })
  actual_cost: number;

  @Column({
    type: 'enum',
    enum: TaskStatus,
    default: TaskStatus.NOT_PLANNED,
  })
  status: TaskStatus;

  @OneToMany(() => Task, (task) => task.parentTask)
  subTasks: Task[];
}
