export default function Home() {
  return (
    <main className="flex h-screen items-center justify-center bg-gray-100 p-5 sm:bg-red-50 md:bg-green-100 lg:bg-cyan-200 xl:bg-orange-200 2xl:bg-purple-200">
      <div className="flex w-full max-w-[640px] flex-col gap-2 rounded-3xl bg-white p-5 shadow-lg md:flex-row *:outline-none has-[:invalid]:bg-green-300">
        <input
          className="h-12 w-full rounded-full bg-gray-200 pl-5 ring ring-transparent transition-shadow placeholder:drop-shadow focus:ring-green-500 focus:ring-offset-2 invalid:focus:ring-red-500 peer"
          type="text"
          required
          placeholder="Email Address"
        />
        <span className="text-red-500 font-medium hidden peer-invalid:block">Email is required.</span>
        <button className="rounded-full bg-zinc-800 py-2 font-medium text-white transition-transform peer-invalid:bg-red-400 active:scale-90 md:px-10">
          Search
        </button>
      </div>
    </main>
  );
}
