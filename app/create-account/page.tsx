import Link from "next/link";
import { ChatBubbleOvalLeftEllipsisIcon } from "@heroicons/react/24/solid";
import { ChatBubbleBottomCenterTextIcon } from "@heroicons/react/24/solid";

export default function CreateAccount() {
  return (
    <div className="flex flex-col gap-10 px-6 py-8">
      <div className="flex flex-col gap-2 *:font-medium">
        <h1 className="text-2xl">Hello!</h1>
        <h2 className="text-xl">Fill in the form below to join us!</h2>
      </div>
      <form action="" className="flex flex-col gap-3">
        <div className="flex flex-col gap-2">
          <input
            className="h-10 w-full rounded-md border-none bg-transparent ps-2 ring-1 ring-neutral-200 placeholder:text-neutral-400 focus:ring-2 focus:ring-orange-500 focus:outline-none"
            type="text"
            placeholder="Username"
            required
          />
          <span className="font-medium text-red-500">Input error</span>
        </div>
        <button className="primary-btn h-10">Create Account</button>
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
