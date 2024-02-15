import React from "react";
import { Navigate } from "react-router-dom";
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";
import { useLogin } from "../../contexts/LoginContext";

function Layout({ children }) {
  const { isLoggedIn } = useLogin();

  if (!isLoggedIn) {
    return <Navigate to="/" />;
  }

  return (
    <>
      <Navbar />
      <main>{children}</main>
      <Footer />
    </>
  );
}

export default Layout;
