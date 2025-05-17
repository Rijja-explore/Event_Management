
// import React, { useState } from 'react';
// import axios from 'axios';
// import './Admin.css';
// import ssnLogo from './assets/ssnLogo.png';
// import ssnCampus from './assets/ssn_campus.jpeg';

// const Admin = () => {
//     const [showBanner, setShowBanner] = useState(true);
//     const [activeTab, setActiveTab] = useState('upcoming');
//     const [selectedEvent, setSelectedEvent] = useState(null);
//     const [upcomingEvents, setUpcomingEvents] = useState([
//         { id: 1, title: 'Tech Fest', date: '2025-08-15', description: 'A grand tech festival.' },
//         { id: 2, title: 'AI Conference', date: '2025-09-10', description: 'Discussing AI advancements.' }
//     ]);
//     const [approvedEvents, setApprovedEvents] = useState([
//         { id: 3, title: 'Cyber Security Talk', date: '2025-07-20', description: 'Cybersecurity awareness event.' }
//     ]);
//     const [pendingEvents, setPendingEvents] = useState([
//         { id: 4, title: 'Hackathon', date: '2025-10-05', description: 'Competitive programming event.' }
//     ]);
//     const [eventHistory, setEventHistory] = useState([
//         { id: 5, title: 'Web Dev Workshop', date: '2025-06-12', description: 'Learn modern web development.' }
//     ]);

//     const approveEvent = (eventId) => {
//         const event = pendingEvents.find(event => event.id === eventId);
//         setPendingEvents(pendingEvents.filter(event => event.id !== eventId));
//         setApprovedEvents([...approvedEvents, event]);
//         setActiveTab('approved');
//     };
    
//     const deleteEvent = (eventId) => {
//         setPendingEvents(pendingEvents.filter(event => event.id !== eventId));
//     };

//     return (
//         <div className="admin-dashboard-container">
//             <nav className="navbar">
//                 <div className="navbar-left">
//                     <img src={ssnLogo} alt="SSN College Logo" className="ssn-logo" />
//                 </div>
//                 <div className="navbar-right">
//                     <a href="#" className="nav-link">Home</a>
//                     <a href="#" className="nav-link">About SSN</a>
//                     <a href="#" className="nav-link">List of Events</a>
//                     <input type="text" placeholder="Search..." className="search-bar" />
//                     <button className="logout-button">Logout</button>
//                 </div>
//             </nav>

//             {showBanner && (
//                 <div className="image-banner">
//                     <img src={ssnCampus} alt="SSN Campus" className="campus-image" />
//                     <div className="banner-text">ADMIN DASHBOARD</div>
//                 </div>
//             )}

//             <div className="dashboard-container">
//                 <div className="sidebar">
//                     <button className={activeTab === 'upcoming' ? 'sidebar-btn active' : 'sidebar-btn'} onClick={() => setActiveTab('upcoming')}>Upcoming Events</button>
//                     <button className={activeTab === 'pending' ? 'sidebar-btn active' : 'sidebar-btn'} onClick={() => setActiveTab('pending')}>To Be Approved</button>
//                     <button className={activeTab === 'approved' ? 'sidebar-btn active' : 'sidebar-btn'} onClick={() => setActiveTab('approved')}>Approved Events</button>
//                     <button className={activeTab === 'history' ? 'sidebar-btn active' : 'sidebar-btn'} onClick={() => setActiveTab('history')}>Event History</button>
//                 </div>

//                 <div className="main-content">
//                     {activeTab === 'upcoming' && (
//                         <div className="event-list">
//                             <h2>Upcoming Events</h2>
//                             {upcomingEvents.map(event => (
//                                 <div key={event.id} className="event-item" onClick={() => setSelectedEvent(event)}>
//                                     <p>{event.title} - {event.date}</p>
//                                 </div>
//                             ))}
//                         </div>
//                     )}

//                     {activeTab === 'pending' && (
//                         <div className="event-list">
//                             <h2>To Be Approved</h2>
//                             {pendingEvents.map(event => (
//                                 <div key={event.id} className="event-item" onClick={() => setSelectedEvent(event)}>
//                                     <p>{event.title} - {event.date}</p>
//                                     <button className="approve-button" onClick={() => approveEvent(event.id)}>Approve</button>
//                                     <button className="reject-button" onClick={() => deleteEvent(event.id)}>Reject</button>
//                                 </div>
//                             ))}
//                         </div>
//                     )}

//                     {activeTab === 'approved' && (
//                         <div className="event-list">
//                             <h2>Approved Events</h2>
//                             {approvedEvents.map(event => (
//                                 <div key={event.id} className="event-item" onClick={() => setSelectedEvent(event)}>
//                                     <p>{event.title} - {event.date}</p>
//                                 </div>
//                             ))}
//                         </div>
//                     )}

//                     {activeTab === 'history' && (
//                         <div className="event-list">
//                             <h2>Event History</h2>
//                             {eventHistory.map(event => (
//                                 <div key={event.id} className="event-item" onClick={() => setSelectedEvent(event)}>
//                                     <p>{event.title} - {event.date}</p>
//                                 </div>
//                             ))}
//                         </div>
//                     )}
//                 </div>
//             </div>

//             {selectedEvent && (
//                 <div className="popup-modal">
//                     <div className="modal-content">
//                         <button className="close-button" onClick={() => setSelectedEvent(null)}>✖</button>
//                         <h2>{selectedEvent.title}</h2>
//                         <p>Date: {selectedEvent.date}</p>
//                         <p>Description: {selectedEvent.description}</p>
//                         <button onClick={() => setSelectedEvent(null)}>Close</button>
//                     </div>
//                 </div>
//             )}
//         </div>
//     );
// };

// export default Admin;


// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import './Admin.css';
// import ssnLogo from './assets/ssnLogo.png';
// import ssnCampus from './assets/ssn_campus.jpeg';

// const Admin = () => {
//     const [activeTab, setActiveTab] = useState('upcoming');
//     const [showBanner, setShowBanner] = useState(true);
//     const [upcomingEvents, setUpcomingEvents] = useState([]);
//     const [approvedEvents, setApprovedEvents] = useState([]);
//     const [pendingEvents, setPendingEvents] = useState([]);
//     const [eventHistory, setEventHistory] = useState([]);
//     const [selectedEvent, setSelectedEvent] = useState(null);

