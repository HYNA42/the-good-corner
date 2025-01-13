import { Arg, Mutation, Resolver } from "type-graphql";
import * as argon2 from "argon2";

// import CategoryInput from "../inputs/CategoryInput ";

import { User } from "../entities/User";
import UserInput from "../inputs/UserInput";
// import UpdateCategoryInput from "../inputs/UpdateCategoryInput";

@Resolver(() => User)
class UserResolver {
  //register user
  @Mutation(() => String)
  async register(@Arg("data") registerData: UserInput) {
    const result = await User.save({
      email: registerData.email,
      hashedPassword: await argon2.hash(registerData.password),
    });
    console.log("result", result);
    return "registred successfull";
  }
}

export default UserResolver;
