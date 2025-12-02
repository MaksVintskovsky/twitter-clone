import connectDB from "@/lib/mongoDB";
import Tweet from "@/models/Tweet";
import { NextResponse } from "next/server";
import { getUserFromToken } from "@/lib/getUserFromToken";

export async function GET(req, { params }) {
  try {
    await connectDB();

    // Текущий пользователь (может быть null)
    const user = await getUserFromToken();
    const userEmail = user?.email || null;

    // Находим твит + популятим автора + lean -> обычный объект
    const tweet = await Tweet.findById(params.id)
      .populate("author", "name nickName email avatar")
      .lean();

    if (!tweet) {
      return NextResponse.json(
        { error: "Tweet not found" },
        { status: 404 }
      );
    }

    // Проверяем лайк (полностью корректно)
    const isLiked = userEmail
      ? tweet.likedBy.includes(userEmail)
      : false;

    // Количество лайков
    // const likes = tweet.likedBy.length;

    // Финальный объект (без Mongoose мусора)
    const responseTweet = {
      ...tweet,
      // likes,
      isLiked,
    };
    console.log(user)
    
    return NextResponse.json(responseTweet, { status: 200 });

  } catch (err) {
    console.error("GET /api/tweets/[id] error:", err);
    return NextResponse.json(
      { error: "Server error" },
      { status: 500 }
    );
  }
}
