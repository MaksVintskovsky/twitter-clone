import { NextResponse } from "next/server";
import connectDB from "@/lib/mongoDB";
import Tweet from "@/models/Tweet";
import { getUserFromToken } from "@/lib/getUserFromToken";
import cloudinary from "@/lib/cloudinary";

export async function POST(req) {
  try {
    await connectDB();

    const user = await getUserFromToken();
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const formData = await req.formData();
    const content = formData.get("content") || "";
    const file = formData.get("image");

    if (!content.trim() && !file) {
      return NextResponse.json({ error: "Content or image required" }, { status: 400 });
    }

    let imageUrl = "";

    // If tweet has an image → upload to Cloudinary
    if (file && file.size > 0) {
      const bytes = await file.arrayBuffer();
      const buffer = Buffer.from(bytes);
      const base64 = `data:${file.type};base64,${buffer.toString("base64")}`;

      const uploadResult = await cloudinary.uploader.upload(base64, {
        folder: "tweets",   // all tweet images stored here
        overwrite: false,   // always create a new file
        resource_type: "image"
      });

      imageUrl = uploadResult.secure_url;
    }

    // Save tweet into database
    const newTweet = await Tweet.create({
      author: user.id,
      content,
      image: imageUrl,
      likedBy: [],
      likes: 0,
    });

    return NextResponse.json(
      {
        message: "Tweet posted!",
        tweet: newTweet,
      },
      { status: 200 }
    );

  } catch (err) {
    console.error("Error posting tweet:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
