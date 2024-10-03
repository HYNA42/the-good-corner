// import { MinLength } from "class-validator";
import {
  BaseEntity,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Ad } from "./Ad";

@Entity()
export class Category extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({unique:true})
  title: string;

  //Relation One-To-Many avec les annonces
  @OneToMany(() => Ad, (ad) => ad.category)
  ads: Ad[];
}