//     useEffect(() => {
//         axios.get('http://127.0.0.1:5000/events')
//             .then(response => {
//                 setUpcomingEvents(response.data.upcoming || []);
//                 setApprovedEvents(response.data.approved || []);
//                 setPendingEvents(response.data.pending || []);
//                 setEventHistory(response.data.history || []);
//             })
//             .catch(error => console.error("Error fetching events:", error));
//     }, []);

//     useEffect(() => {
//         document.body.style.background = "#ffffff";
//         const handleScroll = () => {
//             setShowBanner(window.scrollY <= 100);
//         };
//         window.addEventListener('scroll', handleScroll);
//         return () => window.removeEventListener('scroll', handleScroll);
//     }, []);

//     const approveEvent = (eventId) => {
//         axios.post(`http://127.0.0.1:5000/approve/${eventId}`)
//             .then(response => {
//                 setUpcomingEvents(response.data.upcoming || []);
//                 setApprovedEvents(response.data.approved || []);
//                 setPendingEvents(response.data.pending || []);
//                 setEventHistory(response.data.history || []);
//             })
//             .catch(error => console.error("Error approving event:", error));
//     };

//     const deleteEvent = (eventId) => {
//         axios.delete(`http://127.0.0.1:5000/delete/${eventId}`)
//             .then(response => {
//                 setUpcomingEvents(response.data.upcoming || []);
//                 setApprovedEvents(response.data.approved || []);
//                 setPendingEvents(response.data.pending || []);
//                 setEventHistory(response.data.history || []);
//             })
//             .catch(error => console.error("Error deleting event:", error));
//     };

//     return (
//         <div className="admin-container">
//             <nav className="navbar">
//                 <div className="navbar-left">
//                     <img src={ssnLogo} alt="SSN College Logo" className="ssn-logo" />
//                 </div>
//                 <div className="navbar-right">
//                     <a href="#" className="nav-link">Home</a>
//                     <a href="#" className="nav-link">About SSN</a>
//                     <a href="#" className="nav-link">Events</a>
//                     <input type="text" placeholder="Search..." className="search-bar" />
//                     <button className="logout-button">Logout</button>
//                 </div>
//             </nav>

//             {showBanner && (
//                 <div className="image-banner">
//                     <img src={ssnCampus} alt="SSN Campus" className="campus-image" />
//                     <div className="banner-text">ADMIN DASHBOARD</div>
//                 </div>
//             )}

//             <div className="dashboard-container">
//                 <div className="sidebar">
//                     <button className={activeTab === 'upcoming' ? 'sidebar-btn active' : 'sidebar-btn'} onClick={() => setActiveTab('upcoming')}>Upcoming Events</button>
//                     <button className={activeTab === 'pending' ? 'sidebar-btn active' : 'sidebar-btn'} onClick={() => setActiveTab('pending')}>Pending Approval</button>
//                     <button className={activeTab === 'approved' ? 'sidebar-btn active' : 'sidebar-btn'} onClick={() => setActiveTab('approved')}>Approved Events</button>
//                     <button className={activeTab === 'history' ? 'sidebar-btn active' : 'sidebar-btn'} onClick={() => setActiveTab('history')}>Event History</button>
//                 </div>

//                 <div className="main-content">
//                     {activeTab === 'upcoming' && (
//                         <div className="event-list">
//                             <h2>Upcoming Events</h2>
//                             {upcomingEvents.length > 0 ? (
//                                 upcomingEvents.map(event => (
//                                     <div key={event.id} className="event-item" onClick={() => setSelectedEvent(event)}>
//                                         <p>{event.title} - {event.date}</p>
//                                     </div>
//                                 ))
//                             ) : <p>No upcoming events.</p>}
//                         </div>
//                     )}

//                     {activeTab === 'pending' && (
//                         <div className="event-list">
//                             <h2>Pending Approval</h2>
//                             {pendingEvents.length > 0 ? (
//                                 pendingEvents.map(event => (
//                                     <div key={event.id} className="event-item" onClick={() => setSelectedEvent(event)}>
//                                         <p>{event.title} - {event.date}</p>
//                                         <button className="approve-button" onClick={() => approveEvent(event.id)}>Approve</button>
//                                         <button className="reject-button" onClick={() => deleteEvent(event.id)}>Reject</button>
//                                     </div>
//                                 ))
//                             ) : <p>No pending events.</p>}
//                         </div>
//                     )}

//                     {activeTab === 'approved' && (
//                         <div className="event-list">
//                             <h2>Approved Events</h2>
//                             {approvedEvents.length > 0 ? (
//                                 approvedEvents.map(event => (
//                                     <div key={event.id} className="event-item" onClick={() => setSelectedEvent(event)}>
//                                         <p>{event.title} - {event.date}</p>
//                                     </div>
//                                 ))
//                             ) : <p>No approved events.</p>}
//                         </div>
//                     )}

//                     {activeTab === 'history' && (
//                         <div className="event-list">
//                             <h2>Event History</h2>
//                             {eventHistory.length > 0 ? (
//                                 eventHistory.map(event => (
//                                     <div key={event.id} className="event-item" onClick={() => setSelectedEvent(event)}>
//                                         <p>{event.title} - {event.date}</p>
//                                     </div>
//                                 ))
//                             ) : <p>No past events.</p>}
//                         </div>
//                     )}
//                 </div>
//             </div>

//             {selectedEvent && (
//                 <div className="popup-modal">
//                     <div className="modal-content">
//                         <h2>{selectedEvent.title}</h2>
//                         <p>Date: {selectedEvent.date}</p>
//                         <p>Description: {selectedEvent.description}</p>
//                         <button onClick={() => setSelectedEvent(null)}>Close</button>
//                     </div>
//                 </div>
//             )}
//         </div>
//     );
// };

// export default Admin;


// import { useAuth } from "../contexts/AuthContext";
// import { useNavigate } from "react-router-dom";
// import React, { useState, useEffect } from 'react';
// import './Admin.css';
// import ssnLogo from './assets/ssnLogo.png';
// import ssnCampus from './assets/ssn_campus.jpeg';
// import { sendStatusMail } from './sendMail';
// import { db } from './firebase';
// import { collection, getDocs, doc, updateDoc } from 'firebase/firestore';

