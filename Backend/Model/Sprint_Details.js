// Importing the mongoose library
const mongoose = require("mongoose");

// Defining the schema for the Sprint_Details collection
const Sprint_Details_Schema = new mongoose.Schema({
  // Unique identifier for the sprint details record
  project_id: {
    type: String,
  },
  _id: {
    type: "String",
  },
  // Sprint number or name
  sprint: {
    type: String,
    // Validation rule: Sprint is required
    required: [true, "please provide sprint"],
  },
  // Start date of the sprint
  start_date: {
    type: String,
    // Validation rule: Start date is required
    required: [true, "please provide start_date"],
  },
  // End date of the sprint
  end_date: {
    type: String,
    // Validation rule: End date is required
    required: [true, "please provide end_date"],
  },
  // Status of the sprint
  status: {
    type: String,
    // Validation rule: Status is required
    required: [true, "please provide status"],
  },
  // Comments or notes related to the sprint
  comments: {
    type: String,
    // Validation rule: Comments are required
    required: [true, "please provide comments"],
  },
  edited_by:{
    type:String
  }
});

// Exporting the Sprint_Details model, using the defined schema, as a Mongoose model named "Sprint_Details"
module.exports = mongoose.model("Sprint_Details", Sprint_Details_Schema);
