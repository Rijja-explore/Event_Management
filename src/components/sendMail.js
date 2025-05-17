// // src/components/sendMail.js

// /**
//  * Sends an email notification about event status changes
//  * 
//  * @param {string} recipientEmail - Email address of the event creator
//  * @param {string} recipientName - Name of the event creator
//  * @param {string} eventTitle - Title of the event
//  * @param {string} status - Status of the event (approved or rejected)
//  * @returns {Promise} - Promise representing the result of the email operation
//  */
// export const sendStatusMail = async (recipientEmail, recipientName, eventTitle, status) => {
//   try {
//     console.log("Starting to send email to:", recipientEmail);
    
//     if (!recipientEmail) {
//       throw new Error('Recipient email is required');
//     }

//     console.log("Sending email with params:", {
//       recipientEmail,
//       recipientName,
//       eventTitle,
//       status
//     });

//     const response = await fetch("http://localhost:5000/status-email", {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify({
//         recipientEmail,
//         recipientName,
//         eventTitle,
//         status
//       }),
//     });

//     console.log("Backend response status:", response.status);
//     const data = await response.json();
//     console.log("Backend response data:", data);
    
//     if (!response.ok) {
//       throw new Error(data.message || 'Error sending status email');
//     }
    
//     console.log(`Status email sent successfully to ${recipientEmail} - Status: ${status}`);
//     return data;
//   } catch (error) {
//     console.error('Error in sendStatusMail:', error);
//     throw error;
//   }
// };

/**
 * Sends an email notification about event status changes
 * 
 * @param {string} recipientEmail - Email address of the event creator
 * @param {string} recipientName - Name of the event creator
 * @param {string} eventTitle - Title of the event
 * @param {string} status - Status of the event (approved or rejected)
 * @returns {Promise} - Promise representing the result of the email operation
 */
export const sendStatusMail = async (recipientEmail, recipientName, eventTitle, status) => {
  try {
    console.log("Starting to send status email to:", recipientEmail);
    
    if (!recipientEmail) {
      throw new Error('Recipient email is required');
    }

    console.log("Sending status email with params:", {
      recipientEmail,
      recipientName,
      eventTitle,
      status
    });

    const response = await fetch("http://localhost:5000/status-email", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        recipientEmail,
        recipientName,
        eventTitle,
        status
      }),
    });

    console.log("Backend response status:", response.status);
    const data = await response.json();
    console.log("Backend response data:", data);
    
    if (!response.ok) {
      throw new Error(data.message || 'Error sending status email');
    }
    
    console.log(`Status email sent successfully to ${recipientEmail} - Status: ${status}`);
    return data;
  } catch (error) {
    console.error('Error in sendStatusMail:', error);
    throw error;
  }
};

/**
 * Sends an email notification about a new event matching user interests
 * 
 * @param {string} recipientEmail - Email address of the user
 * @param {string} eventTitle - Title of the event
 * @param {string} eventDate - Date of the event
 * @param {string} eventVenue - Venue of the event
 * @param {string} eventCategory - Category of the event
 * @returns {Promise} - Promise representing the result of the email operation
 */
export const sendNewEventMail = async (recipientEmail, eventTitle, eventDate, eventVenue, eventCategory) => {
  try {
    console.log("Starting to send new event email to:", recipientEmail);
    
    if (!recipientEmail) {
      throw new Error('Recipient email is required');
    }

    console.log("Sending new event email with params:", {
      recipientEmail,
      eventTitle,
      eventDate,
      eventVenue,
      eventCategory
    });

    const response = await fetch("http://localhost:5000/notify-new-event", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        recipientEmail,
        eventTitle,
        eventDate,
        eventVenue,
        eventCategory
      }),
    });

    console.log("Backend response status:", response.status);
    const data = await response.json();
    console.log("Backend response data:", data);
    
    if (!response.ok) {
      throw new Error(data.message || 'Error sending new event email');
    }
    
    console.log(`New event email sent successfully to ${recipientEmail} - Event: ${eventTitle}`);
    return data;
  } catch (error) {
    console.error('Error in sendNewEventMail:', error);
    throw error;
  }
};