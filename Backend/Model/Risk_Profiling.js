// Importing the mongoose library
const mongoose = require("mongoose");

// Defining the schema for the Risk_Profiling collection
const Risk_Profiling_Schema = new mongoose.Schema({
  // Unique identifier for the risk profiling record
  project_id: {
    type: String,
  },
  _id: {
    type: "String",
  },
  // Type of risk being profiled
  risk_type: {
    type: String,
    // Validation rule: Risk type is required
    required: [true, "please provide risk type"],
  },
  // Description of the risk
  description: {
    type: String,
    // Validation rule: Description is required
    required: [true, "please provide description"],
  },
  // Severity level of the risk
  severity: {
    type: String,
    // Validation rule: Severity is required
    required: [true, "please provide severity"],
  },
  // Impact of the risk
  impact: {
    type: String,
    // Validation rule: Impact is required
    required: [true, "please provide impact"],
  },
  // Steps to mitigate or address the risk
  remedial_steps: {
    type: String,
    // Validation rule: Remedial steps are required
    required: [true, "please provide remedial steps"],
  },
  // Status of the risk
  status: {
    type: String,
    // Validation rule: Status is required
    required: [true, "please provide status"],
  },
  // Date when the risk was closed or resolved
  closure_date: {
    type: String,
    // Validation rule: Closure date is required
    required: [true, "please provide closure date"],
  },
  edited_by:{
    type:String
  }
});

// Exporting the Risk_Profiling model, using the defined schema, as a Mongoose model named "Risk_Profiling"
module.exports = mongoose.model("Risk_Profiling", Risk_Profiling_Schema);
