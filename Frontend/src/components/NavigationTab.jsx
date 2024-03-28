// Import necessary modules and files
import React, { useEffect, useState, useContext } from "react";
import "../styling/navigation-tab.css"; // Import CSS file for styling
import { useNavigate } from "react-router-dom"; // Navigation hook for routing
import { fetchUsersByRole } from "../util/users"; // Function to fetch users by role
import axios from "axios"; // HTTP client for making requests
import AuthContext from "../context/AuthProvider"; // Context for authentication
import { toast } from "react-toastify"; // Toast notifications

// Function to generate table based on data
const generateTable = (
  data, // Data for the table
  navigate, // Function to navigate
  editIndex, // Index of row being edited
  setEditIndex, // Function to set edit index
  managers, // Array of managers
  handleChange, // Function to handle changes in data
  handleSave, // Function to handle saving data
  auth, // Authentication context
  handleDelete
) => {
  // Define table columns
  const columns = [
    { key: "start_date", type: "date" }, // Column for start date
    { key: "name", type: "text" }, // Column for name
    { key: "manager", options: managers, type: "dropdown" }, // Column for manager with dropdown options
    {
      key: "status", // Column for status
      options: ["On-Going", "Completed", "Hold"], // Options for status dropdown
      type: "dropdown", // Type of input
    },
  ];

  // Function to handle column name display
  const handleColumnName = (column_name) => {
    return column_name.split("_").join(" "); // Replaces underscores with spaces
  };

  const handleCancel = () => {
    setEditIndex(null);
  };

  // Function to handle editing a row
  const handleEdit = (index) => {
    setEditIndex(index);
  };

  // JSX for rendering the table
  return (
    <table className="data-table">
      <thead>
        <tr>
          {/* Render table headers */}
          {columns.map((column, index) => (
            <th key={index}>{handleColumnName(column.key)}</th>
          ))}
          {/* Render actions column if user is not a client */}
          {auth.role !== "Client" && <th>Actions</th>}
        </tr>
      </thead>
      <tbody>
        {/* Render table rows */}
        {data.map((row, rowIndex) => {
          return (
            <tr key={rowIndex} className="table-row">
              {/* Render cells for each column */}
              {columns.map((column, colIndex) => {
                // Handle special cases for manager and status columns
                if (column.key === "manager") {
                  return (
                    <td
                      key={colIndex}
                      onClick={() =>
                        editIndex === rowIndex
                          ? null
                          : navigate(`/project/${row._id}`)
                      }
                    >
                      {/* Render dropdown for editing manager */}
                      {editIndex === rowIndex ? (
                        <select
                          value={JSON.stringify(row[column.key])}
                          onChange={(e) => {
                            handleChange("manager", e.target.value, rowIndex);
                          }}
                        >
                          {column.options.map((option, index) => {
                            return (
                              <option
                                value={JSON.stringify(option)}
                                key={index}
                              >
                                {option?.name}
                              </option>
                            );
                          })}
                        </select>
                      ) : (
                        row["associated_manager"].name
                      )}
                    </td>
                  );
                } else if (column.key === "status") {
                  return (
                    <td
                      key={colIndex}
                      onClick={() =>
                        editIndex === rowIndex
                          ? null
                          : navigate(`/project/${row._id}`)
                      }
                    >
                      {/* Render dropdown for editing status */}
                      {editIndex === rowIndex ? (
                        <select
                          name=""
                          id=""
                          value={row[column.key]}
                          onChange={(e) => {
                            handleChange("status", e.target.value, rowIndex);
                          }}
                        >
                          {column.options.map((option, index) => {
                            return (
                              <option value={option} key={index}>
                                {option}
                              </option>
                            );
                          })}
                        </select>
                      ) : (
                        <label
                          className={`status ${row[column.key].toLowerCase()}`}
                        >
                          {row[column.key]}
                        </label>
                      )}
                    </td>
                  );
                } else {
                  // Render input fields for other columns
                  return (
                    <td
                      key={colIndex}
                      onClick={() =>
                        editIndex === rowIndex
                          ? null
                          : navigate(`/project/${row._id}`)
                      }
                    >
                      {editIndex === rowIndex ? (
                        <input
                          type={column.type}
                          value={row[column.key]}
                          onChange={(e) => {
                            handleChange(column.key, e.target.value, rowIndex);
                          }}
                        />
                      ) : (
                        row[column.key]
                      )}
                    </td>
                  );
                }
              })}
              {/* Render action buttons if user is not a client */}
              {auth.role !== "Client" && (
                <td className="action-cell">
                  {editIndex === rowIndex ? (
                    <>
                      <button onClick={() => handleSave(row)}>
                        <i className="fas fa-save"></i>
                      </button>
                      <button onClick={() => handleCancel()}>
                        <i className="fas fa-times"></i>
                      </button>
                    </>
                  ) : (
                    <>
                      <button onClick={() => handleEdit(rowIndex)}>
                        <i className="fas fa-edit"></i>
                      </button>
                      <button onClick={() => handleDelete(row._id)}>
                        <i className="fas fa-trash-alt"></i>
                      </button>
                    </>
                  )}
                </td>
              )}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

// NavigationTab component
function NavigationTab({ data, setData }) {
  // State variables
  const [activeTab, setActiveTab] = useState("all");
  const [editIndex, setEditIndex] = useState(null);
  const [managers, setManagers] = useState([]);
  const [rows, setRows] = useState(data);
  const BASE_URL = process.env.REACT_APP_BASE_URL;
  const { auth } = useContext(AuthContext);

  // Function to handle changes in data
  const handleChange = (attribute, value, rowIndex) => {
    let newRows = [...rows];
    newRows = rows.map((row, index) => {
      if (index === rowIndex) {
        if (attribute === "manager") {
          row["associated_manager"] = JSON.parse(value);
        } else if (attribute === "status") {
          row[attribute] = value;
        } else {
          row[attribute] = value;
        }
      }
      return row;
    });
    setRows(newRows);
  };

  const handleDelete = async (project_id) => {
    try {
      const delete_confirmation = window.confirm(
        "Do You Really Want to Delete this Project?"
      );
      if (delete_confirmation) {
        const response = await axios.delete(
          `${BASE_URL}/project-delete/${project_id}`
        );
        if (response.statusText === "OK") {
          const newRows = rows.filter((row) => row._id !== project_id);
          console.log(newRows);
          setData(newRows);
        }

        toast.success("Project Deleted Successfully");

        //console.log(response);
      }
    } catch (error) {
      console.log(error);
    }
  };

  // Function to handle saving data
  const handleSave = async (row) => {
    try {
      const response = await axios.post(
        `${BASE_URL}/project/${row._id}/project_details`,
        {
          projectDetails: row,
        }
      );
      setEditIndex(null);
      setData(rows);
      toast.success("Data Updated Successfully");
    } catch (error) {
      toast.error("Some Error Occurred");
    }
  };

  // Function to fetch managers
  const fetchManagers = async () => {
    try {
      let response = await fetchUsersByRole("Manager");
      response = response.map((manager) => {
        return {
          _id: manager.user_id,
          name: manager.name,
          designation: "Manager",
        };
      });
      setManagers(response);
    } catch (error) {
      toast.error("Some Error Occurred");
    }
  };

  // Navigation hook
  const navigate = useNavigate();

  // Function to handle tab click
  const handleTabClick = (tabName) => {
    setActiveTab(tabName);
  };

  // Fetch managers and set initial rows on component mount
  useEffect(() => {
    fetchManagers();
    setRows(data);
  }, []);

  // Render component JSX
  return (
    <div className="navigation-tab">
      {/* Render navigation tabs */}
      <nav>
        <ul className="tab-list">
          <li
            className={activeTab === "all" ? "tab-item active" : "tab-item"}
            onClick={() => handleTabClick("all")}
          >
            All
          </li>
          <li
            className={
              activeTab === "completed" ? "tab-item active" : "tab-item"
            }
            onClick={() => handleTabClick("completed")}
          >
            Completed
          </li>
          <li
            className={
              activeTab === "on-going" ? "tab-item active" : "tab-item"
            }
            onClick={() => handleTabClick("on-going")}
          >
            On-Going
          </li>
          <li
            className={activeTab === "hold" ? "tab-item active" : "tab-item"}
            onClick={() => handleTabClick("hold")}
          >
            Hold
          </li>
        </ul>
      </nav>
      {/* Render tab content */}
      <div className="tab-content">
        {activeTab === "all" && (
          <>
            {/* Render table for all projects */}
            {generateTable(
              data,
              navigate,
              editIndex,
              setEditIndex,
              managers,
              handleChange,
              handleSave,
              auth,
              handleDelete
            )}
          </>
        )}
        {activeTab === "completed" && (
          <>
            {/* Render table for completed projects */}
            {generateTable(
              data.filter((row) => row.status.toLowerCase() === "completed"),
              navigate,
              editIndex,
              setEditIndex,
              managers,
              handleChange,
              handleSave,
              auth,
              handleDelete
            )}
          </>
        )}
        {activeTab === "on-going" && (
          <>
            {/* Render table for ongoing projects */}
            {generateTable(
              data.filter((row) => row.status.toLowerCase() === "on-going"),
              navigate,
              editIndex,
              setEditIndex,
              managers,
              handleChange,
              handleSave,
              auth,
              handleDelete
            )}
          </>
        )}
        {activeTab === "hold" && (
          <>
            {/* Render table for projects on hold */}
            {generateTable(
              data.filter((row) => row.status.toLowerCase() === "hold"),
              navigate,
              editIndex,
              setEditIndex,
              managers,
              handleChange,
              handleSave,
              auth,
              handleDelete
            )}
          </>
        )}
      </div>
    </div>
  );
}

// Export NavigationTab component
export default NavigationTab;
