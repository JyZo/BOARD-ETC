import * as React from "react";
import * as ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "../App";
import Home from "../pages/home/Home";
import Freeboard from "../pages/board/Freeboard";
import Login from "../components/Login";
import Postregist from "../pages/board/Postregist";
import Postdetail from "../pages/board/Postdetail";
import Userregist from "../pages/user/Userregist";
import Postupdate from "../pages/board/Postupdate";
import ForgotPassword from "../pages/user/ForgotPassword";
import OtpVerification from "../pages/user/OtpVerification";
import ResetPassword from "../pages/user/ResetPassword";
import UserDetail from "../components/MyPage";
import MyPage from "../components/MyPage";
import PrivateRoute from "../components/Privateroute";

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
        element: (
          <PrivateRoute>
            <Postregist />
          </PrivateRoute>
        ),
      },
      {
        path: "/postdetail/:id",
        element: <Postdetail />,
      },
      {
        path: "/postupdate/:id",
        element: (
          <PrivateRoute>
            <Postupdate />
          </PrivateRoute>
        ),
      },
      {
        path: "/news",
        element: <div>news</div>,
      },
      {
        path: "/gchart",
        element: <div>gchart</div>,
      },
      {
        path: "/forgotpassword",
        element: <ForgotPassword />,
      },
      {
        path: "/verifyotp",
        element: <OtpVerification />,
      },
      {
        path: "/resetpassword",
        element: <ResetPassword />,
      },
      {
        path: "/mypage/:id",
        element: <MyPage />,
      },
    ],
  },
]);

export default router;
