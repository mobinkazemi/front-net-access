import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import HomePage from "./pages/Home/HomePage";
import { ROUTES_ENUM } from "./shared/enums/routes.enum";
import "./index.css";
import LoginPage from "./pages/Auth/Login/LoginPage";
import BaseLayout from "./components/BaseLayout";
import ResetPasswordPage from "./pages/Auth/resetPassword/ResetPassword";

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
        path: ROUTES_ENUM.LOGIN,
        element: <LoginPage></LoginPage>,
      },
      {
        path: ROUTES_ENUM.RESET,
        element: <ResetPasswordPage />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
