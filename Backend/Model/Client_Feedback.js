// Importing the mongoose library
const mongoose = require("mongoose");

// Defining the schema for the Project collection
const Client_Feedback_Schema = new mongoose.Schema({
  _id: {
    type: String,
  },
  project_id: {
    type: String,
  },
  feedback_type: {
    type: String,
  },
  date_received: {
    type: String,
  },
  detailed_feedback: {
    type: String,
  },
  action_taken: {
    type: String,
  },
  closure_date: {
    type: String,
  },
  edited_by:{
    type:String
  }
});

// Exporting the Project model, using the defined schema, as a Mongoose model named "Project"
module.exports = mongoose.model("Client_Feedback", Client_Feedback_Schema);

// const default_client_feedback = {
//   _id: "",
//   project_id: "",
//   feedback_type: "",
//   date_received: "",
//   detailed_feedback: "",
//   action_taken: "",
//   closure_date:""
// };
