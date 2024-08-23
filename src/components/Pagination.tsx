import { ITEMS_PER_PAGE } from "@/lib/data";
import React, { Dispatch, SetStateAction } from "react";

type Props = {
  count?: number;
  searchParams?: { [key: string]: string | string[] | undefined };
};

export default function Pagination({ count, searchParams }: Props) {
  const pages = new Array(Math.ceil((count ?? 0) / ITEMS_PER_PAGE)).fill("");

  return (
    <div className="pagination flex items-center gap-2 ml-auto">
      <button>Prev</button>
      {pages.map((p, index) => (
        <button key={index}>{index + 1}</button>
      ))}
      <button>Next</button>
    </div>
  );
}
