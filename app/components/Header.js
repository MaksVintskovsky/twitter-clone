'use client'
import React from 'react'
import Link from "next/link"
import { usePathname } from "next/navigation"

export default function Header() {
  const pathname = usePathname()

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
    </div>
  )
}

// const Header = () => {
//   return (
//     <div className="flex w-full  border-b  border-b-gray-200 items-center gap-4">
//         <div className="header-link">Tweets From Disk</div>
        
//         <div className="header-link">Tweets from API</div>
//     </div>
//   )
// }

// export default Header