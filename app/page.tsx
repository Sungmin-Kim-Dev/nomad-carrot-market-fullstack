export default function Home() {
  return (
    <main className="flex h-screen items-center justify-center bg-gray-100 p-5 sm:bg-red-50 md:bg-green-100 lg:bg-cyan-200 xl:bg-orange-200 2xl:bg-purple-200">
      <div className="flex w-full max-w-[640px] flex-col gap-3 rounded-3xl bg-white p-5 shadow-lg">
        {["Jack", "Me", "Nico", "Perfect", "Liz", "Vicky", ""].map(
          (person, index) => (
            <div key={index} className="flex items-center gap-5">
              <div className="size-10 rounded-full bg-blue-400"></div>
              <span className="text-lg font-medium empty:bg-gray-300 empty:w-24 empty:h-5 empty:rounded-full empty:animate-pulse">{person}</span>
              <div className="flex size-6 items-center justify-center rounded-full bg-red-500 text-white relative">
                <span className="z-10">{index}</span>
                <div className="size-6 rounded-full animate-ping bg-red-500 absolute"></div>
              </div>
            </div>
          ),
        )}
      </div>
    </main>
  );
}
