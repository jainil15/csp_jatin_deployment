// Importing the mongoose library
const mongoose = require("mongoose");

// Defining the schema for the Project collection
const ResourceSchema = new mongoose.Schema({
  _id: {
    type: String,
  },
  project_id: {
    type: String,
  },
  resource_name: {
    type: String,
  },
  role: {
    type: String,
  },
  start_date: {
    type: String,
  },
  end_date: {
    type: String,
  },
  comment: {
    type: String,
  },
  edited_by:{
    type:String
  }
});

// Exporting the Project model, using the defined schema, as a Mongoose model named "Project"
module.exports = mongoose.model("Resource", ResourceSchema);

// const default_resource = {
//   _id: "",
//   project_id: "",
//   resource_name: "",
//   role: "",
//   start_date: "",
//   end_date: "",
//   comment:""
// };
