"use client";
import { useState, useEffect } from "react";
import { CiHeart } from "react-icons/ci";

export default function TweetLike({ tweetId, initialLikes, initialIsLiked }) {
  const [likes, setLikes] = useState(initialLikes);
  const [isLiked, setIsLiked] = useState(initialIsLiked);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLikes(initialLikes);
    setIsLiked(initialIsLiked);
  }, [initialLikes, initialIsLiked]);

  const toggleLike = async (e) => {
    e.preventDefault()
    if (loading) return;
    setLoading(true);

    try {
      const res = await fetch("/api/likes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ tweetId }),
      });

      const data = await res.json();

      if (!res.ok) {
        console.error("Like error:", data.error);
        setLoading(false);
        return;
      }

      // обновляем локальное состояние
      setLikes(data.likes);
      setIsLiked(data.isLiked);

    } catch (error) {
      console.error("Like request failed:", error);
    }

    setLoading(false);
  };

  return (
    <button
      onClick={toggleLike}
      disabled={loading}
      aria-pressed={isLiked}
      className={`group flex items-center gap-2 p-2 ${
        isLiked
          ? "text-pink-500 font-bold"
          : "text-gray-600 hover:text-pink-500"
      }`}
    >
      <CiHeart className="w-5 h-5 stroke-current group-hover:stroke-pink-600" />
      <span className="text-[13px] group-hover:text-pink-500">{likes}</span>
    </button>
  );
}
