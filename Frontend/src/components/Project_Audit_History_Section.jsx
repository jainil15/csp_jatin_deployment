import React, { useState, useEffect } from "react"; // Importing necessary dependencies from React
import { Box } from "monday-ui-react-core"; // Importing Box component from Monday UI React Core library
import "monday-ui-react-core/tokens"; // Importing Monday UI React Core tokens
import Table from "./Table"; // Importing custom Table component
import axios from "axios"; // Importing Axios for making HTTP requests
import "../styling/project_audit_history_section.css"; // Importing CSS styles for the component
import { toast } from "react-toastify"; // Importing toast notifications for displaying messages

// Project_Audit_History_Section component definition
const Project_Audit_History_Section = () => {
  // State variables to manage component data and behavior
  const [auditHistory, setAuditHistory] = useState([]); // State for storing audit history data
  const [changedTableRows, setChangedTableRows] = useState([]); // State for storing changed table rows
  const [showSaveButton, setShowSaveButton] = useState(false); // State to control the visibility of the save button

  // Base URL for API requests
  const BASE_URL = process.env.REACT_APP_BASE_URL;
  // Path name extracted from the current window location
  const PATH_NAME = new URL(window.location.href).pathname;

  // Function to handle form submission
  const handleSubmit = async () => {
    try {
      // Sending changed table rows data to the server for saving
      const response = await axios.post(
        `${BASE_URL}${PATH_NAME}/audit_history`,
        [...changedTableRows]
      );
      // Displaying success message using toast notification
      toast.success("Data Saved Successfully");
      // Resetting state variables
      setShowSaveButton(false);
      setChangedTableRows([]);

      // Sending email with changed table rows data
      const sendmail_response = await axios.post(
        `${BASE_URL}${PATH_NAME}/sendEmail`,
        [...changedTableRows]
      );
    } catch (error) {
      // Displaying error message using toast notification
      toast.error("Some Error");
    }
  };

  // Function to fetch audit history data from the server
  const fetchData = async () => {
    try {
      // Fetching audit history data from the server
      const response = await fetch(`${BASE_URL}${PATH_NAME}/audit_history`);
      const { data } = await response.json();
      // Setting the fetched audit history data to state variable
      setAuditHistory(data);
    } catch (error) {
      // Displaying error message using toast notification
      toast.error("Some Error");
    }
  };

  // Hook to fetch data when the component mounts
  useEffect(() => {
    fetchData();
  }, []); // Empty dependency array ensures that this effect runs only once after the component mounts

  // Render JSX
  return (
    <div>
      {/* Render the save button only if showSaveButton state is true */}
      {showSaveButton && (
        <div className="save-button-container">
          <button onClick={handleSubmit} className="save-button">
            Save
          </button>
        </div>
      )}
      {/* Render the Table component with audit history data */}
      <Box className="escalation-matrix-table-container">
        {auditHistory.length > 0 && (
          <Table
            // Set default values for the table
            defaultValues={{
              project_id: auditHistory[0].project_id, // Set project_id based on the first item in auditHistory array
            }}
            
            // Define roles allowed to access this table
            allowedRoles={["Auditor"]}
            // Identifier for the table section
            sectionTab={"audit_history"}
            // Function to control the visibility of the save button
            setShowSaveButton={setShowSaveButton}
            // Audit history data to be displayed in the table
            data={auditHistory}
            // Configuration for column types, e.g., date formatting
            columnType={[{ key: "date_of_audit", type: "date" }]}
            // List of columns to be excluded from the table
            invalidColumns={["project_id", "_id", "__v"]}
            // Function to update changed table rows state
            setChangedTableRows={setChangedTableRows}
          />
        )}
      </Box>
    </div>
  );
};

export default Project_Audit_History_Section; // Exporting Project_Audit_History_Section component
