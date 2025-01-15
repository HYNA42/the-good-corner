import "reflect-metadata";
import { Field, InputType, Int } from "type-graphql";
// import { Ad } from "../entities/Ad";

@InputType()
class UpdateAdInput {
  @Field()
  id: number;

  @Field({ nullable: true })
  title?: string;

  @Field({ nullable: true })
  description?: string;

  @Field({ nullable: true })
  user?: string;

  @Field({ nullable: true })
  price?: number;

  @Field({ nullable: true })
  location?: string;

  @Field({ nullable: true })
  createdAt?: Date;

  @Field(() => Int, { nullable: true })
  categoryId?: number;

  @Field(() => [String], { nullable: true })
  pictures?: string[];

  // Reçoit une liste d'IDs de tags plutôt que des objets Tag complets
  @Field(() => [Int], { nullable: true })
  tagIds?: number[];
}

export default UpdateAdInput;
