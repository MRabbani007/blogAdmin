import { TAGS } from "@/lib/data";
import React from "react";

export default function SideBarTags() {
  return (
    <div>
      <h2 className="font-bold text-xl mb-4">Tags</h2>
      <ul className="flex items-center gap-2 text-sm flex-wrap">
        {TAGS.map((cat, idx) => (
          <li
            key={idx}
            className="bg-zinc-200 dark:bg-zinc-800 rounded-md py-2 px-4"
          >
            {cat.label}
          </li>
        ))}
      </ul>
    </div>
  );
}
