import Link from "next/link";

async function fetchTweet(id) {

    await new Promise(resolve => setTimeout(resolve, 1000))

    const res = await fetch(`https://dummyjson.com/posts/${id}`);
    const data = await res.json();
    return data;
}

async function TweetPage({ params }) {
    const { id } = await params
    const tweet = await fetchTweet(id);

    return (
        <>
            <div className="">
            <h1>Tweet ID: {tweet.id}</h1>
                <div className="block w-full max-w-3xl mx-auto border-b pb-4">
                    <h2 className="text-center text-2xl mb-4 mt-4">{tweet.title}</h2>
                    <div>{tweet.body}</div>
                    <p>👍 {tweet.reactions.likes}  |  👎 {tweet.reactions.dislikes}</p>
                </div>
                <Link href="/" className="block m-0-auto mt-8 text-blue-500 hover:underline text-center">
                    ← Go to Feed
                </Link>
            </div>
        </>
    );
}

export default TweetPage;