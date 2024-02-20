import "./SearchResult.css";
import { useState } from "react";

export const SearchResult = ({ result, onChoose }) => {
  return (
    <div
      className="search-result"
      onClick={(e) => onChoose(result.subject_id)}
    >
      {result.subject_id}
    </div>
  );
};