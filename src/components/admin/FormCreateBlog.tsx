"use client";

import React, { Suspense, useEffect, useRef, useState } from "react";
import FormUploadFile from "../FormUploadFile";
import Editor from "../EditorComponent";
import { createDoc, uploadFile } from "@/lib/firebase";
import { MDXEditorMethods } from "@mdxeditor/editor";
import { useRouter } from "next/navigation";
import { MetaData } from "../../../types";
import { CiEdit } from "react-icons/ci";
import FormEditMetaData from "./FormEditMetaData";
import BannerUpload from "./BannerUpload";
import toast, { Toaster } from "react-hot-toast";
import TextEditor from "../ui/TextEditor.jsx";

const template: MetaData = {
  id: "",
  _id: "",

  title: "",
  slug: "",
  detail: "",
  status: "draft",

  category: "",
  tags: [],

  filename: ".mdx",
  pathname: "/blogs/" + "id" + ".mdx",
  downloadURL: "downloadURL" ?? "",

  createdAt: null,
  updatedAt: null,
  publishedAt: null,
};

export default function FormCreateBlog() {
  const router = useRouter();

  const [showForm, setShowForm] = useState(false);
  const [editMetaData, setEditMetaData] = useState(false);

  const ref: React.MutableRefObject<MDXEditorMethods | null> = useRef(null);

  const setMarkdown = (markdown: string | undefined | null) => {
    if (ref.current && markdown) {
      ref.current?.setMarkdown(markdown);
    }
  };

  const [metaData, setMetaData] = useState<MetaData>(() => {
    const id = crypto.randomUUID();
    return {
      id,
      _id: "",

      title: "",
      slug: "",
      detail: "",
      status: "",

      category: "",
      tags: [],

      filename: id + ".mdx",
      pathname: "/blogs/" + id + ".mdx",
      downloadURL: "",

      createdAt: null,
      updatedAt: null,
      publishedAt: null,
    };
  });

  // const [description, setDescription] = useState("");
  const [file, setFile] = useState<File | null>(null);

  useEffect(() => {
    const parseFile = async () => {
      const data = (await file?.text()) ?? "";
      if (ref.current && data) {
        ref.current?.setMarkdown(data);
      }
    };

    if (file) {
      parseFile();
    }
  }, [file]);

  const handleSave = async (status: string = "draft") => {
    if (metaData.slug === "") {
      alert("Provide title");
      return null;
    }

    const text = ref.current?.getMarkdown() ?? "";

    var enc = new TextEncoder();
    const encodedContent = enc.encode(text);
    const newBlogFile = new Blob([encodedContent]);

    const { downloadURL } = await uploadFile(
      newBlogFile,
      "/blogs/",
      metaData.filename
    );

    await createDoc("blogs", {
      ...metaData,
      status,
      downloadURL: downloadURL ?? "",
    });

    toast.success("Blog created");

    router.push("/admin/blogs");
  };

  useEffect(() => {
    console.log(metaData);
  }, [metaData]);

  return (
    <main className="space-y-4">
      <div className="flex items-center gap-4 group">
        <h3>{metaData.title !== "" ? metaData.title : "Add Title"}</h3>
        <button
          className="invisible group-hover:visible duration-100"
          onClick={() => setEditMetaData(true)}
        >
          <CiEdit size={20} />
        </button>
      </div>
      <BannerUpload metaData={metaData} setMetaData={setMetaData} />
      {/* <Suspense fallback={null}>
        <Editor markdown={""} editorRef={ref} />
      </Suspense> */}
      <TextEditor />
      <div className="flex items-center gap-4 justify-between">
        <button
          className="py-2 px-4 rounded-lg bg-purple-600"
          onClick={() => setShowForm(true)}
        >
          Import File
        </button>
        <span className="space-x-4">
          <button
            onClick={() => handleSave("draft")}
            className="py-2 px-4 rounded-lg bg-purple-600"
          >
            Save Draft
          </button>
          <button
            onClick={() => handleSave("published")}
            className="py-2 px-4 rounded-lg bg-purple-700"
          >
            Publish
          </button>
        </span>
      </div>

      <FormEditMetaData
        metaData={metaData}
        setMetaData={setMetaData}
        showForm={editMetaData}
        setShowForm={setEditMetaData}
      />
      <FormUploadFile
        showForm={showForm}
        setShowForm={setShowForm}
        setFile={setFile}
      />
      <Toaster />
    </main>
  );
}
