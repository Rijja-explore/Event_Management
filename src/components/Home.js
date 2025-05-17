// import React, { useState } from "react";
// import { Link } from "react-router-dom";
// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import BannerBackground from "./assets/back.png";
// import BannerImage from "./assets/ssn_campus.jpeg";
// import AboutBackground from "./assets/opsside.png";
// import AboutBackgroundImage from "./assets/clocktower.jpeg";
// import Logo from "./assets/ssnLogo.png";
// import { FiArrowRight } from "react-icons/fi";
// import { BsFillPlayCircleFill, BsTwitter, BsYoutube } from "react-icons/bs";
// import { SiLinkedin } from "react-icons/si";
// import { FaFacebookF } from "react-icons/fa";
// import { HiOutlineBars3 } from "react-icons/hi2";
// import Box from "@mui/material/Box";
// import Drawer from "@mui/material/Drawer";
// import List from "@mui/material/List";
// import Divider from "@mui/material/Divider";
// import ListItem from "@mui/material/ListItem";
// import ListItemButton from "@mui/material/ListItemButton";
// import ListItemIcon from "@mui/material/ListItemIcon";
// import ListItemText from "@mui/material/ListItemText";
// import HomeIcon from "@mui/icons-material/Home";
// import InfoIcon from "@mui/icons-material/Info";
// import PhoneRoundedIcon from "@mui/icons-material/PhoneRounded";
// import "./Home.css";

// const Navbar = () => {
//   const [openMenu, setOpenMenu] = useState(false);

//   const menuOptions = [
//     { text: "Home", path: "/home", icon: <HomeIcon style={{ color: "darkblue" }} /> },
//     { text: "About", path: "/about", icon: <InfoIcon style={{ color: "darkblue" }} /> },
//     { text: "Contact", path: "/contact", icon: <PhoneRoundedIcon style={{ color: "darkblue" }} /> },
//   ];

//   return (
//     <nav className="navbar">
//       <div className="nav-logo-container">
//         <img src={Logo} alt="Logo" className="nav-logo" />
//       </div>
//       <div className="navbar-links-container">
//         {menuOptions.map((item) => (
//           <Link key={item.text} to={item.path} className="nav-link">
//             <button className="primary-button">{item.text}</button>
//           </Link>
//         ))}
//         <button className="primary-button">Log In</button>
//         <button className="primary-button">View Events</button>
//       </div>
//       <div className="navbar-menu-container">
//         <HiOutlineBars3 onClick={() => setOpenMenu(true)} />
//       </div>
//       <Drawer open={openMenu} onClose={() => setOpenMenu(false)} anchor="right">
//         <Box sx={{ width: 250 }} role="presentation" onClick={() => setOpenMenu(false)}>
//           <List>
//             {menuOptions.map((item) => (
//               <ListItem key={item.text} disablePadding>
//                 <Link to={item.path} style={{ textDecoration: "none", color: "inherit" }}>
//                   <ListItemButton>
//                     <ListItemIcon>{item.icon}</ListItemIcon>
//                     <ListItemText primary={item.text} />
//                   </ListItemButton>
//                 </Link>
//               </ListItem>
//             ))}
//           </List>
//           <Divider />
//         </Box>
//       </Drawer>
//     </nav>
//   );
// };

