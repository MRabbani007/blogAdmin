"use server";

import { Doc } from "../../types";
import { createDoc, uploadFile } from "./firebase";

export async function createBlog(
  file: Blob | Uint8Array | ArrayBuffer,
  doc: Doc
) {
  const { status, downloadURL } = await uploadFile(
    file,
    "/blogs/",
    doc.filename
  );

  await createDoc({ ...doc, downloadURL: downloadURL ?? "" });
}

export async function updateBlog(
  file: Blob | Uint8Array | ArrayBuffer,
  doc: Doc
) {
  console.log(file, doc.filename);
  const { status, downloadURL } = await uploadFile(
    file,
    "/blogs/",
    doc.filename
  );
}