// const Admin = () => {
//   const { currentUser, logout } = useAuth();
//   const navigate = useNavigate();
//   const [activeTab, setActiveTab] = useState('pending');
//   const [showBanner, setShowBanner] = useState(true);
//   const [events, setEvents] = useState([]);
//   const [selectedEvent, setSelectedEvent] = useState(null);
//   const [clashPopup, setClashPopup] = useState(null);

//   const handleLogout = async () => {
//     try {
//       await logout();
//       navigate("/login");
//     } catch (error) {
//       console.error("Logout failed:", error);
//     }
//   };

//   const fetchEvents = async () => {
//     try {
//       const eventCollection = collection(db, 'events');
//       const eventSnapshot = await getDocs(eventCollection);
//       const eventData = eventSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
//       setEvents(eventData);
//     } catch (error) {
//       console.error('Error fetching events:', error);
//     }
//   };

//   const updateEventStatus = async (eventId, newStatus) => {
//     try {
//       const eventRef = doc(db, 'events', eventId);
//       await updateDoc(eventRef, { status: newStatus });
//       fetchEvents();
//     } catch (error) {
//       console.error(`Error updating event ${eventId} to ${newStatus}`, error);
//     }
//   };

//   const checkClashes = (eventToApprove) => {
//     const approvedEvents = events.filter(e => e.status === "approved" && e.id !== eventToApprove.id);
//     const clashes = [];
    
//     const eventDateToApprove = new Date(eventToApprove.eventDate);
//     const venueToApprove = eventToApprove.venue?.toLowerCase();

//     approvedEvents.forEach(approvedEvent => {
//       const approvedDate = new Date(approvedEvent.eventDate);
//       const approvedVenue = approvedEvent.venue?.toLowerCase();

//       const dateClash = eventDateToApprove.toDateString() === approvedDate.toDateString();
//       const venueClash = venueToApprove && approvedVenue && venueToApprove === approvedVenue;

//       if (dateClash || venueClash) {
//         clashes.push({
//           title: approvedEvent.title,
//           date: approvedDate.toLocaleDateString(),
//           venue: approvedEvent.venue || "N/A",
//           dateClash,
//           venueClash
//         });
//       }
//     });

//     return clashes;
//   };

//   const handleApproveEvent = async (eventId) => {
//     const event = events.find(e => e.id === eventId);
//     if (!event) return;

//     const clashes = checkClashes(event);
    
//     if (clashes.length > 0) {
//       setClashPopup({
//         hasClashes: true,
//         clashes: clashes,
//         eventTitle: event.title
//       });
//     } else {
//       setClashPopup({
//         hasClashes: false,
//         eventTitle: event.title
//       });
      
//       // Proceed with approval
//       await updateEventStatus(eventId, "approved");
//       try {
//         await sendStatusMail(event.createdByEmail, event.createdBy, event.title, "approved");
//       } catch (error) {
//         console.error("Failed to send approval email:", error);
//       }
//     }
//   };

//   const rejectEvent = async (eventId) => {
//     const event = events.find(e => e.id === eventId);
//     await updateEventStatus(eventId, "rejected");
//     if (event) {
//       try {
//         await sendStatusMail(event.createdByEmail, event.createdBy, event.title, "rejected");
//       } catch (error) {
//         console.error("Failed to send rejection email:", error);
//       }
//     }
//   };

//   useEffect(() => {
//     fetchEvents();
//   }, []);

//   useEffect(() => {
//     document.body.style.background = '#ffffff';
//     const handleScroll = () => setShowBanner(window.scrollY <= 100);
//     window.addEventListener('scroll', handleScroll);
//     return () => window.removeEventListener('scroll', handleScroll);
//   }, []);

//   const renderEvents = (status) => {
//     const today = new Date();

//     return events.filter(event => {
//       const eventDate = new Date(event.eventDate);
//       if (status === 'pending') return event.status === '';
//       if (status === "approved") return event.status === "approved";
//       if (status === "upcoming") return event.status === "approved" && eventDate > today;
//       if (status === "published") return event.status === "published";
//       return false;
//     }).map(event => (
//       <div key={event.id} className="event-item" onClick={() => setSelectedEvent(event)}>
//         <p>{event.title} - {new Date(event.eventDate).toLocaleDateString()}</p>
//         {status === 'pending' && (
//           <>
//             <button
//               className="approve-button"
//               onClick={(e) => {
//                 e.stopPropagation();
//                 handleApproveEvent(event.id);
//               }}
//             >
//               Approve
//             </button>
//             <button
//               className="reject-button"
//               onClick={(e) => {
//                 e.stopPropagation();
//                 rejectEvent(event.id);
//               }}
//             >
//               Reject
//             </button>
//           </>
//         )}
//       </div>
//     ));
//   };

//   return (
//     <div className="admin-container">
//       <nav className="navbar">
//         <div className="navbar-left">
//           <img src={ssnLogo} alt="SSN College Logo" className="ssn-logo" />
//         </div>
//         <div className="navbar-right">
//           <span className="user-info">Welcome, {currentUser?.displayName || "Admin"}</span>
//           <a href="#" className="nav-link">Home</a>
//           <a href="#" className="nav-link">About SSN</a>
//           <a href="#" className="nav-link">Events</a>
//           <input type="text" placeholder="Search..." className="search-bar" />
//           <button className="logout-button" onClick={handleLogout}>Logout</button>
//         </div>
//       </nav>

//       {showBanner && (
//         <div className="image-banner">
//           <img src={ssnCampus} alt="SSN Campus" className="campus-image" />
//           <div className="banner-text">ADMIN DASHBOARD</div>
//         </div>
//       )}

//       <div className="dashboard-container">
//         <div className="sidebar">
//           {['pending', 'approved', 'upcoming', 'published'].map(tab => (
//             <button
//               key={tab}
//               className={activeTab === tab ? 'sidebar-btn active' : 'sidebar-btn'}
//               onClick={() => setActiveTab(tab)}
//             >
//               {tab.charAt(0).toUpperCase() + tab.slice(1)} Events
//             </button>
//           ))}
//         </div>

//         <div className="main-content">
//           <div className="event-list">
//             <h2>{activeTab.charAt(0).toUpperCase() + activeTab.slice(1)} Events</h2>
//             {renderEvents(activeTab)}
//           </div>
//         </div>
//       </div>

