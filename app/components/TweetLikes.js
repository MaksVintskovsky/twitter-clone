"use client"
import { useState } from "react"

export default function TweetLike({ tweetId, initialLikes = 0, initialIsLiked = false }) {
  const [likes, setLikes] = useState(initialLikes)
  const [isLiked, setIsLiked] = useState(initialIsLiked)
  const [loading, setLoading] = useState(false)

  const handleClick = async (e) => {
    e?.preventDefault?.()
    e?.stopPropagation?.()

    if (loading) return
    setLoading(true)

    // optimistic update
    const prevLikes = likes
    const prevIsLiked = isLiked

    if (isLiked) {
      setLikes((l) => Math.max(0, l - 1))
      setIsLiked(false)
      try {
        const res = await fetch("/api/likes", {
          method: "DELETE",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ tweetId }),
          credentials: "include", // send cookies
        })
        if (!res.ok) {
          throw new Error("Failed to unlike")
        }
        const data = await res.json()
        setLikes(data.likes ?? prevLikes - 1)
      } catch (err) {
        // rollback
        setLikes(prevLikes)
        setIsLiked(prevIsLiked)
        console.error(err)
        // optionally show login prompt if 401
        if (err?.message?.includes("401")) {
          // open login modal...
        }
      } finally {
        setLoading(false)
      }
    } else {
      setLikes((l) => l + 1)
      setIsLiked(true)
      try {
        const res = await fetch("/api/likes", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ tweetId }),
          credentials: "include",
        })
        if (!res.ok) {
          throw new Error("Failed to like")
        }
        const data = await res.json()
        setLikes(data.likes ?? prevLikes + 1)
      } catch (err) {
        // rollback
        setLikes(prevLikes)
        setIsLiked(prevIsLiked)
        console.error(err)
        if (err?.message?.includes("401")) {
          // show login
        }
      } finally {
        setLoading(false)
      }
    }
  }

  return (
    <button
      onClick={handleClick}
      disabled={loading}
      aria-pressed={isLiked}
      className={`px-3 py-1 rounded inline-flex items-center gap-2 text-sm transition ${
        isLiked ? "text-blue-600 font-semibold" : "text-gray-600 hover:text-blue-500"
      }`}
    >
      <span className="select-none">👍</span>
      <span>{likes}</span>
    </button>
  )
}
