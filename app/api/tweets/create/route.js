import connectDB from "@/lib/mongoDB";
import Tweet from "@/models/Tweet";
import { getUserFromToken } from "@/lib/getUserFromToken";

export async function POST(req) {
  try {
    await connectDB();

    const user = await getUserFromToken();
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    const { content } = await req.json();
    if (!content || !content.trim()) {
      return NextResponse.json({ error: "Content is empty" }, { status: 400 });
    }
    
    const newTweet = await Tweet.create({
      user: user.id,
      content: content,
    });
    return NextResponse.json({
      message: "Tweet posted!",
      tweet: newTweet
    });
  } catch (err) {
    console.error("Error posting tweet:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}