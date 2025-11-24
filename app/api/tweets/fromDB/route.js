
// import connectDB from "@/lib/mongoDB";
// import Tweet from "@/models/Tweet";

// export async function GET() {
//   await connectDB();
//   const tweets = await Tweet.find().sort({ createdAt: -1 });
//   return Response.json(tweets);
// }

// export async function POST(req) {
//   await connectDB();
//   const data = await req.json();
//   const newTweet = await Tweet.create({
//     user: data.user,
//     content: data.content,
//   });
//   return Response.json(newTweet);
// }


import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import mongoose from "mongoose";
import Tweet from "@/models/Tweet";
import Like from "@/models/Like";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET;

async function getUserId() {
  const cookieStore = await cookies();
  const tokenCookie = cookieStore.get("token") || cookieStore.get("authToken");
  if (!tokenCookie) return null;

  try {
    const decoded = jwt.verify(tokenCookie.value, JWT_SECRET);
    return decoded.userId || decoded.id || null;
  } catch {
    return null;
  }
}

// GET /api/tweets/fromDB
export async function GET() {
  try {
    const userId = await getUserId();

    // 1. Получаем все твиты
    const tweets = await Tweet.find().sort({ createdAt: -1 }).lean();

    const tweetIds = tweets.map((t) => t._id);

    // 2. Получаем лайки КАЖДОГО твита одним запросом
    const likesAgg = await Like.aggregate([
      { $match: { tweetId: { $in: tweetIds } } },
      {
        $group: {
          _id: "$tweetId",
          count: { $sum: 1 },
          users: { $push: "$userId" }
        }
      }
    ]);

    // Переводим в удобную карту
    const likeMap = new Map();
    likesAgg.forEach((item) => {
      likeMap.set(String(item._id), {
        likes: item.count,
        users: item.users,
      });
    });

    // 3. Объединяем результаты
    const enrichedTweets = tweets.map((tweet) => {
      const likesInfo = likeMap.get(String(tweet._id)) || {
        likes: 0,
        users: [],
      };

      return {
        ...tweet,
        likes: likesInfo.likes,
        isLiked: userId
          ? likesInfo.users.some(
              (u) => String(u) === String(userId)
            )
          : false,
      };
    });

    return NextResponse.json(enrichedTweets);
  } catch (err) {
    console.error("Error in /api/tweets/fromDB:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

