'use client'
import React from 'react'
import { useState } from 'react'

const Reactions = ({likes = 0, dislikes = 0}) => {
  const [likeCount, setLikeCount] = useState(likes);
  const [dislikeCount, setDislikeCount] = useState(dislikes);
  const [userReaction, setUserReaction] = useState(null);

  const handleLike = (e) => {
    e.preventDefault();
    if (userReaction === 'like') {
      setLikeCount(likeCount - 1);
      setUserReaction(null);
    } else {
      setLikeCount(likeCount + 1);
      if (userReaction === 'dislike') {
        setDislikeCount(dislikeCount - 1);
        
      }
      setUserReaction('like');
    }
  }
  const handleDislike = (e) => {
    e.preventDefault();
    if (userReaction === 'dislike') {
      setDislikeCount(dislikeCount - 1);
      setUserReaction(null);
    } else {
      setDislikeCount(dislikeCount + 1);
      if (userReaction === 'like') {
        setLikeCount(likeCount - 1);
        
      }
      setUserReaction('dislike');
    }
  }

  return (
     <div className="flex gap-4 items-center text-sm text-gray-600">
      <button
        onClick={handleLike}
        className={`transition ${
          userReaction === "like" ? "text-blue-500 font-bold" : "hover:text-blue-400"
        }`}
      >
        👍 {likeCount}
      </button>

      <button
        onClick={handleDislike}
        className={`transition ${
          userReaction === "dislike" ? "text-red-500 font-bold" : "hover:text-red-400"
        }`}
      >
        👎 {dislikeCount}
      </button>
    </div>
  )
}

export default Reactions