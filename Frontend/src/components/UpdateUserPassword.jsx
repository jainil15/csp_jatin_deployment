import React, { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import "../styling/update-user-password.css";
import { toast, ToastContainer } from "react-toastify";
import { updateUserPassword } from "../util/users";
import { useAuth0 } from "@auth0/auth0-react";

const CreateUserLogin = () => {
  const { logout } = useAuth0();
  const [queryParameters] = useSearchParams();
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showNavigateButton, setShowNavigateButton] = useState(false);
  console.log(decodeURIComponent(queryParameters.get("userId")));

  useEffect(() => {
    if (
      queryParameters.size != 2 ||
      !queryParameters.get("email") ||
      !queryParameters.get("userId")
    ) {
      navigate("/login");
    }
  }, []);

  const handleCreateAccount = async () => {
    console.log(password, confirmPassword, password !== confirmPassword);
    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    } else {
      const response = await updateUserPassword(
        password,
        queryParameters.get("userId")
      );
      console.log(response);
      toast.success("Password Updated Successfully");
      setShowNavigateButton(true);
    }
  };

  return (
    <div className="root">
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
      <div className="create-user-login-form">
        {/* {queryParameters.get("name")} {queryParameters.get("email")} */}
        {showNavigateButton ? (
          <div className="create-user-account-button-container">
            <button
              onClick={() => {
                logout();
                navigate("/login");
              }}
              className="login-button"
            >
              Navigate to Login Page
            </button>
          </div>
        ) : (
          <>
            <h1>Change Password</h1>
            <div className="email-container">
              <label>Email</label>
              <input
                type="text"
                disabled
                value={queryParameters.get("email")}
              />
            </div>
            <div className="password-container">
              <label>Password</label>
              <input
                type="text"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="confirm-password-container">
              <label>Confirm Password</label>
              <input
                type="text"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>
            <div className="create-user-account-button-container">
              <button onClick={handleCreateAccount}>Update Password</button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default CreateUserLogin;
