import React, { useEffect, useState } from "react";
import { Dropdown } from "monday-ui-react-core";
import "monday-ui-react-core/tokens";
import "../styling/project_overview_section.css";

const Project_Overview_Section = () => {
  const [budgetMode, setBudgetMode] = useState({});
  const [projectDetails, setProjectDetails] = useState({});

  const fetchData = async () => {
    try {
      const response = await fetch(
        "http://localhost:8000/project/project_details"
      );
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="overview-section-wrapper">
      <div className="overview-div">
        <label>Project Overview</label>
        <textarea value={projectDetails?.project_overview}></textarea>
      </div>
      <div className="budget-div">
        <div className="dropdown-div">
          <label> Project Budget</label>
          <Dropdown
            className="dropdown"
            searchable={false}
            onChange={(budgetMode) => setBudgetMode(budgetMode)}
            options={[
              { label: "Fixed", value: "fixed" },
              { label: "Monthly", value: "monthly" },
            ]}
          />
        </div>
        <div className="dropdown-input-div">
          {budgetMode?.label &&
            (budgetMode.label === "Fixed" ? (
              <>
                <label> Duration (in Months)</label>
                <input type="text" />
              </>
            ) : (
              <>
                <label> Budgeted Hours</label>
                <input type="text" />
              </>
            ))}
        </div>
      </div>
      <div className="timeline-div">
        <label> Timeline </label>
        <input type="text" />
      </div>
    </div>
  );
};

export default Project_Overview_Section;