// function Home() {
//   return (
//     <div className="App">
//       <Navbar />
//       <div className="home-container">
//         <div className="home-banner-container">
//           <div className="home-bannerImage-container">
//             <img src={BannerBackground} alt="Background" />
//           </div>
//           <div className="home-text-section">
//             <h1 className="primary-heading">EventSphere – Your Ultimate Hub for College Technical Events!</h1>
//             <p className="primary-text">
//             Welcome to EventSphere, where innovation meets competition! EventSphere is the one-stop platform 
//             for all college technical events, bringing together students, tech 
//             enthusiasts, and industry experts to explore cutting-edge 
//             advancements in science, engineering, and technology.
//             </p>
//             <button className="secondary-button">Explore Now <FiArrowRight /></button>
//           </div>
//           <div className="home-image-section">
//             <img src={BannerImage} alt="EventSphere" className="circular-image" />
//           </div>
//         </div>
//       </div>
//       <div className="about-section-container">
//         <div className="about-background-image-container">
//           <img src={AboutBackground} alt="Background" />
//         </div>
//         <div className="about-section-image-container">
//           <img src={AboutBackgroundImage} alt="Clock Tower" className="circular-image" />
//         </div>
//         <div className="about-section-text-container">
//           <p className="primary-heading">About</p>
//           <p className="primary-text">Sri Sivasubramaniya Nadar (SSN), founded by Mr. Shiv Nadar, Founder
//           and Chairman Emeritus, HCL Technologies, stands out as a premier
//           center of higher learning with a mission of pursuing excellence in
//           education and research. The institutions, with their diverse and
//           dynamic community of students offer a distinctive combination of some
//           of the finest graduate, undergraduate and research programs,
//           accomplished faculty, world-class facilities, and a residential
//           campus situated in sprawling 230 acres of sylvan surroundings.</p>
//           <div className="about-buttons-container">
//             <button className="secondary-button">Learn More</button>
//             <button className="watch-video-button"><BsFillPlayCircleFill /> Watch Video</button>
//           </div>
//         </div>
//       </div>
//       <div className="contact-page-wrapper">
//         <h1 className="primary-heading">Have a Question?</h1>
//         <div className="contact-form-container">
//           <input type="text" placeholder="yourid@gmail.com" />
//           <button className="secondary-button">Submit</button>
//         </div>
//       </div>
//       <div className="footer-wrapper">
//         <div className="footer-section-one">
//           <div className="footer-logo-container">
//             <img src={Logo} alt="Logo" />
//           </div>
//           <div className="footer-icons">
//             <BsTwitter />
//             <SiLinkedin />
//             <BsYoutube />
//             <FaFacebookF />
//           </div>
//         </div>
//         <div className="footer-section-two">
//           <div className="footer-section-columns">
//             <span>Help</span>
//             <span>Share</span>
//             <span>Work</span>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Home;


import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import BannerBackground from "./assets/back.png";
import BannerImage from "./assets/ssn_campus.jpeg";
import AboutBackground from "./assets/opsside.png";
import AboutBackgroundImage from "./assets/clocktower.jpeg";
import Logo from "./assets/ssnLogo.png";
import "./Home.css";
import 'bootstrap-icons/font/bootstrap-icons.css';

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();
  const menuOptions = [
    { text: "Home", path: "/home" },
    { text: "About", path: "/about" },
    { text: "Contact", path: "/contact" },
  ];

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <nav className="navbar">
      <div className="nav-logo-container">
        <img src={Logo} alt="Logo" className="nav-logo" />
      </div>
      <div className="navbar-links-container">
        {/* {menuOptions.map((item) => (
          <Link key={item.text} to={item.path} className="nav-link">
            <button className="primary-button">{item.text}</button>
          </Link>
        ))} */}
        <button className="primary-button1"onClick={() => navigate("/login")}>Log In</button>
        <button className="primary-button1"onClick={() => navigate("/Signin")}>Sign Up</button>
        <button className="primary-button1"onClick={() => navigate("/viewevents")}>View Events</button>
      </div>
      <div className="navbar-menu-container">
        <div className="menu-icon" onClick={toggleMenu}>☰</div>
        {menuOpen && (
          <div className="mobile-menu">
            {/* {menuOptions.map((item) => (
              <Link 
                key={item.text} 
                to={item.path} 
                className="mobile-menu-item"
                onClick={() => setMenuOpen(false)}
              >
                {item.text}
              </Link>
            ))} */}
          
          <button className="mobile-menu-item1"onClick={() => navigate("/login")}>Log In</button>
          <button className="mobile-menu-item1"onClick={() => navigate("/Signin")}>Sign Up</button>
          <button className="mobile-menu-item1"onClick={() => navigate("/viewevents")}>View Events</button>
           
          </div>
        )}
      </div>
    </nav>
  );
};

