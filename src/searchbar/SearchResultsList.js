import "./SearchResultsList.css";
import { SearchResult } from "./SearchResult";
import { useState,useEffect } from "react";

export const SearchResultsList = ({ results,onSelect }) => {
  const [choose,setChoose] = useState([]);

  const handleChoose = (subjectId) => {
    const updatedChoose = [...choose, subjectId];
    setChoose(updatedChoose);
    onSelect(updatedChoose);
  };



  useEffect(() => {
    console.log(choose);
  }, [choose]);


  return (
    <div className="results-list">
      {results.map((result, id) => {
        return <SearchResult result={result} key={id} onChoose={handleChoose}/>;
      })}

    </div>
  );
};