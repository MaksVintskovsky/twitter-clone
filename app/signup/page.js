'use client';
import { useState } from 'react';

export default function SignUpPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');

const handleSubmit = async (e) => {
  e.preventDefault();
  setMessage("");

  if (!email || !password || !confirmPassword) {
    setMessage("All fields are required.");
    return;
  }

  if (password !== confirmPassword) {
    setMessage("Passwords do not match.");
    return;
  }

  try {
    const res = await fetch("/api/auth/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    const data = await res.json();

    if (!res.ok) {
      setMessage(data.error || "Something went wrong.");
      return;
    }

    setMessage("Account created! 🎉");

    // Очистить поля
    setEmail("");
    setPassword("");
    setConfirmPassword("");

  } catch (err) {
    console.error(err);
    setMessage("Server error, bro.");
  }
};


  return (
    <div className="max-w-md mx-auto mt-10 p-6 border rounded-xl shadow">
      <h1 className="text-2xl font-bold mb-4">Sign Up</h1>

      {message && <p className="mb-4 text-red-600">{message}</p>}

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          type="email"
          className="border p-2 rounded"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          className="border p-2 rounded"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <input
          type="password"
          className="border p-2 rounded"
          placeholder="Confirm Password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />

        <button
          type="submit"
          className="bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
        >
          Sign Up
        </button>
      </form>
    </div>
  );
}
