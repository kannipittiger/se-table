<<<<<<< HEAD
import logo from "./logo.svg";
import "./App.css";
import Home from "./allpages/home";
import Admin from "./allpages/admin";
import Roll from "./allpages/roll";
=======
import { Outlet } from 'react-router-dom';
import './allpages/home'
import Home from './allpages/home';
import './App.css';
>>>>>>> 0b8323d83da60acde0688198377779c9124a11af


function App() {
  return (
    <div className="App">
<<<<<<< HEAD
      <Roll />
=======
      <Outlet/>
>>>>>>> 0b8323d83da60acde0688198377779c9124a11af
    </div>
  );
}

export default App;