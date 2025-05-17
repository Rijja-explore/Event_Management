// import React, { useState, useEffect } from "react";
// import Slider from "react-slick";
// import "slick-carousel/slick/slick.css";
// import "slick-carousel/slick/slick-theme.css";
// import ssnLogo from './assets/ssnLogo.png';
// import { db, auth } from "./firebase";
// import { collection, getDocs, doc, setDoc, getDoc, updateDoc, increment, onSnapshot } from "firebase/firestore";
// import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
// import "./ViewEvents.css";
// import axios from "axios";

// // API base URL - change this to your Flask server URL
// const API_BASE_URL = "http://localhost:9000";

// const ViewEvents = () => {
//   const [events, setEvents] = useState([]);
//   const [searchQuery, setSearchQuery] = useState("");
//   const [filteredEvents, setFilteredEvents] = useState([]);
//   const [searchType, setSearchType] = useState("category");
//   const [selectedEvent, setSelectedEvent] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [categories, setCategories] = useState([]);
//   const [venues, setVenues] = useState([]);
//   const [agendas, setAgendas] = useState([]);
//   const [topThreeEvents, setTopThreeEvents] = useState([]);
//   const [carouselLoading, setCarouselLoading] = useState(true);
  
//   // User-related states
//   const [viewCount, setViewCount] = useState(null);
//   const [showViewCount, setShowViewCount] = useState(false);
//   const [showSubscriptionModal, setShowSubscriptionModal] = useState(false);
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [showPassword, setShowPassword] = useState(false);
//   const [mode, setMode] = useState("login");
//   const [user, setUser] = useState(auth.currentUser);
//   const [error, setError] = useState(null);

//   // Listen for auth state changes
//   useEffect(() => {
//     const unsubscribe = auth.onAuthStateChanged((currentUser) => {
//       setUser(currentUser);
//       console.log("Current user:", currentUser);
//       if (currentUser) {
//         setShowSubscriptionModal(false);
//       }
//     });
//     return () => unsubscribe();
//   }, []);

//   // Track page views
//   useEffect(() => {
//     const trackPageView = async () => {
//       try {
//         const viewDocRef = doc(db, "pageViews", "viewEvents");
//         await setDoc(viewDocRef, { count: increment(1) }, { merge: true });
//         const viewDoc = await getDoc(viewDocRef);
//         const count = viewDoc.exists() ? viewDoc.data().count : 0;
//         setViewCount(count);
//         console.log("View count updated:", count);
//       } catch (error) {
//         console.error("Error tracking page view:", error);
//         setError("Failed to track page views: " + error.message);
//       }
//     };

//     const fetchViewCount = async () => {
//       try {
//         const viewDocRef = doc(db, "pageViews", "viewEvents");
//         const viewDoc = await getDoc(viewDocRef);
//         const count = viewDoc.exists() ? viewDoc.data().count : 0;
//         setViewCount(count);
//         console.log("View count fetched:", count);
//       } catch (error) {
//         console.error("Error fetching view count:", error);
//         setError("Failed to fetch view count: " + error.message);
//       }
//     };

//     if (user) {
//       trackPageView();
//     } else {
//       fetchViewCount();
//     }
//   }, [user]);

//   useEffect(() => {
//     // Fetch events from Firebase with real-time updates
//     const fetchEventsFromFirebase = () => {
//       setLoading(true);
//       setCarouselLoading(true);
      
//       // Set up real-time listener for events collection
//       const unsubscribe = onSnapshot(collection(db, "events"), (querySnapshot) => {
//         const eventsData = querySnapshot.docs
//           .filter(doc => doc.data().status === "published" || doc.data().status === undefined)
//           .map(doc => ({
//             id: doc.id,
//             title: doc.data().title || "No Title",
//             agenda: doc.data().agenda || "No Agenda",
//             category: doc.data().category || "No Category",
//             eventDate: doc.data().eventDate || "No Date",
//             venue: doc.data().venue || "No Venue",
//             format: doc.data().format || "N/A",
//             paymentOptions: doc.data().paymentOptions || "N/A",
//             ticketPrice: doc.data().ticketPrice || "N/A",
//             registrationLink: doc.data().registrationLink || "/register",
//             createdAt: doc.data().createdAt || new Date()
//           }));
        
//         setEvents(eventsData);
//         setLoading(false);
        
//         // Create temporary top three events client-side immediately
//         const today = new Date();
//         const tempTopThree = [...eventsData]
//           .filter(event => new Date(event.eventDate) >= today)
//           .sort((a, b) => new Date(a.eventDate) - new Date(b.eventDate))
//           .slice(0, 3);
          
//         if (tempTopThree.length > 0) {
//           setTopThreeEvents(tempTopThree);
//           setCarouselLoading(false);
//         }
        
//         // Extract unique categories, venues, and agendas
//         const uniqueCategories = [...new Set(eventsData.map(event => 
//           event.category?.trim()).filter(Boolean))].sort();
//         const uniqueVenues = [...new Set(eventsData.map(event => 
//           event.venue?.trim()).filter(Boolean))].sort();
//         const uniqueAgendas = [...new Set(eventsData.map(event => 
//           event.agenda?.trim()).filter(Boolean))].sort();
          
//         setCategories(uniqueCategories);
//         setVenues(uniqueVenues);
//         setAgendas(uniqueAgendas);
        
//         // Send the events data to Flask for B+ tree processing
//         updateFlaskData(eventsData);
//       });
      
//       // Clean up listener on component unmount
//       return () => unsubscribe();
//     };

