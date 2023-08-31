import { createBrowserRouter } from "react-router-dom";
import Layout from "../Layout/Layout";
import AddUser from "../pages/AddUser/AddUser";
import Admin from "../pages/Admin/Admin";
import Home from "../pages/Home/Home";
import Login from "../pages/Login/Login";
import Reports from "../pages/Reports/Reports";
import UploadData from "../pages/UploadData/UploadData";
import WorkQueue from "../pages/WorkQueue/WorkQueue";
import ErrorPage from "../utilis/Error/ErrorPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <ErrorPage />,
    children: [
      // Home
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/admin",
        element: <Admin />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/add-user",
        element: <AddUser />,
      },
      {
        path: "/work-queue",
        element: <WorkQueue />,
      },
      {
        path: "/upload-data",
        element: <UploadData />,
      },
      {
        path: "/reports",
        element: <Reports />,
      },
    ],
  },
]);

export default router;
