"use client";

import FormCreateBlog from "@/components/admin/FormCreateBlog";
import React from "react";
import "react-markdown-editor-lite/lib/index.css";

export default function CreateBlog() {
  return (
    <main>
      <div className="">
        <p className="nunito-sans text-3xl">
          <span className="text-sky-600 font-semibold">Create </span>
          <span>Blog </span>
        </p>
        <p className="text-sky-600/80 font-extralight text-xl">Admin Panel</p>
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
