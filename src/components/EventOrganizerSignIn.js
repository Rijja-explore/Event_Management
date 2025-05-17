// import React, { useState } from "react";
// // import { FaUser, FaLock, FaBuilding, FaBriefcase, FaUsers } from "react-icons/fa";
// import { useNavigate, Link } from "react-router-dom";
// import "./EventOrganizerSignIn.css";

// const EventOrganizerSignIn = () => {
//   const [formData, setFormData] = useState({
//     name: "",
//     username: "",
//     password: "",
//     confirmPassword: "",
//     department: "",
//     designation: "",
//     organization: "ssn",
//     otherOrganization: "",
//   });
//   const [showPassword, setShowPassword] = useState(false);
//   const navigate = useNavigate();

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({
//       ...formData,
//       [name]: value,
//     });
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
    
//     // Validation
//     if (formData.password !== formData.confirmPassword) {
//       alert("Passwords do not match!");
//       return;
//     }
    
//     // You would typically send this data to your backend here
//     console.log("Form submitted:", formData);
    
//     // For demo, just redirect to login
//     alert("Sign-in successful! You can now log in.");
//     navigate("/login");
//   };

//   return (
//     <div className="signin-container">
//       <div className="wrapper">
//         <form onSubmit={handleSubmit}>
//           <h1>EVENT ORGANIZER SIGN-IN</h1>

//           {/* Name Input */}
//           <div className="input-box">
//             {/* <FaUser className="icon" /> */}
//             <input
//               type="text"
//               name="name"
//               placeholder="Full Name"
//               required
//               value={formData.name}
//               onChange={handleChange}
//             />
//           </div>

//           {/* Username Input */}
//           <div className="input-box">
//             {/* <FaUser className="icon" /> */}
//             <input
//               type="text"
//               name="username"
//               placeholder="Username"
//               required
//               value={formData.username}
//               onChange={handleChange}
//             />
//           </div>

//           {/* Password Input */}
//           <div className="input-box">
//             {/* <FaLock className="icon" /> */}
//             <input
//               type={showPassword ? "text" : "password"}
//               name="password"
//               placeholder="Password"
//               required
//               value={formData.password}
//               onChange={handleChange}
//             />
//           </div>

//           {/* Confirm Password */}
//           <div className="input-box">
//             {/* <FaLock className="icon" /> */}
//             <input
//               type={showPassword ? "text" : "password"}
//               name="confirmPassword"
//               placeholder="Confirm Password"
//               required
//               value={formData.confirmPassword}
//               onChange={handleChange}
//             />
//           </div>

//           {/* Show Password Toggle */}
//           <div className="show-password">
//             <label>
//               <input
//                 type="checkbox"
//                 checked={showPassword}
//                 onChange={() => setShowPassword(!showPassword)}
//               />{" "}
//               Show Password
//             </label>
//           </div>

//           {/* Department Input */}
//           <div className="input-box">
//             {/* <FaUsers className="icon" /> */}
//             <input
//               type="text"
//               name="department"
//               placeholder="Department"
//               required
//               value={formData.department}
//               onChange={handleChange}
//             />
//           </div>

//           {/* Designation Input */}
//           <div className="input-box">
//             {/* <FaBriefcase className="icon" /> */}
//             <input
//               type="text"
//               name="designation"
//               placeholder="Designation"
//               required
//               value={formData.designation}
//               onChange={handleChange}
//             />
//           </div>

//           {/* Organization Selection */}
//           <div className="input-box select-box">
//             {/* <FaBuilding className="icon" /> */}
//             <select
//               name="organization"
//               value={formData.organization}
//               onChange={handleChange}
//               required
//             >
//               <option value="ssn">SSN</option>
//               <option value="other">Other</option>
//             </select>
//           </div>

//           {/* Conditional Other Organization Input */}
//           {formData.organization === "other" && (
//             <div className="input-box">
//               {/* <FaBuilding className="icon" /> */}
//               <input
//                 type="text"
//                 name="otherOrganization"
//                 placeholder="Organization Name"
//                 required={formData.organization === "other"}
//                 value={formData.otherOrganization}
//                 onChange={handleChange}
//               />
//             </div>
//           )}

//           {/* Submit Button */}
//           <button type="submit" className="signin-button">
//             Sign In
//           </button>

//           {/* Login Link */}
//           <div className="login-link">
//             <p>
//               Already have an account? <Link to="/login">Login</Link>
//             </p>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default EventOrganizerSignIn;


import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { auth, db } from "./firebase"; // Adjust path to your Firebase config
import { createUserWithEmailAndPassword , updateProfile} from "firebase/auth";
import { collection, query, where, getDocs, setDoc, doc } from "firebase/firestore";
import "./EventOrganizerSignIn.css";

const EventOrganizerSignIn = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "", // Added email field
    username: "",
    password: "",
    confirmPassword: "",
    department: "",
    designation: "",
    organization: "ssn",
    otherOrganization: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Basic email regex
    if (!emailRegex.test(formData.email)) {
      alert("Please enter a valid email address!");
      return;
    }
    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    try {
      // Check for duplicate username in Firestore
      const usernameQuery = query(
        collection(db, "users"),
        where("username", "==", formData.username)
      );
      const usernameSnapshot = await getDocs(usernameQuery);
      if (!usernameSnapshot.empty) {
        alert("This username is already taken!");
        return;
      }

      // Create user with Firebase Authentication
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        formData.email,
        formData.password
      );
      const user = userCredential.user;
      const orgId = user.uid; // Use Firebase UID as org_id

      await updateProfile(user, {
        displayName: formData.username,
      });

      // Store user data in Firestore
      await setDoc(doc(db, "users", orgId), {
        name: formData.name,
        email: formData.email,
        username: formData.username,
        department: formData.department,
        designation: formData.designation,
        organization: formData.organization === "other" ? formData.otherOrganization : formData.organization,
        org_id: orgId,
        createdAt: new Date(),
      });

      navigate("/eventorganizer"); // Redirect to dashboard
    } catch (error) {
      console.error("Error during sign-up:", error.message);
      alert(`Sign-up failed: ${error.message}`);
    }
  };

  return (
    <div className="signin-container">
      <div className="wrapper">
        <form onSubmit={handleSubmit}>
          <h1>EVENT ORGANIZER SIGN-IN</h1>

          {/* Name Input */}
          <div className="input-box">
            <input
              type="text"
              name="name"
              placeholder="Full Name"
              required
              value={formData.name}
              onChange={handleChange}
            />
          </div>

          {/* Email Input */}
          <div className="input-box">
            <input
              type="email"
              name="email"
              placeholder="Email"
              required
              value={formData.email}
              onChange={handleChange}
            />
          </div>

          {/* Username Input */}
          <div className="input-box">
            <input
              type="text"
              name="username"
              placeholder="Username"
              required
              value={formData.username}
              onChange={handleChange}
            />
          </div>

          {/* Password Input */}
          <div className="input-box">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Password"
              required
              value={formData.password}
              onChange={handleChange}
            />
          </div>

          {/* Confirm Password */}
          <div className="input-box">
            <input
              type={showPassword ? "text" : "password"}
              name="confirmPassword"
              placeholder="Confirm Password"
              required
              value={formData.confirmPassword}
              onChange={handleChange}
            />
          </div>

          {/* Show Password Toggle */}
          <div className="show-password">
            <label>
              <input
                type="checkbox"
                checked={showPassword}
                onChange={() => setShowPassword(!showPassword)}
              />{" "}
              Show Password
            </label>
          </div>

          {/* Department Input */}
          <div className="input-box">
            <input
              type="text"
              name="department"
              placeholder="Department"
              required
              value={formData.department}
              onChange={handleChange}
            />
          </div>

          {/* Designation Input */}
          <div className="input-box">
            <input
              type="text"
              name="designation"
              placeholder="Designation"
              required
              value={formData.designation}
              onChange={handleChange}
            />
          </div>

          {/* Organization Selection */}
          <div className="input-box select-box">
            <select
              name="organization"
              value={formData.organization}
              onChange={handleChange}
              required
            >
              <option value="ssn">SSN</option>
              <option value="other">Other</option>
            </select>
          </div>

          {/* Conditional Other Organization Input */}
          {formData.organization === "other" && (
            <div className="input-box">
              <input
                type="text"
                name="otherOrganization"
                placeholder="Organization Name"
                required={formData.organization === "other"}
                value={formData.otherOrganization}
                onChange={handleChange}
              />
            </div>
          )}

          {/* Submit Button */}
          <button type="submit" className="signin-button">
            Sign Up {/* Changed text to "Sign Up" for clarity */}
          </button>

          {/* Login Link */}
          <div className="login-link">
            <p>
              Already have an account? <Link to="/login">Login</Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EventOrganizerSignIn;