import "./SearchRoleResultsList.css";
import "../allstyles/role.css";
//import { SearchResult } from "./SearchResult";

export const SearchResultsList = ({ results }) => {
  return (
    <div className="resultslist">
      111
      {results.map((row, index) => (
              <div key={index} className="renderimport">

                <div
                  id="boxname"

                // style={{ flex: 10, border: "2px solid black", margin: "2px" }}
                >

                  {row.user_name}


                </div>
                <div
                  id="boxshowrole"

                // style={{ flex: 10, border: "2px solid black", margin: "2px" }}
                >
                  {row.user_role}
                </div>


                <div>
                  <select id="boxrole">
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