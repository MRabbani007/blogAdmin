"use client";

import dynamic from "next/dynamic";
import React, { FormEvent, Suspense, useRef, useState } from "react";
import { MetaData } from "../../../types";
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

const EditorComponent = dynamic(() => import("../EditorComponent"), {
  ssr: false,
});

const template: MetaData = {
  id: "",
  _id: "",

  title: "",
  slug: "",
  detail: "",
  status: "",
  banner: "",

  category: "",
  tags: [],
  sortIndex: 0,

  filename: "id" + ".mdx",
  pathname: "/blogs/" + "id" + ".mdx",
  downloadURL: "downloadURL" ?? "",

  createdAt: null,
  updatedAt: null,
  publishedAt: null,
};

type Props = { content: string; data: MetaData };

export default function FormEditBlog({ content, data }: Props) {
  const router = useRouter();
  const ref: React.MutableRefObject<MDXEditorMethods | null> = useRef(null);

  const [editMetaData, setEditMetaData] = useState(false);
  const [metaData, setMetaData] = useState<MetaData>({ ...template, ...data });

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

      await updateDocument({ ...metaData, downloadURL: downloadURL ?? "" });

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

      await publishPost({ ...metaData, downloadURL: downloadURL ?? "" });

      toast.success("Post Published");

      router.push("/admin/blogs");
    } catch (error) {
      toast.error("Error Saving Post");
    }
  };

  const handleDelete = async (event: FormEvent) => {
    event.preventDefault();

    if (confirm("Delete this blog?")) {
      await deleteFile(data.pathname);

      await deleteDocument(data?.id);
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
        {data?.status === "draft" ? (
          <Button variant="default" onClick={handlePublish}>
            Publish
          </Button>
        ) : data?.status === "published" ? (
          <Button variant="secondary">Archive</Button>
        ) : null}
        <Button variant="outline" className="ml-auto">
          Cancel
        </Button>
      </div>
    </div>
  );
}
