import Link from "next/link"

async function fetchTweets() {
  try {
    // Добавляем искусственную задержку в 2 секунды
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    const res = await fetch("https://dummyjson.com/posts", { cache: 'no-store' })
    if (!res.ok) throw new Error('Failed to fetch')
    const data = await res.json()
    return data.posts
  } catch (error) {
    console.error('Error:', error)
    return []
  }
}

export default async function ServerHome() {
  const tweets = await fetchTweets()

  return (
    <div className="font-sans min-h-screen p-8">
      <h1 className="text-3xl mb-8">Server-side Loading Example</h1>
      
      {tweets.map((tweet) => (
        <Link 
          key={tweet.id} 
          href={`/tweet/${tweet.id}`}
          className="block border-b w-full mb-8 pb-4"
        >
          <h2 className="text-xl mb-2">{tweet.title}</h2>
          <p>{tweet.body}</p>
        </Link>
      ))}
    </div>
  )
}