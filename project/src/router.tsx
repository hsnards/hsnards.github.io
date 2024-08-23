// @ts-nocheck

import { createBrowserRouter } from "react-router-dom";
import Home from "./pages/home/Home.page";
import Login from "./pages/home/Login.page";
import CoursesList from "./pages/CoursesList";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: CoursesList,
  },

  // {
  //   path: "/login",
  //   Component: Login,
  // },
]);
