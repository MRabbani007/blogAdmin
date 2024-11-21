import { CATEGORIES } from "@/lib/data";
import React from "react";

export default function SideBarCategories() {
  return (
    <div>
      <h2 className="font-bold text-xl mb-4">Topics</h2>
      <ul className="flex items-center gap-2 text-xs flex-wrap">
        {CATEGORIES.map((cat, idx) => (
          <li key={idx} className="bg-zinc-200 py-1 px-2 rounded-md">
            {cat.label}
          </li>
        ))}
      </ul>
    </div>
  );
}
