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
import { UserTemp } from "../entities/UserTemp";

import { v4 as uuidv4 } from "uuid";
import { Resend } from "resend";
// import { Resend } from 'resend';

export interface ContextType {
  email?: string; // Optionnel si l'utilisateur n'est pas connecté
  userRole?: string; //rôle de l'utilisateur, optionnel
  res: ServerResponse; // Réponse HTTP, fournie par Apollo
}

export type UserRole = "USER" | "ADMIN";

@ObjectType()
class UserInfo {
  @Field()
  isLoggedIn: boolean;

  @Field({ nullable: true })
  email?: string;
}

@Resolver(() => User)
class UserResolver {
  //Register user temporary waiting his mail validation
  @Mutation(() => String)
  async register(@Arg("data") registerData: UserInput) {
    const randomCode = uuidv4();
    const userTemp = await UserTemp.save({
      email: registerData.email,
      hashedPassword: await argon2.hash(registerData.password),
      randomCode: randomCode,
    });
    const resend = new Resend(process.env.RESEND_API_KEY);
    (async function () {
      const { data, error } = await resend.emails.send({
        from: "Acme <onboarding@resend.dev>",
        to: [registerData.email],
        subject: "Verify email subscription",
        html: `
        <p>Please click the link below to confirm your email address</p>
        <a href="http://localhost:7000/confirm/${randomCode}">
          http://localhost:7000/confirm/${randomCode}
        </a>
        `,
      });

      if (error) {
        return console.error({ error });
      }

      console.log({ data });
    })();

    console.log("userTemp ====> ", userTemp);
    return "TempUser is waiting confirmation";
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
        { email: user.email, userRole: user.role },
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

  //Confirm user tTempUser, and register user on db
  @Mutation(() => String)
  async confirmEmail(@Arg("code") code: string) {
    const userTemp = await UserTemp.findOneBy({ randomCode: code });
    await User.save({
      email: userTemp?.email,
      hashedPassword: userTemp?.hashedPassword,
    });
    userTemp?.remove();
    return `userTemp verified successful and new user is created`;
  }
}

export default UserResolver;
