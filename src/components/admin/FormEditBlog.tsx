"use client";

import dynamic from "next/dynamic";
import React, { FormEvent, Suspense, useRef, useState } from "react";
import { MDXEditorMethods } from "@mdxeditor/editor";
import {
  deleteDocument,
  deleteFile,
  publishPost,
  updateDocument,
  uploadFile,
} from "@/lib/firebase";
import { useRouter } from "next/navigation";
import FormEditMetaData from "./FormEditMetaData";
import BannerUpload from "./BannerUpload";
import toast, { Toaster } from "react-hot-toast";
import MetaDataPreview from "./MetaDataPreview";
import { Button } from "../ui/button";
import { UpdateBlogPost } from "@/lib/actions";
import { BlogPost } from "@prisma/client";

const EditorComponent = dynamic(() => import("../EditorComponent"), {
  ssr: false,
});

const template: BlogPost = {
  id: "",

  title: "",
  slug: "",
  summary: "",

  category: "",
  tags: [],

  featured: false,
  pinned: false,
  status: "DRAFT",

  banner: "",
  thumbnail: "",

  viewsCount: 0,
  likesCount: 0,
  commentsCount: 0,

  authorId: "",

  sortIndex: 0,

  filename: "id" + ".mdx",
  pathname: "/blogs/" + "id" + ".mdx",
  downloadURL: "" ?? "",

  createdAt: new Date(),
  updatedAt: new Date(),
  publishedAt: null,
  archivedAt: null,
};

type Props = { content: string; data: BlogPost };

export default function FormEditBlog({ content, data }: Props) {
  const router = useRouter();
  const ref: React.MutableRefObject<MDXEditorMethods | null> = useRef(null);

  const [editMetaData, setEditMetaData] = useState(false);
  const [metaData, setMetaData] = useState<BlogPost>({ ...template, ...data });

  const handleSave = async () => {
    try {
      const mdx = ref.current?.getMarkdown() ?? "";

      var enc = new TextEncoder();
      const encodedContent = enc.encode(mdx);
      const newBlogFile = new Blob([encodedContent]);

      const { downloadURL } = await uploadFile(
        newBlogFile,
        "/blogs/",
        data.id + ".mdx"
      );

      // await updateDocument({ ...metaData, downloadURL: downloadURL ?? "" });

      const response = await UpdateBlogPost({
        ...metaData,
        downloadURL: downloadURL ?? "",
      });

      toast.success("Post updated");

      router.push("/admin/blogs");
    } catch (error) {
      toast.error("Error Saving Post");
    }
  };

  const handlePublish = async () => {
    try {
      const mdx = ref.current?.getMarkdown() ?? "";

      var enc = new TextEncoder();
      const encodedContent = enc.encode(mdx);
      const newBlogFile = new Blob([encodedContent]);

      const { downloadURL } = await uploadFile(
        newBlogFile,
        "/blogs/",
        data.id + ".mdx"
      );

      // await publishPost({ ...metaData, downloadURL: downloadURL ?? "" });
      const response = await UpdateBlogPost(
        {
          ...metaData,
          downloadURL: downloadURL ?? "",
        },
        true
      );

      toast.success("Post Published");

      router.push("/admin/blogs");
    } catch (error) {
      toast.error("Error Saving Post");
    }
  };

  // const handleMigrate = async () => {
  //   try {
  //     const { status } = await MigratePost(metaData);

  //     if (status === "success") {
  //       toast.success("Post Migrated Successfully");
  //       router.push("/admin/blogs");
  //     } else {
  //       toast.error("Error Migrating Post");
  //     }
  //   } catch (error) {
  //     toast.error("Error Migrating Post");
  //   }
  // };

  const handleDelete = async (event: FormEvent) => {
    event.preventDefault();

    if (confirm("Delete this blog?")) {
      // await deleteFile(data.pathname);

      await deleteDocument(data?.id);

      router.push("/admin/blogs");
    }
  };

  return (
    <div className="flex flex-col gap-4">
      <BannerUpload metaData={metaData} setMetaData={setMetaData} />

      <MetaDataPreview metaData={metaData} setEditMetaData={setEditMetaData} />
      {/* <hr className="w-full h-2" /> */}
      <Suspense fallback={<p>Loading Editor...</p>}>
        <EditorComponent markdown={content} editorRef={ref} />
      </Suspense>
      <FormEditMetaData
        metaData={metaData}
        setMetaData={setMetaData}
        showForm={editMetaData}
        setShowForm={setEditMetaData}
      />
      <Toaster />
      <div className="flex items-center gap-4 justify-center">
        <Button onClick={handleDelete} variant="destructive" className="">
          Delete
        </Button>
        <Button onClick={handleSave} className="ml-auto">
          Save
        </Button>
        {data?.status === "DRAFT" ? (
          <Button variant="default" onClick={handlePublish}>
            Publish
          </Button>
        ) : data?.status === "PUBLISHED" ? (
          <Button variant="secondary">Archive</Button>
        ) : null}
        <Button variant="outline" className="ml-auto">
          Cancel
        </Button>
      </div>
    </div>
  );
}
