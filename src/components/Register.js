// import React, { useState, useEffect } from "react";
// import ssnLogo from './assets/ssnLogo.png';
// import qrCode from './assets/sampleqr.webp';
// import { db } from "./firebase";
// import { collection, addDoc, serverTimestamp } from "firebase/firestore";
// import "./Register.css";

// const Register = () => {
//   const [formData, setFormData] = useState({
//     name: "",
//     dept: "",
//     year: "",
//     college: "",
//     role: "",
//     email: "",
//     contact: "",
//   });

//   const [eventTitle, setEventTitle] = useState("default");

//   useEffect(() => {
//     const queryParams = new URLSearchParams(window.location.search);
//     const eventParam = queryParams.get("event");
//     if (eventParam) {
//       setEventTitle(eventParam);
//     }
//   }, []);

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (Object.values(formData).some((value) => value === "")) {
//       alert("⚠️ Please fill out all fields before submitting!");
//       return;
//     }

//     const confirmed = window.confirm("Are you sure you want to submit the registration?");
//     if (!confirmed) {
//       return;
//     }

//     try {
//       const collectionName = `Registrations_${eventTitle.replace(/\s+/g, "_")}`;

//       await addDoc(collection(db, collectionName), {
//         ...formData,
//         eventTitle,
//         timestamp: serverTimestamp(),
//       });

//       alert("✅ Registration successful!");
//       setFormData({
//         name: "",
//         dept: "",
//         year: "",
//         college: "",
//         role: "",
//         email: "",
//         contact: "",
//       });
//     } catch (error) {
//       console.error("Error saving to Firestore: ", error);
//       alert("❌ Something went wrong while saving to Firestore.");
//     }
//   };

//   // Inline style for app2 with background image
//   const appStyle = {
//     display: 'flex',
//     flexDirection: 'column',
//     minHeight: '100vh',
//     background: "url('./assets/ssn_campus.jpeg') no-repeat center center fixed",
//     backgroundSize: 'cover'
//   };

//   return (
//     <div className="app2" style={appStyle}>
//       <header className="header2">
//         <img src={ssnLogo} alt="SSN Logo" className="logo2" />
//         <nav className="nav-links2">
//           <a href="/">Home</a>
//           <a href="/viewevents">Events</a>
//         </nav>
//       </header>

//       <div className="container2">
//         <div className="form-container2">
//           <div className="event-details2">
//             <h2>{eventTitle}</h2>
//           </div>

//           <form onSubmit={handleSubmit}>
//             <label>Name:</label>
//             <input type="text" name="name" value={formData.name} onChange={handleChange} required />

//             <label>Department:</label>
//             <input type="text" name="dept" value={formData.dept} onChange={handleChange} required />

//             <label>Year:</label>
//             <select name="year" value={formData.year} onChange={handleChange} required>
//               <option value="" disabled hidden>Select Year</option>
//               <option value="1">1st Year</option>
//               <option value="2">2nd Year</option>
//               <option value="3">3rd Year</option>
//               <option value="4">4th Year</option>
//               <option value="PG">Postgraduate</option>
//               <option value="None">None</option>
//             </select>

//             <label>College Name:</label>
//             <input type="text" name="college" value={formData.college} onChange={handleChange} required />

//             <label>Email ID:</label>
//             <input type="email" name="email" value={formData.email} onChange={handleChange} required />

//             <label>Contact Number:</label>
//             <input type="tel" name="contact" value={formData.contact} onChange={handleChange} required />

//             <label>Role:</label>
//             <select name="role" value={formData.role} onChange={handleChange} required>
//               <option value="" disabled hidden>Select Role</option>
//               <option value="student">Student</option>
//               <option value="faculty">Faculty</option>
//             </select>

//             {/* <label>Scan to Pay:</label>
//             <div className="qr-section2">
//               <img src={qrCode} alt="QR Code for Payment" className="qr-code2" />
//             </div> */}

//             <button className="submit-button2"type="submit">Register</button>
//           </form>
//         </div>
//       </div>

//       <footer className="footer2">&copy; 2025 SSN Events. All rights reserved.</footer>
//     </div>
//   );
// };

// export default Register;


import React, { useState, useEffect } from "react";
import ssnLogo from './assets/ssnLogo.png';
import qrCode from './assets/sampleqr.webp';
import { db } from "./firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import "./Register.css";

const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    dept: "",
    year: "",
    college: "",
    role: "",
    email: "",
    contact: "",
  });

  const [eventTitle, setEventTitle] = useState("default");

  useEffect(() => {
    const queryParams = new URLSearchParams(window.location.search);
    const eventParam = queryParams.get("event");
    if (eventParam) {
      setEventTitle(eventParam);
    }
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (Object.values(formData).some((value) => value === "")) {
      alert("⚠️ Please fill out all fields before submitting!");
      return;
    }

    const confirmed = window.confirm("Are you sure you want to submit the registration?");
    if (!confirmed) {
      return;
    }

    try {
      const collectionName = `Registrations_${eventTitle.replace(/\s+/g, "_")}`;

      await addDoc(collection(db, collectionName), {
        ...formData,
        eventTitle,
        timestamp: serverTimestamp(),
      });

      alert("✅ Registration successful!");
      setFormData({
        name: "",
        dept: "",
        year: "",
        college: "",
        role: "",
        email: "",
        contact: "",
      });
    } catch (error) {
      console.error("Error saving to Firestore: ", error);
      alert("❌ Something went wrong while saving to Firestore.");
    }
  };

  // Inline style for app2 with background image
  const appStyle = {
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100vh',
    background: "url('./assets/ssn_campus.jpeg') no-repeat center center fixed",
    backgroundSize: 'cover'
  };

  return (
    <div className="app2" style={appStyle}>
      <header className="header2">
        <img src={ssnLogo} alt="SSN Logo" className="logo2" />
        <nav className="nav-links2">
          <a href="/">Home</a>
          <a href="/viewevents">Events</a>
        </nav>
      </header>
      <br/>
      <br/> 

      <div className="container2">
        <div className="form-container2">
          <div className="event-details2">
            <h2>{eventTitle}</h2>
          </div>

          <form onSubmit={handleSubmit}>
            <label>Name:</label>
            <input type="text" name="name" value={formData.name} onChange={handleChange} required />

            <label>Department:</label>
            <input type="text" name="dept" value={formData.dept} onChange={handleChange} required />

            <label>Year:</label>
            <select name="year" value={formData.year} onChange={handleChange} required>
              <option value="" disabled hidden>Select Year</option>
              <option value="1">1st Year</option>
              <option value="2">2nd Year</option>
              <option value="3">3rd Year</option>
              <option value="4">4th Year</option>
              <option value="PG">Postgraduate</option>
              <option value="None">None</option>
            </select>

            <label>College Name:</label>
            <input type="text" name="college" value={formData.college} onChange={handleChange} required />

            <label>Email ID:</label>
            <input type="email" name="email" value={formData.email} onChange={handleChange} required />

            <label>Contact Number:</label>
            <input type="tel" name="contact" value={formData.contact} onChange={handleChange} required />

            <label>Role:</label>
            <select name="role" value={formData.role} onChange={handleChange} required>
              <option value="" disabled hidden>Select Role</option>
              <option value="student">Student</option>
              <option value="faculty">Faculty</option>
            </select>

            {/* <label>Scan to Pay:</label>
            <div className="qr-section2">
              <img src={qrCode} alt="QR Code for Payment" className="qr-code2" />
            </div> */}

            <button className="button_register_2"type="submit">Register</button>
          </form>
        </div>
      </div>

      <footer className="footer2">&copy; 2025 SSN Events. All rights reserved.</footer>
    </div>
  );
};

export default Register;