import { getBlogs } from "@/lib/firebase";
import Link from "next/link";
import { MetaData } from "../../types";
import Image from "next/image";
import { IoSearch } from "react-icons/io5";
import { ITEMS_PER_PAGE } from "@/lib/data";
import Pagination from "@/components/Pagination";

export default async function Home() {
  const blogs: MetaData[] = await getBlogs();

  const count = 12;

  const pages = new Array(Math.ceil(count / ITEMS_PER_PAGE)).fill("");

  return (
    <main className="flex-1 max-w-[1024px] w-full mx-auto">
      {/* <header className="p-4">
        <h1 className="font-extrabold text-6xl">My Blog</h1>
      </header> */}
      <form className="flex items-center gap-4 border-2 border-zinc-800 rounded-lg py-2 px-4">
        <input
          type="text"
          name="search"
          id="search"
          placeholder="Search..."
          className="flex-1 py-2 px-4 outline-none border-none bg-transparent"
        />
        <button type="submit">
          <IoSearch size={30} />
        </button>
      </form>
      <p>Latest Posts</p>
      <div className="space-y-4">
        {blogs.map((item, index) => (
          <div className="p-4 bg-zinc-950 flex items-center gap-4" key={index}>
            <div className="w-20 rounded-full">
              <Image
                src={"/post_icon.png"}
                alt="blog"
                width={360}
                height={360}
              />
            </div>
            <div>
              <h2 className="font-normal text-2xl">
                <Link href={`/blog/${item?.slug}`}>{item?.title}</Link>
              </h2>
              <p className="font-light">
                {new Date(
                  (item.createdAt?.seconds ?? 0) * 1000 +
                    (item.createdAt?.nanoseconds ?? 0) / 1000000
                ).toDateString()}
              </p>
              <div className="space-x-2">
                {item?.tags.map((tag) => (
                  <span key={tag}>{tag}</span>
                ))}
              </div>
            </div>
            {/* <p>{item?.publishedAt}</p> */}
          </div>
        ))}
      </div>
      <div>
        <Pagination />
      </div>
    </main>
  );
}
