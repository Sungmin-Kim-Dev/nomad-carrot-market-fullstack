import Input from "@/components/input";
import Button from "@/components/button";

export default function SMSLogIn() {
  return (
    <div className="flex flex-col gap-10 px-6 py-8">
      <div className="flex flex-col gap-2 *:font-medium">
        <h1 className="text-2xl">SMS Log In</h1>
        <h2 className="text-xl">Verify Your Phone Number</h2>
      </div>
      <form action="" className="flex flex-col gap-5">
        <Input
          name="phoneNumber"
          type="number"
          placeholder="Phone Number"
          required
          errors={[]}
        />
        <Input
          name="vCode"
          type="number"
          placeholder="Verification Code"
          required
          errors={[]}
        />
        <Button text="Verify" />
      </form>
    </div>
  );
}
