import React, { Dispatch, SetStateAction } from "react";
import { MetaData } from "../../../types";
import { CiEdit } from "react-icons/ci";
import Link from "next/link";
import { Button } from "../ui/button";

interface Props {
  metaData: MetaData;
  setEditMetaData: Dispatch<SetStateAction<boolean>>;
}
export default function MetaDataPreview({ metaData, setEditMetaData }: Props) {
  return (
    <div>
      <div className="flex items-center gap-4 group">
        <h2
          className="text-4xl font-bold cursor-pointer hover:bg-zinc-200 p-2 rounded-lg duration-200"
          onClick={() => setEditMetaData(true)}
        >
          {metaData.title !== "" ? metaData.title : "Add Title"}
        </h2>
      </div>
      <div className="flex items-center gap-4">
        {metaData.tags.map((tag, idx) => (
          <span key={idx}>{`#${tag}`}</span>
        ))}
      </div>
    </div>
  );
}
