
'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { FaRegMessage } from "react-icons/fa6";

export default function SideBar() {
  const pathname = usePathname()
  function toActive(e) {
    
  }
  return (
    <div className="h-screen w-[100px] sm:w-[200px] p-4 border-r border-gray-200">
      <div className="flex flex-col gap-x-4 gap-y-2 items-start w-full">

        <Link href="/" className="sidebar-link">
          <Image src="/twitter-x.svg" alt="Home" width={24} height={24} />
          <span className="hidden sm:block"></span>
        </Link>
        <Link href="/" className="sidebar-link">
          <Image src={pathname === '/' ? '/home-active.svg' : '/home.svg'} alt="Home" width={24} height={24} />
          <span className="hidden sm:block">Home</span>
        </Link>
        <Link href="/explore" className="sidebar-link">
          <Image src={pathname === '/explore' ? '/explore-active.svg' : '/explore.svg'} alt="explore" width={24} height={24} />
          <span className="hidden sm:block">Explore</span>
        </Link>
        <Link href="/notifications" className="sidebar-link">
          <Image src={pathname === '/notifications' ? '/notification-active.svg' : '/notification.svg'} alt="notifications" width={24} height={24} />
          <span className="hidden sm:block">Notifications</span>
        </Link>
        <Link href="/messages" className="sidebar-link">
          {/* <Image src="/message.svg" alt="message" width={24} height={24} />  */}
          <FaRegMessage />
          <span className="hidden sm:block">Messages</span>
        </Link>
       

        {/* <button
          onClick={() => setShowAdd((s) => !s)}
          className="ml-2 px-3 py-1 bg-white text-blue-600 rounded"
        >
          {showAdd ? 'Close' : 'Add New Tweet'}
        </button> */}
      </div>

      {/* {showAdd && (
        <div className="mt-4">
          <AddTweet />
        </div>
      )} */}
    </div>
  )
}