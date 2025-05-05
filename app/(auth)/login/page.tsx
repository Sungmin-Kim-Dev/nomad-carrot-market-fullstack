"use client";
import Input from "@/components/input";
import Button from "@/components/button";
import SocialLogin from "@/components/social-login";
import { useActionState } from "react";
import { logIn } from "./actions";
import { PASSWORD_MIN_LENGTH } from "@/lib/constants";

export default function LogIn() {
  const [state, formAction] = useActionState(logIn, null);
  return (
    <div className="flex flex-col gap-10 px-6 py-8">
      <div className="flex flex-col gap-2 *:font-medium">
        <h1 className="text-2xl">Hello!</h1>
        <h2 className="text-xl">Log in with Email and Password</h2>
      </div>
      <form action={formAction} className="flex flex-col gap-5">
        <Input
          name="email"
          type="email"
          placeholder="Email"
          required
          errors={state?.fieldErrors.email}
        />
        <Input
          name="password"
          type="password"
          placeholder="Password"
          required
          minLength={PASSWORD_MIN_LENGTH}
          errors={state?.fieldErrors.password}
        />
        <Button text="Log In" />
      </form>
      <SocialLogin />
    </div>
  );
}
