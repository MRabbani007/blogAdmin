"use client";

import { CATEGORIES } from "@/lib/data";
import { useRouter, useSearchParams } from "next/navigation";
import React from "react";

export default function CategoriesList() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleSelect = (category: string) => {
    const newParams = new URLSearchParams(window.location.search);
    newParams.set("category", category);

    router.push(`${window.location.pathname}?${newParams}`);
  };

  const selected = searchParams.get("category") ?? "";

  return (
    <div className="">
      <div className="text-2xl font-semibold text-zinc-900 mb-2">
        Categories
      </div>
      <div className="flex flex-wrap items-stretch gap-4">
        {CATEGORIES.map((item, idx) => (
          <div
            key={idx}
            onClick={() => handleSelect(item.value)}
            className={
              (selected === item.value ? "bg-sky-500" : "bg-zinc-200") +
              " py-2 px-4  rounded-full font-medium text-zinc-800 text-nowrap duration-200"
            }
          >
            {item.label}
          </div>
        ))}
      </div>
    </div>
  );
}
