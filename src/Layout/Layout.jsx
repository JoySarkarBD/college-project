import { Outlet, useLocation } from "react-router-dom";
import Footer from "../components/Shared/Footer/Footer";
import Navbar from "../components/Shared/Navbar/Navbar";

const Layout = () => {
  const location = useLocation();
  const noNav = location.pathname.includes("/login");
  const noFooter =
    location.pathname.includes("/work-queue") ||
    location.pathname.includes("/upload-data") ||
    location.pathname.includes("/reports") ||
    location.pathname.includes("/login");

  return (
    <>
      {noNav || <Navbar />}

      <Outlet />

      {noFooter || <Footer />}
    </>
  );
};

export default Layout;
