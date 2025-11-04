'use client'
import Link from "next/link"
import { useState, useEffect } from "react"

function ClientHome() {
  const [tweets, setTweets] = useState([])
  const [loading, setLoading] = useState(true)

  async function fetchTweets() {
    try {
      setLoading(true)
      // Добавляем искусственную задержку в 2 секунды
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      const res = await fetch("https://dummyjson.com/posts")
      const data = await res.json()
      setTweets(data.posts)
    } catch (error) {
      console.error('Error:', error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchTweets()
  }, [])

  return (
    <div className="font-sans min-h-screen p-8">
      <h1 className="text-3xl mb-8">Client-side Loading Example</h1>
      
      {loading ? (
        <div>Loading tweets...</div>
      ) : (
        tweets.map((tweet) => (
          <Link 
            key={tweet.id} 
            href={`/tweet/${tweet.id}`}
            className="block border-b w-full mb-8 pb-4"
          >
            <h2 className="text-xl mb-2">{tweet.title}</h2>
            <p>{tweet.body}</p>
          </Link>
        ))
      )}
    </div>
  )
}