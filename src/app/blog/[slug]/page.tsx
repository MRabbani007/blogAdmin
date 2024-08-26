import RelatedPosts from "@/components/blogs/RelatedPosts";
import { getBlogByName } from "@/lib/firebase";
import { extractMdx, genDate } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import React from "react";
import { IoArrowBack } from "react-icons/io5";
import "highlight.js/styles/github.css";

interface Params {
  params: {
    slug: string;
  };
  searchParams: { [key: string]: string | string[] | undefined };
}

export default async function PostPage({ params }: Params) {
  if (!params.slug) notFound();

  const blog = await getBlogByName(decodeURIComponent(params.slug));

  const rawMDX = blog?.rawMDX;
  const data = blog?.data;

  if (!rawMDX || !data) notFound();

  const { content } = await extractMdx(rawMDX);

  return (
    <>
      <main className="max-w-[1024px] mx-auto w-full">
        {data?.banner && (
          <div className="w-full h-[60vh]">
            <img src={data.banner} className={"w-full h-full object-cover "} />
          </div>
        )}
        <header className="flex items-stretch gap-4 my-4">
          <div className="h-20 w-20">
            <Image
              src={"/author.png"}
              alt="profile.png"
              width={800}
              height={800}
              className="w-full h-full object-cover"
            />
          </div>
          <div>
            <h1 className="font-extrabold text-4xl">{data?.title}</h1>
            <p className="flex items-center gap-2">
              <span>Mohamad</span>
              <span>-</span>
              <span>Published</span>
              <span className="italic text-zinc-600 dark:text-zinc-300">
                {genDate(data?.createdAt)}
              </span>
              <span>Last Updated</span>
              <span>{genDate(data?.updatedAt)}</span>
            </p>
            <p className="flex items-center gap-4 text-sm mt-4">
              {data?.tags.map((tag, idx) => (
                <span
                  key={idx}
                  className="py-2 px-4 bg-zinc-300 dark:bg-zinc-800"
                >{`#${tag}`}</span>
              ))}
            </p>
          </div>
        </header>
        <div className="flex-1 prose lg:prose-xl dark:prose-invert ">
          {content}
        </div>
        <hr />
        <Link href="/" className="flex items-center gap-2">
          <IoArrowBack size={30} />
          <span>Go back</span>
        </Link>
        <RelatedPosts params={params} />
      </main>
    </>
  );
}

// prose-code:bg-red-900 prose-code:p-4 prose-code:rounded-lg
