// Importing the mongoose library
const mongoose = require("mongoose");

// Defining the schema for the Project collection
const Project_Changes = new mongoose.Schema({
  _id: {
    type: String,
  },
  project_id: {
    type: String,
  },
  change_in: {
    type: String,
  },
  old_data: {
    type: Object,
  },
  new_data: {
    type: Object,
  },
});

// Exporting the Project model, using the defined schema, as a Mongoose model named "Project"
module.exports = mongoose.model("Project_Changes", Project_Changes);
