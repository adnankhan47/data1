import React from "react";
import { Outlet, useLocation } from "react-router-dom"; // Import useLocation and Outlet
import Header from "./Header"; // Import your Header component

const MainLayout = () => {
  const location = useLocation(); // Get the current route

  // Define the routes where the header should be hidden
  const hideHeaderRoutes = ["/login", "/signup"];

  return (
    <>
      {/* Conditionally render the Header based on the current route */}
      {!hideHeaderRoutes.includes(location.pathname) && <Header />}

      {/* Render the child routes */}
      <Outlet />
    </>
  );
};

export default MainLayout;
