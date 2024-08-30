"use client";

import React, {
  ChangeEvent,
  Dispatch,
  SetStateAction,
  useEffect,
  useState,
} from "react";
import { CATEGORIES, STATUS, TAGS } from "@/lib/data";
import { MetaData } from "../../../types";
import FormContainer from "../ui/FormContainer";
import { BiCheck, BiX } from "react-icons/bi";
import { Label } from "../ui/label";
import { Input } from "../ui/input";

import { useForm } from "@conform-to/react";
import { useFormState } from "react-dom";
import { parseWithZod } from "@conform-to/zod";
import { blogSchema } from "@/lib/zodSchemas";
import { CreateBlog } from "@/lib/actions";

interface Props {
  metaData: MetaData;
  setMetaData: Dispatch<SetStateAction<MetaData>>;
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

  const [lastResult, action] = useFormState(CreateBlog, undefined);
  const [form, fields] = useForm({
    lastResult,
    onValidate({ formData }) {
      return parseWithZod(formData, { schema: blogSchema });
    },
  });

  useEffect(() => {
    setState((curr) => {
      return { ...curr, slug: curr.title.toLowerCase().replace(/ /g, "_") };
    });
  }, [state.title]);

  useEffect(() => {
    setState(metaData);
  }, [metaData]);

  const onChange = (
    event: ChangeEvent<HTMLInputElement | HTMLSelectElement>
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
      <div className="field">
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
      {/* Slug */}
      <div className="field">
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
      <div className="field">
        <Label htmlFor="sortIndex">sortIndex</Label>
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
      {/* Detail */}
      <div className="field">
        <Label htmlFor="detail">Detail</Label>
        <Input
          type="text"
          placeholder="detail"
          id="detail"
          name="detail"
          value={state?.detail || ""}
          onChange={onChange}
        />
      </div>
      {/* Category */}
      <div className="field">
        <Label htmlFor="category">Category</Label>
        <select
          name="category"
          id="category"
          value={state?.category || ""}
          onChange={onChange}
        >
          <option value="">Select</option>
          {CATEGORIES.map((item, index) => (
            <option value={item.value} key={index}>
              {item.label}
            </option>
          ))}
        </select>
      </div>
      {/* Tags */}
      <div className="field">
        <span>Tags</span>
        <div className="flex items-center gap-2">
          <Input
            type="text"
            placeholder="Enter New Tag"
            value={tag}
            onChange={(e) => setTag(e.target.value)}
            className="field_input"
          />
          <button type="button" onClick={handleAddTag}>
            <BiCheck size={30} />
          </button>
          <button type="button">
            <BiX size={30} />
          </button>
        </div>
        <ul className="flex items-center gap-2">
          {state.tags.map((tag, idx) => (
            <li key={idx} className="flex items-center gap-2">
              <span>{`#${tag}`}</span>
              <button type="button" onClick={() => handleRemoveTag(idx)}>
                <BiX size={24} />
              </button>
            </li>
          ))}
        </ul>
      </div>
      {/* Status */}
      <div className="field">
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
      </div>
    </FormContainer>
  );
}
