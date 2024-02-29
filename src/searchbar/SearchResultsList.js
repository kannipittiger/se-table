import "./SearchResultsList.css";
import { SearchResult } from "./SearchResult";
import { useState, useEffect } from "react";

export const SearchResultsList = ({ results, onSelect }) => {
  const [choose, setChoose] = useState(new Set());

  const handleChoose = (subjectId) => {
    setChoose((prevChoose) => {
      const newChoose = new Set(prevChoose);
      newChoose.add(subjectId);
      return newChoose;
    });
  };

  useEffect(() => {
    console.log(choose);
    onSelect([...choose]);
  }, [choose, onSelect]);

  return (
    <div className="results-list">
      {results.map((result, id) => {
        return (
          <SearchResult
            result={result}
            key={id}
            onChoose={handleChoose}
            isSelected={choose.has(result.id)}
          />
        );
      })}
    </div>
  );
};
