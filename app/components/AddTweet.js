'use client'

import React, { useState } from 'react'
import Image from "next/image";

export default function AddTweet({ loadTweets }) {
  const [text, setText] = useState("");
  const [status, setStatus] = useState(""); 

  const addTweet = async () => {
    if (!text.trim()) return setStatus("Please enter some text first!");
    try {
      const res = await fetch("/api/tweets/create", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            content: text, 
          }),
      });
      const data = await res.json();
      console.log(data)
      setText("");
      await loadTweets();
      setStatus(data.message);
    } catch (error) {
        console.error("Error saving tweet:", error);
        setStatus("Error saving tweet. Please try again.");
    }
  };
  return (
          <div className="w-full flex px-3 gap-3 border-b  border-b-gray-200">
        <div>
          <Image 
            width={40}
            height={40}
            src="/pes.jpg" 
            alt="avatar" 
            className="w-auto h-auto rounded-full"
          />
        </div>
        <div className="flex items-center gap-2 justify-between w-full">
          <textarea
            type="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="What's happening?"
            className=" px-3 py-2 w-full"
          />
          <button
            onClick={addTweet}
            className="bg-gray-500 text-white px-4 py-2 rounded-full hover:bg-gray-600 hover:cursor-pointer"
          >
            Post
          </button>
        </div>
        <p style={{ color: "green", marginTop: "10px" }}>{status}</p>
      </div>
  );
}