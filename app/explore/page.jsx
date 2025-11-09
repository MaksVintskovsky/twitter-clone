"use client";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
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
    <div className="max-w-xl mx-auto p-4">
      <SearchBar placeholder="Search Post..." />
      <h1 className="text-2xl font-bold my-4">Search Results for "{query}"</h1>
      {posts.length === 0 ? (
        <p>No posts found.</p>
      ) : (
        posts.map((post) => (
          <div key={post.id} className="border-b py-4">
            <h2 className="text-xl font-semibold">{post.title}</h2>
            <p>{post.body}</p>
          </div>
        ))
      )}
    </div>
  );
}
