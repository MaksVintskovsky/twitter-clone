import { NextResponse } from "next/server";
import connectDB from "@/lib/mongoDB";
import Tweet from "@/models/Tweet";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";
import { getUserFromToken } from "@/lib/getUserFromToken";

async function getUserId() {
  const cookieStore = await cookies();
  const token = cookieStore.get("token");
  if (!token) return null;

  try {
    const decoded = jwt.verify(token.value, process.env.JWT_SECRET);
    return decoded.email || null;
  } catch {
    return null;
  }
}

// POST → ставим лайк
export async function POST(req) {
  try {
    await connectDB();
    const user = await getUserFromToken();

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { tweetId } = await req.json();

    const tweet = await Tweet.findById(tweetId);
    if (!tweet) return NextResponse.json({ error: "Tweet not found" }, { status: 404 });

    if (tweet.likedBy.includes(user.email)) {
      return NextResponse.json({ error: "Already liked" }, { status: 400 });
    }

    tweet.likedBy.push(String(user.email));
    tweet.likes = tweet.likedBy.length;
    await tweet.save();

    return NextResponse.json({
      tweetId,
      likes: tweet.likes,
      isLiked: true,
    });

  } catch (err) {
    console.error("POST /api/tweets/like error:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}


// DELETE → убираем лайк
export async function DELETE(req) {
  try {
    await connectDB();
    const user = await getUserFromToken();

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { tweetId } = await req.json();

    const tweet = await Tweet.findById(tweetId);
    if (!tweet) return NextResponse.json({ error: "Tweet not found" }, { status: 404 });

    tweet.likedBy = tweet.likedBy.filter((id) => id !== String(user.email));
    tweet.likes = tweet.likedBy.length;
    await tweet.save();

    return NextResponse.json({
      tweetId,
      likes: tweet.likes,
      isLiked: false,
    });

  } catch (err) {
    console.error("DELETE /api/tweets/like error:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
