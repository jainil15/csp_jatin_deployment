import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { v4 as uuidv4 } from "uuid"; // Importing UUID library for generating unique IDs
import AuthContext from "../context/AuthProvider"; // Importing AuthContext from context/AuthProvider
import { useAuth0 } from "@auth0/auth0-react"; // Importing useAuth0 hook from Auth0 React SDK
import "../styling/request-access.css";
import { FaCheck } from "react-icons/fa6";
import { RxCross2 } from "react-icons/rx";
import { toast, ToastContainer } from "react-toastify"; // Importing toast notifications for displaying messages

const RequestAccess = () => {
  const { user } = useAuth0();
  const [editRequests, setEditRequests] = useState([]);
  const { auth } = useContext(AuthContext);

  const BASE_URL = process.env.REACT_APP_BASE_URL; // Base URL for API requests
  const PATH_NAME = new URL(window.location.href).pathname;

  useEffect(() => {
    console.log(editRequests);
  }, [editRequests]);

  const requestEditAccess = async () => {
    try {
      const project_id = PATH_NAME.split("/")[2];

      const user_request = {
        _id: uuidv4(),
        user_id: user.sub,
        project_id,
        status: "pending",
        user: {
          name: user.name,
          role: auth.role,
          email: user.email,
        },
      };

      const response = await axios.post(
        `${BASE_URL}/edit-request/${user.sub}`,
        [user_request]
      );
      setEditRequests([user_request]);
      const { data } = await response.json();
      console.log(data, response);
      console.log(project_id);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchUserRequest = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/edit-request/${user.sub}`);
      const { data: requests } = response;
      setEditRequests(requests.data);
      console.log("user req", requests.data);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchProjectRequest = async () => {
    try {
      const project_id = PATH_NAME.split("/")[2];
      const response = await axios.get(
        `${BASE_URL}/project-edit-request/${project_id}`
      );
      const { data: requests } = response;
      setEditRequests(requests.data);
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (auth.role == "Admin" || auth.role == "Manager") {
      fetchProjectRequest();
    } else {
      fetchUserRequest();
    }
  }, []);

  const handleRequestStatus = async (updatedStatus, request_id) => {
    try {
      let updatedRequest = {};
      const updatedRequests = editRequests.map((request) => {
        if (request._id == request_id) {
          updatedRequest = { ...request, status: updatedStatus };
          return updatedRequest;
        } else {
          return request;
        }
      });

      // console.log(updatedRequest, updatedRequests);
      setEditRequests(updatedRequests);
      const response = await axios.post(
        `${BASE_URL}/edit-request/${user.sub}`,
        [updatedRequest]
      );

      console.log(response);
      toast.success("Request Status Updated Successfully");
    } catch (error) {
      console.log(error);
    }
  };

  const handleEditAccessMessage = () => {
    switch (editRequests[0].status) {
      case "approved":
        return (
          <div className="edit-access-message">
            Your request for Edit Access was Approved
          </div>
        );

      case "rejected":
        return (
          <div className="edit-access-message">
            Your request for Edit Access was not Approved
          </div>
        );

      default:
        return (
          <div className="edit-access-message">
            You have applied for Edit Access
          </div>
        );
    }
  };

  const generateRequestTable = () => {
    return (
      <table className="user-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {editRequests.map((request) => (
            <tr key={request._id}>
              <td>{request.user.name}</td>
              <td>{request.user.email}</td>
              <td>{request.user.role}</td>
              <td className="table-action-button-container">
                <button
                  className={`approve-button ${
                    request.status == "rejected" ? "disable-button" : ""
                  } ${request.status == "approved" ? "hide-hover" : ""}`}
                  disabled={
                    request.status == "rejected" || request.status == "approved"
                  }
                  onClick={() => handleRequestStatus("approved", request._id)}
                >
                  <FaCheck />
                </button>
                <button
                  className={`reject-button ${
                    request.status == "approved" ? "disable-button" : ""
                  }${request.status == "rejected" ? "hide-hover" : ""}`}
                  disabled={request.status == "approved"}
                  onClick={() => handleRequestStatus("rejected", request._id)}
                >
                  <RxCross2 />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  };

  return (
    <div className="request-access-container">
      <ToastContainer
        position="top-center"
        autoClose={3000}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        style={{ minWidth: "fit-content" }}
      />
      {auth.role == "Admin" || auth.role == "Manager" ? (
        <div>{generateRequestTable()}</div>
      ) : (
        <>
          {editRequests.length == 0 ? (
            <div className="request-edit-access-button-container">
              <label className="edit-access-message">
                You don't have Edit Access for this Project
              </label>
              <button onClick={requestEditAccess}>Request Edit Access</button>
            </div>
          ) : (
            <div className="edit-access-message-container">
              {handleEditAccessMessage()}
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default RequestAccess;
