
import { NextResponse } from "next/server";
import connectDB from "@/lib/mongoDB";
import Tweet from "@/models/Tweet";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";

async function getUserId() {
  const cookieStore = await cookies();
  const token = cookieStore.get("token");
  if (!token) return null;

  try {
    const decoded = jwt.verify(token.value, process.env.JWT_SECRET);
    return decoded.id || null;
  } catch {
    return null;
  }
}

export async function GET() {
  try {
    await connectDB();
    const userId = await getUserId();

    const tweets = await Tweet.find().sort({ createdAt: -1 }).lean();

    const mapped = tweets.map((tweet) => ({
      ...tweet,
      isLiked: userId ? tweet.likedBy.includes(userId) : false,
      likes: tweet.likedBy.length,
    }));

    return NextResponse.json(mapped);
  } catch (err) {
    console.error("GET /api/tweets/fromDB error:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
