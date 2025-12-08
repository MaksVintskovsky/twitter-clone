"use client";
import React from "react";
import { useEffect, useState } from "react";
import Image from "next/image";
import TweetLike from '@/app/components/TweetLikes';

import { timeAgo } from "@/lib/timeAgo";

import { VerifiedIcon } from 'lucide-react';
import { BiMessageRounded } from "react-icons/bi";
import { BiRepost } from "react-icons/bi";
import { VscGraph } from "react-icons/vsc";
import { CiBookmark } from "react-icons/ci";
import { FiShare } from "react-icons/fi";


function TweetPage({ params }) {
    const { id } = React.use(params);
    const [tweet, setTweet] = useState(null);

    useEffect(() => {
        async function loadTweet() {
            const res = await fetch(`/api/tweets/${id}`, {
            credentials: "include"
            });
            const data = await res.json();
            setTweet(data || []);
        }
        loadTweet();
    }, [id]);


    console.log(tweet)
    if (!tweet) return <div>Loading...</div>;

    return (
        <div className="flex gap-1 w-full p-3">
            <div>
                <div className='w-10 h-10'>
                    <Image 
                        width={40}
                        height={40}
                        src={tweet?.author.avatar || "/defaultAvatar.png"}
                        alt="avatar" 
                        className="w-auto h-10 rounded-full object-cover"
                        priority
                    />
                </div>
            </div>
            <div className=" w-full">
                <div id='tweetHeader' className="flex gap-2 items-center">
                    <div>
                        <p className='font-bold text-black'>{tweet?.author.name}</p>
                    </div>
                    <div>
                        <VerifiedIcon className="w-5 h-5 stroke-current group-hover:stroke-pink-600" />
                    </div>
                    <div>
                        <p className="text-gray-500">@{tweet?.author.nickName} ·</p>
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
                            src={tweet.image || "/tweetAlt.jpg"} 
                            alt="tweet image" 
                            className="rounded-lg max-h-[300px] w-full h-auto object-cover"
                            priority
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
                        <TweetLike
                            tweetId={tweet._id}
                            initialLikes={tweet.likes}
                            initialIsLiked={tweet.isLiked}
                        />
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
    );
}

export default TweetPage;