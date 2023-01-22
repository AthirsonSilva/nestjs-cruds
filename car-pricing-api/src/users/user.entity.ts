import { Exclude } from 'class-transformer';
import { IsEmail, IsString, Length } from 'class-validator';
import {
  AfterInsert,
  AfterRemove,
  AfterUpdate,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ReportEntity } from './../reports/report.entity';

@Entity()
export class UserEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ default: true })
  admin: boolean;

  @Column()
  @IsEmail()
  email: string;

  @Column()
  @IsString()
  @Length(6, 20)
  @Exclude()
  password: string;

  @OneToMany(() => ReportEntity, (report) => report.user)
  reports: ReportEntity[];

  @AfterInsert()
  logInsert() {
    console.log('Inserted user with payload', {
      id: this.id,
      email: this.email,
    });
  }

  @AfterUpdate()
  logUpdate() {
    console.log('Updated user with payload', {
      id: this.id,
      email: this.email,
    });
  }

  @AfterRemove()
  logRemove() {
    console.log('Removed user with payload', {
      id: this.id,
      email: this.email,
    });
  }
}
