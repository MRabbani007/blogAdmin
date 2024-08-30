"use client";

import React, { Dispatch, FormEvent, ReactNode, SetStateAction } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./card";
import { Button } from "./button";

interface Props {
  title: string;
  description?: string;
  showForm: boolean;
  setShowForm: Dispatch<SetStateAction<boolean>>;
  children: ReactNode;
  onSubmit: () => void;
}

export default function FormContainer({
  title,
  description,
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
      <Card>
        <CardHeader>
          <CardTitle>{title}</CardTitle>
          <CardDescription>{description ?? ""}</CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit} onReset={onReset}>
          <CardContent className="flex flex-col gap-4">{children}</CardContent>
          <CardFooter className="space-x-4 mx-auto">
            <Button type="submit">Ok</Button>
            <Button type="reset">Cancel</Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}
