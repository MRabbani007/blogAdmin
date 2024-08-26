import { getBlogs } from "@/lib/firebase";
import { IoSearch } from "react-icons/io5";
import Pagination from "@/components/Pagination";
import CardBlogPost from "@/components/blogs/CardBlogPost";

export default async function Home() {
  const response = await getBlogs(1);
  const { count, blogs } = response;

  return (
    <main className="flex-shrink-0 max-w-[1024px] min-w-[1024px] w-full mx-auto">
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
      <p className="py-2 px-4 bg-zinc-300 dark:bg-zinc-800 w-fit">
        Latest Posts
      </p>
      <div className="space-y-4">
        {blogs.map((item, index) => (
          <CardBlogPost blog={item} key={index} />
        ))}
      </div>
      <div>
        <Pagination count={count} />
      </div>
    </main>
  );
}
