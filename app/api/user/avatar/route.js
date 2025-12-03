// import { NextResponse } from "next/server";
// import connectDB from "@/lib/mongoDB";
// import User from "@/models/User";
// import { getUserFromToken } from "@/lib/getUserFromToken";
// import { writeFile } from "fs/promises";
// import path from "path";

// export async function POST(req) {
//   try {
//     await connectDB();

//     const { id: userId } = (await getUserFromToken()) || {};
//     if (!userId) {
//       return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
//     }

//     const formData = await req.formData();
//     const file = formData.get("avatar");
//     if (!file || file.size === 0) {
//       return NextResponse.json({ error: "No file" }, { status: 400 });
//     }

//     const bytes = await file.arrayBuffer();
//     const buffer = Buffer.from(bytes);

//     const uploadDir = path.join(process.cwd(), "public", "avatars");
//     const ext = file.name.split(".").pop();
//     const fileName = `avatar-${userId}.${ext}`;

//     await writeFile(path.join(uploadDir, fileName), buffer);

//     const avatarPath = `/avatars/${fileName}`;

//     await User.findByIdAndUpdate(userId, { avatar: avatarPath });

//     return NextResponse.json({ message: "Avatar updated", avatar: avatarPath });
//   } catch (err) {
//     console.error("Error uploading avatar:", err);
//     return NextResponse.json({ error: "Server error" }, { status: 500 });
//   }
// }



import { NextResponse } from "next/server";
import connectDB from "@/lib/mongoDB";
import User from "@/models/User";
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
    const file = formData.get("avatar");

    if (!file || file.size === 0) {
      return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
    }

    // Convert file → buffer → base64 (Cloudinary requires base64 or filepath)
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const base64 = `data:${file.type};base64,${buffer.toString("base64")}`;

    // Upload to Cloudinary (replace old avatar)
    const uploadResult = await cloudinary.uploader.upload(base64, {
      folder: "avatars",
      public_id: `avatar-${user.id}`, // same name → Cloudinary replaces the old file
      overwrite: true,
      invalidate: true
    });

    // Cloudinary returns a HTTPS URL
    const avatarUrl = uploadResult.secure_url;

    // Update user document
    await User.findByIdAndUpdate(user.id, { avatar: avatarUrl });

    return NextResponse.json({
      message: "Avatar updated",
      avatar: avatarUrl
    });

  } catch (err) {
    console.error("Avatar upload error:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
