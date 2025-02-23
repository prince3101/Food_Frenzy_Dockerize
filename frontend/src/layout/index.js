import React from "react";
import Header from "./header";
import Route from "../routers/routes";
import Footer from "./footer";
import { useLocation } from "react-router-dom";

const Layout = () => {
  // use for getting current route
  const location = useLocation("");

  // added a route which you not need to add header footer
  const hiddenLayoutRoutes = ["/login"];

  return (
    <>
      {hiddenLayoutRoutes.includes(location.pathname) ? (
        <Route />
      ) : (
        <>
          <Header />
          <Route />
          <Footer />
        </>
      )}
    </>
  );
};

export default Layout;
