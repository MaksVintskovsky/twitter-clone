import React from 'react'
import Header from "@/app/components/Header"

export default function TweetsLayout({ children }) {
  return (
    <div className="font-sans w-[600px] max-w-[600px] min-h-screen flex flex-col items-center gap-8 border-r border-r-gray-200">
      <Header />
      {children}
    </div>
  )
}
