import "./SearchResult.css";
import { useState } from "react";

export const SearchResult = ({ result, onChoose }) => {
  return (
    <div
      className="search-result"
      onClick={(e) => onChoose(result)}
    >
      {result.subject_id} - {result.subject_year}  {result.subject_name}
    </div>
  );
};