"use client";

import dynamic from "next/dynamic";
import React, { Suspense, useEffect, useRef, useState } from "react";
import { MetaData } from "../../../types";
import { MDXEditorMethods } from "@mdxeditor/editor";
import { updateDocument, uploadFile } from "@/lib/firebase";
import { useRouter } from "next/navigation";
import { CiEdit } from "react-icons/ci";
import FormEditMetaData from "./FormEditMetaData";
import BannerUpload from "./BannerUpload";
import toast, { Toaster } from "react-hot-toast";
import MetaDataPreview from "./MetaDataPreview";

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

  return (
    <main className="space-y-4 mx-auto">
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
        <button
          onClick={handleSave}
          className="py-2 px-4 rounded-lg bg-purple-600"
        >
          Save
        </button>
        <button className="py-2 px-4 rounded-lg bg-purple-600">Delete</button>
      </div>
    </main>
  );
}
