import React, { Dispatch, SetStateAction } from "react";
import { MetaData } from "../../../types";
import { CiEdit } from "react-icons/ci";

interface Props {
  metaData: MetaData;
  setEditMetaData: Dispatch<SetStateAction<boolean>>;
}
export default function MetaDataPreview({ metaData, setEditMetaData }: Props) {
  return (
    <div>
      <div className="flex items-center gap-4 group">
        <h2 className="text-4xl font-bold">
          {metaData.title !== "" ? metaData.title : "Add Title"}
        </h2>
        <button
          className="invisible group-hover:visible duration-100"
          onClick={() => setEditMetaData(true)}
        >
          <CiEdit size={24} />
        </button>
      </div>
      <div className="flex items-center gap-4">
        {metaData.tags.map((tag, idx) => (
          <span key={idx}>{`#${tag}`}</span>
        ))}
      </div>
    </div>
  );
}
