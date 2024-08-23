import { getBlogByName } from "@/lib/firebase";
import { extractMdx } from "@/lib/utils";
import Link from "next/link";
import { notFound } from "next/navigation";
import React from "react";
import { IoArrowBack } from "react-icons/io5";

interface Params {
  params: {
    slug: string;
  };
}

export default async function PostPage({ params }: Params) {
  if (!params.slug) notFound();

  const blog = await getBlogByName(params.slug);

  const rawMDX = blog?.rawMDX;
  const data = blog?.data;

  if (!rawMDX || !data) notFound();

  const { content } = await extractMdx(rawMDX);

  return (
    <main className="max-w-[1024px] mx-auto w-full">
      {data?.banner && (
        <div className="w-full h-[60vh]">
          <img src={data.banner} className={"w-full h-full object-cover "} />
        </div>
      )}
      <header>
        <h1 className="font-extrabold text-4xl">{data?.title}</h1>
        <p>
          {new Date(
            (data.createdAt?.seconds ?? 0) * 1000 +
              (data.createdAt?.nanoseconds ?? 0) / 1000000
          ).toDateString()}
        </p>
      </header>
      <div className="flex-1 prose dark:prose-invert">{content}</div>
      <Link href="/" className="flex items-center gap-2">
        <IoArrowBack size={30} />
        <span>Go back</span>
      </Link>
    </main>
  );
}

// prose-code:bg-red-900 prose-code:p-4 prose-code:rounded-lg
