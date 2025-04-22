export default function Home() {
  return (
    <main className="flex h-screen items-center justify-center bg-gray-100 p-5 sm:bg-red-50 md:bg-green-100 lg:bg-cyan-200 xl:bg-orange-200 2xl:bg-purple-200">
      <div className="flex w-full max-w-[640px] flex-col md:flex-row gap-2 rounded-3xl bg-white p-5 shadow-lg">
        <input
          className="h-12 w-full rounded-full bg-gray-200 pl-5 ring ring-transparent transition-shadow outline-none placeholder:drop-shadow focus:ring-orange-500 focus:ring-offset-2"
          type="text"
          placeholder="Search Here..."
        />
        <button className="rounded-full bg-black py-2 font-medium text-white transition-transform outline-none active:scale-90 md:px-10">
          Search
        </button>
      </div>
    </main>
  );
}
