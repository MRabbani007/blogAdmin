import Image from "next/image";
import Link from "next/link";
import React from "react";
import { GiFeather } from "react-icons/gi";

export default function Footer() {
  return (
    <div className=" bg-sky-950/40 dark:bg-sky-950 p-4 lg:px-8 flex items-start justify-between gap-6">
      <Link href="/" className="flex items-center gap-2">
        {/* <Image
          src="/logo.png"
          width={512}
          height={512}
          alt="Logo"
          className="w-10"
        /> */}
        <GiFeather size={30} />
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
