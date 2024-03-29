// Importing the mongoose library
const mongoose = require("mongoose");

// Defining the schema for the Version_History collection
const Version_History_Schema = new mongoose.Schema({
  // Unique identifier for the version history record
  project_id: {
    type: String,
  },
  _id: {
    type: "String",
  },

  // Version number of the project
  version: {
    type: String,
  },
  // Type of version (e.g., major, minor)
  type: {
    type: String,
  },
  // Description of the change made in this version
  change: {
    type: String,
  },
  // Reason for the change made in this version
  change_reason: {
    type: String,
  },
  // User who created this version
  created_by: {
    type: String,
  },

  revision_date: {
    type: String,
  },
  // Date of approval for this version
  approval_date: {
    type: String,
  },
  // User who approved this version
  approved_by: {
    type: String,
  },
  edited_by: {
    type: String,
  },
});

// Exporting the Version_History model, using the defined schema, as a Mongoose model named "Version_History"
module.exports = mongoose.model("Version_History", Version_History_Schema);
