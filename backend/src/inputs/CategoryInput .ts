// src/tests/AdInputTest.ts
import "reflect-metadata";
import { Field, InputType } from "type-graphql";
import { Category } from "../entities/Category";
// import { Category } from "../entities/Category";

@InputType()
class CategoryInput implements Partial<Category> {  
  @Field()
  title: string;

}

export default CategoryInput;
