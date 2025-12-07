"use client";
import { useSearchParams } from "next/navigation";
import { Suspense, useEffect, useState } from "react";
import SearchBar from "../components/SearchBar";

export default function SearchPage() {
  const searchParams = useSearchParams();
  const query = searchParams.get("q");
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    if (!query) return;
    fetch(`/api/search?q=${query}`)
      .then((res) => res.json())
      .then((data) => setPosts(data));
  }, [query]);

  return (
    <div className="w-full px-5 mx-auto p-4">
      <Suspense fallback={<div>Loading...</div>}>
        <div> <SearchBar placeholder="Search" /></div>
      </Suspense>

      {posts.length === 0 && query && (
        <p className="text-gray-500 mt-4">No results for "{query}"</p>
      )}

      <ul className="mt-4 space-y-4">
        {posts.map((p) => (
          <li key={p.id} className="border-b pb-2">
            <h2 className="font-bold">{p.title}</h2>
            <p className="text-gray-700">{p.body}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
