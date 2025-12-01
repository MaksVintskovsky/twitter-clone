"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function LoginPage() {
  const router = useRouter();
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    const email = e.target.email.value;
    const password = e.target.password.value;

    const res = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    const data = await res.json();
    if (!res.ok) {
      setError(data.error || "Invalid credentials");
      return;
    }

    router.push("/home");
  };

  return (
    <div className="flex min-h-screen justify-center items-center">
      <div className="w-full max-w-sm p-6">

        <h1 className="text-4xl font-bold mb-8 text-center">Sign in</h1>

        <form onSubmit={handleLogin} className="flex flex-col gap-4">

          <input
            type="email"
            name="email"
            placeholder="Email"
            className="border px-4 py-3 rounded-lg text-lg"
            required
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            className="border px-4 py-3 rounded-lg text-lg"
            required
          />

          {error && (
            <p className="text-red-600 text-center text-sm">{error}</p>
          )}

          <button
            type="submit"
            className="bg-black text-white py-3 rounded-full text-lg font-semibold hover:bg-neutral-800 transition"
          >
            Login
          </button>
        </form>

        <p className="text-center mt-6 text-gray-600">
          Don’t have an account?{" "}
          <a href="/signup" className="text-black font-semibold hover:underline">
            Sign up
          </a>
        </p>

      </div>
    </div>
  );
}
