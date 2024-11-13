import { MinLength } from "class-validator";
import {
  BaseEntity,
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";

import { Category } from "./Category";
import { Tag } from "./Tag";
import { Picture } from "./Picture";

@Entity()
export class Ad extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  @MinLength(10)
  description: string;

  @Column()
  owner: string;

  @Column()
  price: number;

  // @Column()
  // picture: string;

  @Column()
  location: string;

  @Column()
  createdAt: Date;

  //Relation Many-To-One avec la category
  @ManyToOne(() => Category, (category) => category.ads)
  category: Category;

  //Relation Many-To6Many avec les Tags
  @ManyToMany(() => Tag, (tag) => tag.ads)
  @JoinTable()
  tags: Tag[];

  //Relation One-To-many avec la table image
  @OneToMany(() => Picture, (picture) => picture.ad, {
    cascade: true,
    eager: true,
  })
  pictures: Picture[];
}
