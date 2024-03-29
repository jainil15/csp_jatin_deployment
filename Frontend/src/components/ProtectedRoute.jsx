import React, { useEffect, useState, useContext } from "react";
import { Navigate, Outlet } from "react-router-dom"; // Importing necessary components from react-router-dom
import { useAuth0 } from "@auth0/auth0-react"; // Importing useAuth0 hook from Auth0 React SDK
import AuthContext from "../context/AuthProvider"; // Importing AuthContext from context/AuthProvider
import { fetchRoleOfUser } from "../util/users"; // Importing fetchRoleOfUser function from util/users
import Loading from "./Loading"; // Importing Loading component
import { toast } from "react-toastify"; // Importing toast notifications for displaying messages

// ProtectedRoute component definition
const ProtectedRoute = ({ element }) => {
  // Using useContext to access AuthContext values
  const { auth, setAuth } = useContext(AuthContext);
  // Destructuring values from useAuth0 hook
  const { isAuthenticated, isLoading, user } = useAuth0();

  // Function to set user role in AuthContext
  const setUserRole = async () => {
    try {
      // Fetching user role from the server
      const res = await fetchRoleOfUser(user.sub);
      // Setting user role in AuthContext
     
      setAuth({ id: user.sub, role: res[0].name, user });
    } catch (error) {
      // Displaying error message using toast notification
      toast.error("Some Error");
    }
  };

  // useEffect hook to set user role when isAuthenticated changes
  useEffect(() => {
    if (isAuthenticated) setUserRole();
    else setAuth({});
  }, [isAuthenticated]);

  // Render loading component if still loading or user role is not set
  if (isLoading || (isAuthenticated && !auth.role)) {
    return <Loading />;
  }

  // If user is authenticated, render the protected routes, otherwise navigate to login
  return isAuthenticated ? <Outlet /> : <Navigate to="/login" />;
};

export default ProtectedRoute; // Exporting ProtectedRoute component
