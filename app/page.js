import Image from "next/image";

export default function WelcomePage() {
  return (
    <div className="flex min-h-screen">

      <div className="hidden lg:flex items-center justify-center w-1/2 bg-black">
        <Image
          width={300}
          height={300}
          src="/twitter-x.svg" 
          alt="logo"
          className="w-1/2 invert opacity-80"
        />
      </div>

      <div className="flex flex-col justify-center p-8 w-full lg:w-1/2">
        
        <h1 className="text-5xl font-bold mb-10">Happening now</h1>
        <h2 className="text-2xl font-semibold mb-8">Join today.</h2>

        <a
          href="/signup"
          className="w-full bg-black text-white text-center py-3 rounded-full mb-4 font-semibold hover:bg-gray-800 transition"
        >
          Create account
        </a>

        <div className="flex items-center my-6">
          <div className="flex-1 h-[1px] bg-gray-300" />
          <span className="px-4 text-gray-600">or</span>
          <div className="flex-1 h-[1px] bg-gray-300" />
        </div>

        <a
          href="/login"
          className="w-full border border-gray-300 text-center py-3 rounded-full font-semibold hover:bg-gray-100 transition"
        >
          Sign in
        </a>

      </div>
    </div>
  );
}
