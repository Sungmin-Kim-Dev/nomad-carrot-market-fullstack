import FormInput from "@/components/form-input";
import FormButton from "@/components/form-btn";

export default function SMSLogIn() {
  return (
    <div className="flex flex-col gap-10 px-6 py-8">
      <div className="flex flex-col gap-2 *:font-medium">
        <h1 className="text-2xl">SMS Log In</h1>
        <h2 className="text-xl">Verify Your Phone Number</h2>
      </div>
      <form action="" className="flex flex-col gap-5">
        <FormInput
          name="phoneNumber"
          type="number"
          placeholder="Phone Number"
          required
          errors={[]}
        />
        <FormInput
          name="vCode"
          type="number"
          placeholder="Verification Code"
          required
          errors={[]}
        />
        <FormButton loading={false} text="Verify" />
      </form>
    </div>
  );
}
