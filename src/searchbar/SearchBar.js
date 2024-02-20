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
            value &&
            subj &&
            subj.subject_id &&
            subj.subject_id.includes(value)
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
      <FaSearch id="search-icon" />
      <input
        placeholder="Type to search..."
        style={{width:'300px'}}
        value={input}
        onChange={(e) => handleChange(e.target.value)}
      />
    </div>
  );
};