//     fetchEventsFromFirebase();
//   }, []);
  
//   // Function to send events data to Flask for B+ tree processing
//   const updateFlaskData = async (eventsData) => {
//     try {
//       await axios.post(`${API_BASE_URL}/update-events`, { events: eventsData });
//       console.log("Events data sent to Flask successfully");
      
//       // After updating Flask data, get top three events
//       fetchTopThreeEvents();
//     } catch (error) {
//       console.error("Error sending events data to Flask:", error);
      
//       // Fallback already handled in initial loading
//       setCarouselLoading(false);
//     }
//   };
  
//   // Fetch top three upcoming events using the B+ tree
//   const fetchTopThreeEvents = async () => {
//     try {
//       const today = new Date().toISOString().split('T')[0]; // Today's date in YYYY-MM-DD format
//       const response = await axios.get(`${API_BASE_URL}/search/date-range`, {
//         params: {
//           start: today
//         }
//       });
      
//       if (response.data && response.data.events) {
//         // Get top 3 from returned events
//         const top3 = [...response.data.events]
//           .sort((a, b) => new Date(a.eventDate) - new Date(b.eventDate))
//           .slice(0, 3);
          
//         if (top3.length > 0) {
//           setTopThreeEvents(top3);
//         }
//       }
//       setCarouselLoading(false);
//     } catch (error) {
//       console.error("Error fetching top three events:", error);
//       // Fallback already handled in initial loading
//       setCarouselLoading(false);
//     }
//   };

//   // Save category interests for user
//   const saveSearchInterests = async (categoryValue) => {
//     if (!user || !categoryValue || categoryValue.trim() === "" || categoryValue === "No Category") {
//       console.log("No user, empty category, or invalid category, skipping save:", { user, categoryValue });
//       return;
//     }

//     try {
//       const userId = user.uid;
//       console.log(`Saving category interest for user: ${userId}, category: ${categoryValue}`);
//       const userInterestsRef = doc(db, "userInterests", userId);
//       const userInterestsDoc = await getDoc(userInterestsRef);
      
//       let currentInterests = userInterestsDoc.exists() ? userInterestsDoc.data().interests || [] : [];
      
//       // Always enforce "category" as the type
//       const interestExists = currentInterests.some(i => 
//         i.type === "category" && i.query.toLowerCase() === categoryValue.toLowerCase()
//       );

//       if (!interestExists) {
//         // Explicitly set type to "category"
//         const newInterest = { 
//           query: categoryValue, 
//           type: "category",
//           timestamp: new Date() 
//         };
        
//         const updatedInterests = [...currentInterests, newInterest].slice(-10);
        
//         if (userInterestsDoc.exists()) {
//           await updateDoc(userInterestsRef, { 
//             interests: updatedInterests, 
//             email: user.email,
//             lastUpdated: new Date()
//           });
//         } else {
//           await setDoc(userInterestsRef, {
//             interests: [newInterest],
//             email: user.email,
//             createdAt: new Date()
//           });
//         }
//         console.log(`Saved category interest for user ${userId}: ${categoryValue}`);
//       } else {
//         console.log(`Category interest already exists for user ${userId}: ${categoryValue}`);
//       }
//     } catch (error) {
//       console.error("Error saving category interest:", error);
//       setError("Failed to save category interest: " + error.message);
//     }
//   };

//   // Handle registration or sign-in
//   const handleAuthSubmit = async (e) => {
//     e.preventDefault();
//     setError(null);
//     try {
//       if (mode === "register") {
//         const userCredential = await createUserWithEmailAndPassword(auth, email, password);
//         console.log("User registered:", userCredential.user.uid);
//         await setDoc(doc(db, "userInterests", userCredential.user.uid), {
//           interests: [],
//           email: email,
//           createdAt: new Date()
//         });
//       } else {
//         await signInWithEmailAndPassword(auth, email, password);
//         console.log("User signed in");
//       }
//       setShowSubscriptionModal(false);
//     } catch (error) {
//       console.error("Auth error:", error);
//       setError(error.message);
//     }
//   };

//   // Handle logout
//   const handleLogout = async () => {
//     try {
//       await auth.signOut();
//       setShowSubscriptionModal(true);
//       console.log("User logged out");
//     } catch (error) {
//       console.error("Logout error:", error);
//       setError("Failed to log out: " + error.message);
//     }
//   };

//   const handleSearch = async () => {
//     // Clear any previous errors first
//     setError(null);
    
//     // Only show error if user actively clicked search with empty query
//     // This prevents the error from showing during login or initial component load
//     if (!searchQuery.trim()) {
//       setFilteredEvents([]);
//       // Only show error if search was manually triggered
//       if (document.activeElement && document.activeElement.tagName === 'BUTTON') {
//         setError(`Please select a ${searchType} to search`);
//       }
//       return;
//     }

//     try {
//       // First attempt to use B+ tree API for searching
//       if (searchType === "category") {
//         try {
//           const response = await axios.get(`${API_BASE_URL}/search/category/${encodeURIComponent(searchQuery)}`);
//           if (response.data && response.data.events) {
//             setFilteredEvents(response.data.events);
            
//             // Save category interest if user is logged in
//             if (user) {
//               saveSearchInterests(searchQuery);
//             }
//             return;
//           }
//         } catch (error) {
//           console.error("Error using B+ tree search:", error);
//           // Continue to fallback client-side search
//         }
//       }
      
