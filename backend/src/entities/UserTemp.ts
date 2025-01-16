import { MinLength } from "class-validator";
import {
  BaseEntity,
  Column,
  Entity,
  PrimaryGeneratedColumn,
} from "typeorm";


@Entity()
export class UserTemp extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  email: string;

  @Column()
  @MinLength(8)
  hashedPassword: string;

  @Column()
  randomCode: string

}
