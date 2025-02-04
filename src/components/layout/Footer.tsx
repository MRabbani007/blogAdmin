import Image from "next/image";
import Link from "next/link";
import React from "react";

export default function Footer() {
  return (
    <div className="border-t-2 border-zinc-500 p-4 flex items-start justify-between gap-6">
      <Link href="/" className="flex items-center gap-2">
        <Image
          src="/logo.png"
          width={512}
          height={512}
          alt="Logo"
          className="w-10"
        />
        <span className="font-extrabold text-3xl ">Blog</span>
      </Link>
      <div className="flex flex-col gap-2">
        <Link href="/">Blog</Link>
        <Link href="/">About</Link>
        <Link href="/">Contact</Link>
      </div>
    </div>
  );
}