//       // Client-side filtering fallback
//       let filtered = [];
//       switch(searchType) {
//         case "category":
//           filtered = events.filter((event) =>
//             event.category?.toLowerCase().includes(searchQuery.toLowerCase())
//           );
//           // Save category directly
//           if (user) {
//             saveSearchInterests(searchQuery);
//           }
//           break;
//         case "agenda":
//           filtered = events.filter((event) =>
//             event.agenda?.toLowerCase().includes(searchQuery.toLowerCase())
//           );
//           break;
//         case "venue":
//           filtered = events.filter((event) =>
//             event.venue?.toLowerCase().includes(searchQuery.toLowerCase())
//           );
//           break;
//         default:
//           filtered = events;
//       }
      
//       setFilteredEvents(filtered);
      
//       // For non-category searches, find and save categories from results
//       if (user && searchType !== "category" && filtered.length > 0) {
//         // Extract all unique categories from filtered results
//         const categoriesInFilteredEvents = [...new Set(filtered.map(event => event.category))]
//           .filter(cat => cat && cat !== "No Category");
        
//         // Save each category found
//         if (categoriesInFilteredEvents.length > 0) {
//           categoriesInFilteredEvents.forEach(category => {
//             saveSearchInterests(category);
//           });
//         }
//       }
//     } catch (error) {
//       console.error("Error during search:", error);
//       setError("Search failed: " + error.message);
//     }
//   };

//   // Handle input change and trigger search for dropdown selections
//   const handleInputChange = (e) => {
//     const value = e.target.value;
//     setSearchQuery(value);
//     if (!value.trim()) {
//       setFilteredEvents([]);
//     }
//   };

//   // Handle event selection and save interest
//   const handleEventClick = (event) => {
//     setSelectedEvent(event);
//     // Always save the category from the clicked event
//     if (user && event.category && event.category !== "No Category") {
//       saveSearchInterests(event.category);
//     }
//   };

//   const handleRegisterClick = (event) => {
//     window.location.href = `/register?event=${encodeURIComponent(event.title)}`;
//   };

//   const toggleViewCount = () => {
//     setShowViewCount(prev => !prev);
//   };

//   const togglePasswordVisibility = () => {
//     setShowPassword(prev => !prev);
//   };

//   const sliderSettings = {
//     dots: true,
//     infinite: true,
//     speed: 500,
//     slidesToShow: 1,
//     slidesToScroll: 1,
//     autoplay: true,
//     autoplaySpeed: 3000,
//     pauseOnHover: true,
//     arrows: true
//   };

//   const formatDate = (dateString) => {
//     if (!dateString || dateString === "No Date") return dateString;
//     const date = new Date(dateString);
//     if (isNaN(date.getTime())) return dateString;
//     return date.toLocaleDateString('en-US', {
//       year: 'numeric',
//       month: 'long',
//       day: 'numeric'
//     });
//   };

//   // Generate placeholder events for the carousel loading state
//   const placeholderEvents = [
//     {
//       title: "Loading Event...",
//       eventDate: "2025-04-25",
//       agenda: "Loading event details. Please wait a moment while we fetch the latest events."
//     },
//     {
//       title: "Loading Event...",
//       eventDate: "2025-04-26",
//       agenda: "Loading event details. Please wait a moment while we fetch the latest events."
//     },
//     {
//       title: "Loading Event...",
//       eventDate: "2025-04-27",
//       agenda: "Loading event details. Please wait a moment while we fetch the latest events."
//     }
//   ];

//   // Decide which events to display in carousel
//   const carouselEvents = carouselLoading ? placeholderEvents : 
//                          topThreeEvents.length > 0 ? topThreeEvents : 
//                          events.length > 0 ? events.slice(0, 3) : 
//                          placeholderEvents;

//   return (
//     <div className="app">
//       <header className="header">
//         <img src={ssnLogo} alt="SSN Logo" className="logo" />
//         <nav className="nav-links">
//           <a href="/">Home</a>
//           {user ? (
//             <button onClick={handleLogout}>Logout</button>
//           ) : (
//             <button onClick={() => setShowSubscriptionModal(true)}>Login</button>
//           )}
//           <span className="view-count-container">
//             <span 
//               className={`password-toggle ${showViewCount ? 'eye-slash' : 'eye'}`} 
//               onClick={toggleViewCount}
//               title={showViewCount ? "Hide page views" : "Show page views"}
//             >
//               👁️
//             </span>
//             <span className={`view-count ${!showViewCount ? 'hidden' : ''}`}>
//               {viewCount !== null ? viewCount : '...'}
//             </span>
//           </span>
//         </nav>
//       </header>

//       <div className="container events-container">
//         <div className="carousel-container">
//           <Slider {...sliderSettings}>
//             {carouselEvents.map((event, index) => (
//               <div key={index} className={`carousel-card ${carouselLoading ? 'carousel-loading' : ''}`}>
//                 <h2>{event.title}</h2>
//                 <p className="date">{formatDate(event.eventDate)}</p>
//                 <p className="description">{event.agenda}</p>
//                 {carouselLoading && <div className="loading-pulse"></div>}
//               </div>
//             ))}
//           </Slider>
//         </div>

//         <div className="search-container">
//           <select onChange={(e) => {
//             setSearchType(e.target.value);
//             setSearchQuery(""); // Reset search query when switching types
//             setFilteredEvents([]); // Clear filtered results
//           }} value={searchType}>
//             <option value="category">Search by Category</option>
//             <option value="agenda">Search by Agenda</option>
//             <option value="venue">Search by Venue</option>
//           </select>
          