//       {selectedEvent && (
//         <div className="popup-modal">
//           <div className="modal-content">
//             <h2>{selectedEvent.title}</h2>
//             <p>Date: {new Date(selectedEvent.eventDate).toLocaleDateString()}</p>
//             <p>Description: {selectedEvent.description}</p>
//             <button onClick={() => setSelectedEvent(null)}>Close</button>
//           </div>
//         </div>
//       )}

//       {clashPopup && (
//         <div className="popup-modal">
//           <div className="modal-content">
//             <h2>Event Clash Check: {clashPopup.eventTitle}</h2>
//             {clashPopup.hasClashes ? (
//               <>
//                 <p>The following clashes were detected:</p>
//                 {clashPopup.clashes.map((clash, index) => (
//                   <div key={index}>
//                     <p><strong>{clash.title}</strong></p>
//                     <p>Date: {clash.date}</p>
//                     <p>Venue: {clash.venue}</p>
//                     <p>Clash Type: {clash.dateClash && "Date"}{clash.dateClash && clash.venueClash && ", "}{clash.venueClash && "Venue"}</p>
//                   </div>
//                 ))}
//                 <p>Please resolve conflicts before approving.</p>
//               </>
//             ) : (
//               <p>No clashes detected. Event has been approved successfully!</p>
//             )}
//             <button onClick={() => setClashPopup(null)}>Close</button>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Admin;

// import { useAuth } from "../contexts/AuthContext";
// import { useNavigate } from "react-router-dom";
// import React, { useState, useEffect } from 'react';
// import './Admin.css';
// import ssnLogo from './assets/ssnLogo.png';
// import ssnCampus from './assets/ssn_campus.jpeg';
// import { sendStatusMail } from './sendMail';
// import { db } from './firebase';
// import { collection, getDocs, doc, updateDoc } from 'firebase/firestore';

// const Admin = () => {
//   const { currentUser, logout } = useAuth();
//   const navigate = useNavigate();
//   const [activeTab, setActiveTab] = useState('pending');
//   const [showBanner, setShowBanner] = useState(true);
//   const [events, setEvents] = useState([]);
//   const [selectedEvent, setSelectedEvent] = useState(null);
//   const [clashPopup, setClashPopup] = useState(null);

//   const handleLogout = async () => {
//     try {
//       await logout();
//       navigate("/login");
//     } catch (error) {
//       console.error("Logout failed:", error);
//     }
//   };

//   const handleAnalyticsClick = () => {
//     navigate('/analytics');
//   };

//   const fetchEvents = async () => {
//     try {
//       const eventCollection = collection(db, 'events');
//       const eventSnapshot = await getDocs(eventCollection);
//       const eventData = eventSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
//       setEvents(eventData);
//     } catch (error) {
//       console.error('Error fetching events:', error);
//     }
//   };

//   const updateEventStatus = async (eventId, newStatus) => {
//     try {
//       const eventRef = doc(db, 'events', eventId);
//       await updateDoc(eventRef, { status: newStatus });
//       await fetchEvents(); // Refresh events after update
//     } catch (error) {
//       console.error(`Error updating event ${eventId} to ${newStatus}`, error);
//     }
//   };

//   const checkClashes = (eventToApprove) => {
//     const approvedEvents = events.filter(e => e.status === "approved" && e.id !== eventToApprove.id);
//     const clashes = [];
    
//     const eventDateToApprove = new Date(eventToApprove.eventDate);
//     const venueToApprove = eventToApprove.venue?.toLowerCase();

//     approvedEvents.forEach(approvedEvent => {
//       const approvedDate = new Date(approvedEvent.eventDate);
//       const approvedVenue = approvedEvent.venue?.toLowerCase();

//       const dateClash = eventDateToApprove.toDateString() === approvedDate.toDateString();
//       const venueClash = venueToApprove && approvedVenue && venueToApprove === approvedVenue;

//       if (dateClash && venueClash) {
//         clashes.push({
//           title: approvedEvent.title,
//           date: approvedDate.toLocaleDateString(),
//           venue: approvedEvent.venue || "N/A",
//           dateClash,
//           venueClash
//         });
//       }
//     });

//     return clashes;
//   };

//   const handleApproveEvent = async (eventId) => {
//     const event = events.find(e => e.id === eventId);
//     if (!event) return;

//     const clashes = checkClashes(event);
    
//     if (clashes.length > 0) {
//       setClashPopup({
//         hasClashes: true,
//         clashes: clashes,
//         eventId: eventId,
//         eventTitle: event.title,
//         proceed: false
//       });
//     } else {
//       await updateEventStatus(eventId, "approved");
//     }
//   };

//   const handleForceApprove = async (eventId) => {
//     const event = events.find(e => e.id === eventId);
//     if (!event) return;

//     await updateEventStatus(eventId, "approved");
//     try {
//       await sendStatusMail(event.createdByEmail, event.createdBy, event.title, "approved");
//       setClashPopup({
//         hasClashes: false,
//         eventTitle: event.title,
//         message: "Event approved successfully despite clashes!"
//       });
//     } catch (error) {
//       console.error("Failed to send approval email:", error);
//       setClashPopup({
//         hasClashes: false,
//         eventTitle: event.title,
//         message: "Event approved despite clashes, but email failed to send."
//       });
//     }
//   };

//   const rejectEvent = async (eventId) => {
//     const event = events.find(e => e.id === eventId);
//     await updateEventStatus(eventId, "rejected");
//     if (event) {
//       try {
//         await sendStatusMail(event.createdByEmail, event.createdBy, event.title, "rejected");
//       } catch (error) {
//         console.error("Failed to send rejection email:", error);
//       }
//     }
//   };

//   useEffect(() => {
//     fetchEvents();
//   }, []);

//   useEffect(() => {
//     document.body.style.background = '#ffffff';
//     const handleScroll = () => setShowBanner(window.scrollY <= 100);
//     window.addEventListener('scroll', handleScroll);
//     return () => window.removeEventListener('scroll', handleScroll);
//   }, []);

//   const renderEvents = (status) => {
//     const today = new Date();

