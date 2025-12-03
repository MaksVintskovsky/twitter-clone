
'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import SidebarUser from "./SidebarUser";

export default function SideBar() {
  const pathname = usePathname()
  const [user, setUser] = useState(null);

  useEffect(() => {
    const loadUser = async () => {
      const res = await fetch("/api/auth/me"); // у тебя этот роут уже есть
      const data = await res.json();
      setUser(data.user);
    };
    loadUser();
  }, []);
  
  return (
    <div className="h-screen p-4 border-r border-gray-200">
      <div className="flex flex-col justify-end gap-x-4 gap-y-2 items-center xl:items-start w-full min-w-[64px]">

        <Link href="/home" className="sidebar-link">
          <Image src="/twitter-x.svg" alt="Home" width={24} height={24} />
          <span className="hidden xl:block"></span>
        </Link>
        <Link href="/home" className="sidebar-link">
          <Image src={pathname === '/home' ? '/home-active.svg' : '/home.svg'} alt="Home" width={24} height={24} />
          <span className="hidden xl:block">Home</span>
        </Link>
        {/* <Link href="/home" className="sidebar-link">
          <Image src={pathname === '/explore' ? '/explore-active.svg' : '/explore.svg'} alt="explore" width={24} height={24} />
          <span className="hidden xl:block">Explore</span>
        </Link> */}
        <Link href="/notifications" className="sidebar-link">
          <Image src={pathname === '/notifications' ? '/notification-active.svg' : '/notification.svg'} alt="notifications" width={24} height={24} />
          <span className="hidden xl:block">Notifications</span>
        </Link>
        <Link href="/messages" className="sidebar-link">
          <Image src={pathname === '/messages' ? '/messages-active.svg' : '/messages.svg'} alt= "messages" width={24} height={24} />
          <span className="hidden xl:block">Messages</span>
        </Link>
        <Link href="/grok" className="sidebar-link">
          <Image src={pathname === '/grok' ? '/grok-active.svg' : '/grok.svg'} alt= "grok" width={24} height={24} />
          <span className="hidden xl:block">Grok</span>
        </Link>
        <Link href="/bookmarks" className="sidebar-link">
          <Image src={pathname === '/bookmarks' ? '/bookmarks-active.svg' : '/bookmarks.svg'} alt="notifications" width={24} height={24} />
          <span className="hidden xl:block">Bookmarks</span>
        </Link>
        <Link href="/communities" className="sidebar-link">
          <Image src={pathname === '/communities' ? '/communities-active.svg' : '/communities.svg'} alt="notifications" width={24} height={24} />
          <span className="hidden xl:block">Communities</span>
        </Link>
        <Link href="/premium" className="sidebar-link">
          <Image src={pathname === '/premium' ? '/twitter-x.svg' : '/twitter-x.svg'} alt="notifications" width={24} height={24} />
          <span className="hidden xl:block">Premium</span>
        </Link>
        <Link href="/profile" className="sidebar-link">
          <Image src={pathname === '/profile' ? '/profile-active.svg' : '/profile.svg'} alt="notifications" width={24} height={24} />
          <span className="hidden xl:block">Profile</span>
        </Link>
        <SidebarUser user={user} />
      </div>

    </div>
  )
}