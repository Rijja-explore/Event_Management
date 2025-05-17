// import React, { useState } from "react";
// import { useNavigate, Link } from "react-router-dom";
// import "./LoginForm.css";


// const LoginForm = () => {
//   const [username, setUsername] = useState("");
//   const [password, setPassword] = useState("");
//   const [showPassword, setShowPassword] = useState(false);
//   const navigate = useNavigate();

//   const handleSubmit = (e) => {
//     e.preventDefault();
  
//     if (username === "admin" && password === "123") {
//       navigate("/admin"); // Redirect to Admin page
//     } else if (username === "event" && password === "123") {
//       navigate("/eventorganizer"); // Redirect to EventOrganizer page
//     } else {
//       alert("Invalid username or password!");
//     }
//   };

//   return (
//     <div className="login-container">
//       <div className="wrapper">
//         <form onSubmit={handleSubmit}>
//           <h1>LOGIN</h1>

//           <div className="input-box">
//             <input
//               type="text"
//               placeholder="Username"
//               required
//               value={username}
//               onChange={(e) => setUsername(e.target.value)}
//             />
//           </div>

//           <div className="input-box">
//             <input
//               type={showPassword ? "text" : "password"}
//               placeholder="Password"
//               required
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//             />
//           </div>

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

//           <button
//             type="submit"
//             className="login-button"
//           >
//             Login
//           </button>

//           <div className="register-link">
//             <p>
//               Don't have an account? <Link to="/signin">Register</Link>
//             </p>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default LoginForm;


import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { auth, db } from "./firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { collection, query, where, getDocs } from "firebase/firestore";
import "./LoginForm.css";

const LoginForm = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Step 1: Find the user by username in Firestore
      const usersRef = collection(db, "users");
      const q = query(usersRef, where("username", "==", username));
      const querySnapshot = await getDocs(q);

      if (querySnapshot.empty) {
        alert("No user found with that username.");
        return;
      }

      // Step 2: Get the email associated with the username
      const userDoc = querySnapshot.docs[0].data();
      const email = userDoc.email;

      // Step 3: Try logging in with email and password
      await signInWithEmailAndPassword(auth, email, password);

      // Step 4: Redirect based on username or role
      if (username === "Admin" && password === "admin@123") {
        navigate("/admin");
      } else {
        navigate("/eventorganizer");
      }

    } catch (error) {
      console.error("Login error:", error.message);
      alert("Login failed: " + error.message);
    }
  };

  return (
    <div className="login-container">
      <div className="wrapper">
        <form onSubmit={handleSubmit}>
          <h1>LOGIN</h1>

          <div className="input-box">
            <input
              type="text"
              placeholder="Username"
              required
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>

          <div className="input-box">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

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

          <button type="submit" className="login-button">
            Login
          </button>

          <div className="register-link">
            <p>
              Don't have an account? <Link to="/signin">Register</Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
