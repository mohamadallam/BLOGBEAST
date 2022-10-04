import { Routes, Route } from "react-router-dom";

import React from "react";
import NotFount from "../pages/404";
import AuthMiddleware from "../hoc/middlewares/AuthMiddleware";
import LoadingPage from "../components/LoadingPage";
// with lazy loading
const Dashboard = React.lazy(() => import("../pages/Dashboard"));
const SignIn = React.lazy(() => import("../pages/Auth/SignIn"));

export default function Index() {
  return (
    <React.Suspense fallback={<LoadingPage />}>
      <Routes>
        <Route
          path={"/"}
          exact
          element={
            <AuthMiddleware>
              <Dashboard />
            </AuthMiddleware>
          }
        />
        <Route path={"/login"} exact element={<SignIn />} />
        <Route exact replace={true} path="*" element={<NotFount />} />
      </Routes>
    </React.Suspense>
  );
}
