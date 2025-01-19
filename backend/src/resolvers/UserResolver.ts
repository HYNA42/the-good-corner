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
import { PasswordReset } from "../entities/PasswordReset";
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

@ObjectType()
class UserIsExist {
  @Field()
  isExist: boolean;

  // @Field({ nullable: true })
  // resetCode?: string;

  @Field({ nullable: true })
  email?: string;

  @Field({ nullable: true })
  expiresAt?: Date;
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

  //reset passeword code reset
  @Mutation(() => UserIsExist)
  async forgotPassword(@Arg("email") email: string) {
    const user = await User.findOneBy({ email: email });

    //if user not found return false
    if (!user) {
      throw new Error("Invalid login info");
    }

    const expiresAt = new Date();
    expiresAt.setMinutes(expiresAt.getMinutes() + 10); // Ajoute 15 minutes

    //if user exist, save in db
    const resetCode = uuidv4();
    await PasswordReset.save({
      email,
      resetCode,
      expiresAt,
    });

    //send mail with rest code
    const resend = new Resend(process.env.RESEND_API_KEY);

    (async function () {
      const { data, error } = await resend.emails.send({
        from: "Acme <onboarding@resend.dev>",
        to: [user.email],
        subject: "Reset Your Password",
        html: `
        <p>You have requested to reset your password. Please use the link below to reset it:</p>
         <a href="http://localhost:7000/changePassword/${resetCode}">
          Reset Password
        </a>
         <p>This link will expire in 10 minutes.</p>
        `,
      });

      if (error) {
        return console.error({ error });
      }

      console.log({ data });
    })();

    return {
      isExist: true,
      resetCode,
    };
  }

  //reset code
  @Mutation(() => String)
  async changePasseword(
    @Arg("code") code: string,
    @Arg("password") password: string
  ) {
    const userResetedHisPassword = await PasswordReset.findOneByOrFail({
      resetCode: code,
    });

    const user = await User.findOneByOrFail({
      email: userResetedHisPassword.email,
    });

    /*compare actual x expiresAt date
      if actualDate > expiresAt : chnage pwd
      else : no change
    */

    console.log(user);
    const now = new Date();
    const timeDifferenceMinutes = Math.floor(
      (now.getTime() - userResetedHisPassword.expiresAt.getTime()) / (1000 * 60)
    );

    if (timeDifferenceMinutes > 0) {
      throw new Error("Delay passed");
    } //delai is passed

    user.hashedPassword = await argon2.hash(password);
    user.save();
    await userResetedHisPassword.remove();
    return `Password changed successful
      on delai : ==> ${timeDifferenceMinutes} min
    `;
  }
}

export default UserResolver;
