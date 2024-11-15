import "reflect-metadata";
import { Field, InputType, Int } from "type-graphql";

@InputType()
class UpdateTagInput {
  @Field(() => Int)
  id: number;

  @Field({ nullable: true })
  name?: string;

  // @Field(() => [Int], { nullable: true })
  // adIDs?: number[];
}

export default UpdateTagInput;
