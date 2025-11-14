
import { connectDB } from "@/lib/mongoDB";
import Tweet from "@/models/Tweet";

export async function GET() {
  await connectDB();
  const tweets = await Tweet.find().sort({ createdAt: -1 });
  return Response.json(tweets);
}

export async function POST(req) {
  await connectDB();
  const data = await req.json();
  const newTweet = await Tweet.create({
    user: data.user,
    content: data.content,
  });
  return Response.json(newTweet);
}
