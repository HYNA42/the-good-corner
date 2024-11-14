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
import {Field, ObjectType} from 'type-graphql'

@ObjectType()
@Entity()
export class Ad extends BaseEntity {
  @Field()
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column()
  title: string;

  @Field()
  @Column()
  @MinLength(10)
  description: string;

  @Field()
  @Column()
  owner: string;

  @Field()
  @Column()
  price: number;

  @Field()
  @Column()
  location: string;

  @Field()
  @Column()
  createdAt: Date;

  //Relation Many-To-One avec la category
  @Field(()=>Category,{ nullable: true })
  @ManyToOne(() => Category, (category) => category.ads,{eager:true})
  category: Category;

  //Relation Many-To6Many avec les Tags
  @Field(()=>[Tag])
  @ManyToMany(() => Tag, (tag) => tag.ads,{
    cascade: true,
    eager: true,
  })
  @JoinTable()
  tags: Tag[];

  //Relation One-To-many avec la table image
  @Field(()=>[Picture],{ nullable: true })
  @OneToMany(() => Picture, (picture) => picture.ad, {
    cascade: true,
    eager: true,
  })
  pictures: Picture[];
}
