// app/api/likes/route.js
import { NextResponse } from "next/server";
import connectDB from "@/lib/mongoDB";
import Like from "@/models/Like";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET;

async function getUserIdFromCookie() {
  const cookieStore = await cookies();
  const tokenCookie = cookieStore.get("token"); 
  if (!tokenCookie) return null;

  try {
    const payload = jwt.verify(tokenCookie.value, JWT_SECRET);
    return payload.userId || payload.id || null;
  } catch (err) {
    return null;
  }
}

// POST -> поставить лайк
export async function POST(request) {
  await connectDB();
  const userId = await getUserIdFromCookie();
  if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const body = await request.json();
  const { tweetId } = body;
  if (!tweetId) return NextResponse.json({ error: "Missing tweetId" }, { status: 400 });

  try {
    // try to create; if duplicate key -> already liked
    await Like.create({ tweetId: String(tweetId), userId });

  } catch (err) {
    // if duplicate key error, ignore
    if (err.code !== 11000) {
      console.error("Like create error:", err);
      return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
  }

  // return updated count
  const count = await Like.countDocuments({ tweetId: String(tweetId) });
  return NextResponse.json({ success: true, tweetId, isLiked: true, likes: count });
}

// DELETE -> убрать лайк (body: { tweetId })
export async function DELETE(request) {
  await connectDB();
  const userId = await getUserIdFromCookie();
  if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const body = await request.json();
  const { tweetId } = body;
  if (!tweetId) return NextResponse.json({ error: "Missing tweetId" }, { status: 400 });

  try {
    await Like.findOneAndDelete({ tweetId: String(tweetId), userId });
  } catch (err) {
    console.error("Like delete error:", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }

  const count = await Like.countDocuments({ tweetId: String(tweetId) });
  return NextResponse.json({ success: true, tweetId, isLiked: false, likes: count });
}

// GET -> получить инфо по одному твиту ?tweetId=... (опционально возвращает isLiked если токен есть)
export async function GET(request) {
  await connectDB();
  const url = new URL(request.url);
  const tweetId = url.searchParams.get("tweetId");
  if (!tweetId) return NextResponse.json({ error: "Missing tweetId" }, { status: 400 });

  const userId = await getUserIdFromCookie();
  const likes = await Like.countDocuments({ tweetId: String(tweetId) });

  let isLiked = false;
  if (userId) {
    isLiked = !!(await Like.findOne({ tweetId: String(tweetId), userId }));
  }

  return NextResponse.json({ tweetId, likes, isLiked });
}
