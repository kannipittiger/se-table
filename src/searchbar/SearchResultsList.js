import "./SearchResultsList.css";
import { SearchResult } from "./SearchResult";
import { useState,useEffect } from "react";

export const SearchResultsList = ({ results,onSelect }) => {
  const [choose,setChoose] = useState(new Set());

  const handleChoose = (subjectId) => {
    setChoose(prevChoose => new Set([...prevChoose, subjectId]));
    onSelect([...choose, subjectId]); // ส่งค่า choose ไปยังไฟล์อื่น
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