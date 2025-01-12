// Import nodemailer module
import nodemailer from 'nodemailer';

// Create a transporter using Gmail SMTP
const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 587,
  secure: false,
  auth: {
    user: process.env.MAILING_SERVICE_ADDRESS,
    pass: process.env.MAILING_SERVICE_APP_PASSWORD,
  }, 
  tls: {
    rejectUnauthorized: false, 
  },
});

// Function to send an email
async function sendEmail(to: string, subject: string, path: string, token: string, message: string) {
  // Email options
  const mailOptions = {
    from: process.env.MAILING_SERVICE_ADDRESS,
    to: to,
    subject: subject,
    text : '',
    html: `<p>Click <a href="http://localhost:${process.env.PORT}/${path}${token}">here</a> ${message}</p>`
  };

  // Send email
  return transporter.sendMail(mailOptions);
}

// Export the sendEmail function
export default sendEmail;
