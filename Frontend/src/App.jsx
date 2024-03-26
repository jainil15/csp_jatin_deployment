import React from "react";
import Layout from "./Layout";
import Login from "./components/Login";
import { Route, Routes } from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute";
import Home from "./components/Home";
import Project from "./components/Project";
import CreateProject from "./components/CreateProject";
import CreateUser from "./components/CreateUser";
import UpdateUserPassword from "./components/UpdateUserPassword";

// Main component defining the application routes
const App = () => {
  return (
    <Routes>
      {/* Route for login page */}
      <Route path="/login" element={<Login />}></Route>

      <Route path="/createUserLogin/?" element={<UpdateUserPassword />}></Route>
      {/* Protected routes */}
      <Route path="/" element={<ProtectedRoute />}>
        {/* Layout component containing navigation */}
        <Route path="/" element={<Layout />}>
          {/* Route for home page */}
          <Route path="/" element={<Home />}></Route>
          {/* Route for adding a new project */}
          <Route path="/addProject" element={<CreateProject />}></Route>
          {/* Route for adding a new user */}
          <Route path="/addUser" element={<CreateUser />}></Route>
          {/* Route for displaying project details */}
          <Route path="/project/:id" element={<Project />}></Route>
        </Route>
      </Route>
    </Routes>
  );
};

export default App;
