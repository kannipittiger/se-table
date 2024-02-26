import "./SearchRoleResultsList.css";
import "../allstyles/role.css";
//import { SearchResult } from "./SearchResult";
import axios from "axios";
import React from 'react';

export const SearchResultsList = ({ results, handleConfirm,setUpdateRole }) => {
  const handleChange = ( username1,event) => {
    // const {value} = event.target;
    // const updatedResults = results.map((row, i) =>
    //   i === index ? { ...row, selectedRole: value } : row
    // );
    // handleConfirm(updatedResults.filter(row => row.selectedRole !== ""));
    // setUpdateRole({username:username1,role:event.target.value})
    axios.post("http://localhost:5000/updateRole",{username:username1,role:event.target.value})
    // console.log(username)
    // console.log(event.target.value)
    // axios.post("http://localhost:5000/updateRole")

    
  };

  return (

    
    <div className="resultslist">
      {results.map((row, index) => (
        <div key={index} className="renderimport">
          <div id="boxname">{row.user_name}</div>
          <div id="boxshowrole">{row.user_role}</div>
          <div>
            <select id="boxrole"  onChange={(event) => handleChange( row.user_name,event)}>
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