import "reflect-metadata";
import { Field, InputType, Int } from "type-graphql";

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
  @Field(() => Int)
  categoryId: number;

  @Field(() => [String], { nullable: true })
  pictures?: string[];

  // Reçoit une liste d'IDs de tags plutôt que des objets Tag complets
  @Field(() => [Int], { nullable: true })
  tagIds?: number[];
}

export default AdInput;

/**
 * AdInput est utilisé pour gérer les entrées lorsque le front fait une requête GraphQL.
 */
