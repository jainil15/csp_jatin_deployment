// Importing the mongoose library
const mongoose = require("mongoose");

// Defining the schema for the Project collection
const Approved_Team_Schema = new mongoose.Schema({
  _id: {
    type: String,
  },
  project_id: {
    type: String,
  },
  no_of_resources: {
    type: String,
  },
  role: {
    type: String,
  },
  availability: {
    type: String,
  },
  duration: {
    type: String,
  },
  category: {
    type: String,
  },
  edited_by:{
    type:String
  }
});

// Exporting the Project model, using the defined schema, as a Mongoose model named "Project"
module.exports = mongoose.model("Approved_Team", Approved_Team_Schema);

// const default_approved_team = {
//   _id: "",
//   project_id: "",
//   no_of_resources: "",
//   role: "",
//   availability: "",
//   duration: "",
//   category:""
// };
