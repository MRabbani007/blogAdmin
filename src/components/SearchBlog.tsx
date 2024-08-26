"use client";

import React, { FormEvent, useState } from "react";
import { IoSearch } from "react-icons/io5";

export default function SearchBlog() {
  const [search, setSearch] = useState("");

  const onSubmit = (event: FormEvent) => {
    event.preventDefault();
  };

  return (
    <form
      onSubmit={onSubmit}
      className="flex items-center gap-4 py-2 px-4 bg-zinc-300 dark:bg-zinc-950 rounded-lg"
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
