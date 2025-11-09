"use client";
import { useRouter, useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";

export default function SearchBar({ placeholder = "Search..." }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const initialQuery = searchParams.get("q") || "";
  const [query, setQuery] = useState(initialQuery);

  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      if (query.trim() !== "") {
        router.push(`/search?q=${query}`);
      } else {
        router.push(`/`);
      }
    }, 400);
    return () => clearTimeout(delayDebounce);
  }, [query, router]);

  return (
    <input
      type="text"
      placeholder={placeholder}
      className="w-full p-2 rounded bg-gray-100 dark:bg-gray-800 focus:outline-none"
      value={query}
      onChange={(e) => setQuery(e.target.value)}
    />
  );
}