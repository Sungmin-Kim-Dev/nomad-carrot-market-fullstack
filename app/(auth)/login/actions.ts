"use server";

import {
  PASSWORD_MIN_LENGTH,
  PASSWORD_REGEX,
  PASSWORD_REGEX_ERROR,
} from "@/lib/constants";
import db from "@/lib/db";
import { z } from "zod";
import bcrypt from "bcrypt";
import { redirect } from "next/navigation";
import { logInCookie } from "@/lib/login";

const checkEmailExists = async (email: string) => {
  const user = await db.user.findUnique({
    where: {
      email,
    },
    select: {
      id: true,
    },
  });
  // if(user){
  //   return true
  // } else {
  //   return false
  // }
  return Boolean(user);
};

const formSchema = z.object({
  email: z
    .string()
    .email()
    .toLowerCase()
    .refine(checkEmailExists, "An account with this email does not exist."),
  password: z.string({
    required_error: "Password is required",
  }),
  // .min(PASSWORD_MIN_LENGTH)
  // .regex(PASSWORD_REGEX, PASSWORD_REGEX_ERROR),
});

export const logIn = async (prevState: any, formData: FormData) => {
  const data = {
    email: formData.get("email"),
    password: formData.get("password"),
  };
  const result = await formSchema.safeParseAsync(data);
  if (!result.success) {
    return result.error.flatten();
  } else {
    // if the user is found, check the password hash
    const user = await db.user.findUnique({
      where: {
        email: result.data.email,
      },
      select: {
        id: true,
        password: true,
      },
    });
    const comparePassword = await bcrypt.compare(
      result.data.password,
      user!.password ?? "",
    );
    if (comparePassword) {
      await logInCookie(user!.id);
      redirect("/profile");
    } else {
      return {
        fieldErrors: {
          password: ["Wrong password."],
          email: [],
        },
      };
    }
  }
};
