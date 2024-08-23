import FormEditBlog from "@/components/admin/FormEditBlog";
import { getBlogByName } from "@/lib/firebase";
import React, { ChangeEvent, useEffect, useState } from "react";
import { notFound } from "next/navigation";

type Props = {
  params: { id: string };
};

export default async function EditBlogPage({ params }: Props) {
  if (!params.id) notFound();

  const blog = await getBlogByName(params.id);
  // const handleSelect = (event: ChangeEvent<HTMLInputElement>) => {
  //   if (event.target.files) {
  //     setFile(event.target.files[0]);
  //   }
  // };

  const rawMDX = blog?.rawMDX;
  const data = blog?.data;

  if (!rawMDX || !data) notFound();

  return (
    <main>
      <div className="">
        <p className="nunito-sans text-3xl">
          <span className="text-purple-600 font-semibold">Edit </span>
          <span>Blog</span>
        </p>
        <p className="text-purple-700 font-extralight text-xl">Admin Panel</p>
      </div>
      {blog && (
        <FormEditBlog
          content={rawMDX}
          data={JSON.parse(JSON.stringify(data))}
        />
      )}
    </main>
  );
}
