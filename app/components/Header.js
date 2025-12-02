'use client'
import React from 'react'
import Link from "next/link"
import { usePathname } from "next/navigation"

export default function Header() {
  const pathname = usePathname()

  return (
    <div className="flex w-full border-b border-b-gray-200 items-center justify-around ">
      <div
        href="/tweets/disk"
        className={`header-link ${
          pathname === "/tweets/disk"
            ? "text-blue-600 font-semibold border-b-2 border-blue-600"
            : "text-gray-600"
        }`}
      >
        For you
      </div>

      <div
        href="/tweets/api"
        className={`header-link ${
          pathname === "/tweets/api"
            ? "text-blue-600 font-semibold border-b-2 border-blue-600"
            : "text-gray-600"
        }`}
      >
        Following
      </div>
    </div>
  )
}