import Link from "next/link";
import React from "react";

export default function NotFound() {
  return (
    <main className="flex-1 flex items-center justify-center">
      Could not find this post, <Link href={"/"}>Back to blog posts</Link>
    </main>
  );
}
