"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function SignupPage() {
  const router = useRouter();
  const [error, setError] = useState("");

  const handleSignup = async (e) => {
    e.preventDefault();

    const name = e.target.name.value;
    const nickName = e.target.nickName.value;
    const email = e.target.email.value;
    const password = e.target.password.value;
    const confirmpassword = e.target.confirmpassword.value;
    
    if(password !== confirmpassword) {
      setError("passwords do not match");
      return
    }
    if (!name || !nickName || !email || !password || !confirmPassword) {
      setError("All fields are required.");
      return;
    }

    const res = await fetch("/api/auth/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, nickName, email, password }),
    });

    const data = await res.json();

    if (!res.ok) {
      setError(data.error || "Error creating account");
      return;
    }
    setTimeout(() => {
      router.push("/login");
    }, 400)
  };

  return (
    <div className="flex min-h-screen justify-center items-center">
      <div className="w-full max-w-sm p-6">
        <h1 className="text-4xl font-bold mb-8 text-center">Create account</h1>
        <form onSubmit={handleSignup} className="flex flex-col gap-4">

          <input
            type="text"
            name="name"
            placeholder="Name"
            className="border px-4 py-3 rounded-lg text-lg"
            required
          />

          <input
            type="text"
            name="nickName"
            placeholder="Nickname"
            className="border px-4 py-3 rounded-lg text-lg"
            required
          />

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
          <input
            type="password"
            name="confirmPassword"
            placeholder="Confirm password"
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
            Sign up
          </button>
        </form>

        <p className="text-center mt-6 text-gray-600">
          Already have an account?{" "}
          <a href="/login" className="text-black font-semibold hover:underline">
            Sign in
          </a>
        </p>

      </div>
    </div>
  );
}

