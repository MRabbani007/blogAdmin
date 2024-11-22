import FormEditBlog from "@/components/admin/FormEditBlog";
import { getPostbySlug } from "@/lib/actions";
import { getBlogByName } from "@/lib/firebase";
import { notFound } from "next/navigation";

type Props = {
  params: { id: string };
};

export default async function EditBlogPage({ params }: Props) {
  if (!params.id) notFound();

  const { status, metadata, rawMDX } = await getPostbySlug(
    decodeURIComponent(params.id)
  );

  if (!metadata) notFound();

  return (
    <main>
      <div className="">
        <p className="nunito-sans text-3xl">
          <span className="text-sky-600 font-semibold">Edit </span>
          <span>Blog</span>
        </p>
        <p className="text-sky-600/80 font-extralight text-xl">Admin Panel</p>
      </div>
      {metadata && (
        <FormEditBlog
          content={rawMDX ?? ""}
          data={JSON.parse(JSON.stringify(metadata))}
        />
      )}
    </main>
  );
}
