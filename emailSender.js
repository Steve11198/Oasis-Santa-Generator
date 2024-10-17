const nodemailer = require('nodemailer');
require('dotenv').config();  // Load environment variables from .env file

// Function to send Secret Santa emails
function sendSecretSantaEmail(senderEmail, recipientName, recipientEmail) {
    // Configure the email transporter using Gmail
    let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'gastema19@gmail.com',  // Replace with your Gmail email
            pass: 'tmwy xdbs xrqg azjw'      // Replace with your App Password
        }
    });

    // Email content
    let mailOptions = {
        from: process.env.GMAIL_USER,   // Sender email
        to: senderEmail,               // Email of the Secret Santa
        subject: 'Your Secret Santa Assignment',
        text: `You are the Secret Santa for ${recipientName}. Their email is ${recipientEmail}.`
    };

    // Send the email
    transporter.sendMail(mailOptions, function(error, info) {
        if (error) {
            console.error(`Failed to send email to ${senderEmail}:`, error);
        } else {
            console.log(`Email sent successfully to ${senderEmail}:`, info.response);
        }
    });
}

// Export the function to be used in app.js
module.exports = { sendSecretSantaEmail };
