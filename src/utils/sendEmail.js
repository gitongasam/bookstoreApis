const { createTransport } = require("nodemailer");
require('dotenv').config();
const email_config = require('../config/emailConfig');

const transporter = createTransport(email_config);

async function sendMail(user_email, subject, text) {
  const confirmationLink = "https://samrexenterprises.co.ke/confirm-email"; // Replace with your actual confirmation link
  
  const message_options = {
    from: process.env.EMAIL_USER,
    to: user_email,
    subject: subject,
    html: `
      <p>${text}</p>
      <p>Click <a href="${confirmationLink}">here</a> to confirm your email.</p>
    `
  };

  try {
    let results = await transporter.sendMail(message_options);
    console.log(results);
  } catch (error) {
    console.log(error);
  }
}

module.exports = sendMail;
