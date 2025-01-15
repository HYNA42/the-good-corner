import {
  Arg,
  Ctx,
  Field,
  Mutation,
  ObjectType,
  Query,
  Resolver,
} from "type-graphql";
import * as argon2 from "argon2";

// import CategoryInput from "../inputs/CategoryInput ";

import { User } from "../entities/User";
import UserInput from "../inputs/UserInput";
import jwt, { Secret } from "jsonwebtoken";
import { ServerResponse } from "http";

export interface ContextType {
  email?: string; // Optionnel si l'utilisateur n'est pas connecté
  res: ServerResponse; // Réponse HTTP, fournie par Apollo
}

@ObjectType()
class UserInfo {
  @Field()
  isLoggedIn: boolean;

  @Field({ nullable: true })
  email?: string;
}

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
  @Mutation(() => String)
  async login(@Arg("data") loginData: UserInput, @Ctx() context: ContextType) {
    let isPasswordCorrect = false;
    const user = await User.findOneBy({ email: loginData.email });

    if (user) {
      isPasswordCorrect = await argon2.verify(
        user.hashedPassword,
        loginData.password
      );
    }

    // If the user is authenticated, generate a JWT, set it as an HTTP-only cookie, and return a success message

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

  //verify if user is loggin or no
  @Query(() => UserInfo)
  async getUserInfo(@Ctx() context: ContextType) {
    if (context.email) {
      return { isLoggedIn: true, email: context.email };
    } else {
      return { isLoggedIn: false };
    }
  }

  //logout : kill cookie in token
  @Mutation(() => String)
  async logout(@Ctx() context: ContextType) {
    context.res.setHeader("Set-Cookie", "token=; Max-Age=0; Secure; HttpOnly");
    return "Logged out successfully";
  }
}

export default UserResolver;
