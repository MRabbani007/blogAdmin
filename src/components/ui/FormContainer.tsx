"use client";

import React, { Dispatch, FormEvent, ReactNode, SetStateAction } from "react";

interface Props {
  title: string;
  showForm: boolean;
  setShowForm: Dispatch<SetStateAction<boolean>>;
  children: ReactNode;
  onSubmit: () => void;
}

export default function FormContainer({
  title,
  showForm,
  setShowForm,
  children,
  onSubmit,
}: Props) {
  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    onSubmit();
  };

  const onReset = () => {
    setShowForm(false);
  };

  return (
    <div
      className={
        (showForm
          ? "opacity-100 translate-x-0 translate-y-0 "
          : "opacity-0 translate-x-full ") +
        " fixed top-0 left-0 bottom-0 right-0 flex flex-col items-center justify-center duration-200 z-50 bg-zinc-500/40"
      }
    >
      <div className="bg-zinc-950 text-white flex flex-col items-stretch w-full max-w-[1024px]">
        <h2 className="p-4 font-semibold text-2xl">{title}</h2>
        <form
          onSubmit={handleSubmit}
          onReset={onReset}
          className="space-y-4 px-8"
        >
          {children}
          <div className="flex items-center justify-center gap-4 p-4">
            <button type="submit" className="py-2 px-4 border-2 rounded-md">
              Ok
            </button>
            <button type="reset" className="py-2 px-4 border-2 rounded-md">
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
