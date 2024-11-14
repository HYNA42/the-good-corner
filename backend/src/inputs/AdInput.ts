import "reflect-metadata";
import { Field, ID, InputType } from "type-graphql";

@InputType()
class AdInput {
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

  @Field(() => [String], { nullable: true })
  picturesUrls?: string[];
}

export default AdInput;
