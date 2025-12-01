'use client';

import React, { useState } from 'react';
import Image from "next/image";
import TwweetActions from './TweeterActionBar';

export default function AddTweet({ loadTweets }) {
  const [text, setText] = useState("");
  const [status, setStatus] = useState("");
  const [file, setFile] = useState(null); 
  const [preview, setPreview] = useState(null);
  
  const handleFile = (e) => {
    const img = e.target.files[0];
    setFile(img);

    if (img) {
      setPreview(URL.createObjectURL(img));
    }
  };

  const addTweet = async () => {
    if (!text.trim() && !file) {
      return setStatus("Tweet text or image required!");
    }

    try {
      const formData = new FormData();
      formData.append("content", text);
      if (file) formData.append("image", file);

      const res = await fetch("/api/tweets/create", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      console.log(data);

      setText("");
      setFile(null);
      setPreview(null);
      await loadTweets();
      setStatus(data.message);

    } catch (error) {
      console.error("Error saving tweet:", error);
      setStatus("Error saving tweet. Please try again.");
    }
  };

  return (
    <div className="w-full flex px-3 gap-3 border-b border-b-gray-200 pb-3">
      <div>
        <Image 
          width={40}
          height={40}
          src="/pes.jpg" 
          alt="avatar" 
          className="rounded-full"
        />
      </div>

      <div className="flex flex-col gap-2 w-full">

        <textarea
          value={text}
          onChange={(e) => {
            setText(e.target.value);
            e.target.style.height = "auto";
            e.target.style.height = e.target.scrollHeight + "px";
          }}
          placeholder="What's happening?"
          className="px-3 py-2 w-full focus:outline-none  overflow-hidden resize-none"
          rows={1}
        />

        {preview && (
          <Image
            src={preview}
            width={300}
            height={300}
            alt="preview"
            className="rounded-lg"
          />
        )}

        <div className="flex items-center justify-between">

          {/* <input type="file" accept="image/*" onChange={handleFile} /> */}
          <TwweetActions  
             onImageSelect={(file) => {
              setFile(file);
              setPreview(URL.createObjectURL(file));
            }}
            onGifClick={() => console.log("GIF clicked")}
            onEmojiClick={() => console.log("Emoji clicked")}
            onLocationClick={() => console.log("Location clicked")}
          />
          <button
            onClick={addTweet}
            className="bg-gray-500 text-white px-4 py-2 rounded-full hover:bg-gray-600"
          >
            Post
          </button>
        </div>

        <p className="text-green-600">{status}</p>
      </div>

    </div>
  );
}
