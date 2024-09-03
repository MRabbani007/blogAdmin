"use client";

import React, { useEffect, useState } from "react";
// import EditorJS from "@editorjs/editorjs";
import { TOOLS } from "./editor.js";

export default function TextEditor() {
  // const [editor, setEditor] = useState(() => {
  //   return new EditorJS({
  //     holder: "textEditor",
  //     placeholder: "Let's write an awesome story",
  //     tools: TOOLS,
  //   });
  // });
  const onSave = async () => {
    const data = await editor.save();

    console.log(data);
  };
  return <div id="textEditor" className=""></div>;
}
