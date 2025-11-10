"use client";
import { useRouter, useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";
import { Search } from "lucide-react";

export default function SearchBar({ placeholder = "Search" }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const initialQuery = searchParams.get("q") || "";
  const [query, setQuery] = useState(initialQuery);

  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      if (query.trim() !== "") {
        router.push(`/explore?q=${query}`);
      } else {
        // router.push(`/`);
      }
    }, 600);
    return () => clearTimeout(delayDebounce);
  }, [query, router]);

  return (
    <div className="relative w-full ">
      <Search className="absolute left-3 top-3.5 text-gray-400" size={18} />
      <input
        type="text"
        placeholder={placeholder}
        className="w-full p-3 pl-8 rounded-full  border  border-gray-200 focus:outline-blue-600"
        onChange={(e) => setQuery(e.target.value)}
      />
    </div>
  );
}
