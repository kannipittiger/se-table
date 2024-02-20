import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import Home from "./allpages/home";
import Admin from "./allpages/admin";
import Role from "./allpages/role.js";
import Edu from "./allpages/edu.js";
import SubmitEdu from "./allpages/SubmitEdu.js";
import Teacher from "./allpages/teacher.js";
import Major from "./allpages/major.js";
import Import from "./allpages/import.js";
import EduImport from "./allpages/EduImport.js";
import Chatedu from "./allpages/chatedu.js";
<<<<<<< HEAD
import ScheTeacher from "./allpages/ScheTeacher.js";
import Datetime from "./allpages/datetime.js";
=======
import ScheTeacher from "./allpages/ScheTecacher.js";
import Noti from "./allpages/noti.js";
>>>>>>> f11f74e5d0c0efec684276ec1fe9de6bf17ace75

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
      <Route path="role" element={<Role />} />
      <Route path="teacher" element={<Teacher />} />
      <Route path="edu" element={<Edu />} />
      <Route path="major" element={<Major />} />
      <Route path="submitedu" element={<SubmitEdu />} />
      <Route path="import" element={<Import />} />
      <Route path="Eduimport" element={<EduImport />} />
      <Route path="chatedu" element={<Chatedu />} />
      <Route path="scheteacher" element={<ScheTeacher />} />
<<<<<<< HEAD
      <Route path="datetime" element={<Datetime />} />
=======
      <Route path="noti" element={<Noti />} />
>>>>>>> f11f74e5d0c0efec684276ec1fe9de6bf17ace75
    </Route>
  )
);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<RouterProvider router={router} />);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
