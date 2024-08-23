"use client";

import { uploadFile } from "@/lib/firebase";
import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import { MetaData } from "../../../types";
import toast from "react-hot-toast";

interface Props {
  metaData: MetaData;
  setMetaData: Dispatch<SetStateAction<MetaData>>;
}

export default function BannerUpload({ metaData, setMetaData }: Props) {
  const [file, setFile] = useState<File | null>(null);

  const { getRootProps, getInputProps } = useDropzone({
    onDrop: (acceptedFiles) => {
      setFile(acceptedFiles[0]);
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
        (metaData?.banner || file
          ? ""
          : "hover:border-4 border-2 border-dashed border-zinc-600 ") +
        " w-full flex flex-col gap-4 items-center duration-100"
      }
    >
      {metaData?.banner ? (
        <img src={metaData.banner} className={"w-full h-full object-cover "} />
      ) : file ? (
        <img
          src={URL.createObjectURL(file)}
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
