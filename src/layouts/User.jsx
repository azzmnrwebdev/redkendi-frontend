import "../assets/css/index.css";
import { Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import NavbarComponent from "../components/Navbar";
import FooterComponent from "../components/Footer";

const User = () => {
  return (
    <>
      <NavbarComponent />
      <Outlet />
      <FooterComponent />
      <ToastContainer theme="colored" />
    </>
  );
};

export default User;
