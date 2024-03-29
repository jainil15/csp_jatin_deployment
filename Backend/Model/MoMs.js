// Importing the mongoose library
const mongoose = require("mongoose");

// Defining the schema for the Project collection
const MoMs_Schema = new mongoose.Schema({
  _id: {
    type: String,
  },
  project_id: {
    type: String,
  },
  date: {
    type: String,
  },
  duration: {
    type: String,
  },
  mom_link: {
    type: String,
  },
  comments: {
    type: String,
  },
  edited_by:{
    type:String
  }
});

// Exporting the Project model, using the defined schema, as a Mongoose model named "Project"
module.exports = mongoose.model("MoMs", MoMs_Schema);

// const default_mom = {
//   _id: "",
//   project_id: "",
//   date: "",
//   duration: "",
//   mom_link: "",
//   comments:""
// };
