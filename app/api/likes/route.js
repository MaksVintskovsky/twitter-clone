import { NextResponse } from "next/server";
import connectDB from "@/lib/mongoDB";
import Tweet from "@/models/Tweet";
import { getUserFromToken } from "@/lib/getUserFromToken";

export async function POST(req) {
  try {
    await connectDB();

    // получаем юзера из токена
    const user = await getUserFromToken();
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { tweetId } = await req.json();
    if (!tweetId) {
      return NextResponse.json({ error: "Tweet ID required" }, { status: 400 });
    }

    const tweet = await Tweet.findById(tweetId);
    if (!tweet) {
      return NextResponse.json({ error: "Tweet not found" }, { status: 404 });
    }

    const userEmail = String(user.email);

    // ----- TOGGLE -----
    let isLiked;

    if (tweet.likedBy.includes(userEmail)) {
      // снять лайк
      tweet.likedBy = tweet.likedBy.filter(email => email !== userEmail);
      isLiked = false;
    } else {
      // поставить лайк
      tweet.likedBy.push(userEmail);
      isLiked = true;
    }

    tweet.likes = tweet.likedBy.length;
    await tweet.save();

    return NextResponse.json({
      tweetId,
      likes: tweet.likes,
      isLiked,
    });

  } catch (err) {
    console.error("POST /api/tweets/like error:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}