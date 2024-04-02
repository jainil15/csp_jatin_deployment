require("dotenv").config(); // dotenv module for loading environment variables from a .env file

// Importing nodemailer module for sending emails
const nodemailer = require("nodemailer");
// Importing utility function formatColumnName from utility.js
const { formatColumnName } = require("../Utilities/utility.js");

// Function to generate email template based on stakeholder name and audit history
const generateEmailTemplate = (stakeholder_name, audit_history) => {
  // Filtering out invalid columns
  const invalid_column = ["project_id", "__v", "_id", "action"];
  let table_columns = Object.keys(audit_history[0]).filter(
    (column) => !invalid_column.includes(column)
  );

  // Constructing email template using HTML
  let email_template = `
  <html>
    
    <body>
    
    <h2>Hello ${stakeholder_name},</h2>
    <p>
      Please note that audit has been completed and here are the updated audit records:
    </p>
    <br />
    <Table style="border-collapse: collapse; padding: 10px; border: 1px solid black">
    <tr style="border-collapse: collapse; padding: 10px; border: 1px solid black">
    ${table_columns
      .map((column) => {
        // Generating table headers with formatted column names
        return `<th style="border-collapse: collapse; padding: 10px; border: 1px solid black">${formatColumnName(
          column
        )}</th>`;
      })
      .join("")}
    </tr>
    
    ${audit_history.map((row) => {
      // Generating table rows with data
      return `
      <tr style="border-collapse: collapse; padding: 10px; border: 1px solid black">
      ${table_columns
        .map((column) => {
          return `<td style="border-collapse: collapse; padding: 10px; border: 1px solid black">${row[column]}</td>`;
        })
        .join("")}
      </tr>
      `;
    })}
    
    </Table>
    <br />
    <h3>Thanks and Regards,</h3>
    <h3>Promact Infotech Pvt Ltd</h3>

    </body>
    
    </html>
  
  `;

  return email_template;
};
//Function to generate user invitation mail
const generateInviteEmailTemplate = (email, user_id) => {
  let email_template = `
  <html>
    
    <body>
    
    <h3>Hello,</h3>

    <h4>Your account for Customer Success has been created. Use below link to update your password:</h4>
    <br>
    <h4><a href="${process.env.APP_CLIENT_URL}/createUserLogin/?email=${email}&userId=${user_id}">Change Password</a></h4>
    <h3>Thanks and Regards,</h3>
    <h3>Promact Infotech Pvt Ltd</h3>

    </body>
    
    </html>
  
  `;
  return email_template;
};

// Function to send emails to stakeholders
const sendMail = async (req, res) => {
  try {
    // Fetching stakeholders data
    const { id } = req.params;
    const response = await fetch(
      `http:cspjatin.centralindia.cloudapp.azure.com:9002/api/project/${id}/stakeholders`
    );
    const { data } = await response.json();
    // Creating nodemailer transporter
    const transporter = nodemailer.createTransport({
      service: "gmail",
      host: "smtp.gmail.com",
      port: 587,
      secure: false,
      auth: {
        user: process.env.APP_EMAIL_USER,
        pass: process.env.APP_EMAIL_PASS,
      },
    });

    // Function to send emails to each stakeholder
    async function main() {
      data.map(async (stakeholder) => {
        const info = await transporter.sendMail({
          // Email details
          from: {
            name: "Project Update",
            address: "no.reply.domain11@gmail.com",
          },
          to: `${stakeholder.email}`,
          subject: "Audit History of Project has been Updated",
          // Generating email body using generateEmailTemplate function
          html: generateEmailTemplate(stakeholder.name, req.body),
        });
      });
    }
    // Calling main function to send emails
    main().catch(console.error);
    // Sending success response
    res.json({ status: "success", msg: "Emails sent successfully" });
  } catch (error) {
    // Sending error response
    res.json({ status: "error", msg: "Some Error Occurred" });
  }
};

//Function to send User Invitation Mail
const sendInviteEmail = (req, res) => {
  try {
    const { email, user_id } = req.body;
    console.log(req.body);
    const transporter = nodemailer.createTransport({
      service: "gmail",
      host: "smtp.gmail.com",
      port: 587,
      secure: false,
      auth: {
        user: process.env.APP_EMAIL_USER,
        pass: process.env.APP_EMAIL_PASS,
      },
    });

    async function main() {
      const info = await transporter.sendMail({
        // Email details
        from: {
          name: "Account for Customer Success",
          address: "no.reply.domain11@gmail.com",
        },
        to: `${email}`,
        subject: "Set Your Account Password for Customer Success",
        // Generating email body using generateInviteEmailTemplate function
        html: generateInviteEmailTemplate(email, user_id),
      });
    }

    main().catch(console.error);

    res
      .status(200)
      .json({ status: "success", message: "Emails Sent Successfully" });
  } catch (error) {
    res.status(500).json({ status: "error", message: "Internal Server Error" });
  }
};

module.exports = { sendMail, sendInviteEmail };
