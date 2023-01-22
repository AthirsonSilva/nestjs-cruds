import { Injectable } from '@nestjs/common';
import { EntityRepository, Repository } from 'typeorm';
import { CreateTaskDto } from './dtos/create-task.dto';
import { TaskEntity } from './task.entity';

@EntityRepository(TaskEntity)
@Injectable()
export class TaskRepository extends Repository<TaskEntity> {
  public async getTaskById(id: string): Promise<TaskEntity> {
    const task = await this.findOne({ where: { id } });

    return task;
  }

  public async getTasks(): Promise<TaskEntity[]> {
    const tasks = await this.find();

    return tasks;
  }

  public async createTasks(createTaskDto: CreateTaskDto): Promise<TaskEntity> {
    const task = this.create(createTaskDto);
    await this.save(task);

    return task;
  }
}
