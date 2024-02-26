import "./SearchRoleResultsList.css";
import "../allstyles/role.css";
//import { SearchResult } from "./SearchResult";

import React from 'react';

export const SearchResultsList = ({ results, handleConfirm }) => {
  const handleChange = (index, event) => {
    const {value} = event.target;
    const updatedResults = results.map((row, i) =>
      i === index ? { ...row, selectedRole: value } : row
    );
    handleConfirm(updatedResults.filter(row => row.selectedRole !== ""));
  };

  return (
    <div className="resultslist">
      {results.map((row, index) => (
        <div key={index} className="renderimport">
          <div id="boxname">{row.user_name}</div>
          <div id="boxshowrole">{row.user_role}</div>
          <div>
            <select id="boxrole" value={row.selectedRole} onChange={(event) => handleChange(index, event)}>
              <option value="">Select</option>
              <option value="Teacher">Teacher</option>
              <option value="Education">Education</option>
              <option value="Admin">Admin</option>
            </select>
          </div>
        </div>
      ))}
    </div>
  );
};