"use client";
import Link from "next/link";
import Image from "next/image";
import Reactions from "./Reactions";
import React, { useState, useEffect } from "react";
import { Content } from "next/font/google";

export default function TweetsFromDisk() {
  const [text, setText] = useState("");
  const [tweets, setTweets] = useState([]);
  const [status, setStatus] = useState(""); 

    useEffect(() => {
        loadTweets();
    }, []);

    const loadTweets = async () => {
      try {
        const res = await fetch("/api/tweets/fromDisk");
        if (!res.ok) throw new Error(`HTTP error! Status: ${res.status}`);

        const data = res ? await res.json() : { tweets: [] };
        console.log(data)
        setTweets(data.tweets || []);
      } catch (error) {
        console.error("Error fetching tweets:", error);
      }
    };

    const addTweet = async () => {
      if (!text.trim()) return setStatus("Please enter some text first!");
      try {
        const res = await fetch("/api/tweets", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              text: text
            }),
        });
        const data = await res.json();
        console.log(data)
        setText("");
        loadTweets();
        setStatus(data.message);
      } catch (error) {
          console.error("Error saving tweet:", error);
          setStatus("Error saving tweet. Please try again.");
      }
    };

  return (
    <>
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
      </div>
      <div className="w-full">
        <p style={{ color: "green", marginTop: "10px" }}>{status}</p>
        <h2 className="text-center text-3xl mb-5"> Tweets from disk</h2>
        {tweets.map((tweet) => (
            <Link
              key={tweet.id}
              href={`/tweet/${tweet.id}`}
              className="block w-full   border-b border-b-gray-200 pb-4 hover:bg-gray-50 p-4  transition">
              <h2 className="text-center text-2xl my-4">Title</h2>
              <p className="mb-2 max-w-full break-words whitespace-pre-line">{tweet.body}</p>
              <Reactions 
                  likes={tweet.likes || 0}
                  dislikes={ 0}
              />
            </Link>
        ))}
      </div>
    </>
  );
}
