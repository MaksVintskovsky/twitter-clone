import connectDB from "@/lib/mongoDB";
import Tweet from "@/models/Tweet";
import { NextResponse } from "next/server";
import { getUserFromToken } from "@/lib/getUserFromToken";

export async function GET(req, { params }) {
    try {
        console.log(params)
        await connectDB();
        const { id } = await params;

        const user = await getUserFromToken();
        const userEmail = user?.email || null;
        const tweet = await Tweet.findById(id)
        .populate("author", "name nickName email avatar")
        .lean();


        if (!tweet) {
        return NextResponse.json(
            { error: "Tweet not found" },
            { status: 404 }
        );
        }

        const isLiked = userEmail
        ? tweet.likedBy.includes(userEmail)
        : false;

        // Количество лайков
        // const likes = tweet.likedBy.length;

    
        const responseTweet = {
        ...tweet,
        // likes,
        isLiked,
        };
        
        return NextResponse.json(responseTweet, { status: 200 });

    } catch (err) {
        console.error("GET /api/tweets/[id] error:", err);
        return NextResponse.json(
        { error: "Server error" },
        { status: 500 }
        );
    }
}
