import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import Home from "./allpages/home";
import Admin from "./allpages/admin";
import Roll from "./allpages/roll.js";
import Edu from "./allpages/edu.js";
import SubmitEdu from "./allpages/SubmitEdu.js";
import Teacher from "./allpages/teacher.js";
import {
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
  Route,
  BrowserRouter,
} from "react-router-dom";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route path="/" index element={<Home />} />
      <Route path="admin" element={<Admin />} />
      <Route path="roll" element={<Roll />} />
      <Route path="edu" element={<Edu />} />
      <Route path="submitedu" element={<SubmitEdu />} />
      <Route path="teacher" element={<Teacher />} />
    </Route>
  )
);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<RouterProvider router={router} />);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
