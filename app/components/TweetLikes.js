"use client"
import { useState, useEffect} from "react"

import { CiHeart } from "react-icons/ci";

export default function TweetLike({
  tweetId,
  initialLikes = 0,
  initialIsLiked = false,
}) {
  const [likes, setLikes] = useState(initialLikes);
  const [isLiked, setIsLiked] = useState(initialIsLiked);
  const [loading, setLoading] = useState(false);

  // useEffect(() => {
  //   if (!tweetId) return;

  //   let cancelled = false;

  //   const fetchLikes = async () => {
  //     try {
  //       const res = await fetch(
  //         `/api/likes?tweetId=${encodeURIComponent(tweetId)}`,
  //         { credentials: "include" }
  //       );

  //       if (!res.ok) {
  //         // например 401/500 — не валим UI
  //         return;
  //       }

  //       const data = await res.json();
  //       if (cancelled) return;

  //       if (typeof data.likes === "number") {
  //         setLikes(data.likes);
  //       }
  //       if (typeof data.isLiked === "boolean") {
  //         setIsLiked(data.isLiked);
  //       }
  //     } catch (err) {
  //       if (!cancelled) {
  //         console.error("Failed to load likes", err);
  //       }
  //     }
  //   };

  //   fetchLikes();

  //   return () => {
  //     cancelled = true;
  //   };
  // }, [tweetId]);

  // 2) Клик по лайку — POST / DELETE
  const handleClick = async (e) => {
    e?.preventDefault?.();
    e?.stopPropagation?.();

    if (loading || !tweetId) return;

    setLoading(true);

    const prevLikes = likes;
    const prevIsLiked = isLiked;

    if (isLiked) {
      // UNLIKE
      setLikes((l) => Math.max(0, l - 1));
      setIsLiked(false);

      try {
        const res = await fetch("/api/likes", {
          method: "DELETE",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ tweetId }),
          credentials: "include",
        });

        if (!res.ok) {
          throw new Error("Failed to unlike");
        }

        const data = await res.json();

        if (typeof data.likes === "number") {
          setLikes(data.likes);
        } else {
          setLikes(prevLikes - 1);
        }

        if (typeof data.isLiked === "boolean") {
          setIsLiked(data.isLiked);
        }
      } catch (err) {
        console.error(err);
        // откат
        setLikes(prevLikes);
        setIsLiked(prevIsLiked);
      } finally {
        setLoading(false);
      }
    } else {
      // LIKE
      setLikes((l) => l + 1);
      setIsLiked(true);

      try {
        const res = await fetch("/api/likes", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ tweetId }),
          credentials: "include",
        });

        if (!res.ok) {
          throw new Error("Failed to like");
        }

        const data = await res.json();

        if (typeof data.likes === "number") {
          setLikes(data.likes);
        } else {
          setLikes(prevLikes + 1);
        }

        if (typeof data.isLiked === "boolean") {
          setIsLiked(data.isLiked);
        }
      } catch (err) {
        console.error(err);
        // откат
        setLikes(prevLikes);
        setIsLiked(prevIsLiked);
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <button
      onClick={handleClick}
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
