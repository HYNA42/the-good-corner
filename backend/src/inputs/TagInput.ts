import "reflect-metadata";
import { Field, InputType, Int } from "type-graphql";

@InputType()
class TagInput {
  @Field()
  name: string;

  @Field(() => [Int], { nullable: true })
  adIDs?: number[];
}

export default TagInput;
