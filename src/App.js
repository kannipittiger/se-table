import { Outlet } from "react-router-dom";
import "./allpages/home";
import Home from "./allpages/home";
import "./App.css";
import Edu from "./allpages/edu";

function App() {
  return (
    <div className="App">
      <Outlet />
    </div>
  );
}

export default App;
