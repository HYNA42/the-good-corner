import { Arg, Ctx, Mutation, Query, Resolver } from "type-graphql";
import * as argon2 from "argon2";

// import CategoryInput from "../inputs/CategoryInput ";

import { User } from "../entities/User";
import UserInput from "../inputs/UserInput";
import jwt, { Secret } from "jsonwebtoken";

@Resolver(() => User)
class UserResolver {
  //Register user
  @Mutation(() => String)
  async register(@Arg("data") registerData: UserInput) {
    const user = await User.save({
      email: registerData.email,
      hashedPassword: await argon2.hash(registerData.password),
    });
    console.log("result", user);
    return "registred successfull";
  }

  //Login user
  @Query(() => String)
  async login(@Arg("data") loginData: UserInput,@Ctx() context: any) {
    let isPasswordCorrect = false;
    const user = await User.findOneBy({ email: loginData.email });

    if (user) {
      isPasswordCorrect = await argon2.verify(
        user.hashedPassword,
        loginData.password
      );
    }

    //if user identified : generate token and return ???
    if (isPasswordCorrect === true && user !== null) {
      const token = jwt.sign(
        { email: user.email },
        process.env.JWT_SECRET_KEY as Secret
      );
      context.res.setHeader("Set-Cookie", `token=${token}; Secure; HttpOnly`);
      return "ok";
    } else {
      throw new Error("Incorrect login");
    }

  }
}

export default UserResolver;
