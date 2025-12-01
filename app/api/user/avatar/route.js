import { NextResponse } from "next/server";
import connectDB from "@/lib/mongoDB";
import User from "@/models/User";
import { getUserFromToken } from "@/lib/getUserFromToken";
import { writeFile } from "fs/promises";
import path from "path";

export async function POST(req) {
  try {
    await connectDB();

    const { id: userId } = (await getUserFromToken()) || {};
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const formData = await req.formData();
    const file = formData.get("avatar");
    if (!file || file.size === 0) {
      return NextResponse.json({ error: "No file" }, { status: 400 });
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const uploadDir = path.join(process.cwd(), "public", "avatars");
    const ext = file.name.split(".").pop();
    const fileName = `avatar-${userId}.${ext}`;

    await writeFile(path.join(uploadDir, fileName), buffer);

    const avatarPath = `/avatars/${fileName}`;

    await User.findByIdAndUpdate(userId, { avatar: avatarPath });

    return NextResponse.json({ message: "Avatar updated", avatar: avatarPath });
  } catch (err) {
    console.error("Error uploading avatar:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
