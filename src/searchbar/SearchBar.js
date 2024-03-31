import { useState } from "react";
import { FaSearch } from "react-icons/fa";
import { AiOutlineCloseCircle } from "react-icons/ai";
import "./SearchBar.css";

export const SearchBar = ({ setResults }) => {
  const [input, setInput] = useState("");

  const fetchData = (value) => {
    fetch(`http://localhost:5000/subjectid`)
      .then((response) => response.json())
      .then((json) => {
        const results = json.filter((subj) => {
          return (
            (value &&
              subj &&
              subj.subject_id &&
              subj.subject_id.includes(value)) ||
              (value.toLowerCase() &&
              subj &&
              subj.subject_name.toLowerCase() &&
              subj.subject_name.toLowerCase().includes(value))//ถ้าจะแก้ต้องแก้ value.toLowerCase()
          );
        });
        setResults(results);
      });
  };

  const search_Delete = () => {
    setInput(''); // เซ็ตค่าให้กับช่องค้นหาเป็นช่องว่าง
    setResults(''); // เคลียร์ผลลัพธ์การค้นหา
  };

  const handleChange = (value) => {
    setInput(value);
    fetchData(value);
  };

  return (
    <div className="input-wrapper">
      <FaSearch className="search-icon" color="black" />
      {input.length > 0 && (
        <>
        <div className="box_search_delete_left" onClick={search_Delete}></div>
        <div className="box_search_delete_right" onClick={search_Delete}></div>
        <div className="box_search_delete_down" onClick={search_Delete}></div>
        <div className="box_search_delete_top" onClick={search_Delete}></div>
        </>  
      )}
      <input
        placeholder="Type to search..."
        style={{width:'500px'}}
        value={input}
        onChange={(e) => handleChange(e.target.value)}
      />
    </div>
  );
};
