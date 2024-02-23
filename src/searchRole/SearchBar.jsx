import { useState } from "react";
import { FaSearch } from "react-icons/fa";

import "./SearchBar.css";

export const SearchBar = ({ setResults }) => {
    const [input, setInput] = useState("");




    const fetchData = (value) => {
        fetch(`http://localhost:5000/user`)
          .then((response) => response.json())
          .then((json) => {
            let results = json;
      
            if (value) {
              results = json.filter((user) => {
                return (
                  user.user_name &&
                  user.user_name.toLowerCase().includes(value.toLowerCase())
                );
              });
            }
      
            setResults(results);
          })
          .catch((error) => {
            console.error('Error fetching data:', error);
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
                value={input}
                onChange={(e) => handleChange(e.target.value)}
            />
        </div>
    );
};