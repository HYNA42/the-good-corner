import {
  BaseEntity,
  Column,
  Entity,
  ManyToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Ad } from "./Ad";

@Entity()
export class Tag extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({unique:true})
  name: string;

  //Relation One-To-Many avec les annonces
  @ManyToMany(() => Ad, (ad) => ad.tags)
  ads: Ad[];
}
