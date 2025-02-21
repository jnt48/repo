import Image from "next/image";

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-4">
      <div className="mb-8">
        <Image
          src="/assets/pikalogin.svg"
          alt="Login"
          width={100}
          height={100}
          className="object-cover w-24 h-24 sm:w-32 sm:h-32 md:w-48 md:h-48 lg:w-80 lg:h-80"
        />
      </div>
      <div className="flex flex-col items-center space-y-5 text-center">
        <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-[#4b4b4b]">
          The free, fun, and effective way to learn a language!
        </h1>
        <button className="font-pixel text-lg sm:text-xl md:text-2xl bg-violet-600 text-background px-4 py-2 sm:px-5 sm:py-2 md:px-6 md:py-3 rounded-md hover:bg-purple-500 transition-colors duration-150 hover:text-white shadow-md">
          Get Started
        </button>
      </div>
    </main>
  );
}