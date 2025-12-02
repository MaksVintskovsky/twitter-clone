import connectDB from "@/lib/mongoDB";
import Tweet from "@/models/Tweet";
import { NextResponse } from "next/server";

export async function GET(req, { params }) {
  await connectDB();
  const tweet = await Tweet.findById(params.id);
  if (!tweet) {
    return NextResponse.json({ error: "Tweet not found" }, { status: 404 });
  }
  return NextResponse.json(tweet, { status: 200 });
}