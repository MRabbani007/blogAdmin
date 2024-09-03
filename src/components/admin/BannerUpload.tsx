"use client";

import { uploadFile } from "@/lib/firebase";
import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import { MetaData } from "../../../types";
import toast from "react-hot-toast";
import Image from "next/image";

interface Props {
  metaData: MetaData;
  setMetaData: Dispatch<SetStateAction<MetaData>>;
}

const allowedTypes = ["png", "jpg", "jpeg"];

export default function BannerUpload({ metaData, setMetaData }: Props) {
  const [file, setFile] = useState<File | null>(null);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop: (acceptedFiles) => {
      const type = acceptedFiles[0].type;
      if (allowedTypes.includes(type.replace("image/", ""))) {
        setFile(acceptedFiles[0]);
      } else {
        toast.error("Wrong file type");
      }
    },
  });

  const handleSave = async () => {
    if (file) {
      const uploadingToast = toast.loading("Uploading");
      const { downloadURL } = await uploadFile(file, "/images/", file?.name);
      if (downloadURL) {
        setMetaData((curr) => {
          return { ...curr, banner: downloadURL };
        });
        toast.dismiss(uploadingToast);
        toast.success("Banner Uploaded");
      } else {
        toast.dismiss(uploadingToast);
        toast.error("Error Uploading Image");
      }
      setFile(null);
    }
  };

  useEffect(() => {
    if (file) {
      handleSave();
    }
  }, [file]);

  return (
    <div
      {...getRootProps()}
      className={
        (isDragActive
          ? "border-4"
          : file || metaData?.banner
          ? ""
          : "border-2") +
        " border-dashed border-zinc-600 w-full flex flex-col gap-4 items-center duration-100"
      }
    >
      {metaData?.banner ? (
        <Image
          alt="preview"
          src={metaData.banner}
          width={1000}
          height={800}
          className={"w-full h-full object-cover "}
        />
      ) : file ? (
        <Image
          alt="preview"
          src={URL.createObjectURL(file)}
          width={1000}
          height={800}
          className={"w-full h-full object-cover "}
        />
      ) : (
        <p className="w-fit mx-auto p-10">Add Post Banner</p>
      )}
      <input {...getInputProps()} />
      {/* <ul>
            {files && files.map((file) => <li key={file.name}>{file.name}</li>)}
          </ul> */}
    </div>
  );
}
