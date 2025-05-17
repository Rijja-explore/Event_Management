import React, { useEffect, useState } from 'react';
import { db, storage } from "./firebase";
import { collection, addDoc, query, where, getDocs, updateDoc, doc } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import './EventOrganizer.css';
import ssnLogo from './assets/ssnLogo.png';
import ssnCampus from './assets/ssn_campus.jpeg';
import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from 'react-router-dom';

const EventOrganizer = () => {
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('create');
  const [showBanner, setShowBanner] = useState(true);
  const [newEvent, setNewEvent] = useState({
    title: '', category: '', description: '', eventDate: '', venue: '',
    onlineLink: '', format: 'in-person', ticketPrice: '',
    paymentOptions: '', agenda: '', speakers: '', organizerDetails: '',
    contactInfo: '', specialInstructions: '', socialLinks: '', sponsors: '',
    status: '' // Removed image and registrationLink
  });

  const [requestedEvents, setRequestedEvents] = useState([]);
  const [approvedEvents, setApprovedEvents] = useState([]);
  const [publishedEvents, setPublishedEvents] = useState([]);
  const [allEvents, setAllEvents] = useState([]);

  useEffect(() => {
    document.body.style.background = "#ffffff";
    const handleScroll = () => setShowBanner(window.scrollY <= 100);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (currentUser) {
      fetchEvents();
    }
  }, [currentUser, activeTab]);

  const fetchEvents = async () => {
    const q = query(collection(db, "events"), where("createdBy", "==", currentUser.displayName));
    const querySnapshot = await getDocs(q);
    const events = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    setAllEvents(events);
    setRequestedEvents(events.filter(e => e.status === ""));
    setApprovedEvents(events.filter(e => e.status === "approved"));
    setPublishedEvents(events.filter(e => e.status === "published"));
  };

  const handleLogout = async () => {
    try {
      await logout();
      navigate("/login");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target; // Removed file handling since image is gone
    setNewEvent({ ...newEvent, [name]: value });
  };

  const createEvent = async () => {
    const { title, category, eventDate, venue } = newEvent; // Removed registrationLink from validation
    if (!title || !category || !eventDate || !venue) {
      alert("Please fill in all mandatory fields.");
      return;
    }

    try {
      const docRef = await addDoc(collection(db, "events"), {
        ...newEvent,
        createdBy: currentUser?.displayName || "unknown",
        status: ""
      });

      alert("Event submitted successfully! Event ID: " + docRef.id);
      setNewEvent({
        title: '', category: '', description: '', eventDate: '', venue: '',
        onlineLink: '', format: 'in-person', ticketPrice: '',
        paymentOptions: '', agenda: '', speakers: '', organizerDetails: '',
        contactInfo: '', specialInstructions: '', socialLinks: '', sponsors: '',
        status: '' // Reset form without image or registrationLink
      });
      setActiveTab("requested");
    } catch (error) {
      console.error("Error adding document: ", error);
      alert("Error submitting event. Please try again.");
    }
  };

  const publishEvent = async (eventId) => {
    const eventRef = doc(db, "events", eventId);
    await updateDoc(eventRef, { status: "published" });
    fetchEvents();
  };

  return (
    <div className="event-organizer-container">
      <nav className="navbar">
        <div className="navbar-left">
          <img src={ssnLogo} alt="SSN College Logo" className="ssn-logo" />
        </div>
        <div className="navbar-right">
          <span className="user-info">Welcome, {currentUser?.displayName || "Guest"}</span>
          <a href="#" className="nav-link">Home</a>
          <a href="#" className="nav-link">About SSN</a>
          <a href="#" className="nav-link">Events</a>
          <input type="text" placeholder="Search..." className="search-bar" />
          <button className="logout-button" onClick={handleLogout}>Logout</button>
        </div>
      </nav>

      {showBanner && (
        <div className="image-banner">
          <img src={ssnCampus} alt="SSN Campus" className="campus-image" />
          <div className="banner-text">EVENT ORGANIZER DASHBOARD</div>
        </div>
      )}

      <div className="dashboard-container">
        <div className="sidebar">
          <button className={activeTab === 'create' ? 'sidebar-btn active' : 'sidebar-btn'} onClick={() => setActiveTab('create')}>Create Event</button>
          <button className={activeTab === 'requested' ? 'sidebar-btn active' : 'sidebar-btn'} onClick={() => setActiveTab('requested')}>Requested</button>
          <button className={activeTab === 'approved' ? 'sidebar-btn active' : 'sidebar-btn'} onClick={() => setActiveTab('approved')}>Approved</button>
          <button className={activeTab === 'published' ? 'sidebar-btn active' : 'sidebar-btn'} onClick={() => setActiveTab('published')}>Published</button>
          <button className={activeTab === 'history' ? 'sidebar-btn active' : 'sidebar-btn'} onClick={() => setActiveTab('history')}>Event History</button>
        </div>

        <div className="main-content">
          {activeTab === 'create' && (
            <div className="create-event">
              <h2>Create New Event</h2>
              <label>Event Title:<span className="required">*</span></label>
              <input type="text" name="title" value={newEvent.title} onChange={handleInputChange} placeholder="Enter event title" required />
              <label>Category:<span className="required">*</span></label>
              <select name="category" value={newEvent.category} onChange={handleInputChange} required>
                <option value="">Select Category</option>
                <option value="Workshop">Workshop</option>
                <option value="Seminar">Seminar</option>
                <option value="Conference">Conference</option>
                <option value="Cultural">Cultural</option>
              </select>
              <label>Date & Time:<span className="required">*</span></label>
              <input type="datetime-local" name="eventDate" value={newEvent.eventDate} onChange={handleInputChange} required />
              <label>Venue:<span className="required">*</span></label>
              <input type="text" name="venue" value={newEvent.venue} onChange={handleInputChange} placeholder="Enter venue" required />
              <label>Agenda:</label>
              <input type="text" name="agenda" value={newEvent.agenda} onChange={handleInputChange} placeholder="Enter event agenda" />
              <button className="create-button" onClick={createEvent}>Submit Event</button>
            </div>
          )}

          {activeTab === 'requested' && (
            <div className="event-requested">
              <h2>Requested Events</h2>
              {requestedEvents.map(event => (
                <div key={event.id} className="event-item">
                  <p>{event.title} - {event.eventDate} (Pending approval)</p>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'approved' && (
            <div className="event-approved">
              <h2>Approved Events</h2>
              {approvedEvents.map(event => (
                <div key={event.id} className="event-item">
                  <p>{event.title} - {event.eventDate}</p>
                  <button onClick={() => publishEvent(event.id)}>Publish</button>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'published' && (
            <div className="event-published">
              <h2>Published Events</h2>
              {publishedEvents.map(event => (
                <div key={event.id} className="event-item">
                  <p>{event.title} - {event.eventDate}</p>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'history' && (
            <div className="event-history">
              <h2>Event History</h2>
              {allEvents.map(event => (
                <div key={event.id} className="event-item">
                  <p>{event.title} - {event.eventDate} ({event.status || 'pending'})</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default EventOrganizer;