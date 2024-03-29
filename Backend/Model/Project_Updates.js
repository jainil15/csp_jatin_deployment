// Importing the mongoose library
const mongoose = require("mongoose");

// Defining the schema for the Project collection
const Project_Updates_Schema = new mongoose.Schema({
  _id: {
    type: String,
  },
  project_id: {
    type: String,
  },
  date: {
    type: String,
  },
  general_updates: {
    type: String,
  },
  edited_by:{
    type:String
  }
});

// Exporting the Project model, using the defined schema, as a Mongoose model named "Project"
module.exports = mongoose.model("Project_Updates", Project_Updates_Schema);

// const default_project_updates = {
//   _id: "",
//   project_id: "",
//   date: "",
//   general_updates: ""
// };