//           {searchType === "category" && categories.length > 0 ? (
//             <select 
//               value={searchQuery} 
//               onChange={(e) => {
//                 setSearchQuery(e.target.value);
//                 // When category is selected from dropdown, trigger search
//                 if (e.target.value) {
//                   setTimeout(() => handleSearch(), 100);
//                 } else {
//                   setFilteredEvents([]);
//                 }
//               }}
//             >
//               <option value="">All Categories</option>
//               {categories.map((category, index) => (
//                 <option key={index} value={category}>
//                   {category}
//                 </option>
//               ))}
//             </select>
//           ) : searchType === "venue" && venues.length > 0 ? (
//             <select 
//               value={searchQuery} 
//               onChange={(e) => {
//                 setSearchQuery(e.target.value);
//                 if (e.target.value) {
//                   setTimeout(() => handleSearch(), 100);
//                 } else {
//                   setFilteredEvents([]);
//                 }
//               }}
//             >
//               <option value="">All Venues</option>
//               {venues.map((venue, index) => (
//                 <option key={index} value={venue}>
//                   {venue}
//                 </option>
//               ))}
//             </select>
//           ) : searchType === "agenda" && agendas.length > 0 ? (
//             <select 
//               value={searchQuery} 
//               onChange={(e) => {
//                 setSearchQuery(e.target.value);
//                 if (e.target.value) {
//                   setTimeout(() => handleSearch(), 100);
//                 } else {
//                   setFilteredEvents([]);
//                 }
//               }}
//             >
//               <option value="">All Agendas</option>
//               {agendas.map((agenda, index) => (
//                 <option key={index} value={agenda}>
//                   {agenda.length > 50 ? `${agenda.substring(0, 50)}...` : agenda}
//                 </option>
//               ))}
//             </select>
//           ) : (
//             <input
//               type="text"
//               placeholder={`Enter ${searchType === "venue" ? "Venue" : searchType === "agenda" ? "Agenda" : "Category"}`}
//               value={searchQuery}
//               onChange={handleInputChange}
//             />
//           )}
          
//           <button onClick={handleSearch}>Search</button>
//         </div>

//         <div className="card-container">
//           {loading ? (
//             Array(6).fill().map((_, index) => (
//               <div key={index} className="card card-loading">
//                 <div className="loading-line loading-title"></div>
//                 <div className="loading-line loading-short"></div>
//                 <div className="loading-line loading-short"></div>
//                 <div className="loading-line loading-short"></div>
//                 <div className="loading-line loading-long"></div>
//               </div>
//             ))
//           ) : (filteredEvents.length > 0 ? filteredEvents : events).length > 0 ? (
//             (filteredEvents.length > 0 ? filteredEvents : events).map((event, index) => (
//               <div key={index} className="card" onClick={() => handleEventClick(event)}>
//                 <h2>{event.title}</h2>
//                 <p><strong>Category:</strong> {event.category}</p>
//                 <p><strong>Date:</strong> {formatDate(event.eventDate)}</p>
//                 <p><strong>Venue:</strong> {event.venue}</p>
//                 <p><strong>Agenda:</strong> {event.agenda.length > 100 ? `${event.agenda.substring(0, 100)}...` : event.agenda}</p>
//               </div>
//             ))
//           ) : (
//             <div className="card">
//               <p className="error">No events found matching your search criteria.</p>
//             </div>
//           )}
//         </div>
//       </div>

//       {selectedEvent && (
//         <div className="event-modal" onClick={(e) => {
//           if (e.target.className === "event-modal") setSelectedEvent(null);
//         }}>
//           <div className="modal-content">
//             <h2>{selectedEvent.title}</h2>
//             <p><strong>Category:</strong> {selectedEvent.category}</p>
//             <p><strong>Date:</strong> {formatDate(selectedEvent.eventDate)}</p>
//             <p><strong>Venue:</strong> {selectedEvent.venue}</p>
//             <p><strong>Agenda:</strong> {selectedEvent.agenda}</p>
//             <p><strong>Format:</strong> {selectedEvent.format}</p>
//             <p><strong>Payment Options:</strong> {selectedEvent.paymentOptions}</p>
//             <p><strong>Ticket Price:</strong> {selectedEvent.ticketPrice !== "N/A" ? `₹${selectedEvent.ticketPrice}` : "Free"}</p>
//             <div className="modal-buttons">
//               <button className="register-btn" onClick={() => handleRegisterClick(selectedEvent)}>Register</button>
//               <button className="close-btn" onClick={() => setSelectedEvent(null)}>Close</button>
//             </div>
//           </div>
//         </div>
//       )}

//       {showSubscriptionModal && (
//         <div className="event-modal" onClick={(e) => {
//           if (e.target.className === "event-modal") setShowSubscriptionModal(false);
//         }}>
//           <div className="modal-content">
//             <h2>{mode === "register" ? "Register" : "Sign In"}</h2>
//             <p>Please {mode === "register" ? "create an account" : "log in"} to proceed.</p>
//             <form onSubmit={handleAuthSubmit}>
//               <input
//                 type="email"
//                 value={email}
//                 onChange={(e) => setEmail(e.target.value)}
//                 placeholder="Email"
//                 required
//               />
//               <div className="password-container">
//                 <input
//                   type={showPassword ? "text" : "password"}
//                   value={password}
//                   onChange={(e) => setPassword(e.target.value)}
//                   placeholder="Password"
//                   required
//                 />
//                 <span 
//                   className={`password-toggle ${showPassword ? 'eye-slash' : 'eye'}`} 
//                   onClick={togglePasswordVisibility}
//                 >
//                   👁️
//                 </span>
//               </div>
//               <div className="modal-buttons">
//                 <button type="submit" className="register-btn">
//                   {mode === "register" ? "Register" : "Sign In"}
//                 </button>
//                 <button 
//                   type="button" 
//                   className="close-btn"
//                   onClick={() => setShowSubscriptionModal(false)}
//                 >
//                   Cancel
//                 </button>
//                 <button
//                   type="button"
//                   className="switch-btn"
//                   onClick={() => setMode(mode === "login" ? "register" : "login")}
//                 >
//                   {mode === "login" ? "Need to Register?" : "Already have an account? Sign In"}
//                 </button>
//               </div>
//             </form>
//             {error && <p className="error">{error}</p>}
//           </div>
//         </div>
//       )}

