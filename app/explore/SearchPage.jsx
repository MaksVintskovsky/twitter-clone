"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import SearchBar from "../components/SearchBar";

export default function SearchPage() {
  const searchParams = useSearchParams();
  const query = searchParams.get("q") || "";
  const [tweets, setTweets] = useState([]);

  useEffect(() => {
    if (!query) {
      setTweets([]);
      return;
    }

    fetch(`/api/search?q=${encodeURIComponent(query)}`)
      .then((res) => res.json())
      .then((data) => setTweets(data))
      .catch((err) => {
        console.error("Search error:", err);
        setTweets([]);
      });
  }, [query]);

  return (
    <div className="w-full px-5 mx-auto p-4">
      <SearchBar placeholder="Search" />

      {tweets.length === 0 && query && (
        <p className="text-gray-500 mt-4">No results for "{query}"</p>
      )}

      <ul className="mt-4 space-y-4">
        {tweets.map((t) => (
          <li key={t._id} className="border-b pb-2">
            <p className="text-gray-700">{t.content}</p>

            {t.image && (
              <img
                src={t.image}
                alt=""
                className="mt-2 rounded-lg max-h-80 object-cover"
              />
            )}

            {typeof t.likes === "number" && (
              <p className="text-sm text-gray-500 mt-1">
                Likes: {t.likes}
              </p>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
