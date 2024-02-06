import { Outlet } from "react-router-dom";
import "./allpages/home";
import Home from "./allpages/home";
import "./App.css";

function App() {
  return (
    <div className="App">
      <Outlet />
    </div>
  );
}

export default App;
