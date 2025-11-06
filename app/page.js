// import Link from "next/link";
import TweetApp from "./components/TweetsFromDisk";
import Header from "./components/Header";
import TweetsFromAPI from "./components/TweetsFromAPI";
import TweetsFromDisk from "./components/TweetsFromDisk";

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
  
  
  return (
    <div className="font-sans max-w-[600px] min-h-screen flex flex-col items-center gap-8  border-r  border-r-gray-200">
      <Header />
      <TweetsFromDisk />
      <TweetsFromAPI />
    </div>
  );
}