"use client";
import FormInput from "@/components/form-input";
import FormButton from "@/components/form-btn";
import SocialLogin from "@/components/social-login";
import { useActionState } from "react";
import { handleForm } from "./actions";

export default function LogIn() {
  const [state, formAction] = useActionState(handleForm, null);
  return (
    <div className="flex flex-col gap-10 px-6 py-8">
      <div className="flex flex-col gap-2 *:font-medium">
        <h1 className="text-2xl">Hello!</h1>
        <h2 className="text-xl">Log in with Email and Password</h2>
      </div>
      <form action={formAction} className="flex flex-col gap-5">
        <FormInput
          name="email"
          type="email"
          placeholder="Email"
          required
          errors={[]}
        />
        <FormInput
          name="password"
          type="password"
          placeholder="Password"
          required
          errors={state?.errors ?? []}
        />
        <FormButton text="Log In" />
      </form>
      <SocialLogin />
    </div>
  );
}
