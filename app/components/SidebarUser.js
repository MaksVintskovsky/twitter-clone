"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function SidebarUser({ user }) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const menuRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(e) {
    if (menuRef.current && !menuRef.current.contains(e.target)) {
        setOpen(false);
    }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  if (!user) return null;

  const handleLogout = async () => {
      try {
      await fetch("/api/auth/logout", { method: "POST" });
      router.replace("/");
      } catch (e) {
      console.error("Logout error:", e);
      }
  };

  return (
    <div className="relative mt-auto">
      <div
        onClick={() => setOpen((prev) => !prev)}
        className="flex items-center justify-between p-3 hover:bg-gray-100 rounded-xl cursor-pointer transition"
      >
        <div className="flex items-center gap-3">
          <Image
            src={user.avatar || "/defaultAvatar.png"}
            alt="avatar"
            width={40}
            height={40}
            className=" w-10 h-10 rounded-full object-cover"
          />
          <div className="flex-col hidden xl:flex">
            <span className="font-semibold leading-tight">{user.name}</span>
            <span className="text-gray-500 text-sm">@{user.nickName}</span>
          </div>
        </div>
      </div>

      {/* Выпадающее меню */}
      {open && (
        <div
          ref={menuRef}
          className="absolute left-0 bottom-16 w-[180px] bg-white shadow-xl rounded-xl py-2 border"
        >
          <button
            className="w-full text-left px-4 py-2 hover:bg-gray-100 transition"
            onClick={() => {
              setOpen(false);
              const event = new CustomEvent("openAvatarModal");
              window.dispatchEvent(event);
            }}
          >
            Profile Picture
          </button>

          <button
            className="w-full text-left px-4 py-2 hover:bg-red-100 text-red-600 transition"
            onClick={handleLogout}
          >
            Logout
          </button>
        </div>
      )}
    </div>
  );
}
