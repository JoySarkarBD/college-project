import { createBrowserRouter } from "react-router-dom";
import Layout from "../Layout/Layout";
import AddUser from "../pages/AddUser/AddUser";
import AssignWork from "../pages/Admin/AssignWork";
import DelegateAccess from "../pages/Admin/DelegateAccess";
import ManageUploadData from "../pages/Admin/ManageUploadData";
import ManageUser from "../pages/Admin/ManageUser";
import Home from "../pages/Home/Home";
import Login from "../pages/Login/Login";
import ModifyUser from "../pages/ModifyUser/ModifyUser";
import AuditReport from "../pages/Reports/AuditReport";
import DataExport from "../pages/Reports/DataExport";
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
        path: "/assign-work",
        element: <AssignWork />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/manage-user/add-user",
        element: <AddUser />,
      },
      {
        path: "/manage-user/modify-user/:userId",
        element: <ModifyUser />,
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
        path: "/data-export",
        element: <DataExport />,
      },
      {
        path: "/audit-report",
        element: <AuditReport />,
      },
      {
        path: "/manage-user/",
        element: <ManageUser />,
      },
      {
        path: "/manage-upload-data",
        element: <ManageUploadData />,
      },
      {
        path: "/delegate-access",
        element: <DelegateAccess />,
      },
    ],
  },
]);

export default router;
