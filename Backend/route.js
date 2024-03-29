// Importing required modules and controllers
const express = require("express");
const router = express.Router();
const {
  // Importing controller functions for handling project data
  getProjectDetails, // Retrieves project details
  getAuditHistory, // Retrieves audit history
  getEscalationMatrix, // Retrieves escalation matrix
  getPhases, // Retrieves phases
  getRiskProfiling, // Retrieves risk profiling data
  getSprintDetails, // Retrieves sprint details
  getStakeholders, // Retrieves stakeholders data
  getVersionHistory, // Retrieves version history
  alterProjectDetails, // Alters project details
  alterEscalationMatrix, // Alters escalation matrix
  alterAuditHistory, // Alters audit history
  alterPhases, // Alters phases
  alterRiskProfiling, // Alters risk profiling data
  alterSprintDetails, // Alters sprint details
  alterStakeholders, // Alters stakeholders data
  alterVersionHistory, // Alters version history
  getUserProjects, // Retrieves user projects data
  addProject, // Adds a new project
  getApprovedTeams, // Retrieves approved teams data
  getClientFeedback, // Retrieves client feedback data
  getMoMs, // Retrieves minutes of meeting data
  getProjectUpdates, // Retrieves project updates data
  getResources, // Retrieves resources data
  alterResources, // Alters resources data
  alterApprovedTeams, // Alters approved teams data
  alterClientFeedback, // Alters client feedback data
  alterMoMs, // Alters minutes of meeting data
  alterProjectUpdates, // Alters project updates data
  alterEditRequest,
  getEditRequest,
  getProjectEditRequest,
  deleteProject,
  addProjectChanges
} = require("./Controller/Project.js");

const { generatePDF } = require("./Controller/genPDF.js"); // Importing function for generating PDF files
const { sendMail, sendInviteEmail } = require("./Controller/email.js"); // Importing function for sending emails

// Routes for handling project-related data

// Route for fetching or altering user projects data
router.route("/projects").get(getUserProjects);
router.route("/addProject").post(addProject);

// Route for fetching or altering project details
router
  .route("/project/:id/project_details")
  .get(getProjectDetails) // GET request to fetch project details
  .post(alterProjectDetails); // POST request to alter project details

// Route for fetching or altering audit history
router
  .route("/project/:id/audit_history")
  .get(getAuditHistory) // GET request to fetch audit history
  .post(alterAuditHistory); // POST request to alter audit history

// Route for fetching or altering escalation matrix
router
  .route("/project/:id/escalation_matrix")
  .get(getEscalationMatrix) // GET request to fetch escalation matrix
  .post(alterEscalationMatrix); // POST request to alter escalation matrix

// Route for fetching or altering project phases
router
  .route("/project/:id/phases")
  .get(getPhases) // GET request to fetch project phases
  .post(alterPhases); // POST request to alter project phases

// Route for fetching or altering risk profiling data
router
  .route("/project/:id/risk_profiling")
  .get(getRiskProfiling) // GET request to fetch risk profiling data
  .post(alterRiskProfiling); // POST request to alter risk profiling data

// Route for fetching or altering sprint details
router
  .route("/project/:id/sprint_details")
  .get(getSprintDetails) // GET request to fetch sprint details
  .post(alterSprintDetails); // POST request to alter sprint details

// Route for fetching or altering stakeholders
router
  .route("/project/:id/stakeholders")
  .get(getStakeholders) // GET request to fetch stakeholders
  .post(alterStakeholders); // POST request to alter stakeholders

// Route for fetching or altering version history
router
  .route("/project/:id/version_history")
  .get(getVersionHistory) // GET request to fetch version history
  .post(alterVersionHistory); // POST request to alter version history

// Route for sending emails
router.route("/project/:id/sendEmail").post(sendMail);

// Route for generating PDF files
router.route("/project/:id/genPDF").get(generatePDF);

// Route for sending invitation emails
router.route("/sendEmail/invite").post(sendInviteEmail);

// Routes for fetching or altering approved teams data
router
  .route("/project/:id/approved_teams")
  .get(getApprovedTeams) // GET request to fetch approved teams data
  .post(alterApprovedTeams); // POST request to alter approved teams data

// Routes for fetching or altering resources data
router
  .route("/project/:id/resources")
  .get(getResources) // GET request to fetch resources data
  .post(alterResources); // POST request to alter resources data

// Routes for fetching or altering client feedback data
router
  .route("/project/:id/client_feedback")
  .get(getClientFeedback) // GET request to fetch client feedback data
  .post(alterClientFeedback); // POST request to alter client feedback data

// Routes for fetching or altering minutes of meeting data
router
  .route("/project/:id/mom")
  .get(getMoMs) // GET request to fetch minutes of meeting data
  .post(alterMoMs); // POST request to alter minutes of meeting data

// Routes for fetching or altering project updates data
router
  .route("/project/:id/project_updates")
  .get(getProjectUpdates) // GET request to fetch project updates data
  .post(alterProjectUpdates); // POST request to alter project updates data

router
  .route("/edit-request/:user_id")
  .get(getEditRequest)
  .post(alterEditRequest);

router.route("/project-edit-request/:project_id").get(getProjectEditRequest);

router.route("/project-delete/:project_id").delete(deleteProject);

router.route('/project-change/').post(addProjectChanges)


// Exporting the router module
module.exports = router;
