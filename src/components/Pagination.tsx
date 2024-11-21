"use client";

import { ITEMS_PER_PAGE } from "@/lib/data";
import { usePathname, useRouter } from "next/navigation";
import { Button } from "./ui/button";

type Props = {
  count: number;
  activePage: number;
};

export default function Pagination({ count, activePage }: Props) {
  const pathname = usePathname();
  const router = useRouter();

  const hasPrev = activePage > 1;
  const hasNext = activePage < count / ITEMS_PER_PAGE;

  const handlePage = (page: number) => {
    router.push(`${pathname}?page=${page + 1}`);
  };

  return (
    <div className="flex items-center gap-2 ml-auto">
      <Button disabled={!hasPrev} onClick={() => handlePage(activePage - 1)}>
        Prev
      </Button>
      {Array.from({ length: Math.ceil(count / ITEMS_PER_PAGE) }, (_, index) => (
        <Button key={index} onClick={() => handlePage(index)}>
          {index + 1}
        </Button>
      ))}
      <Button disabled={!hasNext} onClick={() => handlePage(activePage + 1)}>
        Next
      </Button>
    </div>
  );
}
