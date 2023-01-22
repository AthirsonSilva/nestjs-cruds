import {
  Body,
  Controller,
  Delete,
  Get,
  Logger,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from '../auth/dtos/get-user.decorator';
import { UserEntity } from '../auth/user.entity';
import { CreateTaskDto } from './dtos/create-task.dto';
import { GetTasksFilterDto } from './dtos/get-tasks-filter.dto';
import { UpdateTaskStatusDto } from './dtos/update-task-status.dto';
import { TaskEntity } from './task.entity';
import { TasksService } from './tasks.service';

@Controller('tasks')
@UseGuards(AuthGuard())
export class TasksController {
  private readonly logger = new Logger(TasksController.name);
  constructor(
    private tasksService: TasksService,
    private configService: ConfigService,
  ) {
    console.log(configService.get('TEST_VALUE'));
  }

  @Get()
  public async getTasks(
    @GetUser() user: UserEntity,
    @Query(ValidationPipe) filterDto?: GetTasksFilterDto,
  ): Promise<TaskEntity[]> {
    this.logger.verbose(
      `User "${user.username}" retrieving all tasks. Filters: ${JSON.stringify(
        filterDto,
      )}`,
    );
    return await this.tasksService.getTasks(user, filterDto);
  }

  @Get('/:id')
  public async getTaskById(
    @Param('id') id: string,
    @GetUser() user: UserEntity,
  ): Promise<TaskEntity> {
    return await this.tasksService.getTaskById(id, user);
  }

  @Post()
  public async createTask(
    @Body() createTaskDto: CreateTaskDto,
    @GetUser() user: UserEntity,
  ): Promise<TaskEntity> {
    this.logger.verbose(
      `User "${user.username}" creating a new task. Data: ${JSON.stringify(
        createTaskDto,
      )}`,
    );
    return await this.tasksService.createTask(createTaskDto, user);
  }

  @Delete('/:id')
  public async deleteTask(
    @Param('id') id: string,
    @GetUser() user: UserEntity,
  ): Promise<TaskEntity> {
    return await this.tasksService.deleteTask(id, user);
  }

  @Patch('/:id/status')
  public async updateTask(
    @Param('id') id: string,
    @Body() updateTaskStatusDto: UpdateTaskStatusDto,
    @GetUser() user: UserEntity,
  ): Promise<TaskEntity> {
    const { status } = updateTaskStatusDto;
    return await this.tasksService.updateTask(id, status, user);
  }
}
