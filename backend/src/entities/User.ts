import { MinLength } from "class-validator";
import {
  BaseEntity,
  Column,
  Entity,
 
  PrimaryGeneratedColumn,
} from "typeorm";


import { Field, ObjectType } from "type-graphql";

@ObjectType()
@Entity()
export class User extends BaseEntity {
  @Field()
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column({unique:true})
  email: string;

  @Field()
  @Column()
  @MinLength(8)
  hashedPassword: string;
 
}

/**
 * Le modèle Ad est utilisé par le resolver pour interagir avec la base de données et pour renvoyer les données au front.
 */
