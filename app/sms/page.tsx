"use client";

import Input from "@/components/input";
import Button from "@/components/button";
import { useActionState } from "react";
import { smsLogIn } from "./actions";

const initialState = {
  token: false,
  error: undefined,
};

export default function SMSLogIn() {
  const [state, formAction] = useActionState(smsLogIn, initialState);

  return (
    <div className="flex flex-col gap-10 px-6 py-8">
      <div className="flex flex-col gap-2 *:font-medium">
        <h1 className="text-2xl">SMS Log In</h1>
        <h2 className="text-xl">Verify Your Phone Number</h2>
      </div>
      <form action={formAction} className="flex flex-col gap-5">
        {state.token ? (
          <Input
            name="token"
            type="number"
            placeholder="Verification Code"
            required
            min={100000}
            max={999999}
          />
        ) : (
          <Input
            name="phone"
            type="text"
            placeholder="Phone Number"
            required
            errors={state.error?.formErrors}
          />
        )}
        <Button text={state.token ? "Verify Token" : "Send Verification SMS"} />
      </form>
    </div>
  );
}
