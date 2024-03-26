import React, { useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import axios from "axios";

const RequestAccess = () => {
  const { user } = useAuth0();
  const [editAccess, setEditAccess] = useState([]);

  const BASE_URL = process.env.REACT_APP_BASE_URL; // Base URL for API requests
  const PATH_NAME = new URL(window.location.href).pathname;

  const requestEditAccess = async () => {
    try {
      const project_id = PATH_NAME.split("/")[2];
      const response = await axios.post(
        `${BASE_URL}/edit-request/${user.sub}`,
        [
          {
            user_id: user.sub,
            project_id,
            status: "pending",
          },
        ]
      );
      const { data } = await response.json();
      console.log(data, response);
      console.log(project_id);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchUserRequest = async () => {
    try {
      //   const response = await axios.get(`${BASE_URL}/edit-request/${user.sub}`);
      //   const { data } = await response.json();
      //console.log(data, response);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchUserRequest();
  }, []);

  return (
    <div>
      <div>
        <label>You don't have Edit Access for this Project</label>
        <button onClick={requestEditAccess}>Request Edit Access</button>
      </div>
      <div>You already have Edit Access</div>
    </div>
  );
};

export default RequestAccess;
