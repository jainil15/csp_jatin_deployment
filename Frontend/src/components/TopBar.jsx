import React from "react"; // Importing React library
import { Flex, Box, Search } from "monday-ui-react-core"; // Importing UI components from Monday UI library
import "monday-ui-react-core/tokens"; // Importing tokens for styling
import "../styling/topbar.css"; // Importing CSS styles for the top bar component
import { useAuth0 } from "@auth0/auth0-react";

// Functional component for the top bar
const TopBar = () => {
  const { user, logout } = useAuth0();
  return (
    <div className="top-bar-wrapper">
      {/* Container for the top bar */}
      {/* Flex container for aligning items */}
      <Flex justify="SpaceBetween" className="bar-container">
        {/* Box 1: Company logo and name */}
        <Box className="box1">
          <Flex gap={8}>
            {/* Flex container for company logo and name */}
            <Box className="logo-container">
              {/* Container for the company logo */}
              <img src="/images/CS.png" /> {/* Company logo */}
            </Box>
            <Box className="company-name-container">
              {/* Container for the company name */}
              <label>Customer Success</label> {/* Company name */}
            </Box>
          </Flex>
        </Box>
        {/* Box 2: Search bar */}
        <Box className="box2">
          <Search placeholder="Search.." /> {/* Search input field */}
        </Box>
        {/* Box 3: User profile */}
        <Box className="box3">
          <button onClick={() => logout()} className="logout-button">
            <i class="fas fa-sign-out-alt" style={{ color: "#ffffff" }}></i>
            Logout
          </button>
        </Box>
      </Flex>
    </div>
  );
};

export default TopBar; // Exporting the TopBar component
