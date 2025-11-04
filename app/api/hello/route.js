import { NextResponse, NextRequest } from "next/server";
import fs from "node:fs/promises";

/**
 * @param {NextRequest} request
 */
// export async function GET(request) {
//   console.log("Request to", request.url);
//   return NextResponse.json({ ping: "pong" });
// }


export async function GET() {
  try {
    const data = await fs.readFile("tweetsDataBase.txt", { encoding: "utf8" });
    return NextResponse.json({ 
      content: data,
    }, {
      status: 200,
    });
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


// export async function POST(request) {
//   try {
//     const data = await request.json(); //  — принимает JSON от клиента → const data = await request.json();
//     console.log("Received text:", data.text); // логирует введённый текст в терминал (сервер).
//     return NextResponse.json({ 
//       message: data.text,
//     }, {
//       status: 200,
//     });
//   } catch (error) {
//     console.error("Error:", error);
//     return NextResponse.json({ error: "Something went wrong" }, {
//       status: 500,
//     });
//   }
// }

export async function POST(request) {
  try {
    const data = await request.json();
    const text = data.text;
    await fs.writeFile("tweetsDataBase.txt", text, { encoding: "utf8" });
    console.log("Received text:", text);
    return NextResponse.json({ 
      message: "Your text has been saved successfully!",
    }, {
      status: 200,
    });
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json({ error: "Something went wrong" }, {
      status: 500,
    });
  }
}