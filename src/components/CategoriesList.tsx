import { CATEGORIES } from "@/lib/data";
import React from "react";

export default function CategoriesList() {
  return (
    <div className="overflow-x-auto">
      <div className="text-2xl font-semibold text-zinc-900 mb-2">
        Categories
      </div>
      <div className="flex items-stretch gap-4">
        {CATEGORIES.map((item, idx) => (
          <div
            key={idx}
            className="py-2 px-4 bg-zinc-200 rounded-full font-medium text-zinc-800 text-nowrap"
          >
            {item.label}
          </div>
        ))}
      </div>
    </div>
  );
}
