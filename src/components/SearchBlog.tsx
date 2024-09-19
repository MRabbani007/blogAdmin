"use client";

import { useParams, useRouter } from "next/navigation";
import React, { FormEvent, useState } from "react";
import { IoSearch } from "react-icons/io5";

export default function SearchBlog() {
  const router = useRouter();
  const params = useParams();

  const [search, setSearch] = useState(
    decodeURIComponent((params?.slug as string) || "")
  );

  const onSubmit = (event: FormEvent) => {
    event.preventDefault();

    router.push("/search/" + search);
  };

  return (
    <form
      onSubmit={onSubmit}
      className="flex items-center gap-4 py-2 px-4 bg-zinc-100 dark:bg-zinc-900 rounded-lg"
    >
      <input
        type="text"
        id="search"
        name="search"
        placeholder="Search..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="bg-transparent border-none outline-none py-2 px-4 flex-1"
      />
      <button type="submit">
        <IoSearch size={30} />
      </button>
    </form>
  );
}