//     return events.filter(event => {
//       const eventDate = new Date(event.eventDate);
//       if (status === 'pending') return event.status === '';
//       if (status === "approved") return event.status === "approved";
//       if (status === "upcoming") return event.status === "approved" && eventDate > today;
//       if (status === "published") return event.status === "published";
//       return false;
//     }).map(event => (
//       <div key={event.id} className="event-item" onClick={() => setSelectedEvent(event)}>
//         <p>{event.title} - {new Date(event.eventDate).toLocaleDateString()}</p>
//         {status === 'pending' && (
//           <>
//             <button
//               className="approve-button"
//               onClick={(e) => {
//                 e.stopPropagation();
//                 handleApproveEvent(event.id);
//               }}
//             >
//               Approve
//             </button>
//             <button
//               className="reject-button"
//               onClick={(e) => {
//                 e.stopPropagation();
//                 rejectEvent(event.id);
//               }}
//             >
//               Reject
//             </button>
//           </>
//         )}
//       </div>
//     ));
//   };

//   return (
//     <div className="admin-container">
//       <nav className="navbar">
//         <div className="navbar-left">
//           <img src={ssnLogo} alt="SSN College Logo" className="ssn-logo" />
//         </div>
//         <div className="navbar-right">
//           <span className="user-info">Welcome, {currentUser?.displayName || "Admin"}</span>
//           <a href="#" className="nav-link">Home</a>
//           <a href="#" className="nav-link">About SSN</a>
//           <a href="#" className="nav-link">Events</a>
//           <input type="text" placeholder="Search..." className="search-bar" />
//           <button className="logout-button" onClick={handleLogout}>Logout</button>
//         </div>
//       </nav>

//       {showBanner && (
//         <div className="image-banner">
//           <img src={ssnCampus} alt="SSN Campus" className="campus-image" />
//           <div className="banner-text">ADMIN DASHBOARD</div>
//         </div>
//       )}

//       <div className="dashboard-container">
//         <div className="sidebar">
//           {['pending', 'approved', 'upcoming', 'published'].map(tab => (
//             <button
//               key={tab}
//               className={activeTab === tab ? 'sidebar-btn active' : 'sidebar-btn'}
//               onClick={() => setActiveTab(tab)}
//             >
//               {tab.charAt(0).toUpperCase() + tab.slice(1)} Events
//             </button>
//           ))}
//           <button
//             className={activeTab === 'analytics' ? 'sidebar-btn active' : 'sidebar-btn'}
//             onClick={handleAnalyticsClick}
//           >
//             Analytics
//           </button>
//         </div>

//         <div className="main-content">
//           <div className="event-list">
//             <h2>{activeTab.charAt(0).toUpperCase() + activeTab.slice(1)} Events</h2>
//             {renderEvents(activeTab).length > 0 ? renderEvents(activeTab) : <p>No {activeTab} events.</p>}
//           </div>
//         </div>
//       </div>

//       {selectedEvent && (
//         <div className="popup-modal">
//           <div className="modal-content">
//             <h2>{selectedEvent.title}</h2>
//             <p>Date: {new Date(selectedEvent.eventDate).toLocaleDateString()}</p>
//             <p>Description: {selectedEvent.description}</p>
//             <button onClick={() => setSelectedEvent(null)}>Close</button>
//           </div>
//         </div>
//       )}

//       {clashPopup && (
//         <div className="popup-modal">
//           <div className="modal-content">
//             <h2>Event Clash Check: {clashPopup.eventTitle}</h2>
//             {clashPopup.hasClashes ? (
//               <>
//                 <p>The following clashes were detected:</p>
//                 {clashPopup.clashes.map((clash, index) => (
//                   <div key={index} className="clash-item">
//                     <p><strong>{clash.title}</strong></p>
//                     <p>Date: {clash.date}</p>
//                     <p>Venue: {clash.venue}</p>
//                     <p>Clash Type: {clash.dateClash && "Date"}{clash.dateClash && clash.venueClash && ", "}{clash.venueClash && "Venue"}</p>
//                   </div>
//                 ))}
//                 <p>Do you want to approve this event despite the clashes?</p>
//                 <div className="modal-buttons">
//                   <button
//                     className="approve-button"
//                     onClick={() => handleForceApprove(clashPopup.eventId)}
//                   >
//                     Yes, Approve Anyway
//                   </button>
//                   <button
//                     className="reject-button"
//                     onClick={() => setClashPopup(null)}
//                   >
//                     No, Cancel
//                   </button>
//                 </div>
//               </>
//             ) : (
//               <>
//                 <p>{clashPopup.message || "No clashes detected. Event has been approved successfully!"}</p>
//                 <button onClick={() => setClashPopup(null)}>Close</button>
//               </>
//             )}
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Admin;

// import { useAuth } from "../contexts/AuthContext";
// import { useNavigate } from "react-router-dom";
// import React, { useState, useEffect } from 'react';
// import './Admin.css';
// import ssnLogo from './assets/ssnLogo.png';
// import ssnCampus from './assets/ssn_campus.jpeg';
// import { sendStatusMail } from './sendMail';
// import { db } from './firebase';
// import { collection, getDocs, doc, updateDoc } from 'firebase/firestore';

// const Admin = () => {
//   const { currentUser, logout } = useAuth();
//   const navigate = useNavigate();
//   const [activeTab, setActiveTab] = useState('pending');
//   const [showBanner, setShowBanner] = useState(true);
//   const [events, setEvents] = useState([]);
//   const [selectedEvent, setSelectedEvent] = useState(null);
//   const [clashPopup, setClashPopup] = useState(null);
//   const [message, setMessage] = useState(null); // For user feedback

//   const handleLogout = async () => {
//     try {
//       await logout();
//       navigate("/login");
//     } catch (error) {
//       console.error("Logout failed:", error);
//       setMessage("Logout failed. Please try again.");
//     }
//   };

//   const handleAnalyticsClick = () => {
//     navigate('/analytics');
//   };

//   const fetchEvents = async () => {
//     try {
//       const eventCollection = collection(db, 'events');
//       const eventSnapshot = await getDocs(eventCollection);
//       const eventData = eventSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
//       setEvents(eventData);
//     } catch (error) {
//       console.error('Error fetching events:', error);
//       setMessage("Failed to fetch events. Please refresh the page.");
//     }
//   };

//   const updateEventStatus = async (eventId, newStatus) => {
//     try {
//       const eventRef = doc(db, 'events', eventId);
//       await updateDoc(eventRef, { status: newStatus });
//       await fetchEvents(); // Refresh events after update
//     } catch (error) {
//       console.error(`Error updating event ${eventId} to ${newStatus}`, error);
//       setMessage(`Failed to update event status to ${newStatus}.`);
//     }
//   };

