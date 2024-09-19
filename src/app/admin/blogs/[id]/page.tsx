import FormEditBlog from "@/components/admin/FormEditBlog";
import { getBlogByName } from "@/lib/firebase";
import { notFound } from "next/navigation";

type Props = {
  params: { id: string };
};

export default async function EditBlogPage({ params }: Props) {
  if (!params.id) notFound();

  const blog = await getBlogByName(decodeURIComponent(params.id));
  // const handleSelect = (event: ChangeEvent<HTMLInputElement>) => {
  //   if (event.target.files) {
  //     setFile(event.target.files[0]);
  //   }
  // };

  if (!blog) notFound();

  const rawMDX = blog?.rawMDX;
  const data = blog?.data;

  if (!rawMDX && !data) notFound();

  return (
    <main>
      <div className="">
        <p className="nunito-sans text-3xl">
          <span className="text-accent font-semibold">Edit </span>
          <span>Blog</span>
        </p>
        <p className="text-accent-80 font-extralight text-xl">Admin Panel</p>
      </div>
      {blog && (
        <FormEditBlog
          content={rawMDX ?? ""}
          data={JSON.parse(JSON.stringify(data))}
        />
      )}
    </main>
  );
}
