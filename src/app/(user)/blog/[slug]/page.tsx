import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import React from "react";
import { IoArrowBack } from "react-icons/io5";
import "highlight.js/styles/github.css";
import { extractMdx } from "@/lib/mdx";
import { getPostbySlug } from "@/lib/actions";
import RelatedPosts from "@/components/blogs/RelatedPosts";

interface Params {
  params: {
    slug: string;
  };
  searchParams: { [key: string]: string | string[] | undefined };
}

export default async function PostPage({ params }: Params) {
  if (!params.slug) notFound();

  const { status, metadata, rawMDX } = await getPostbySlug(
    decodeURIComponent(params.slug)
  );

  if (!rawMDX || !metadata) {
    notFound();
  }

  const { content } = await extractMdx(rawMDX ?? "");

  return (
    <>
      <main className="p-4 lg:px-8 max-w-[1024px] flex-1">
        {metadata?.banner && (
          <div className="overflow-y-hidden relative h-[60vh] w-full  mx-auto overflow-hidden">
            <Image
              alt="banner"
              src={metadata.banner}
              width={1000}
              height={800}
              className={
                "absolute top-1/2 -translate-y-1/2 bottom-0 left-0 right-0 -z-10"
              }
            />
          </div>
        )}
        <div className="">
          <header className="flex items-stretch gap-4 my-4 ">
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
              <h1 className="font-extrabold text-4xl">{metadata?.title}</h1>
              <p className="flex items-center gap-2">
                <span>Mohamad</span>
                <span>-</span>
                <span>Published</span>
                <span className="text-zinc-700 dark:text-zinc-300">
                  {metadata?.publishedAt?.toDateString()}
                </span>
                <span>Last Updated</span>
                <span>{metadata?.updatedAt.toDateString()}</span>
              </p>
              <p className="flex items-center gap-4 text-sm mt-4">
                {metadata?.tags.map((tag, idx) => (
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
          <hr className="my-4" />
          <RelatedPosts slug={params.slug} />
          <hr className="my-4" />
          <Link href="/" className="flex items-center gap-2">
            <IoArrowBack size={30} />
            <span>Go back</span>
          </Link>
        </div>
      </main>
    </>
  );
}

// prose-code:bg-red-900 prose-code:p-4 prose-code:rounded-lg
