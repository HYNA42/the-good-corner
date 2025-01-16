import { MinLength } from "class-validator";
import {
  BaseEntity,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";

import { Field, ObjectType } from "type-graphql";
import { Ad } from "./Ad";

@ObjectType()
@Entity()
export class User extends BaseEntity {
  @Field()
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column({ unique: true })
  email: string;

  @Column()
  @MinLength(8)
  hashedPassword: string;

  @Column({default:"USER"})
  role: string

  
  // Relation OneToMany : Un utilisateur peut posséder plusieurs annonces
  @Field(() => [Ad], { nullable: true })
  @OneToMany(() => Ad, (ad) => ad.user)
  ads: Ad[];
}

/**
 * Le modèle Ad est utilisé par le resolver pour interagir avec la base de données et pour renvoyer les données au front.
 */
