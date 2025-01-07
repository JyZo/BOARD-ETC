import * as React from "react";
import * as ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "../App";
import Home from "../pages/home/Home";
import Freeboard from "../pages/board/Freeboard";
import Login from "../components/Login";
import Postregist from "../pages/board/Postregist";
import Postdetail from "../pages/board/Postdetail";
import Userregist from "../components/Userregist";
import Postupdate from "../pages/board/Postupdate";

//리액트 라우터 세팅
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/userregist",
        element: <Userregist />,
      },
      {
        path: "/freeboard",
        element: <Freeboard />,
      },
      {
        path: "/postregist",
        element: <Postregist />,
      },
      {
        path: "/postdetail/:id",
        element: <Postdetail />,
      },
      {
        path: "/postupdate/:id",
        element: <Postupdate />,
      },
      {
        path: "/news",
        element: <div>news</div>,
      },
      {
        path: "/snack",
        element: <div>snack</div>,
      },
    ],
  },
]);

export default router;