//       <footer className="footer">&copy; 2025 SSN Events. All rights reserved.</footer>
//     </div>
//   );
// };

// export default ViewEvents;


import React, { useState, useEffect } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import ssnLogo from './assets/ssnLogo.png';
import { db, auth } from "./firebase";
import { collection, getDocs, doc, setDoc, getDoc, updateDoc, increment, onSnapshot } from "firebase/firestore";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import "./ViewEvents.css";
import axios from "axios";

// API base URL - change this to your Flask server URL
const API_BASE_URL = "http://localhost:9000";

const ViewEvents = () => {
  const [events, setEvents] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredEvents, setFilteredEvents] = useState([]);
  const [searchType, setSearchType] = useState("category");
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [categories, setCategories] = useState([]);
  const [venues, setVenues] = useState([]);
  const [agendas, setAgendas] = useState([]);
  const [topThreeEvents, setTopThreeEvents] = useState([]);
  const [carouselLoading, setCarouselLoading] = useState(true);
  
  // User-related states
  const [viewCount, setViewCount] = useState(null);
  const [showViewCount, setShowViewCount] = useState(false);
  const [showSubscriptionModal, setShowSubscriptionModal] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [mode, setMode] = useState("login");
  const [user, setUser] = useState(auth.currentUser);
  const [error, setError] = useState(null);

  // Listen for auth state changes
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((currentUser) => {
      setUser(currentUser);
      console.log("Current user:", currentUser);
      if (currentUser) {
        setShowSubscriptionModal(false);
      }
    });
    return () => unsubscribe();
  }, []);

  // Track page views
  useEffect(() => {
    const trackPageView = async () => {
      try {
        const viewDocRef = doc(db, "pageViews", "viewEvents");
        await setDoc(viewDocRef, { count: increment(1) }, { merge: true });
        const viewDoc = await getDoc(viewDocRef);
        const count = viewDoc.exists() ? viewDoc.data().count : 0;
        setViewCount(count);
        console.log("View count updated:", count);
      } catch (error) {
        console.error("Error tracking page view:", error);
        setError("Failed to track page views: " + error.message);
      }
    };

    const fetchViewCount = async () => {
      try {
        const viewDocRef = doc(db, "pageViews", "viewEvents");
        const viewDoc = await getDoc(viewDocRef);
        const count = viewDoc.exists() ? viewDoc.data().count : 0;
        setViewCount(count);
        console.log("View count fetched:", count);
      } catch (error) {
        console.error("Error fetching view count:", error);
        setError("Failed to fetch view count: " + error.message);
      }
    };

    if (user) {
      trackPageView();
    } else {
      fetchViewCount();
    }
  }, [user]);

  useEffect(() => {
    // Fetch events from Firebase with real-time updates
    const fetchEventsFromFirebase = () => {
      setLoading(true);
      setCarouselLoading(true);
      
      // Set up real-time listener for events collection
      const unsubscribe = onSnapshot(collection(db, "events"), (querySnapshot) => {
        const eventsData = querySnapshot.docs
          .filter(doc => doc.data().status === "published" || doc.data().status === undefined)
          .map(doc => ({
            id: doc.id,
            title: doc.data().title || "No Title",
            agenda: doc.data().agenda || "No Agenda",
            category: doc.data().category || "No Category",
            eventDate: doc.data().eventDate || "No Date",
            venue: doc.data().venue || "No Venue",
            format: doc.data().format || "N/A",
            paymentOptions: doc.data().paymentOptions || "N/A",
            ticketPrice: doc.data().ticketPrice || "N/A",
            registrationLink: doc.data().registrationLink || "/register",
            createdAt: doc.data().createdAt || new Date()
          }));
        
        setEvents(eventsData);
        setLoading(false);
        
        // Create temporary top three events client-side immediately
        const today = new Date();
        const tempTopThree = [...eventsData]
          .filter(event => new Date(event.eventDate) >= today)
          .sort((a, b) => new Date(a.eventDate) - new Date(b.eventDate))
          .slice(0, 3);
          
        if (tempTopThree.length > 0) {
          setTopThreeEvents(tempTopThree);
          setCarouselLoading(false);
        }
        
        // Extract unique categories, venues, and agendas
        const uniqueCategories = [...new Set(eventsData.map(event => 
          event.category?.trim()).filter(Boolean))].sort();
        const uniqueVenues = [...new Set(eventsData.map(event => 
          event.venue?.trim()).filter(Boolean))].sort();
        const uniqueAgendas = [...new Set(eventsData.map(event => 
          event.agenda?.trim()).filter(Boolean))].sort();
          
        setCategories(uniqueCategories);
        setVenues(uniqueVenues);
        setAgendas(uniqueAgendas);
        
        // Send the events data to Flask for B+ tree processing
        updateFlaskData(eventsData);
      });
      
      // Clean up listener on component unmount
      return () => unsubscribe();
    };

    fetchEventsFromFirebase();
  }, []);
  
  // Function to send events data to Flask for B+ tree processing
  const updateFlaskData = async (eventsData) => {
    try {
      await axios.post(`${API_BASE_URL}/update-events`, { events: eventsData });
      console.log("Events data sent to Flask successfully");
      
      // After updating Flask data, get top three events
      fetchTopThreeEvents();
    } catch (error) {
      console.error("Error sending events data to Flask:", error);
      
      // Fallback already handled in initial loading
      setCarouselLoading(false);
    }
  };
  
  // Fetch top three upcoming events using the B+ tree
  const fetchTopThreeEvents = async () => {
    try {
      const today = new Date().toISOString().split('T')[0]; // Today's date in YYYY-MM-DD format
      const response = await axios.get(`${API_BASE_URL}/search/date-range`, {
        params: {
          start: today
        }
      });
      
      if (response.data && response.data.events) {
        // Get top 3 from returned events
        const top3 = [...response.data.events]
          .sort((a, b) => new Date(a.eventDate) - new Date(b.eventDate))
          .slice(0, 3);
          
        if (top3.length > 0) {
          setTopThreeEvents(top3);
        }
      }
      setCarouselLoading(false);
    } catch (error) {
      console.error("Error fetching top three events:", error);
      // Fallback already handled in initial loading
      setCarouselLoading(false);
    }
  };

  // Save category interests for user
  const saveSearchInterests = async (categoryValue) => {
    if (!user || !categoryValue || categoryValue.trim() === "" || categoryValue === "No Category") {
      console.log("No user, empty category, or invalid category, skipping save:", { user, categoryValue });
      return;
    }

    try {
      const userId = user.uid;
      console.log(`Saving category interest for user: ${userId}, category: ${categoryValue}`);
      const userInterestsRef = doc(db, "userInterests", userId);
      const userInterestsDoc = await getDoc(userInterestsRef);
      
      let currentInterests = userInterestsDoc.exists() ? userInterestsDoc.data().interests || [] : [];
      
      // Always enforce "category" as the type
      const interestExists = currentInterests.some(i => 
        i.type === "category" && i.query.toLowerCase() === categoryValue.toLowerCase()
      );

      if (!interestExists) {
        // Explicitly set type to "category"
        const newInterest = { 
          query: categoryValue, 
          type: "category",
          timestamp: new Date() 
        };
        
        const updatedInterests = [...currentInterests, newInterest].slice(-10);
        
        if (userInterestsDoc.exists()) {
          await updateDoc(userInterestsRef, { 
            interests: updatedInterests, 
            email: user.email,
            lastUpdated: new Date()
          });
        } else {
          await setDoc(userInterestsRef, {
            interests: [newInterest],
            email: user.email,
            createdAt: new Date()
          });
        }
        console.log(`Saved category interest for user ${userId}: ${categoryValue}`);
      } else {
        console.log(`Category interest already exists for user ${userId}: ${categoryValue}`);
      }
    } catch (error) {
      console.error("Error saving category interest:", error);
      setError("Failed to save category interest: " + error.message);
    }
  };

  // Handle registration or sign-in with improved error messages
  const handleAuthSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    try {
      if (mode === "register") {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        console.log("User registered:", userCredential.user.uid);
        await setDoc(doc(db, "userInterests", userCredential.user.uid), {
          interests: [],
          email: email,
          createdAt: new Date()
        });
      } else {
        await signInWithEmailAndPassword(auth, email, password);
        console.log("User signed in");
      }
      setShowSubscriptionModal(false);
    } catch (error) {
      console.error("Auth error:", error);
      
      // Display user-friendly error messages based on Firebase error codes
      if (error.code === 'auth/user-not-found') {
        setError("Email not registered. Please check your email or register for a new account.");
      } else if (error.code === 'auth/invalid-credential') {
        setError("Invalid email. Please try again.");
      }else if (error.code === 'auth/wrong-password') {
        setError("Incorrect password. Please try again.");
      } else if (error.code === 'auth/invalid-email') {
        setError("Invalid email format. Please enter a valid email address.");
      } else if (error.code === 'auth/weak-password') {
        setError("Password is too weak. Please use a stronger password (at least 6 characters).");
      } else if (error.code === 'auth/email-already-in-use') {
        setError("Email already registered. Please log in or use a different email.");
      } else if (error.code === 'auth/too-many-requests') {
        setError("Too many failed login attempts. Please try again later or reset your password.");
      } else if (error.code === 'auth/network-request-failed') {
        setError("Network error. Please check your internet connection and try again.");
      } else {
        // Fallback for any other errors
        setError("Authentication failed: " + error.message);
      }
    }
  };

  // Handle logout
  const handleLogout = async () => {
    try {
      await auth.signOut();
      setShowSubscriptionModal(true);
      console.log("User logged out");
    } catch (error) {
      console.error("Logout error:", error);
      setError("Failed to log out: " + error.message);
    }
  };

  const handleSearch = async () => {
    // Clear any previous errors first
    setError(null);
    
    // Only show error if user actively clicked search with empty query
    // This prevents the error from showing during login or initial component load
    if (!searchQuery.trim()) {
      setFilteredEvents([]);
      // Only show error if search was manually triggered
      if (document.activeElement && document.activeElement.tagName === 'BUTTON') {
        setError(`Please select a ${searchType} to search`);
      }
      return;
    }

    try {
      // First attempt to use B+ tree API for searching
      if (searchType === "category") {
        try {
          const response = await axios.get(`${API_BASE_URL}/search/category/${encodeURIComponent(searchQuery)}`);
          if (response.data && response.data.events) {
            setFilteredEvents(response.data.events);
            
            // Save category interest if user is logged in
            if (user) {
              saveSearchInterests(searchQuery);
            }
            return;
          }
        } catch (error) {
          console.error("Error using B+ tree search:", error);
          // Continue to fallback client-side search
        }
      }
      
      // Client-side filtering fallback
      let filtered = [];
      switch(searchType) {
        case "category":
          filtered = events.filter((event) =>
            event.category?.toLowerCase().includes(searchQuery.toLowerCase())
          );
          // Save category directly
          if (user) {
            saveSearchInterests(searchQuery);
          }
          break;
        case "agenda":
          filtered = events.filter((event) =>
            event.agenda?.toLowerCase().includes(searchQuery.toLowerCase())
          );
          break;
        case "venue":
          filtered = events.filter((event) =>
            event.venue?.toLowerCase().includes(searchQuery.toLowerCase())
          );
          break;
        default:
          filtered = events;
      }
      
      setFilteredEvents(filtered);
      
      // For non-category searches, find and save categories from results
      if (user && searchType !== "category" && filtered.length > 0) {
        // Extract all unique categories from filtered results
        const categoriesInFilteredEvents = [...new Set(filtered.map(event => event.category))]
          .filter(cat => cat && cat !== "No Category");
        
        // Save each category found
        if (categoriesInFilteredEvents.length > 0) {
          categoriesInFilteredEvents.forEach(category => {
            saveSearchInterests(category);
          });
        }
      }
    } catch (error) {
      console.error("Error during search:", error);
      setError("Search failed: " + error.message);
    }
  };

  // Handle input change and trigger search for dropdown selections
  const handleInputChange = (e) => {
    const value = e.target.value;
    setSearchQuery(value);
    if (!value.trim()) {
      setFilteredEvents([]);
    }
  };

  // Handle event selection and save interest
  const handleEventClick = (event) => {
    setSelectedEvent(event);
    // Always save the category from the clicked event
    if (user && event.category && event.category !== "No Category") {
      saveSearchInterests(event.category);
    }
  };

  const handleRegisterClick = (event) => {
    window.location.href = `/register?event=${encodeURIComponent(event.title)}`;
  };

  const toggleViewCount = () => {
    setShowViewCount(prev => !prev);
  };

  const togglePasswordVisibility = () => {
    setShowPassword(prev => !prev);
  };

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    pauseOnHover: true,
    arrows: true
  };

  const formatDate = (dateString) => {
    if (!dateString || dateString === "No Date") return dateString;
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return dateString;
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  // Generate placeholder events for the carousel loading state
  const placeholderEvents = [
    {
      title: "Loading Event...",
      eventDate: "2025-04-25",
      agenda: "Loading event details. Please wait a moment while we fetch the latest events."
    },
    {
      title: "Loading Event...",
      eventDate: "2025-04-26",
      agenda: "Loading event details. Please wait a moment while we fetch the latest events."
    },
    {
      title: "Loading Event...",
      eventDate: "2025-04-27",
      agenda: "Loading event details. Please wait a moment while we fetch the latest events."
    }
  ];

  // Decide which events to display in carousel
  const carouselEvents = carouselLoading ? placeholderEvents : 
                         topThreeEvents.length > 0 ? topThreeEvents : 
                         events.length > 0 ? events.slice(0, 3) : 
                         placeholderEvents;

  return (
    <div className="app">
      <header className="header">
        <img src={ssnLogo} alt="SSN Logo" className="logo" />
        <nav className="nav-links">
          <a href="/">Home</a>
          {user ? (
            <button onClick={handleLogout}>Logout</button>
          ) : (
            <button onClick={() => setShowSubscriptionModal(true)}>Login</button>
          )}
          <span className="view-count-container">
            <span 
              className={`password-toggle ${showViewCount ? 'eye-slash' : 'eye'}`} 
              onClick={toggleViewCount}
              title={showViewCount ? "Hide page views" : "Show page views"}
            >
              👁️
            </span>
            <span className={`view-count ${!showViewCount ? 'hidden' : ''}`}>
              {viewCount !== null ? viewCount : '...'}
            </span>
          </span>
        </nav>
      </header>

      <div className="container events-container">
        <div className="carousel-container">
          <Slider {...sliderSettings}>
            {carouselEvents.map((event, index) => (
              <div key={index} className={`carousel-card ${carouselLoading ? 'carousel-loading' : ''}`}>
                <h2>{event.title}</h2>
                <p className="date">{formatDate(event.eventDate)}</p>
                <p className="description">{event.agenda}</p>
                {carouselLoading && <div className="loading-pulse"></div>}
              </div>
            ))}
          </Slider>
        </div>

        <div className="search-container">
          <select onChange={(e) => {
            setSearchType(e.target.value);
            setSearchQuery(""); // Reset search query when switching types
            setFilteredEvents([]); // Clear filtered results
          }} value={searchType}>
            <option value="category">Search by Category</option>
            <option value="agenda">Search by Agenda</option>
            <option value="venue">Search by Venue</option>
          </select>
          
          {searchType === "category" && categories.length > 0 ? (
            <select 
              value={searchQuery} 
              onChange={(e) => {
                setSearchQuery(e.target.value);
                // When category is selected from dropdown, trigger search
                if (e.target.value) {
                  setTimeout(() => handleSearch(), 100);
                } else {
                  setFilteredEvents([]);
                }
              }}
            >
              <option value="">All Categories</option>
              {categories.map((category, index) => (
                <option key={index} value={category}>
                  {category}
                </option>
              ))}
            </select>
          ) : searchType === "venue" && venues.length > 0 ? (
            <select 
              value={searchQuery} 
              onChange={(e) => {
                setSearchQuery(e.target.value);
                if (e.target.value) {
                  setTimeout(() => handleSearch(), 100);
                } else {
                  setFilteredEvents([]);
                }
              }}
            >
              <option value="">All Venues</option>
              {venues.map((venue, index) => (
                <option key={index} value={venue}>
                  {venue}
                </option>
              ))}
            </select>
          ) : searchType === "agenda" && agendas.length > 0 ? (
            <select 
              value={searchQuery} 
              onChange={(e) => {
                setSearchQuery(e.target.value);
                if (e.target.value) {
                  setTimeout(() => handleSearch(), 100);
                } else {
                  setFilteredEvents([]);
                }
              }}
            >
              <option value="">All Agendas</option>
              {agendas.map((agenda, index) => (
                <option key={index} value={agenda}>
                  {agenda.length > 50 ? `${agenda.substring(0, 50)}...` : agenda}
                </option>
              ))}
            </select>
          ) : (
            <input
              type="text"
              placeholder={`Enter ${searchType === "venue" ? "Venue" : searchType === "agenda" ? "Agenda" : "Category"}`}
              value={searchQuery}
              onChange={handleInputChange}
            />
          )}
          
          <button onClick={handleSearch}>Search</button>
        </div>

        <div className="card-container">
          {loading ? (
            Array(6).fill().map((_, index) => (
              <div key={index} className="card card-loading">
                <div className="loading-line loading-title"></div>
                <div className="loading-line loading-short"></div>
                <div className="loading-line loading-short"></div>
                <div className="loading-line loading-short"></div>
                <div className="loading-line loading-long"></div>
              </div>
            ))
          ) : (filteredEvents.length > 0 ? filteredEvents : events).length > 0 ? (
            (filteredEvents.length > 0 ? filteredEvents : events).map((event, index) => (
              <div key={index} className="card" onClick={() => handleEventClick(event)}>
                <h2>{event.title}</h2>
                <p><strong>Category:</strong> {event.category}</p>
                <p><strong>Date:</strong> {formatDate(event.eventDate)}</p>
                <p><strong>Venue:</strong> {event.venue}</p>
                <p><strong>Agenda:</strong> {event.agenda.length > 100 ? `${event.agenda.substring(0, 100)}...` : event.agenda}</p>
              </div>
            ))
          ) : (
            <div className="card">
              <p className="error">No events found matching your search criteria.</p>
            </div>
          )}
        </div>
      </div>

      {selectedEvent && (
        <div className="event-modal" onClick={(e) => {
          if (e.target.className === "event-modal") setSelectedEvent(null);
        }}>
          <div className="modal-content">
            <h2>{selectedEvent.title}</h2>
            <p><strong>Category:</strong> {selectedEvent.category}</p>
            <p><strong>Date:</strong> {formatDate(selectedEvent.eventDate)}</p>
            <p><strong>Venue:</strong> {selectedEvent.venue}</p>
            <p><strong>Agenda:</strong> {selectedEvent.agenda}</p>
            <p><strong>Format:</strong> {selectedEvent.format}</p>
            <p><strong>Payment Options:</strong> {selectedEvent.paymentOptions}</p>
            <p><strong>Ticket Price:</strong> {selectedEvent.ticketPrice !== "N/A" ? `₹${selectedEvent.ticketPrice}` : "Free"}</p>
            <div className="modal-buttons">
              <button className="register-btn" onClick={() => handleRegisterClick(selectedEvent)}>Register</button>
              <button className="close-btn" onClick={() => setSelectedEvent(null)}>Close</button>
            </div>
          </div>
        </div>
      )}

      {showSubscriptionModal && (
        <div className="event-modal" onClick={(e) => {
          if (e.target.className === "event-modal") setShowSubscriptionModal(false);
        }}>
          <div className="modal-content">
            <h2>{mode === "register" ? "Register" : "Sign In"}</h2>
            <p>Please {mode === "register" ? "create an account" : "log in"} to proceed.</p>
            <form onSubmit={handleAuthSubmit}>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
                required
              />
              <div className="password-container">
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Password"
                  required
                />
                <span 
                  className={`password-toggle ${showPassword ? 'eye-slash' : 'eye'}`} 
                  onClick={togglePasswordVisibility}
                >
                  👁️
                </span>
              </div>
              <div className="modal-buttons">
                <button type="submit" className="register-btn">
                  {mode === "register" ? "Register" : "Sign In"}
                </button>
                <button 
                  type="button" 
                  className="close-btn"
                  onClick={() => setShowSubscriptionModal(false)}
                >
                  Cancel
                </button>
                <button
                  type="button"
                  className="switch-btn"
                  onClick={() => setMode(mode === "login" ? "register" : "login")}
                >
                  {mode === "login" ? "Need to Register?" : "Already have an account? Sign In"}
                </button>
              </div>
            </form>
            {error && <p className="error">{error}</p>}
          </div>
        </div>
      )}

      <footer className="footer">&copy; 2025 SSN Events. All rights reserved.</footer>
    </div>
  );
};

export default ViewEvents;