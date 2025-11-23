'use client'
import React from 'react'
import Link from "next/link";
import Image from "next/image";
import TweetLike from './TweetLikes';

import { timeAgo } from "@/lib/timeAgo";


import { VerifiedIcon } from 'lucide-react';
import { BiMessageRounded } from "react-icons/bi";
import { BiRepost } from "react-icons/bi";
import { CiHeart } from "react-icons/ci";
import { VscGraph } from "react-icons/vsc";
import { CiBookmark } from "react-icons/ci";
import { FiShare } from "react-icons/fi";
import { useState, useEffect } from "react";

export default function TweetsFromDB() {
  const [text, setText] = useState("");
  const [tweets, setTweets] = useState([]);
  const [status, setStatus] = useState(""); 

    useEffect(() => {
        loadTweets();
    }, []);

    const loadTweets = async () => {
      try {
        const res = await fetch("/api/tweets/fromDB");
        if (!res.ok) throw new Error(`HTTP error! Status: ${res.status}`);

        const data = res ? await res.json() : { tweets: [] };
        console.log(data)
        setTweets(data || []);
      } catch (error) {
        console.error("Error fetching tweets:", error);
      }
    };

    const addTweet = async () => {
      if (!text.trim()) return setStatus("Please enter some text first!");
      try {
        const res = await fetch("/api/tweets/fromDB", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              user: "Maks",
              content: text, 
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
    <div className="w-full">
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
        <h2 className="text-center text-3xl mb-5"> Tweets from MongoDB</h2>

        <div className="w-full ">
          {tweets.map((tweet) => (
              <Link
                key={tweet._id}
                href={`/tweet/${tweet._id}`}
                className="block w-full   border-b border-b-gray-200 pb-4 hover:bg-gray-50 p-4  transition">
                <div className="flex gap-1 w-full">
                  <div>
                    <div>
                      <Image 
                        width={40}
                        height={40}
                        src="/pes.jpg" 
                        alt="avatar" 
                        className="w-auto h-auto rounded-full"
                      />
                    </div>
                  </div>
                  <div className=" w-full">
                    <div id='tweetHeader' className="flex gap-2 items-center">
                      <div>
                        <p className='font-bold text-black'>John Snow</p>
                      </div>
                      <div>
                        <VerifiedIcon className="w-5 h-5 stroke-current group-hover:stroke-pink-600" />
                      </div>
                      <div>
                        @username ·
                      </div>
                      <div>
                        <p className="text-gray-500 text-sm">
                          {timeAgo(tweet.createdAt)}
                        </p>
                      </div>
                    </div>
                    <div id='tweetContent'>
                      <p className="mb-2 max-w-full break-words whitespace-pre-line">{tweet.content}</p>
                      <div className='w-full'>
                        <Image 
                          width={500}
                          height={300}
                          src={tweet.imageURL || "/tweetAlt.jpg"} 
                          alt="tweet image" 
                          className="w-full h-full rounded-lg"
                        />
                      </div>
                    </div>
                    <div id='tweetFooter' className="flex gap-2 w-full items-center justify-between">
                      <div>
                        <button className=" tweetIcon group flex items-center gap-2 p-2 text-gray-600 hover:text-blue-500">
                          <BiMessageRounded className="w-5 h-5 stroke-current group-hover:stroke-blue-600" />
                          <span className=" text-[13px] group-hover:text-blue-500">12K</span>
                        </button>
                      </div>
                      <div>
                        <button className="group flex items-center gap-2 p-2 text-gray-600 hover:text-green-500">
                          <BiRepost className="w-5 h-5 stroke-current group-hover:stroke-green-600" />
                          <span className="text-[13px] group-hover:text-green-500">15K</span>
                        </button>
                      </div>
                      <div>
                        <button className="group flex items-center gap-2 p-2 text-gray-600 hover:text-pink-500">
                          <CiHeart className="w-5 h-5 stroke-current group-hover:stroke-pink-600" />
                          <span className="text-[13px] group-hover:text-pink-500">1068</span>
                        </button>
                        <TweetLike tweetId={tweet._id} initialLikes={tweet.likes || 0} />
                      </div>
                      <div>
                        <button className="group flex items-center gap-2 p-2 text-gray-600 hover:text-blue-500">
                          <VscGraph className="w-5 h-5 stroke-current group-hover:stroke-blue-600" />
                          <span className=" text-[13px] group-hover:text-blue-500">7.8M</span>
                        </button>
                      </div>
                      <div>
                        <div className="flex">
                          <button className="group flex items-center gap-2 text-gray-600 hover:text-blue-500">
                            <CiBookmark className="w-5 h-5 stroke-current group-hover:stroke-blue-600" />
                          </button>
                          <button className="group flex items-center gap-2 p-2 text-gray-600 hover:text-blue-500">
                            <FiShare className="w-5 h-5 stroke-current group-hover:stroke-blue-600" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
