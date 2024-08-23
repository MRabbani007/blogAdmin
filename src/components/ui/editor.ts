import Embed from "@editorjs/embed";
import List from "@editorjs/list";
import ImageTool from "@editorjs/image";
import Header from "@editorjs/header";
import Quote from "@editorjs/quote";
import Marker from "@editorjs/marker";
import InlineCode from "@editorjs/inline-code";
import { uploadFile } from "@/lib/firebase";

const uploadImageByURL = async (e: string) => {
  let link = new Promise((resolve, reject) => {
    try {
      resolve(e);
    } catch (err) {
      reject(err);
    }
  });

  return link.then((url) => {
    return { success: 1, file: { url } };
  });
};

const uploadImageByFile = async (file: File) => {
  return uploadFile(file, "/images/", file?.name).then(({ downloadURL }) => {
    if (downloadURL) {
      return { success: 1, file: { downloadURL } };
    }
  });
};

export const TOOLS = {
  embed: Embed,
  list: {
    class: List,
    inlineToolbar: true,
    config: {
      defaultStyle: "unordered",
    },
  },
  image: {
    class: ImageTool,
    config: {
      uploader: {
        uploadByFile: uploadImageByFile, // Your backend file uploader endpoint
        uploadByUrl: uploadImageByURL, // Your endpoint that provides uploading by Url
      },
    },
  },
  header: {
    class: Header,
    config: {
      placeholder: "Type Heading",
      levels: [1, 2, 3],
      defaultLevel: 2,
    },
  },
  quote: Quote,
  Marker: {
    class: Marker,
    shortcut: "CMD+SHIFT+M",
  },
  inlineCode: InlineCode,
};
