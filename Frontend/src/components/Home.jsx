import React, { useEffect, useState, useContext } from "react";
import axios from "axios"; // Import axios for making HTTP requests
import NavigationTab from "./NavigationTab"; // Import NavigationTab component
import AuthContext from "../context/AuthProvider"; // Import AuthContext for authentication
import "../styling/home.css"; // Import CSS file for styling
import { toast } from "react-toastify"; // Import toast notifications

const Home = () => {
  const [associatedProjects, setAssociatedProjects] = useState([]); // State for associated projects
  const { auth } = useContext(AuthContext); // Get authentication details from context
  const BASE_URL = process.env.REACT_APP_BASE_URL; // Base URL for API requests

  // Function to fetch associated projects
  const fetchData = async () => {
    try {
      let { data } = await axios.get(`${BASE_URL}/projects`, {
        // Fetch projects from API
        params: { id: auth.id, role: auth.role }, // Pass user ID and role as query parameters
      });
      data = data.data; // Extract data from response
      setAssociatedProjects(data); // Set associated projects to state
    } catch (error) {
      toast.error("Some Error"); // Notify user in case of error
    }
  };

  // Fetch data on component mount
  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      {associatedProjects?.length > 0 ? (
        <>
          {/* Project Metrics Section */}
          <div className="project-metrics">
            {/* Metrics for all projects */}
            <div className="metrics-box">
              <h1>{associatedProjects.length}</h1>
              <label>all projects</label>
            </div>
            {/* Metrics for ongoing projects */}
            <div className="metrics-box">
              <h1>
                {
                  associatedProjects.filter(
                    (project) => project.status.toLowerCase() === "on-going"
                  ).length
                }
              </h1>
              <label>on-going</label>
            </div>
            {/* Metrics for completed projects */}
            <div className="metrics-box">
              <h1>
                {
                  associatedProjects.filter(
                    (project) => project.status.toLowerCase() === "completed"
                  ).length
                }
              </h1>
              <label>completed</label>
            </div>
            {/* Metrics for projects on hold */}
            <div className="metrics-box">
              <h1>
                {
                  associatedProjects.filter(
                    (project) => project.status.toLowerCase() === "hold"
                  ).length
                }
              </h1>
              <label>hold</label>
            </div>
          </div>
          {/* Render NavigationTab component */}
          <NavigationTab
            data={associatedProjects} // Pass associated projects as data
            setData={setAssociatedProjects} // Pass function to update associated projects
          />
        </>
      ) : (
        <div className="projects-placeholder">
          No associated projects found at the moment
        </div>
      )}
    </>
  );
};

export default Home;