function Home() {

  const [contactEmail, setContactEmail] = useState("");

  const handleEmailSubmit = async () => {
    if (!contactEmail) {
      alert("Please enter an email.");
      return;
    }

    try {
      const response = await fetch("http://localhost:5000/contact-email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: contactEmail }),
      });

      const data = await response.json();
      if (response.ok) {
        alert("Email sent successfully!");
        setContactEmail("");
      } else {
        alert(data.message || "Failed to send email.");
      }
    } catch (error) {
      console.error(error);
      alert("Error occurred while sending email.");
    }
  };

  return (
    <div className="App">

      <Navbar />
      <br/>
      <br/>
      <br/>
      <br/>
      <br/>
      <div className="home-container">
        <div className="home-banner-container">
          <div className="home-bannerImage-container">
            <img src={BannerBackground} alt="Background" />
          </div>
          <div className="home-text-section">
            <h1 className="primary-heading">EventSphere – Your Ultimate Hub for College Technical Events!</h1>
            <p className="primary-text">
              Welcome to EventSphere, where innovation meets competition! EventSphere is the one-stop platform 
              for all college technical events, bringing together students, tech 
              enthusiasts, and industry experts to explore cutting-edge 
              advancements in science, engineering, and technology.
            </p>
            <button className="secondary-button">Explore Now →</button>
          </div>
          <div className="home-image-section">
            <img src={BannerImage} alt="EventSphere" className="circular-image" />
          </div>
        </div>
      </div>
      <div className="about-section-container">
        <div className="about-background-image-container">
          <img src={AboutBackground} alt="Background" />
        </div>
        <div className="about-section-image-container">
          <img src={AboutBackgroundImage} alt="Clock Tower" className="circular-image" />
        </div>
        <div className="about-section-text-container">
          <p className="primary-heading">About</p>
          <p className="primary-text">Sri Sivasubramaniya Nadar (SSN), founded by Mr. Shiv Nadar, Founder
          and Chairman Emeritus, HCL Technologies, stands out as a premier
          center of higher learning with a mission of pursuing excellence in
          education and research. The institutions, with their diverse and
          dynamic community of students offer a distinctive combination of some
          of the finest graduate, undergraduate and research programs,
          accomplished faculty, world-class facilities, and a residential
          campus situated in sprawling 230 acres of sylvan surroundings.</p>
          <div className="about-buttons-container">
  <button className="secondary-button">Learn More</button>
  <a
    href="https://www.youtube.com/watch?v=0h0uW0HGViE&t=32s"
    target="_blank"
    rel="noopener noreferrer"
    className="watch-video-button"
  >
    <span className="play-icon">▶</span> Watch Video
  </a>
</div>
        </div>
      </div>
      <div className="contact-page-wrapper">
        <h1 className="primary-heading">Have a Question?</h1>
        <div className="contact-form-container">
          <input
            type="text"
            placeholder="yourid@gmail.com"
            value={contactEmail}
            onChange={(e) => setContactEmail(e.target.value)}
          />
          <button className="secondary-button" onClick={handleEmailSubmit}>Submit</button>
        </div>
      </div>
      <div className="footer-wrapper">
        <div className="footer-section-one">
          <div className="footer-logo-container">
            <img src={Logo} alt="Logo" />
          </div>
          <div className="footer-icons">
  <a
    href="https://x.com/ssninstitutions"
    target="_blank"
    rel="noopener noreferrer"
    className="footer-icon"
  >
    <i className="bi bi-twitter"></i>
  </a>

  <a
    href="https://www.facebook.com/SSNInstitution/"
    target="_blank"
    rel="noopener noreferrer"
    className="footer-icon"
  >
    <i className="bi bi-facebook"></i>
  </a>

  <a
    href="https://www.instagram.com/ssninstitutions/?hl=en"
    target="_blank"
    rel="noopener noreferrer"
    className="footer-icon"
  >
    <i className="bi bi-instagram"></i>
  </a>

  <a
    href="https://in.linkedin.com/company/ssn-institutions-chennai-india"
    target="_blank"
    rel="noopener noreferrer"
    className="footer-icon"
  >
    <i className="bi bi-linkedin"></i>
  </a>
</div>
        </div>
        <div className="footer-section-two">
          <div className="footer-section-columns">
            <span>Help</span>
            <span>Share</span>
            <span>Work</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;