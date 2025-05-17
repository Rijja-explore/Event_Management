// src/backend_mail/server.js
require('dotenv').config();
const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Create a transporter object using SMTP transport
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER || 'event.ssn.noreply@gmail.com',
    pass: process.env.EMAIL_APP_PASSWORD // Your Gmail app password
  }
});

// Endpoint to handle contact form emails
app.post('/contact-email', async (req, res) => {
  const { email } = req.body;
  
  console.log("Received contact email request for:", email);
  
  if (!email) {
    return res.status(400).json({ message: 'Email is required' });
  }

  try {
    // Email options
    const mailOptions = {
      from: process.env.EMAIL_USER || 'event.ssn.noreply@gmail.com',
      to: email,
      subject: 'Thank you for contacting EventSphere',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #ddd; border-radius: 5px;">
          <h2 style="color: #3498db;">Thank You for Contacting EventSphere!</h2>
          <p>We appreciate your interest in EventSphere - Your Ultimate Hub for College Technical Events!</p>
          <p>We have received your inquiry and will get back to you soon.</p>
          <div style="margin: 20px 0; padding: 15px; background-color: #f8f9fa; border-left: 4px solid #3498db;">
            <p style="margin: 0;">If you have any urgent questions, please feel free to contact our support team.</p>
          </div>
          <p>Best regards,<br>The EventSphere Team</p>
        </div>
      `
    };

    console.log("Sending contact email...");
    const info = await transporter.sendMail(mailOptions);
    console.log("Contact email sent:", info.messageId);
    
    res.status(200).json({ message: 'Email sent successfully' });
  } catch (error) {
    console.error('Error sending contact email:', error);
    res.status(500).json({ message: 'Failed to send email', error: error.message });
  }
});

// Endpoint to handle event status emails
app.post('/status-email', async (req, res) => {
  const { recipientEmail, recipientName, eventTitle, status } = req.body;
  
  console.log("Received status email request:", {
    recipientEmail,
    recipientName,
    eventTitle,
    status
  });
  
  if (!recipientEmail || !eventTitle || !status) {
    console.log("Missing required fields for status email");
    return res.status(400).json({ message: 'Required fields missing' });
  }

  try {
    // Email subject based on status
    const subject = status === 'approved' 
      ? `Good News! Your Event "${eventTitle}" Has Been Approved`
      : `Update on Your Event "${eventTitle}"`;

    // Email content based on status
    const htmlContent = status === 'approved' 
      ? `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #ddd; border-radius: 5px;">
          <h2 style="color: #3498db;">Congratulations, ${recipientName || 'Event Organizer'}!</h2>
          <p>We are pleased to inform you that your event <strong>"${eventTitle}"</strong> has been approved!</p>
          <div style="margin: 20px 0; padding: 15px; background-color: #e8f4ff; border-left: 4px solid #3498db;">
            <p style="margin: 0;">Your event is now visible to participants and ready for registrations.</p>
          </div>
          <p>If you need to make any changes to your event details, please contact us as soon as possible.</p>
          <p>Best regards,<br>The EventSphere Team</p>
        </div>
      `
      : `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #ddd; border-radius: 5px;">
          <h2 style="color: #e74c3c;">Event Update: ${eventTitle}</h2>
          <p>Dear ${recipientName || 'Event Organizer'},</p>
          <p>We regret to inform you that your event <strong>"${eventTitle}"</strong> could not be approved at this time.</p>
          <div style="margin: 20px 0; padding: 15px; background-color: #ffeaea; border-left: 4px solid #e74c3c;">
            <p style="margin: 0;">This could be due to scheduling conflicts, resource constraints, or other policy considerations.</p>
          </div>
          <p>If you would like more information about this decision or wish to submit a revised event proposal, please contact the admin team.</p>
          <p>Best regards,<br>The EventSphere Team</p>
        </div>
      `;

    // Configure email options
    const mailOptions = {
      from: `EventSphere <${process.env.EMAIL_USER || 'event.ssn.noreply@gmail.com'}>`,
      to: recipientEmail,
      subject: subject,
      html: htmlContent
    };

    console.log("Sending status email to:", recipientEmail);
    const info = await transporter.sendMail(mailOptions);
    console.log("Status email sent:", info.messageId);
    
    res.status(200).json({ message: 'Status email sent successfully' });
  } catch (error) {
    console.error('Error sending status email:', error);
    res.status(500).json({ message: 'Failed to send status email', error: error.message });
  }
});

// Test endpoint for verifying email functionality
app.get('/test-email', async (req, res) => {
  try {
    const testEmail = req.query.email || 'your-test-email@example.com';
    console.log("Sending test email to:", testEmail);
    
    const mailOptions = {
      from: process.env.EMAIL_USER || 'event.ssn.noreply@gmail.com',
      to: testEmail,
      subject: 'Test Email from EventSphere',
      html: '<p>This is a test email from EventSphere.</p>'
    };

    const info = await transporter.sendMail(mailOptions);
    console.log("Test email sent:", info.messageId);
    res.status(200).send('Test email sent successfully');
  } catch (error) {
    console.error('Error sending test email:', error);
    res.status(500).send(`Failed to send test email: ${error.message}`);
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});