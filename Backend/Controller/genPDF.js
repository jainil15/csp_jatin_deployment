// Importing necessary modules
const { jsPDF } = require("jspdf"); // Importing jsPDF module
const path = require("path"); // Importing path module for file path manipulation
const fs = require("fs"); // Importing fs module for file system operations
require("jspdf-autotable"); // Importing jspdf-autotable plugin for generating tables
const { formatColumnName } = require("../Utilities/utility.js"); // Importing utility function

// Function to add project details page to the PDF document
const addProjectDetailsPage = async (filename, doc, id) => {
  try {
    // Fetching project details data from the server
    let response = await fetch(
      `http:cspjatin.centralindia.cloudapp.azure.com:9002/api/project/${id}/project_details`
    );
    let { data } = await response.json();
    data = data[0]; // Extracting first element as project details

    // Constructing HTML content for project details
    const html = `
      Project Details
      Overview:
      ${data.overview}
      Budget:
      ${
        data.budget.type === "monthly"
          ? `Budget Type: ${data.budget.type}
      Projected Hours: ${data.budget.type_value}`
          : `Budget Type: ${data.budget.type}
      Duration(in Months): ${data.budget.type_value}`
      }
      Timeline:
      ${data.timeline}
      Stack:
      ${data.stack.label}
      Scope:
      ${data.scope}
    `;

    // Adding project details to the PDF document
    doc.text(html, 10, 10);
    doc.addPage(); // Adding a new page
  } catch (error) {
    // Throwing error if any occurs
    throw error;
  }
};

// Function to add project tables page to the PDF document
const addProjectTablesPage = async (filename, doc, id) => {
  try {
    // Routes for fetching different project-related data
    console.log("pdf", id);
    let routes = [
      `project/${id}/escalation_matrix`,
      `project/${id}/version_history`,
      `project/${id}/stakeholders`,
      `project/${id}/sprint_details`,
      `project/${id}/risk_profiling`,
      `project/${id}/audit_history`,
      `project/${id}/approved_teams`,
      `project/${id}/resources`,
      `project/${id}/client_feedback`,
      `project/${id}/mom`,
      `project/${id}/project_updates`,
    ];

    // Looping through each route to fetch and add data to the PDF
    for (const route of routes) {
      let response = await fetch(
        `http:cspjatin.centralindia.cloudapp.azure.com:9002/api/${route}`
      );
      let { data } = await response.json();
      let invalidColumns = ["_id", "__v", "project_id"];
      let objKeys = Object.keys(data[0]).filter(
        (column) => !invalidColumns.includes(column)
      );
      let objValues = [];

      // Extracting values for each object key
      data.forEach((record) => {
        let row = [];
        objKeys.forEach((col) => {
          row.push(record[col]);
        });
        objValues.push(row);
      });

      // Adding table header and body to the PDF document
      doc.text(`${formatColumnName(route.split("/")[2])} Table`, 10, 10);
      objKeys = objKeys.map((key) => formatColumnName(key)); // Formatting column names
      await doc.autoTable({
        head: [objKeys], // Table header
        body: objValues, // Table body
      });

      doc.addPage(); // Adding a new page after each table
    }
  } catch (error) {
    // Throwing error if any occurs
    throw error;
  }
};

// Function to generate PDF containing project details and tables
const generatePDF = async (req, res) => {
  console.log("in gen");
  try {
    let filename = Date.now(); // Generating a unique filename based on timestamp
    const doc = new jsPDF(); // Creating a new jsPDF document
    const { id: project_id } = req.params;
    await addProjectDetailsPage(filename, doc, project_id); // Adding project details page to the document
    await addProjectTablesPage(filename, doc, project_id); // Adding project tables page to the document

    const filePath = path.join(__dirname, "../", `${filename}.pdf`); // Generating file path
    doc.save(filePath); // Saving the PDF document

    // Downloading the PDF file and deleting it after download completes
    return res.download(filePath, `${filename}.pdf`, () => {
      fs.unlinkSync(filePath); // Deleting the PDF file after download
    });
  } catch (error) {
    // Sending error response if any occurs
    console.log(error);
    res.json({ status: "error", msg: error });
  }
};

module.exports = { generatePDF }; // Exporting the generatePDF function
