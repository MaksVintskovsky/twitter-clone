import React from 'react'
import Link from "next/link";
import Reactions from "./Reactions";

async function fetchTweets() {
  try {
    const res = await fetch("https://dummyjson.com/posts", { cache: 'no-store' })
    if (!res.ok) throw new Error('Failed to fetch tweets')
    const data = await res.json()
    return data.posts
  } catch (error) {
    console.error('Error fetching tweets:', error)
    return []
  }
}

const TweetsFromAPI = async() => {
    const tweets = await fetchTweets()
    return (
        <div className=''>
            <h1 className="text-3xl text-center">Latest Tweets</h1>
                {tweets.map((tweet) => (
                    <Link
                      key={tweet.id}
                      href={`/tweet/${tweet.id}`}
                      className="block w-full max-w-3xl  border-b pb-4  hover:bg-gray-50 p-4 rounded transition">
                      <h2 className="text-center text-2xl my-4">{tweet.title}</h2>
                      <p className="mb-2">{tweet.body}</p>
                      <Reactions 
                          likes={tweet.reactions?.likes || 0}
                          dislikes={tweet.reactions?.dislikes || 0}
                      />
                    </Link>
            ))}
        </div>
    )
}

export default TweetsFromAPI