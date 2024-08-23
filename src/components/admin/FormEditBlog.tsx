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
import { Toaster } from "react-hot-toast";
import TextEditor from "../ui/TextEditor.jsx";

const EditorComp = dynamic(() => import("../EditorComponent"), { ssr: false });

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

    alert("Post updated");

    router.push("/admin/blogs");
  };

  useEffect(() => {
    console.log(metaData);
  }, [metaData]);

  return (
    <main className="space-y-4 max-w-[1024px] mx-auto">
      <BannerUpload metaData={metaData} setMetaData={setMetaData} />
      {/* <Suspense fallback={<p>Loading Editor...</p>}>
        <EditorComp markdown={content} editorRef={ref} />
      </Suspense> */}
      <div className="flex items-center gap-4 group">
        <h3>{metaData.title !== "" ? metaData.title : "Add Title"}</h3>
        <button
          className="invisible group-hover:visible duration-100"
          onClick={() => setEditMetaData(true)}
        >
          <CiEdit size={20} />
        </button>
      </div>

      <hr className="w-full h-2" />
      <TextEditor />
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
