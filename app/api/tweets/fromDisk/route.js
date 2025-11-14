import { NextResponse, NextRequest } from "next/server";
import fs from "node:fs/promises";

/**
 * @param {NextRequest} request
 */
const FILE_PATH = "tweets.json";

export async function GET() {
  try {
    const file = await fs.readFile(FILE_PATH, "utf8");
    const tweets = JSON.parse(file);
    return NextResponse.json({ tweets });
  } catch (error) {
    if(error.code === 'ENOENT') {
      return NextResponse.json({ 
        error: "File not found",
      }, {
        status: 404,
      });
    };
    return NextResponse.json({ 
      error: error.message,
      }, {
      status: 500,
    });
  }
}

export async function POST(request) {
  try {
    const data = await request.json();
    const text = data.text;

    let tweets = [];
    try {
        const fileData = await fs.readFile(FILE_PATH, { encoding: "utf8" });
        tweets = fileData? JSON.parse(fileData) : [];
    } catch (err) {
        if (err.code !== 'ENOENT') throw err;
    }

    const newTweet = {
        id: Date.now(),
        body: text,
        reactions: { likes: 0, dislikes: 0 },
    };

    tweets.push(newTweet);
    await fs.writeFile(FILE_PATH, JSON.stringify(tweets, null, 2), { encoding: "utf8" });
    console.log("New tweet saved:", newTweet);
    return NextResponse.json({ 
      message: "tweet saved", tweet: newTweet
    }, {
      status: 200,
    });
  } catch (error) {
    console.error("Error saving tweet:", error);
    return NextResponse.json({ error: "Saving went wrong" }, {
      status: 500,
    });
  }
}