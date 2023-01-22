import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { GetUser } from '../auth/dtos/get-user.decorator';
import { UserEntity } from '../auth/user.entity';
import { CreateTaskDto } from './dtos/create-task.dto';
import { GetTasksFilterDto } from './dtos/get-tasks-filter.dto';
import { TaskStatus } from './task-status.enum';
import { TaskEntity } from './task.entity';
import { TaskRepository } from './tasks.repository';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(TaskEntity)
    private readonly tasksRepository: TaskRepository,
  ) {}

  public async getTasks(
    @GetUser() user: UserEntity,
    filterDto?: GetTasksFilterDto,
  ): Promise<Array<TaskEntity>> {
    const { status, search } = filterDto;
    const query = this.tasksRepository.createQueryBuilder('task');
    query.where({ user });

    if (status) {
      query.andWhere('UPPER(task.status) = UPPER(:status)', { status });
    }
    if (search) {
      query.andWhere(
        '(LOWER(task.title) LIKE LOWER(:search) OR LOWER(task.description) LIKE LOWER(:search))',
        { search: `%${search}%` },
      );
    }

    const tasks = await query.getMany();

    return tasks;
  }

  public async getTaskById(id: string, user: UserEntity): Promise<TaskEntity> {
    const task = await this.tasksRepository.findOne({
      where: { id },
      relations: ['user'],
    });

    if (!task) {
      throw new NotFoundException(`Task with ID "${id}" not found`);
    }

    if (task.user.id !== user.id) {
      throw new UnauthorizedException(
        'You are not allowed to access this task',
      );
    }

    return task;
  }

  public async createTask(
    createTaskDto: CreateTaskDto,
    user: UserEntity,
  ): Promise<TaskEntity> {
    const newTask = this.tasksRepository.create({
      ...createTaskDto,
      user,
      status: TaskStatus.OPEN,
    });

    await this.tasksRepository.save(newTask);

    return newTask;
  }

  public async deleteTask(id: string, user: UserEntity): Promise<TaskEntity> {
    const task = await this.getTaskById(id, user);

    await this.tasksRepository.delete(task.id);

    return task;
  }

  public async updateTask(
    id: string,
    status: TaskStatus,
    user: UserEntity,
  ): Promise<TaskEntity> {
    const task = await this.getTaskById(id, user);

    this.tasksRepository.update(task.id, { status });
    this.tasksRepository.save(task);

    return task;
  }
}
