import Link from "next/link";
import { ChatBubbleOvalLeftEllipsisIcon } from "@heroicons/react/24/solid";
import { ChatBubbleBottomCenterTextIcon } from "@heroicons/react/24/solid";
import FormInput from "@/components/form-input";
import FormButton from "@/components/form-btn";

export default function CreateAccount() {
  return (
    <div className="flex flex-col gap-10 px-6 py-8">
      <div className="flex flex-col gap-2 *:font-medium">
        <h1 className="text-2xl">Hello!</h1>
        <h2 className="text-xl">Fill in the form below to join us!</h2>
      </div>
      <form action="" className="flex flex-col gap-5">
        <FormInput type="text" placeholder="Username" required errors={[]} />
        <FormInput type="email" placeholder="Email" required errors={[]} />
        <FormInput
          type="password"
          placeholder="Password"
          required
          errors={[]}
        />
        <FormInput
          type="password"
          placeholder="Confirm Password"
          required
          errors={[]}
        />
        <FormButton loading={false} text="Create Account" />
      </form>
      <div className="h-px w-full bg-neutral-500"></div>
      <div>
        <Link
          className="primary-btn flex h-10 items-center justify-center gap-3"
          href="/sms"
        >
          <span>
            <ChatBubbleOvalLeftEllipsisIcon className="size-6"></ChatBubbleOvalLeftEllipsisIcon>
          </span>
          <span>Sign up with SMS</span>
        </Link>
      </div>
    </div>
  );
}
