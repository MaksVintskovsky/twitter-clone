import { NextResponse } from "next/server";
import connectDB from "@/lib/mongoDB";
import Tweet from "@/models/Tweet";
import User from "@/models/User";
import { getUserFromToken } from "@/lib/getUserFromToken";
import { writeFile } from "fs/promises";
import path from "path";

export async function POST(req) {
  try {
    await connectDB();

    // Авторизация
    
    const { id: userId } = await getUserFromToken() || {};
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    const user = await User.findById(userId).lean();
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }
    console.log(user)
    // Читаем FormData
    const formData = await req.formData();
    const content = formData.get("content") || "";
    const image = formData.get("image");

    if (!content.trim() && !image) {
      return NextResponse.json({ error: "Content or image required" }, { status: 400 });
    }

    let imagePath = "";

    // Если есть картинка → сохраняем в /public/uploads
    if (image && image.size > 0) {
      const bytes = await image.arrayBuffer();
      const buffer = Buffer.from(bytes);

      const fileName = `${Date.now()}-${image.name}`;
      const uploadDir = path.join(process.cwd(), "public", "uploads");

      await writeFile(path.join(uploadDir, fileName), buffer);

      imagePath = `/uploads/${fileName}`;
    }

    const newTweet = await Tweet.create({
      author: user._id,
      content: content,
      image: imagePath,  
      likedBy: [],
      likes: 0,
    });

    return NextResponse.json({
      message: "Tweet posted!",
      tweet: newTweet,
    });

  } catch (err) {
    console.error("Error posting tweet:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
