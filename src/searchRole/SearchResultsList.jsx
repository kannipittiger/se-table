import "./SearchRoleResultsList.css";
import "../allstyles/role.css";
//import { SearchResult } from "./SearchResult";

export const SearchResultsList = ({ results, handleConfirm }) => {
  const handleChange = (index, event) => {
    const { value } = event.target;
    const updatedResults = results.map((row, i) =>
      i === index ? { ...row, selectedRole: value } : row
    );
    handleConfirm(updatedResults);
  };

  return (
    <div className="resultslist">
      {results.map((row, index) => (
        <div key={index} className="renderimport">
          <div id="boxname">{row.user_name}</div>
          <div id="boxshowrole">{row.user_role}</div>
          <div>
            <select id="boxrole" onChange={(event) => handleChange(index, event)}>
              <option>Select</option>
              <option>Teacher</option>
              <option>Education</option>
              <option>Admin</option>
            </select>
          </div>
        </div>
      ))}
    </div>
  );
};