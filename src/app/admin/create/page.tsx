"use client";

import FormCreateBlog from "@/components/admin/FormCreateBlog";
import Editor from "@/components/EditorComponent";
import React, { ChangeEvent, Suspense, useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import MarkdownEditor from "react-markdown-editor-lite";
import "react-markdown-editor-lite/lib/index.css";

export default function CreateBlog() {
  function handleEditorChange({ html, text }: { html: string; text: string }) {
    console.log("handleEditorChange", html, text);
  }

  return (
    <main>
      <div className="">
        <p className="nunito-sans text-3xl">
          <span className="text-purple-600 font-semibold">Create </span>
          <span>Blog </span>
        </p>
        <p className="text-purple-700 font-extralight text-xl">Admin Panel</p>
      </div>
      <FormCreateBlog />
    </main>
  );
}

{
  /* <MarkdownEditor
        style={{ width: "100%", height: "500px" }}
        value={description}
        renderHTML={(text) => (
          <ReactMarkdown
            components={{
              code: ({ node, inline, className, children, ...props }) => {
                const match = /language-(\w+)/.exec(className || "");
                if (inline) {
                  return <code>{children}</code>;
                } else if (match) {
                  return (
                    <div style={{ position: "relative" }}>
                      <pre
                        style={{
                          padding: 0,
                          borderRadius: "5px",
                          overflowX: "auto",
                          whiteSpace: "pre-wrap",
                        }}
                        {...props}
                      >
                        <code>{children}</code>
                      </pre>
                    </div>
                  );
                }
              },
            }}
          >
            {text}
          </ReactMarkdown>
        )}
        onChange={(e) => setDescription(e.text)}
      ></MarkdownEditor> */
}