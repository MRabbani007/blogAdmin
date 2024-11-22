"use client";

import React, {
  ChangeEvent,
  Dispatch,
  SetStateAction,
  useEffect,
  useState,
} from "react";
import { CATEGORIES } from "@/lib/data";
import { MetaData } from "../../../types";
import FormContainer from "../ui/FormContainer";
import { BiCheck, BiX } from "react-icons/bi";
import { Label } from "../ui/label";
import { Input } from "../ui/input";

import { useFormState } from "react-dom";
import { BlogPost } from "@prisma/client";
import { Button } from "../ui/button";
import { Textarea } from "../ui/textarea";
import {
  Select,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { SelectContent } from "@radix-ui/react-select";

interface Props {
  metaData: BlogPost;
  setMetaData: Dispatch<SetStateAction<BlogPost>>;
  showForm: boolean;
  setShowForm: Dispatch<SetStateAction<boolean>>;
}

export default function FormEditMetaData({
  metaData,
  setMetaData,
  showForm,
  setShowForm,
}: Props) {
  const [state, setState] = useState(metaData);
  const [tag, setTag] = useState<string>("");

  // const [lastResult, action] = useFormState(CreateBlog, undefined);
  // const [form, fields] = useForm({
  //   lastResult,
  //   onValidate({ formData }) {
  //     return parseWithZod(formData, { schema: blogSchema });
  //   },
  // });

  useEffect(() => {
    setState((curr) => {
      return { ...curr, slug: curr.title.toLowerCase().replace(/ /g, "_") };
    });
  }, [state.title]);

  useEffect(() => {
    setState(metaData);
  }, [metaData]);

  const onChange = (
    event: ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    setState((curr) => {
      return { ...curr, [event.target.name]: event.target.value };
    });
  };

  const handleTags = (event: ChangeEvent<HTMLInputElement>) => {
    const idx = state.tags.findIndex((tag) => tag === event.target.value);
    setState((curr) => {
      if (idx >= 0) {
        curr.tags.splice(idx, 1);
      } else {
        curr.tags.push(event.target.value);
      }
      return { ...curr };
    });
  };

  const handleAddTag = () => {
    if (tag !== "") {
      setState((curr) => {
        return { ...curr, tags: [...curr.tags, tag] };
      });
    }
  };

  const handleRemoveTag = (idx: number) => {
    setState((curr) => {
      const tags = curr.tags.splice(idx, 1);
      return { ...curr, tags };
    });
  };

  const onSubmit = () => {
    setMetaData({ ...state });
    setShowForm(false);
  };

  return (
    <FormContainer
      title="Blog MetaData"
      description="Add blog metadata"
      onSubmit={onSubmit}
      showForm={showForm}
      setShowForm={setShowForm}
    >
      {/* Title */}
      <div className="">
        <Label htmlFor="title">Title</Label>
        <Input
          type="text"
          placeholder="Title"
          id="title"
          name="title"
          value={state?.title || ""}
          onChange={onChange}
        />
      </div>
      {/* Slug  */}
      <div className="">
        <Label htmlFor="slug">Slug</Label>
        <Input
          type="text"
          placeholder="Slug"
          id="slug"
          name="slug"
          value={state?.slug}
          disabled
        />
      </div>
      {/* Sort Index */}
      <div className="flex items-start justify-start gap-4">
        <div className="">
          <Label htmlFor="sortIndex" className="text-nowrap">
            Sort Index
          </Label>
          <Input
            type="number"
            min={0}
            step={1}
            placeholder="sortIndex"
            id="sortIndex"
            name="sortIndex"
            value={state?.sortIndex || 0}
            onChange={onChange}
          />
        </div>
        <div>
          <Label>Flags</Label>
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2 text-zinc-800">
              <Input
                type="checkbox"
                id="featured"
                className="w-fit"
                checked={state?.featured ?? false}
                onChange={() =>
                  setState((curr) => ({ ...curr, featured: !curr.featured }))
                }
              />
              <Label htmlFor="featured" className="block relative">
                Featured
              </Label>
            </div>
            <div className="flex items-center gap-2  text-zinc-800">
              <Input
                type="checkbox"
                id="pinned"
                className="w-fit"
                checked={state?.pinned ?? false}
                onChange={() =>
                  setState((curr) => ({ ...curr, pinned: !curr.pinned }))
                }
              />
              <Label htmlFor="pinned">Pinned</Label>
            </div>
          </div>
        </div>
      </div>
      {/* Summary */}
      <div className="">
        <Label htmlFor="summary">Summary</Label>
        <Textarea
          placeholder="Summary for blog post"
          id="summary"
          name="summary"
          value={state?.summary || ""}
          onChange={onChange}
        />
      </div>
      {/* Category */}
      <div className="">
        <Label htmlFor="category">Category</Label>
        <Select
          name="category"
          value={state?.category || ""}
          onValueChange={(value) =>
            setState((curr) => ({ ...curr, category: value }))
          }
        >
          <SelectTrigger>
            <SelectValue placeholder="Select category" />
          </SelectTrigger>
          <SelectContent>
            {CATEGORIES.map((item, index) => (
              <SelectItem value={item.value} key={index}>
                {item.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      {/* Tags */}
      <div className="">
        <p>Tags</p>
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-2">
            <Input
              type="text"
              placeholder="Enter New Tag"
              value={tag}
              onChange={(e) => setTag(e.target.value)}
              className="field_input"
            />
            <Button
              variant="outline"
              type="button"
              onClick={handleAddTag}
              className="p-1"
            >
              <BiCheck size={30} />
            </Button>
            <Button type="button" className="p-1" variant="outline">
              <BiX size={30} />
            </Button>
          </div>
          <div className="flex items-center gap-2 flex-wrap">
            {state.tags.map((tag, idx) => (
              <div
                key={idx}
                className="flex items-center gap-2 rounded-full bg-zinc-200 py-1 px-2"
              >
                <span>{`#${tag}`}</span>
                <button type="button" onClick={() => handleRemoveTag(idx)}>
                  <BiX size={24} />
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
      {/* Status */}
      {/* <div className="field">
        <Label htmlFor="status">Status</Label>
        <select
          name="status"
          id="status"
          value={state?.status || "DRAFT"}
          onChange={onChange}
          required
        >
          {STATUS.map((item, index) => (
            <option value={item.value} key={index}>
              {item.label}
            </option>
          ))}
        </select>
      </div> */}
    </FormContainer>
  );
}
