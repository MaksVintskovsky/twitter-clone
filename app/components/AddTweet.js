'use client'

import React, { useState } from 'react'

export default function AddTweet() {
  const [tweets, setTweets] = useState([])
  const [newTitle, setNewTitle] = useState('')
  const [newBody, setNewBody] = useState('')

  function addTweet(e) {
    e.preventDefault()
    const title = newTitle.trim()
    const body = newBody.trim()
    if (!title || !body) return

    const tweet = {
      id: Date.now(),
      title,
      body,
      reactions: { likes: 0, dislikes: 0 },
    }

    setTweets(prev => [tweet, ...prev])
    setNewTitle('')
    setNewBody('')
  }

  return (
    <div className="w-full max-w-3xl mx-auto mb-6 p-4 border rounded bg-white">
      <form onSubmit={addTweet} className="space-y-3">
        <input
          value={newTitle}
          onChange={(e) => setNewTitle(e.target.value)}
          placeholder="Title"
          className="w-full p-2 border rounded"
          maxLength={100}
        />
        <textarea
          value={newBody}
          onChange={(e) => setNewBody(e.target.value)}
          placeholder="What's happening?"
          className="w-full p-2 border rounded"
          rows={3}
          maxLength={500}
        />
        <div className="flex justify-end">
          <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded">
            Tweet
          </button>
        </div>
      </form>

      <div className="mt-6 space-y-4">
        {tweets.map((t) => (
          <article key={t.id} className="p-3 border rounded">
            <h3 className="text-lg font-semibold mb-1">{t.title}</h3>
            <p className="text-sm">{t.body}</p>
          </article>
        ))}
      </div>
    </div>
  )
}