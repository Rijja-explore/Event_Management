// import { db } from './firebase';
// import { collection, addDoc, getDocs } from 'firebase/firestore';

// export async function createEvent(eventData) {
//   try {
//     // Validate required fields
//     if (!eventData.title || !eventData.eventDate || !eventData.category) {
//       throw new Error("Missing required event fields");
//     }

//     // Add the event to Firestore
//     const eventRef = await addDoc(collection(db, "events"), {
//       ...eventData,
//       createdAt: new Date(),
//       status: "published" // Ensure event is visible on ViewEvents page
//     });

//     console.log("Event created with ID:", eventRef.id);

//     // Fetch subscribers to check for matching interests
//     const subscribersSnapshot = await getDocs(collection(db, "subscribers"));
//     const emailPromises = [];

//     subscribersSnapshot.forEach(doc => {
//       const subscriber = doc.data();
//       const subscriberInterests = subscriber.interests || [];

//       // Check if any interest matches the event's category or venue
//       const isInterested = subscriberInterests.some(interest => {
//         if (interest.type === "category") {
//           return eventData.category?.toLowerCase().includes(interest.query.toLowerCase());
//         } else if (interest.type === "venue") {
//           return eventData.venue?.toLowerCase().includes(interest.query.toLowerCase());
//         }
//         return false;
//       });

//       // If a match is found, send an email notification via server.js
//       if (isInterested) {
//         const emailRequest = fetch('http://localhost:5000/status-email', {
//           method: 'POST',
//           headers: { 'Content-Type': 'application/json' },
//           body: JSON.stringify({
//             recipientEmail: subscriber.email,
//             recipientName: "Event Enthusiast", // No user-specific name available
//             eventTitle: eventData.title,
//             status: "interest"
//           })
//         });
//         emailPromises.push(emailRequest);
//       }
//     });

//     // Execute all email requests
//     if (emailPromises.length > 0) {
//       await Promise.all(emailPromises);
//       console.log(`Sent ${emailPromises.length} email notifications to subscribers`);
//     } else {
//       console.log("No subscribers found for this event");
//     }

//     return { success: true, eventId: eventRef.id };
//   } catch (error) {
//     console.error("Error creating event or sending notifications:", error);
//     return { success: false, error: error.message };
//   }
// }
import { db } from "./firebase";
import { collection, getDocs, query, where } from "firebase/firestore";
import { getFunctions, httpsCallable } from "firebase/functions";

const eventService = {
  notifySubscribers: async (eventData) => {
    try {
      const { title, category, eventDate, venue, agenda } = eventData;
      if (!category) {
        throw new Error("Event category is required for notifications");
      }

      // Fetch users with matching category interests
      const userInterestsSnapshot = await getDocs(collection(db, "userInterests"));
      const interestedUsers = [];
      
      userInterestsSnapshot.forEach(doc => {
        const data = doc.data();
        const interests = data.interests || [];
        const hasCategoryInterest = interests.some(interest => 
          interest.type === "category" && 
          interest.query.toLowerCase() === category.toLowerCase()
        );
        if (hasCategoryInterest && data.email) {
          interestedUsers.push(data.email);
        }
      });

      // Optionally: Fetch users who registered for events in the same category
      const registrationsSnapshot = await getDocs(
        query(collection(db, "registrations"), where("category", "==", category))
      );
      const registeredUsers = registrationsSnapshot.docs
        .map(doc => doc.data().email)
        .filter(Boolean);

      // Combine and deduplicate user emails
      const uniqueEmails = [...new Set([...interestedUsers, ...registeredUsers])];

      if (uniqueEmails.length === 0) {
        console.log("No users found to notify for category:", category);
        return;
      }

      // Send email notifications via Firebase Cloud Function
      const functions = getFunctions();
      const sendEventNotification = httpsCallable(functions, 'sendEventNotification');
      
      const emailPromises = uniqueEmails.map(email => 
        sendEventNotification({
          to: email,
          subject: `New Event Published: ${title}`,
          html: `
            <h2>New Event: ${title}</h2>
            <p><strong>Category:</strong> ${category}</p>
            <p><strong>Date:</strong> ${new Date(eventDate).toLocaleString()}</p>
            <p><strong>Venue:</strong> ${venue}</p>
            <p><strong>Agenda:</strong> ${agenda || "N/A"}</p>
            <p>Register now at: <a href="https://your-app.com/register?event=${encodeURIComponent(title)}">Register</a></p>
          `
        })
      );

      await Promise.all(emailPromises);
      console.log(`Sent notifications to ${uniqueEmails.length} users for event: ${title}`);
    } catch (error) {
      console.error("Error in notifySubscribers:", error);
      throw new Error("Failed to send notifications: " + error.message);
    }
  }
};

export default eventService;