//   const checkClashes = (eventToApprove) => {
//     const approvedEvents = events.filter(e => e.status === "approved" && e.id !== eventToApprove.id);
//     const clashes = [];
    
//     const eventDateToApprove = new Date(eventToApprove.eventDate);
//     const venueToApprove = eventToApprove.venue?.toLowerCase();

//     approvedEvents.forEach(approvedEvent => {
//       const approvedDate = new Date(approvedEvent.eventDate);
//       const approvedVenue = approvedEvent.venue?.toLowerCase();

//       const dateClash = eventDateToApprove.toDateString() === approvedDate.toDateString();
//       const venueClash = venueToApprove && approvedVenue && venueToApprove === approvedVenue;

//       if (dateClash && venueClash) {
//         clashes.push({
//           title: approvedEvent.title,
//           date: approvedDate.toLocaleDateString(),
//           venue: approvedEvent.venue || "N/A",
//           dateClash,
//           venueClash
//         });
//       }
//     });

//     return clashes;
//   };

//   const handleApproveEvent = async (eventId) => {
//     const event = events.find(e => e.id === eventId);
//     if (!event) return;

//     // Log the organizer's email to the console
//     if (event.createdByEmail) {
//       console.log("Event Organizer Email:", event.createdByEmail);
//     } else {
//       console.log("No email found for the event organizer.");
//     }

//     const clashes = checkClashes(event);
    
//     if (clashes.length > 0) {
//       setClashPopup({
//         hasClashes: true,
//         clashes: clashes,
//         eventId: eventId,
//         eventTitle: event.title,
//         proceed: false
//       });
//     } else {
//       await updateEventStatus(eventId, "approved");
//       try {
//         await sendStatusMail(event.createdByEmail, event.createdBy, event.title, "approved");
//         setMessage(`Event "${event.title}" approved and email sent successfully!`);
//       } catch (error) {
//         console.error("Failed to send approval email:", error);
//         setMessage(`Event "${event.title}" approved, but failed to send email: ${error.message}`);
//       }
//     }
//   };

//   const handleForceApprove = async (eventId) => {
//     const event = events.find(e => e.id === eventId);
//     if (!event) return;

//     await updateEventStatus(eventId, "approved");
//     try {
//       await sendStatusMail(event.createdByEmail, event.createdBy, event.title, "approved");
//       setClashPopup({
//         hasClashes: false,
//         eventTitle: event.title,
//         message: "Event approved successfully despite clashes!"
//       });
//       setMessage(`Event "${event.title}" approved and email sent successfully!`);
//     } catch (error) {
//       console.error("Failed to send approval email:", error);
//       setClashPopup({
//         hasClashes: false,
//         eventTitle: event.title,
//         message: "Event approved despite clashes, but email failed to send."
//       });
//       setMessage(`Event "${event.title}" approved, but failed to send email: ${error.message}`);
//     }
//   };

//   const rejectEvent = async (eventId) => {
//     const event = events.find(e => e.id === eventId);
//     if (!event) {
//       setMessage("Event not found.");
//       return;
//     }

//     await updateEventStatus(eventId, "rejected");
//     if (!event.createdByEmail) {
//       setMessage(`Event "${event.title}" rejected, but no recipient email found. Please update the event with a valid email.`);
//       return;
//     }

//     try {
//       await sendStatusMail(event.createdByEmail, event.createdBy, event.title, "rejected");
//       setMessage(`Event "${event.title}" rejected and email sent successfully!`);
//     } catch (error) {
//       console.error("Failed to send rejection email:", error);
//       setMessage(`Event "${event.title}" rejected, but failed to send email: ${error.message}`);
//     }
//   };

//   useEffect(() => {
//     fetchEvents();
//   }, []);

//   useEffect(() => {
//     document.body.style.background = '#ffffff';
//     const handleScroll = () => setShowBanner(window.scrollY <= 100);
//     window.addEventListener('scroll', handleScroll);
//     return () => window.removeEventListener('scroll', handleScroll);
//   }, []);

//   const renderEvents = (status) => {
//     const today = new Date();

//     return events.filter(event => {
//       const eventDate = new Date(event.eventDate);
//       if (status === 'pending') return event.status === '';
//       if (status === "approved") return event.status === "approved";
//       if (status === "upcoming") return event.status === "approved" && eventDate > today;
//       if (status === "published") return event.status === "published";
//       return false;
//     }).map(event => (
//       <div key={event.id} className="event-item" onClick={() => setSelectedEvent(event)}>
//         <p>{event.title} - {new Date(event.eventDate).toLocaleDateString()}</p>
//         {status === 'pending' && (
//           <>
//             <button
//               className="approve-button"
//               onClick={(e) => {
//                 e.stopPropagation();
//                 handleApproveEvent(event.id);
//               }}
//             >
//               Approve
//             </button>
//             <button
//               className="reject-button"
//               onClick={(e) => {
//                 e.stopPropagation();
//                 rejectEvent(event.id);
//               }}
//             >
//               Reject
//             </button>
//           </>
//         )}
//       </div>
//     ));
//   };

//   return (
//     <div className="admin-container">
//       <nav className="navbar">
//         <div className="navbar-left">
//           <img src={ssnLogo} alt="SSN College Logo" className="ssn-logo" />
//         </div>
//         <div className="navbar-right">
//           <span className="user-info">Welcome, {currentUser?.displayName || "Admin"}</span>
//           <a href="#" className="nav-link">Home</a>
//           <a href="#" className="nav-link">About SSN</a>
//           <a href="#" className="nav-link">Events</a>
//           <input type="text" placeholder="Search..." className="search-bar" />
//           <button className="logout-button" onClick={handleLogout}>Logout</button>
//         </div>
//       </nav>

//       {showBanner && (
//         <div className="image-banner">
//           <img src={ssnCampus} alt="SSN Campus" className="campus-image" />
//           <div className="banner-text">ADMIN DASHBOARD</div>
//         </div>
//       )}

//       {message && (
//         <div className="message-popup" style={{ position: 'fixed', top: '20px', right: '20px', background: '#f8d7da', padding: '10px', borderRadius: '5px', color: '#721c24' }}>
//           {message}
//           <button onClick={() => setMessage(null)} style={{ marginLeft: '10px', background: '#fff', border: '1px solid #721c24', borderRadius: '3px', cursor: 'pointer' }}>Close</button>
//         </div>
//       )}

