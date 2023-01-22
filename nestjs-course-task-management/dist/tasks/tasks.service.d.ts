import { TaskRepository } from './task.repository';
import { Task } from './task.entity';
export declare class TasksService {
    private taskRepository;
    constructor(taskRepository: TaskRepository);
    getTaskById(id: number): Promise<Task>;
}
