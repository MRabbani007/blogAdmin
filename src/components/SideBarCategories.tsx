import { CATEGORIES } from "@/lib/data";
import React from "react";

export default function SideBarCategories() {
  return (
    <div>
      <h2 className="font-bold text-xl mb-4">Topics</h2>
      <div className="flex items-center gap-2 text-xs flex-wrap">
        {CATEGORIES.map((cat, idx) => (
          <div
            key={idx}
            className="bg-zinc-200 dark:text-zinc-900 py-1 px-2 rounded-md"
          >
            {cat.label}
          </div>
        ))}
      </div>
    </div>
  );
}
