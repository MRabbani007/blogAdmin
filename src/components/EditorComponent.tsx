"use client";

import {
  headingsPlugin,
  listsPlugin,
  quotePlugin,
  thematicBreakPlugin,
  markdownShortcutPlugin,
  MDXEditor,
  type MDXEditorMethods,
  type MDXEditorProps,
  toolbarPlugin,
  UndoRedo,
  BoldItalicUnderlineToggles,
  BlockTypeSelect,
  CodeToggle,
  CreateLink,
  linkDialogPlugin,
  linkPlugin,
  InsertFrontmatter,
  frontmatterPlugin,
  codeBlockPlugin,
  sandpackPlugin,
  codeMirrorPlugin,
  SandpackConfig,
  ConditionalContents,
  ChangeCodeMirrorLanguage,
  InsertCodeBlock,
  InsertSandpack,
  ShowSandpackInfo,
  imagePlugin,
  InsertImage,
  KitchenSinkToolbar,
  diffSourcePlugin,
} from "@mdxeditor/editor";
import { FC, useEffect, useRef, useState } from "react";
import "@mdxeditor/editor/style.css";
import styles from "./editor.module.css";

interface EditorProps {
  markdown?: string;
  editorRef?: React.MutableRefObject<MDXEditorMethods | null>;
}

const defaultSnippetContent = `
export default function App() {
  return (
    <div className="App">
      <h1>Hello CodeSandbox</h1>
      <h2>Start editing to see some magic happen!</h2>
    </div>
  );
}
`.trim();

const simpleSandpackConfig: SandpackConfig = {
  defaultPreset: "react",
  presets: [
    {
      label: "React",
      name: "react",
      meta: "live react",
      sandpackTemplate: "react",
      sandpackTheme: "light",
      snippetFileName: "/App.js",
      snippetLanguage: "jsx",
      initialSnippetContent: defaultSnippetContent,
    },
  ],
};

async function imageUploadHandler(image: File) {
  const formData = new FormData();
  formData.append("image", image);
  // send the file to your server and return
  // the URL of the uploaded image in the response
  const response = await fetch("/uploads/new", {
    method: "POST",
    body: formData,
  });
  const json = (await response.json()) as { url: string };
  return json.url;
}

/**
 * Extend this Component further with the necessary plugins or props you need.
 * proxying the ref is necessary. Next.js dynamically imported components don't support refs.
 */
const EditorComponent: FC<EditorProps> = ({ markdown, editorRef }) => {
  return (
    <MDXEditor
      ref={editorRef}
      markdown={markdown ?? ""}
      contentEditableClassName={`prose prose-zinc lg:prose-xl w-full min-h-screen`}
      plugins={[
        headingsPlugin(),
        listsPlugin(),
        quotePlugin(),
        thematicBreakPlugin(),
        markdownShortcutPlugin(),
        imagePlugin({
          imageUploadHandler,
          imageAutocompleteSuggestions: [],
        }),
        diffSourcePlugin({
          diffMarkdown: "An older version",
          viewMode: "rich-text",
        }),
        frontmatterPlugin(),
        linkPlugin(),
        linkDialogPlugin({
          linkAutocompleteSuggestions: [
            "https://virtuoso.dev",
            "https://mdxeditor.dev",
          ],
        }),
        codeBlockPlugin({ defaultCodeBlockLanguage: "js" }),
        sandpackPlugin({ sandpackConfig: simpleSandpackConfig }),
        codeMirrorPlugin({
          codeBlockLanguages: { js: "JavaScript", css: "CSS" },
        }),
        toolbarPlugin({
          toolbarContents: () => (
            <>
              <KitchenSinkToolbar />
              {/* <UndoRedo />
              <BoldItalicUnderlineToggles />
              <BlockTypeSelect />
              <CreateLink />
              <InsertImage />
              <CodeToggle />
              <InsertFrontmatter />
              <ConditionalContents
                options={[
                  {
                    when: (editor) => editor?.editorType === "codeblock",
                    contents: () => <ChangeCodeMirrorLanguage />,
                  },
                  {
                    when: (editor) => editor?.editorType === "sandpack",
                    contents: () => <ShowSandpackInfo />,
                  },
                  {
                    fallback: () => (
                      <>
                        <InsertCodeBlock />
                        <InsertSandpack />
                      </>
                    ),
                  },
                ]}
              /> */}
            </>
          ),
        }),
      ]}
    />
  );
};

export default EditorComponent;
