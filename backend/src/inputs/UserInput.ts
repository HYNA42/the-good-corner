import { Field, InputType } from "type-graphql";

@InputType()
class UserInput {
  @Field()
  email: string;

  @Field()
  password: string;
}

export default UserInput;
