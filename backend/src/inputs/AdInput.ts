// src/tests/AdInputTest.ts
import "reflect-metadata";
import { Field, ID, InputType } from "type-graphql";
import { Ad } from "../entities/Ad";
// import { Category } from "../entities/Category";

@InputType()
class AdInput implements Partial<Ad> {
  @Field()
  title: string;

  @Field()
  description: string;

  @Field()
  owner: string;

  @Field()
  price: number;

  @Field()
  location: string;

  @Field()
  createdAt: Date;
   // recevoir uniquement l'ID de la catégorie et non l'objet
  @Field(() => ID)
  categoryId: number;
}

export default AdInput;
