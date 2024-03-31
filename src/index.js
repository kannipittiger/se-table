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
import ScheTeacher from "./allpages/ScheTecacher.js";
import Noti from "./allpages/noti.js";
import Datetime from "./allpages/datetime.js";
import TableTeacher from "./allpages/TableTeacher.js";
import Course from "./allpages/course.js";
import ScheEdu from "./allpages/ScheEdu.js";
import TableAdmin from "./allpages/TableAdmin.js";
import {
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
  Route,
  BrowserRouter,
} from "react-router-dom";
import EduAlert from "./allpages/EduAlert.js";
import TableEdu from "./allpages/TableEdu.js";
import TableForScheEdu from "./allpages/TableForScheEdu.js";

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
      <Route path="noti" element={<Noti />} />
      <Route path="datetime" element={<Datetime />} />
      <Route path="tableteacher" element={<TableTeacher />} />
      <Route path="tableedu" element={<TableEdu />} />
      <Route path="course" element={<Course />} />
      <Route path="ScheEdu" element={<ScheEdu />} />
      <Route path="edualert" element={<EduAlert />} />
      <Route path="TableForScheEdu" element={<TableForScheEdu />} />
      <Route path="TableAdmin" element={<TableAdmin />} />
    </Route>
  )
);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<RouterProvider router={router} />);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
