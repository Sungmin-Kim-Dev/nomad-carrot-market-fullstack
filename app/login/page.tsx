import FormInput from "@/components/form-input";
import FormButton from "@/components/form-btn";
import SocialLogin from "@/components/social-login";

export default function LogIn() {
  const handleForm = async (formData: FormData) => {
    "use server";
    await new Promise((resolve) => setTimeout(resolve, 3000));
    console.log(formData.get("email"), formData.get("password"));
    console.log("I run in the server!");
  };
  return (
    <div className="flex flex-col gap-10 px-6 py-8">
      <div className="flex flex-col gap-2 *:font-medium">
        <h1 className="text-2xl">Hello!</h1>
        <h2 className="text-xl">Log in with Email and Password</h2>
      </div>
      <form action={handleForm} className="flex flex-col gap-5">
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
          errors={[]}
        />
        <FormButton text="Log In" />
      </form>
      <SocialLogin />
    </div>
  );
}
