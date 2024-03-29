// Importing the mongoose library
const mongoose = require("mongoose");

// Defining the schema for the Phases collection
const Phases_Schema = new mongoose.Schema({
  // Unique identifier for the phase document
  project_id: {
    type: String,
  },
  _id: {
    type: "String",
  },
  // Title of the phase
  title: {
    type: String,
    required: [true, "please provide title of phase"],
  },
  // Start date of the phase
  start_date: {
    type: String,
    required: [true, "please provide start date of phase"],
  },
  // Completion date of the phase
  completion_date: {
    type: String,
    required: [true, "please provide completion date of phase"],
  },
  // Approval date of the phase
  approval_date: {
    type: String,
    required: [true, "please provide approval date of phase"],
  },
  // Status of the phase
  status: {
    type: String,
    required: [true, "please provide status of phase"],
  },
  // Revised completion date of the phase
  revised_completion_date: {
    type: String,
    required: [true, "please provide revised completion date of phase"],
  },
  // Comments related to the phase
  comments: {
    type: String,
    required: [true, "please provide comment"],
  },
  edited_by:{
    type:String
  }
});

// Exporting the Phases model, using the defined schema, as a Mongoose model named "Phases"
module.exports = mongoose.model("Phases", Phases_Schema);