//       <div className="dashboard-container">
//         <div className="sidebar">
//           {['pending', 'approved', 'upcoming', 'published'].map(tab => (
//             <button
//               key={tab}
//               className={activeTab === tab ? 'sidebar-btn active' : 'sidebar-btn'}
//               onClick={() => setActiveTab(tab)}
//             >
//               {tab.charAt(0).toUpperCase() + tab.slice(1)} Events
//             </button>
//           ))}
//           <button
//             className={activeTab === 'analytics' ? 'sidebar-btn active' : 'sidebar-btn'}
//             onClick={handleAnalyticsClick}
//           >
//             Analytics
//           </button>
//         </div>

//         <div className="main-content">
//           <div className="event-list">
//             <h2>{activeTab.charAt(0).toUpperCase() + activeTab.slice(1)} Events</h2>
//             {renderEvents(activeTab).length > 0 ? renderEvents(activeTab) : <p>No {activeTab} events.</p>}
//           </div>
//         </div>
//       </div>

//       {selectedEvent && (
//         <div className="popup-modal">
//           <div className="modal-content">
//             <h2>{selectedEvent.title}</h2>
//             <p>Date: {new Date(selectedEvent.eventDate).toLocaleDateString()}</p>
//             <p>Description: {selectedEvent.description}</p>
//             <button onClick={() => setSelectedEvent(null)}>Close</button>
//           </div>
//         </div>
//       )}

//       {clashPopup && (
//         <div className="popup-modal">
//           <div className="modal-content">
//             <h2>Event Clash Check: {clashPopup.eventTitle}</h2>
//             {clashPopup.hasClashes ? (
//               <>
//                 <p>The following clashes were detected:</p>
//                 {clashPopup.clashes.map((clash, index) => (
//                   <div key={index} className="clash-item">
//                     <p><strong>{clash.title}</strong></p>
//                     <p>Date: {clash.date}</p>
//                     <p>Venue: {clash.venue}</p>
//                     <p>Clash Type: {clash.dateClash && "Date"}{clash.dateClash && clash.venueClash && ", "}{clash.venueClash && "Venue"}</p>
//                   </div>
//                 ))}
//                 <p>Do you want to approve this event despite the clashes?</p>
//                 <div className="modal-buttons">
//                   <button
//                     className="approve-button"
//                     onClick={() => handleForceApprove(clashPopup.eventId)}
//                   >
//                     Yes, Approve Anyway
//                   </button>
//                   <button
//                     className="reject-button"
//                     onClick={() => setClashPopup(null)}
//                   >
//                     No, Cancel
//                   </button>
//                 </div>
//               </>
//             ) : (
//               <>
//                 <p>{clashPopup.message || "No clashes detected. Event has been approved successfully!"}</p>
//                 <button onClick={() => setClashPopup(null)}>Close</button>
//               </>
//             )}
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Admin;

import { useAuth } from "../contexts/AuthContext";
import { useNavigate, Link } from "react-router-dom";
import React, { useState, useEffect } from 'react';
import './Admin.css';
import ssnLogo from './assets/ssnLogo.png';
import ssnCampus from './assets/ssn_campus.jpeg';
import { sendStatusMail } from './sendMail';
import { db } from './firebase';
import { collection, getDocs, doc, updateDoc } from 'firebase/firestore';

