
import { NextResponse } from "next/server";
import connectDB from "@/lib/mongoDB";
import Tweet from "@/models/Tweet";
import { getUserFromToken } from "@/lib/getUserFromToken";

export async function GET() {
  try {
    await connectDB();
    const user = await getUserFromToken();

    const tweets = await Tweet.find()
      .populate("author", "name nickName email avatar")
      .sort({ createdAt: -1 })
      .lean();

    const mapped = tweets.map((tweet) => ({
      ...tweet,
      isLiked: user.email ? tweet.likedBy.includes(String(user.email)) : false,
      likes: tweet.likedBy.length,
    }));

    return NextResponse.json(mapped);
  } catch (err) {
    console.error("GET /api/tweets/fromDB error:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
