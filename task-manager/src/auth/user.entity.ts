import {
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm';
import { TaskEntity } from '../tasks/task.entity';

@Entity('users')
export class UserEntity {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  @Unique(['username'])
  username: string;

  @Column()
  password: string;

  @OneToMany((type) => TaskEntity, (task) => task.user, { eager: true })
  tasks: Array<TaskEntity>;
}
