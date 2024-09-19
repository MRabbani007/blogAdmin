"use client";

import React, { ChangeEvent, Dispatch, SetStateAction, useRef } from "react";
import { BiX } from "react-icons/bi";

interface Props {
  showForm: boolean;
  setShowForm: Dispatch<SetStateAction<boolean>>;
  setFile: Dispatch<SetStateAction<File | null>>;
}

export default function FormUploadFile({
  showForm,
  setShowForm,
  setFile,
}: Props) {
  const ref = useRef<HTMLInputElement>(null);

  const handleSelect = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setFile(event.target.files[0]);
      setShowForm(false);
    }
  };

  const handleClick = () => {
    if (ref.current) {
      ref.current?.click();
    }
  };

  return (
    <div
      className={
        (showForm ? " translate-y-0 translate-x-0" : " translate-x-full") +
        " bg-zinc-500/50 fixed -top-0 bottom-0 left-0 right-0 flex items-center justify-center duration-200 z-50"
      }
    >
      <form className="bg-zinc-200 dark:bg-zinc-950 min-w-[300px] max-w-[600px]">
        <div className="border-b-2 mb-4 flex items-center gap-4 justify-between p-4">
          <span>Add File</span>
          <button type="reset" onClick={() => setShowForm(false)}>
            <BiX size={30} />
          </button>
        </div>
        <div className="border-2 border-dashed p-4 m-4 w-[400px] h-[250px] flex flex-wrap items-center justify-center gap-2">
          <p>Drag & drop file</p>
          <p>or</p>
          <button type="button" onClick={handleClick}>
            browse file
          </button>
        </div>
      </form>
      <input type="file" ref={ref} onChange={handleSelect} className="hidden" />
    </div>
  );
}
