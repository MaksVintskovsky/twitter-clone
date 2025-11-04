"use client";

import { useState } from "react";

export default function PostTweet() {
  const [text, setText] = useState("");
  const [fileContent, setFileContent] = useState("");
  const [status, setStatus] = useState(""); 

  const sendTweet = async () => {
    if (!text.trim()) return setStatus("Please enter some text first!");
    try {
      const res = await fetch("/api/hello", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text }),
      });
      const data = await res.json();
      console.log(data.message)
      setText(""); 
    } catch (error) {
      console.error("Error sending text:", error);
      setStatus("Error sending text. Please try again.");
    }
  };

  const getTweet = async () => {
    try {
      const res = await fetch("/api/hello");
      const data = await res.json();
      setFileContent(data.content);
    } catch (error) {
      console.error("Error fetching text:", error);
    }
  };

  return (
    <div className="flex flex-col items-center gap-3 mt-6">
      <div className="flex items-center gap-2 mt-6">
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Type something..."
          className="border border-gray-300 rounded px-3 py-2 w-64"
        />
        <button
          onClick={sendTweet}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Send
        </button>
        <button onClick={getTweet} style={{ marginLeft: "10px" }}>
          📂 Load tweet
        </button>
      </div>
        <p style={{ color: "green", marginTop: "10px" }}>{status}</p>
        {fileContent && (
          <p className="mt-4 text-green-600">{fileContent}</p> // 👈 отображаем ответ от сервера
        )}
    </div>
  );
}
