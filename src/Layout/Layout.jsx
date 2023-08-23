import { Outlet, useLocation } from "react-router-dom";
import Footer from "../components/Shared/Footer/Footer";
import Navbar from "../components/Shared/Navbar/Navbar";

const Layout = () => {
  const location = useLocation();
  const noNavFooter = location.pathname.includes("/admin");

  return (
    <>
      {noNavFooter || <Navbar />}
      <Outlet />
      {noNavFooter || <Footer />}
    </>
  );
};

export default Layout;
