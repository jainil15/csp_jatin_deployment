import React from "react";
import TopBar from "./components/TopBar"; // Importing the TopBar component
import Sidebar from "./components/Sidebar"; // Importing the Sidebar component
import "./styling/layout.css"; // Importing the layout styling
import { Box, Flex } from "monday-ui-react-core"; // Importing Box and Flex components from monday-ui-react-core library
import { ToastContainer } from "react-toastify"; // Importing ToastContainer component from react-toastify library
import "react-toastify/dist/ReactToastify.css"; // Importing Toastify CSS
import { Outlet } from "react-router-dom";

// Layout component definition
const Layout = () => {
  return (
    <div>
      {/* ToastContainer for displaying toast messages */}
      <ToastContainer
        position="top-center"
        autoClose={3000}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        style={{ minWidth: "fit-content" }}
      />

      {/* Main layout structure */}
      <Flex
        className="layout-wrapper"
        direction="Column"
        gap={20}
        justify="SpaceBetween"
      >
        {/* TopBar component for displaying the top navigation bar */}
        <Box className="top-bar-container">
          <TopBar />
        </Box>

        {/* Main content wrapper */}
        <Box className="main-content-wrapper">
          <Flex justify="SpaceBetween">
            {/* Sidebar component for displaying the sidebar */}
            <Box className="sidebar-container">
              <Sidebar />
            </Box>
            {/* Outlet for rendering nested routes */}
            <Box className="content-container">
              <Outlet />
            </Box>
          </Flex>
        </Box>
      </Flex>
    </div>
  );
};

export default Layout; // Exporting the Layout component
