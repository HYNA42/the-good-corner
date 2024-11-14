import "reflect-metadata";
import { Field, ID, InputType } from "type-graphql";
import { Ad } from "../entities/Ad";

@InputType()
class UpdateAdInput implements Partial<Ad> {
  @Field()
  id: number;

  @Field({ nullable: true })
  title?: string;

  @Field({ nullable: true })
  description?: string;

  @Field({ nullable: true })
  owner?: string;

  @Field({ nullable: true })
  price?: number;

  @Field({ nullable: true })
  location?: string;

  @Field({ nullable: true })
  createdAt?: Date;

  @Field(() => ID, { nullable: true })
  categoryId?: number;
}

export default UpdateAdInput;
