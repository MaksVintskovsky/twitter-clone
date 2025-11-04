"use client";
import Link from "next/link";
import { useState, useEffect } from "react";

export default function TweetApp() {
  const [text, setText] = useState("");
  const [tweets, setTweets] = useState([]);
  const [status, setStatus] = useState(""); 

    useEffect(() => {
        loadTweets();
    }, []);

    const loadTweets = async () => {
      try {
        const res = await fetch("/api/tweets");
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
            body: JSON.stringify({ text }),
        });
        const data = await res.json();
        console.log(data.message)
        setText("");
        loadTweets();
        setStatus(data.message);
      } catch (error) {
          console.error("Error saving tweet:", error);
          setStatus("Error saving tweet. Please try again.");
      }
    };

  return (
    <div className="flex flex-col items-center gap-3 mt-6">
      <div className="flex items-center gap-2 mt-6">
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="What's happening?"
          className="border border-gray-300 rounded px-3 py-2 w-64"
        />
        <button
          onClick={addTweet}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Send
        </button>
      </div>
        <p style={{ color: "green", marginTop: "10px" }}>{status}</p>
        <h2> Tweets from disk</h2>
        {tweets.map((tweet) => (
            <Link
              key={tweet.id}
              href={`/tweet/${tweet.id}`}
              className="block w-full max-w-3xl mx-auto border-b pb-4 hover:bg-gray-50 p-4 rounded transition">
              <h2 className="text-center text-2xl my-4">Title</h2>
              <p className="mb-2">{tweet.body}</p>
              <p className="text-sm text-gray-600">👍 {tweet.reactions?.likes || 0} | 👎 {tweet.reactions?.dislikes || 0}</p>
            </Link>
        ))}
    </div>
  );
}