const Admin = () => {
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('pending');
  const [showBanner, setShowBanner] = useState(true);
  const [events, setEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [clashPopup, setClashPopup] = useState(null);
  const [message, setMessage] = useState(null); // For user feedback

  const handleLogout = async () => {
    try {
      await logout();
      navigate("/login");
    } catch (error) {
      console.error("Logout failed:", error);
      setMessage("Logout failed. Please try again.");
    }
  };

  const handleAnalyticsClick = () => {
    navigate('/analytics');
  };

  const fetchEvents = async () => {
    try {
      const eventCollection = collection(db, 'events');
      const eventSnapshot = await getDocs(eventCollection);
      const eventData = eventSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setEvents(eventData);
    } catch (error) {
      console.error('Error fetching events:', error);
      setMessage("Failed to fetch events. Please refresh the page.");
    }
  };

  const updateEventStatus = async (eventId, newStatus) => {
    try {
      const eventRef = doc(db, 'events', eventId);
      await updateDoc(eventRef, { status: newStatus });
      await fetchEvents(); // Refresh events after update
    } catch (error) {
      console.error(`Error updating event ${eventId} to ${newStatus}`, error);
      setMessage(`Failed to update event status to ${newStatus}.`);
    }
  };

  const checkClashes = (eventToApprove) => {
    const approvedEvents = events.filter(e => e.status === "approved" && e.id !== eventToApprove.id);
    const clashes = [];
    
    const eventDateToApprove = new Date(eventToApprove.eventDate);
    const venueToApprove = eventToApprove.venue?.toLowerCase();

    approvedEvents.forEach(approvedEvent => {
      const approvedDate = new Date(approvedEvent.eventDate);
      const approvedVenue = approvedEvent.venue?.toLowerCase();

      const dateClash = eventDateToApprove.toDateString() === approvedDate.toDateString();
      const venueClash = venueToApprove && approvedVenue && venueToApprove === approvedVenue;

      if (dateClash && venueClash) {
        clashes.push({
          title: approvedEvent.title,
          date: approvedDate.toLocaleDateString(),
          venue: approvedEvent.venue || "N/A",
          dateClash,
          venueClash
        });
      }
    });

    return clashes;
  };

  const handleApproveEvent = async (eventId) => {
    const event = events.find(e => e.id === eventId);
    if (!event) return;

    // Log the organizer's email to the console
    if (event.email) {
      console.log("Event Organizer Email:", event.email);
    } else {
      console.log("No email found for the event organizer.");
    }

    const clashes = checkClashes(event);
    
    if (clashes.length > 0) {
      setClashPopup({
        hasClashes: true,
        clashes: clashes,
        eventId: eventId,
        eventTitle: event.title,
        proceed: false
      });
    } else {
      await updateEventStatus(eventId, "approved");
      try {
        await sendStatusMail(event.email, event.createdBy || "Organizer", event.title, "approved");
        setMessage(`Event "${event.title}" approved and email sent successfully!`);
      } catch (error) {
        console.error("Failed to send approval email:", error);
        setMessage(`Event "${event.title}" approved, but failed to send email: ${error.message}`);
      }
    }
  };

  const handleForceApprove = async (eventId) => {
    const event = events.find(e => e.id === eventId);
    if (!event) return;

    await updateEventStatus(eventId, "approved");
    try {
      await sendStatusMail(event.email, event.createdBy || "Organizer", event.title, "approved");
      setClashPopup({
        hasClashes: false,
        eventTitle: event.title,
        message: "Event approved successfully despite clashes!"
      });
      setMessage(`Event "${event.title}" approved and email sent successfully!`);
    } catch (error) {
      console.error("Failed to send approval email:", error);
      setClashPopup({
        hasClashes: false,
        eventTitle: event.title,
        message: "Event approved despite clashes, but email failed to send."
      });
      setMessage(`Event "${event.title}" approved, but failed to send email: ${error.message}`);
    }
  };

  const rejectEvent = async (eventId) => {
    const event = events.find(e => e.id === eventId);
    if (!event) {
      setMessage("Event not found.");
      return;
    }

    await updateEventStatus(eventId, "rejected");
    if (!event.email) {
      setMessage(`Event "${event.title}" rejected, but no recipient email found. Please update the event with a valid email.`);
      return;
    }

    try {
      await sendStatusMail(event.email, event.createdBy || "Organizer", event.title, "rejected");
      setMessage(`Event "${event.title}" rejected and email sent successfully!`);
    } catch (error) {
      console.error("Failed to send rejection email:", error);
      setMessage(`Event "${event.title}" rejected, but failed to send email: ${error.message}`);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  useEffect(() => {
    document.body.style.background = '#ffffff';
    const handleScroll = () => setShowBanner(window.scrollY <= 100);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const renderEvents = (status) => {
    const today = new Date();

    return events.filter(event => {
      const eventDate = new Date(event.eventDate);
      if (status === 'pending') return event.status === '';
      if (status === "approved") return event.status === "approved";
      if (status === "upcoming") return event.status === "approved" && eventDate > today;
      if (status === "published") return event.status === "published";
      return false;
    }).map(event => (
      <div key={event.id} className="event-item" onClick={() => setSelectedEvent(event)}>
        <p>{event.title} - {new Date(event.eventDate).toLocaleDateString()}</p>
        {status === 'pending' && (
          <>
            <button
              className="approve-button"
              onClick={(e) => {
                e.stopPropagation();
                handleApproveEvent(event.id);
              }}
            >
              Approve
            </button>
            <button
              className="reject-button"
              onClick={(e) => {
                e.stopPropagation();
                rejectEvent(event.id);
              }}
            >
              Reject
            </button>
          </>
        )}
      </div>
    ));
  };

  return (
    <div className="admin-container">
      <nav className="navbar">
        <div className="navbar-left">
          <img src={ssnLogo} alt="SSN College Logo" className="ssn-logo" />
        </div>
        <div className="navbar-right">
          <span className="user-info">Welcome, {currentUser?.displayName || "Admin"}</span>
          <Link to="/" className="nav-link">Home</Link>
          <Link to="/viewevents" className="nav-link">Events</Link>
          <button className="logout-button" onClick={handleLogout}>Logout</button>
        </div>
      </nav>

      {showBanner && (
        <div className="image-banner">
          <img src={ssnCampus} alt="SSN Campus" className="campus-image" />
          <div className="banner-text">ADMIN DASHBOARD</div>
        </div>
      )}

      {message && (
        <div className="message-popup" style={{ position: 'fixed', top: '20px', right: '20px', background: '#f8d7da', padding: '10px', borderRadius: '5px', color: '#721c24' }}>
          {message}
          <button onClick={() => setMessage(null)} style={{ marginLeft: '10px', background: '#fff', border: '1px solid #721c24', borderRadius: '3px', cursor: 'pointer' }}>Close</button>
        </div>
      )}

      <div className="dashboard-container">
        <div className="sidebar">
          {['pending', 'approved', 'upcoming', 'published'].map(tab => (
            <button
              key={tab}
              className={activeTab === tab ? 'sidebar-btn active' : 'sidebar-btn'}
              onClick={() => setActiveTab(tab)}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)} Events
            </button>
          ))}
          <button
            className={activeTab === 'analytics' ? 'sidebar-btn active' : 'sidebar-btn'}
            onClick={handleAnalyticsClick}
          >
            Analytics
          </button>
        </div>

        <div className="main-content">
          <div className="event-list">
            <h2>{activeTab.charAt(0).toUpperCase() + activeTab.slice(1)} Events</h2>
            {renderEvents(activeTab).length > 0 ? renderEvents(activeTab) : <p>No {activeTab} events.</p>}
          </div>
        </div>
      </div>

      {selectedEvent && (
        <div className="popup-modal">
          <div className="modal-content">
            <h2>{selectedEvent.title}</h2>
            <p>Date: {new Date(selectedEvent.eventDate).toLocaleDateString()}</p>
            <p>Description: {selectedEvent.description}</p>
            <button onClick={() => setSelectedEvent(null)}>Close</button>
          </div>
        </div>
      )}

      {clashPopup && (
        <div className="popup-modal">
          <div className="modal-content">
            <h2>Event Clash Check: {clashPopup.eventTitle}</h2>
            {clashPopup.hasClashes ? (
              <>
                <p>The following clashes were detected:</p>
                {clashPopup.clashes.map((clash, index) => (
                  <div key={index} className="clash-item">
                    <p><strong>{clash.title}</strong></p>
                    <p>Date: {clash.date}</p>
                    <p>Venue: {clash.venue}</p>
                    <p>Clash Type: {clash.dateClash && "Date"}{clash.dateClash && clash.venueClash && ", "}{clash.venueClash && "Venue"}</p>
                  </div>
                ))}
                <p>Do you want to approve this event despite the clashes?</p>
                <div className="modal-buttons">
                  <button
                    className="approve-button"
                    onClick={() => handleForceApprove(clashPopup.eventId)}
                  >
                    Yes, Approve Anyway
                  </button>
                  <button
                    className="reject-button"
                    onClick={() => setClashPopup(null)}
                  >
                    No, Cancel
                  </button>
                </div>
              </>
            ) : (
              <>
                <p>{clashPopup.message || "No clashes detected. Event has been approved successfully!"}</p>
                <button onClick={() => setClashPopup(null)}>Close</button>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Admin;