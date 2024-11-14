import "reflect-metadata";
import { Field, InputType } from "type-graphql";
import { Category } from "src/entities/Category";

@InputType()
class UpdateCategoryInput implements Partial<Category> {
  @Field()
  id: number;

  @Field({ nullable: true })
  title?: string;
}

export default UpdateCategoryInput;
