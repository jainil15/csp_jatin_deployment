import { v4 as uuidv4 } from "uuid"; // Importing UUID library for generating unique IDs
import axios from "axios";

const BASE_URL = process.env.REACT_APP_BASE_URL; // Base URL for API requests
const MGMT_TOKEN = process.env.REACT_APP_MGMT_TOKEN; // Management token for authorization

// Object containing available roles with corresponding role IDs
const available_roles = {
  Admin: "rol_z4VmtqeS9aPAMfmE",
  Auditor: "rol_LAk32QMvUbyTIiBO",
  Client: "rol_8lxEoAVYa4EGgizG",
  Manager: "rol_qLO42FIvSNsdZEO4",
};

// Function to generate a random password
function generatePassword() {
  const lowercaseChars = "abcdefghijklmnopqrstuvwxyz";
  const uppercaseChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const numericChars = "0123456789";
  const specialChars = "!@#$&*";

  let password = "";

  // Add at least one character from each character set
  password += lowercaseChars.charAt(
    Math.floor(Math.random() * lowercaseChars.length)
  );
  password += uppercaseChars.charAt(
    Math.floor(Math.random() * uppercaseChars.length)
  );
  password += numericChars.charAt(
    Math.floor(Math.random() * numericChars.length)
  );
  password += specialChars.charAt(
    Math.floor(Math.random() * specialChars.length)
  );

  // Fill the rest of the password with random characters from all sets
  for (let i = 0; i < 6; i++) {
    const charSet =
      lowercaseChars + uppercaseChars + numericChars + specialChars;
    password += charSet.charAt(Math.floor(Math.random() * charSet.length));
  }

  // Shuffle the password characters to make it more random
  password = password
    .split("")
    .sort(() => Math.random() - 0.5)
    .join("");

  return password;
}

// Function to send an invitation email to the new user
const sendInviteMail = async (user_details) => {
  try {
    const data = await axios.post(`${BASE_URL}/sendEmail/invite`, {
      ...user_details,
    });
  } catch (error) {
    console.log(error);
  }
};

// Function to fetch users by role from Auth0
export const fetchUsersByRole = async (role) => {
  try {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Authorization", `Bearer ${MGMT_TOKEN}`);

    var requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };

    const response = await fetch(
      `https://dev-34crl0ebsqxu7bk8.us.auth0.com/api/v2/roles/${available_roles[role]}/users`,
      requestOptions
    );
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
  }
};

// Function to fetch the role of a user from Auth0
export const fetchRoleOfUser = async (user_id) => {
  try {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Authorization", `Bearer ${MGMT_TOKEN}`);

    var requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };

    const response = await fetch(
      `https://dev-34crl0ebsqxu7bk8.us.auth0.com/api/v2/users/${user_id}/roles`,
      requestOptions
    );
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
  }
};

// Function to assign a role to a user in Auth0
const assignRoleToUser = async (user_id, user_role) => {
  try {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Authorization", `Bearer ${MGMT_TOKEN}`);

    var raw = JSON.stringify({
      roles: [`${available_roles[user_role]}`],
    });

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    const response = await fetch(
      `https://dev-34crl0ebsqxu7bk8.us.auth0.com/api/v2/users/${user_id}/roles`,
      requestOptions
    );
  } catch (error) {
    console.log(error);
  }
};

export const updateUserPassword = async (password, user_id) => {
  try {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Accept", "application/json");
    myHeaders.append("Authorization", `Bearer ${MGMT_TOKEN}`);

    var raw = JSON.stringify({
      password: password,
      connection: process.env.REACT_APP_CONNECTION,
    });

    var requestOptions = {
      method: "PATCH",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    let response = await fetch(
      `https://dev-34crl0ebsqxu7bk8.us.auth0.com/api/v2/users/${user_id}`,
      requestOptions
    );
    response = await response.json();
    console.log(response);
    return { status: "success", message: "Password Updated Successfully" };
  } catch (error) {
    console.log(error);
    return { status: "error", message: "Some Error Occurred" };
  }
};

// Function to create a new user in Auth0
export const createNewUser = async (user, role) => {
  try {
    const user_password = generatePassword(); // Generate a random password
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Accept", "application/json");
    myHeaders.append("Authorization", `Bearer ${MGMT_TOKEN}`);

    var raw = JSON.stringify({
      email: user.email,
      user_metadata: {},
      blocked: false,
      email_verified: false,
      app_metadata: {},
      given_name: "string",
      family_name: "string",
      name: user.name,
      nickname: "string",
      user_id: `${user._id ? user._id.split("|")[1] : uuidv4()}`, // Generate a unique user ID
      connection: process.env.REACT_APP_CONNECTION,
      password: user_password, // Set the generated password
      verify_email: false,
    });

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    const response = await fetch(
      "https://dev-34crl0ebsqxu7bk8.us.auth0.com/api/v2/users",
      requestOptions
    );
    if (response.status === 409) {
      return { status: "error", message: "Email Already Present" };
    }
    const created_user = await response.json();
    assignRoleToUser(created_user.user_id, role); // Assign role to the created user
    sendInviteMail({ email: user.email, user_id: created_user.user_id }); // Send invitation email to the user
    return { status: "success", message: "User Created Successfully" };
  } catch (error) {
    console.log(error);
  }
};
