"use client";

import React, { Suspense, useEffect, useRef, useState } from "react";
import FormUploadFile from "../FormUploadFile";
import { createDoc, uploadFile } from "@/lib/firebase";
import { MDXEditorMethods } from "@mdxeditor/editor";
import { useRouter } from "next/navigation";
import FormEditMetaData from "./FormEditMetaData";
import BannerUpload from "./BannerUpload";
import toast, { Toaster } from "react-hot-toast";
import dynamic from "next/dynamic";
import MetaDataPreview from "./MetaDataPreview";
import { Button } from "../ui/button";
import { CreateBlogPost } from "@/lib/actions";
import { POST_TEMPLATE } from "@/lib/templates";
import { BlogPost } from "@prisma/client";

const EditorComponent = dynamic(() => import("../EditorComponent"), {
  ssr: false,
});

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

  const [metaData, setMetaData] = useState<BlogPost>(() => {
    const id = crypto.randomUUID();
    return { ...POST_TEMPLATE, id, filename: id + ".mdx" };
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

  const handleSave = async (status: "DRAFT" | "PUBLISHED") => {
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
        metaData.filename ?? ""
      );

      const { status: response } = await CreateBlogPost({
        ...metaData,
        status,
        downloadURL: downloadURL ?? "",
      });

      if (response === "success") {
        toast.success("Blog created");
        router.push("/admin/blogs");
      } else {
        toast.error("Error Saving Post");
      }
    } catch (error) {
      toast.error("Error Saving Post");
    }
  };

  const handleCreate = async () => {
    try {
      // const { status } = await CreateBlogPost(metaData);
      // if (status === "success") {
      //   toast.success("Blog Created");
      // }
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
        <Button onClick={() => handleSave("DRAFT")}>Save Draft</Button>
        <Button onClick={() => handleSave("PUBLISHED")}>Create Post</Button>
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
