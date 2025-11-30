'use client'
import React from 'react'
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useAuth } from "@/context/AuthContext";

export default function Header() {
  const pathname = usePathname()
  const { user, logout } = useAuth();

  return (
    <div className="flex w-full border-b border-b-gray-200 items-center justify-around ">
      <Link
        href="/tweets/disk"
        className={`header-link ${
          pathname === "/tweets/disk"
            ? "text-blue-600 font-semibold border-b-2 border-blue-600"
            : "text-gray-600"
        }`}
      >
        Tweets From Disk
      </Link>

      <Link
        href="/tweets/api"
        className={`header-link ${
          pathname === "/tweets/api"
            ? "text-blue-600 font-semibold border-b-2 border-blue-600"
            : "text-gray-600"
        }`}
      >
        Tweets From API
      </Link>

       {user ? (
        <button onClick={logout} className="text-red-600">Logout</button>
      ) : (
        <div className="flex gap-4">
          <Link href="/signup">Sign Up</Link>
          <Link href="/login">Login</Link>
        </div>
      )}
    </div>
  )
}