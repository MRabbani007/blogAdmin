import { CATEGORIES } from "@/lib/data";
import Link from "next/link";
import React from "react";

export default function Topics() {
  return (
    <div className="flex-1 max-w-[300px] p-4">
      <h3 className="mb-2">Topics</h3>
      <ul className="flex flex-wrap gap-4">
        {CATEGORIES.map((item, index) => (
          <Link
            key={index}
            href={"/"}
            className="py-1 px-2 text-sm font-light rounded-full bg-zinc-800 w-fit"
            // href={{ pathname: `/`, query: { topic: item.value } }}
          >
            <li>{item.label}</li>
          </Link>
        ))}
      </ul>
    </div>
  );
}
