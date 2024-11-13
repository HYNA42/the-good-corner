// import { MinLength } from "class-validator";
import {
  BaseEntity,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Ad } from "./Ad";
import { Field, ObjectType } from "type-graphql";

@ObjectType()
@Entity()
export class Category extends BaseEntity {
  @Field()
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column({unique:true})
  title: string;

  //Relation One-To-Many avec les annonces
  @OneToMany(() => Ad, (ad) => ad.category)
  ads: Ad[];
}
