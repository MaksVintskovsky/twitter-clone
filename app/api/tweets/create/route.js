import { NextResponse } from "next/server";
import connectDB from "@/lib/mongoDB";
import Tweet from "@/models/Tweet";
import { getUserFromToken } from "@/lib/getUserFromToken";
import { writeFile } from "fs/promises";
import path from "path";

export async function POST(req) {
  console.log("API hit");
  try {
    await connectDB();

    // Авторизация
    const user = await getUserFromToken();
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Читаем FormData
    const formData = await req.formData();
    const content = formData.get("content") || "";
    const image = formData.get("image"); // Blob или null

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

    // Создаём твит
    const newTweet = await Tweet.create({
      author: user.name,
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
