"use client";

import React, { Suspense, useEffect, useRef, useState } from "react";
import FormUploadFile from "../FormUploadFile";
import { createDoc, uploadFile } from "@/lib/firebase";
import { MDXEditorMethods } from "@mdxeditor/editor";
import { useRouter } from "next/navigation";
import { MetaData } from "../../../types";
import { CiEdit } from "react-icons/ci";
import FormEditMetaData from "./FormEditMetaData";
import BannerUpload from "./BannerUpload";
import toast, { Toaster } from "react-hot-toast";
import dynamic from "next/dynamic";
import MetaDataPreview from "./MetaDataPreview";
import { Button } from "../ui/button";
import { CreateBlogPost } from "@/lib/actions";

const EditorComponent = dynamic(() => import("../EditorComponent"), {
  ssr: false,
});

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
      status: "draft",

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

  const handleSave = async () => {
    try {
      if (metaData.slug === "") {
        alert("Please provide title for this post");
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
        downloadURL: downloadURL ?? "",
      });

      toast.success("Blog created");

      router.push("/admin/blogs");
    } catch (error) {
      toast.error("Error Saving Post");
    }
  };

  const handleCreate = async () => {
    try {
      const { status } = await CreateBlogPost(metaData);
      if (status === "success") {
        toast.success("Blog Created");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="space-y-4">
      <BannerUpload metaData={metaData} setMetaData={setMetaData} />

      <MetaDataPreview metaData={metaData} setEditMetaData={setEditMetaData} />

      <Suspense fallback={null}>
        <EditorComponent markdown={""} editorRef={ref} />
      </Suspense>
      <div className="flex items-center gap-4 justify-center">
        <Button variant="secondary" onClick={() => setShowForm(true)}>
          Import File
        </Button>
        <Button onClick={() => handleSave()}>Save Draft</Button>
        <Button onClick={() => handleCreate()}>Create Post</Button>
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
    </div>
  );
}
