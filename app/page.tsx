export default function Home() {
  return (
    <main className="flex h-screen items-center justify-center bg-gray-100 p-5 sm:bg-red-50 md:bg-green-100 lg:bg-cyan-200 xl:bg-orange-200 2xl:bg-purple-200">
      <div className="flex w-full max-w-[640px] flex-col gap-3 rounded-3xl bg-white p-5 shadow-lg group">
        <input
          type="text"
          className="w-full bg-gray-100"
          placeholder="Write your Email"
        />
        <span className="group-focus-within:block hidden">Make sure it is a valid email...</span>
        <button>Submit</button>
      </div>
    </main>
  );
}
