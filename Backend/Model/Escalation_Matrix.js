// Importing the mongoose library
const mongoose = require("mongoose");

// Defining the schema for the Escalation Matrix collection
const Escalation_Matrix_Schema = new mongoose.Schema({
  // Unique identifier for the escalation matrix document
  project_id: {
    type: String,
  },
  _id: {
    type: "String",
  },
  // Level of escalation
  level: {
    type: String,
    required: [true, "please provide level"],
  },
  // Type of escalation
  escalation_type: {
    type: String,
    required: [true, "please provide escalation type"],
  },
  // Member involved in the escalation
  member: {
    type: String,
    required: [true, "please provide selected member"],
  },
  // Designation of the member
  designation: {
    type: String,
    required: [true, "please provide available members"],
  },
  edited_by:{
    type:String
  }
});

// Exporting the Escalation_Matrix model, using the defined schema, as a Mongoose model named "Escalation_Matrix"
module.exports = mongoose.model("Escalation_Matrix", Escalation_Matrix_Schema);
