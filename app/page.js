import Link from "next/link";
// import PostTweet from "./components/PostTweet";
import TweetApp from "./components/PostTweetOnDisk";

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

export default async function Home() {
  const tweets = await fetchTweets()
  
  return (
    <div className="ml-[80px] sm:ml-[200px] font-sans min-h-screen p-15 pb-20 sm:p-20 flex flex-col items-center gap-8">

      {/* <PostTweet /> */}
      <TweetApp />
      <h1 className="text-3xl">Latest Tweets</h1>
      {tweets.map((tweet) => (
        <Link
          key={tweet.id}
          href={`/tweet/${tweet.id}`}
          className="block w-full max-w-3xl mx-auto border-b pb-4 hover:bg-gray-50 p-4 rounded transition">
          <h2 className="text-center text-2xl my-4">{tweet.title}</h2>
          <p className="mb-2">{tweet.body}</p>
          <p className="text-sm text-gray-600">👍 {tweet.reactions?.likes || 0} | 👎 {tweet.reactions?.dislikes || 0}</p>
        </Link>
      ))}
    </div>
  );
}