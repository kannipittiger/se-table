import { useState } from "react";
import { FaSearch } from "react-icons/fa";

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

  const handleChange = (value) => {
    setInput(value);
    fetchData(value);
  };

  return (
    <div className="input-wrapper">
      <FaSearch id="search-icon" color="black" />
      <input
        placeholder="Type to search..."
        style={{width:'500px'}}
        value={input}
        onChange={(e) => handleChange(e.target.value)}
      />
    </div>
  );
};