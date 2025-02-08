import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import HomePage from "./pages/Home/HomePage";
import { ROUTES_ENUM } from "./shared/enums/routes.enum";
import "./index.css";
import BaseLayout from "./components/BaseLayout";
import GetLoginInfoForGuest from "./pages/Guest/getLoginInfo";
import SendOtpPage from "./pages/Employee/sendOtpPage";

const router = createBrowserRouter([
  {
    path: "/", // Base path
    element: <BaseLayout />, // Wrap with BaseLayout
    children: [
      {
        path: ROUTES_ENUM.HOME,
        element: <HomePage></HomePage>,
      },
      //
      //
      //
      //
      // AUTH
      {
        path: ROUTES_ENUM.GUEST,
        element: <GetLoginInfoForGuest></GetLoginInfoForGuest>,
      },
      {
        path: ROUTES_ENUM.EMPLOYEE_OTP,
        element: <SendOtpPage></SendOtpPage>,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
