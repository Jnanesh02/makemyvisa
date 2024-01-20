import React, { Suspense } from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import LoadingPage from "./Pages/LoadingPage/LoadingPage";
import Profile from "./Pages/Dashboard/Profile";
import { ProfileProvider } from "./Pages/Dashboard/context/ProfileProvider";

const root = ReactDOM.createRoot(document.getElementById("root"));
const LazyApp = React.lazy(() => import("./App"));
root.render(
  <React.StrictMode>
    <ProfileProvider>
      <Suspense fallback={<LoadingPage />}>
        <LazyApp />
      </Suspense>
    </ProfileProvider>
  </React.StrictMode>
);
