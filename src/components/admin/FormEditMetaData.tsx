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
      onSubmit={onSubmit}
      showForm={showForm}
      setShowForm={setShowForm}
    >
      {/* Title */}
      <div className="field">
        <label htmlFor="title" className="field_label">
          Title
        </label>
        <input
          type="text"
          className="field_input"
          placeholder="Title"
          id="title"
          name="title"
          value={state?.title || ""}
          onChange={onChange}
        />
      </div>
      {/* Slug */}
      <div className="field">
        <label htmlFor="slug" className="field_label">
          Slug
        </label>
        <input
          type="text"
          className="field_input"
          placeholder="Slug"
          id="slug"
          name="slug"
          value={state?.slug}
          disabled
        />
      </div>
      {/* Sort Index */}
      <div className="field">
        <label htmlFor="sortIndex" className="field_label">
          sortIndex
        </label>
        <input
          type="number"
          min={0}
          step={1}
          className="field_input"
          placeholder="sortIndex"
          id="sortIndex"
          name="sortIndex"
          value={state?.sortIndex || 0}
          onChange={onChange}
        />
      </div>
      {/* Detail */}
      <div className="field">
        <label htmlFor="detail" className="field_label">
          Detail
        </label>
        <input
          type="text"
          className="field_input"
          placeholder="detail"
          id="detail"
          name="detail"
          value={state?.detail || ""}
          onChange={onChange}
        />
      </div>
      {/* Category */}
      <div className="field">
        <label htmlFor="category" className="field_label">
          Category
        </label>
        <select
          name="category"
          id="category"
          value={state?.category || ""}
          onChange={onChange}
          className="field_input"
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
        <span className="field_label">Tags</span>
        {/* {TAGS.map((item, index) => (
          <div key={index} className="flex items-center gap-2">
            <input
              type="checkbox"
              value={item.value}
              checked={state.tags.includes(item.value)}
              onChange={handleTags}
              name={"checkbox_" + item.value}
              id={"checkbox_" + item.value}
            />
            <label htmlFor={"checkbox_" + item.value}>{item.label}</label>
          </div>
        ))} */}
        <div className="flex items-center gap-2">
          <input
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
        <label htmlFor="status" className="field_label">
          Status
        </label>
        <select
          name="status"
          id="status"
          value={state?.status || "DRAFT"}
          onChange={onChange}
          className="field_input"
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
