  // import React, { useEffect, useState } from "react";
  // import { collection, getDocs } from "firebase/firestore";
  // import { db } from "./firebase";
  // import { jsPDF } from "jspdf";
  // import autoTable from "jspdf-autotable";
  // import { saveAs } from "file-saver";

  // import { listCollections } from "firebase/firestore";
  // import {
  //   BarChart,
  //   Bar,
  //   PieChart,
  //   Pie,
  //   Cell,
  //   XAxis,
  //   YAxis,
  //   Tooltip,
  //   ResponsiveContainer,
  // } from "recharts";
  // import { motion, AnimatePresence } from "framer-motion";
  // import "./EventAnalytics.css";

  // const COLORS = ["#6366f1", "#f472b6", "#facc15", "#2dd4bf", "#60a5fa", "#a78bfa", "#fb923c", "#4ade80", "#f87171", "#22d3ee"];

  // const EventAnalytics = () => {
  //   const [eventCollections, setEventCollections] = useState([]);
  //   const [analytics, setAnalytics] = useState({});
  //   const [loading, setLoading] = useState(true);
  //   const [selectedEvent, setSelectedEvent] = useState("");
  //   const [exportFormat, setExportFormat] = useState(null);
  //   const [darkMode, setDarkMode] = useState(false);

  //   useEffect(() => {
  //     const fetchEventCollections = async () => {
  //       setLoading(true);
  //       try {
  //         const hardcodedNames = [
  //           "Registrations_Creative_Writing_&_Storytelling",
  //           "Registrations_Digital_Art_&_Illustration",
  //           "Registrations_Entrepreneurship_&_Startups",
  //           "Registrations_Music_Production_101",
  //           "Registrations_Photography_&_Editing",
  //           "Registrations_Rohith_varshighan",
  //           "Registrations_Wildlife_Conservation_Awareness"
  //         ];
    
  //         const filteredCollections = [];
    
  //         for (const collName of hardcodedNames) {
  //           const docsSnap = await getDocs(collection(db, collName));
  //           if (!docsSnap.empty) {
  //             const displayName = collName
  //               .replace("Registrations_", "")
  //               .replace(/_/g, " ")
  //               .trim();
  //             filteredCollections.push({ id: collName, displayName });
  //           }
  //         }
    
  //         filteredCollections.sort((a, b) => a.displayName.localeCompare(b.displayName));
  //         setEventCollections(filteredCollections);
    
  //         if (filteredCollections.length > 0) {
  //           setSelectedEvent(filteredCollections[0].id);
  //         }
  //       } catch (error) {
  //         console.error("Error fetching collections:", error);
  //       } finally {
  //         setLoading(false);
  //       }
  //     };
  //     fetchEventCollections();
  //   }, []);

  //   // useEffect(() => {
  //   //   const fetchEventCollections = async () => {
  //   //     setLoading(true);
  //   //     try {
  //   //       const eventsSnapshot = await getDocs(collection(db, "events"));
  //   //       const publishedEvents = eventsSnapshot.docs
  //   //         .map(doc => doc.data())
  //   //         .filter(event => event.status === "published");
    
  //   //       const dynamicCollectionNames = publishedEvents.map(event => ({
  //   //         id: `Registrations_${event.title.replace(/\s+/g, "_")}`,
  //   //         displayName: event.title,
  //   //       }));
    
  //   //       const validCollections = [];
  //   //       console.log("🎯 Dropdown Options (Valid Collections):");
    
  //   //       for (const { id, displayName } of dynamicCollectionNames) {
  //   //         const docsSnap = await getDocs(collection(db, id));
  //   //         if (!docsSnap.empty) {
  //   //           validCollections.push({ id, displayName });
  //   //         }
  //   //       }
    
  //   //       validCollections.sort((a, b) => a.displayName.localeCompare(b.displayName));
  //   //       console.log("🎯 Dropdown Options (Valid Collections):", validCollections);
  //   //       setEventCollections(validCollections);
    
  //   //       if (validCollections.length > 0) {
  //   //         setSelectedEvent(validCollections[0].id);
  //   //       }
  //   //     } catch (error) {
  //   //       console.error("Error fetching events/collections:", error);
  //   //     } finally {
  //   //       setLoading(false);
  //   //     }
  //   //   };
    
  //   //   fetchEventCollections();
  //   // }, []);
    
    
    
  //   useEffect(() => {
  //     const fetchEventAnalytics = async () => {
  //       if (!selectedEvent) return;
  //       setLoading(true);
  //       try {
  //         const registrationsSnap = await getDocs(collection(db, selectedEvent));
  //         const eventData = { total: 0, byYear: {}, byDept: {}, byRole: {}, byCollege: {} };
          
  //         registrationsSnap.forEach((doc) => {
  //           const reg = doc.data();
  //           const year = reg.year || "Not Specified";
  //           const dept = reg.dept || "Not Specified";
  //           const role = reg.role || "Not Specified";
  //           const college = reg.college || "Not Specified";
            
  //           eventData.total += 1;
  //           eventData.byYear[year] = (eventData.byYear[year] || 0) + 1;
  //           eventData.byDept[dept] = (eventData.byDept[dept] || 0) + 1;
  //           eventData.byRole[role] = (eventData.byRole[role] || 0) + 1;
  //           eventData.byCollege[college] = (eventData.byCollege[college] || 0) + 1;
  //         });
          
  //         setAnalytics({ [selectedEvent]: eventData });
  //       } catch (error) {
  //         console.error("Error fetching event analytics:", error);
  //       } finally {
  //         setLoading(false);
  //       }
  //     };
  //     fetchEventAnalytics();
  //   }, [selectedEvent]);

  //   const getEventDisplayName = (eventId) => {
  //     const event = eventCollections.find(e => e.id === eventId);
  //     return event ? event.displayName : eventId;
  //   };

  //   const exportAnalytics = (format) => {
  //     if (!selectedEvent || !analytics[selectedEvent]) {
  //       alert("No data available to export.");
  //       return;
  //     }
      
  //     const eventName = getEventDisplayName(selectedEvent);
  //     const event = analytics[selectedEvent];
      
  //     if (format === "pdf") {
  //       const doc = new jsPDF();
  //       doc.setFontSize(24);
  //       doc.setTextColor(99, 102, 241);
  //       doc.text(`${eventName}`, 20, 20);
  //       doc.setFontSize(12);
  //       doc.setTextColor(75, 85, 99);
  //       doc.text(`Total Registrations: ${event.total}`, 20, 30);
        
  //       let yPosition = 40;
  //       const addTable = (title, data, startY) => {
  //         if (Object.keys(data).length > 0) {
  //           doc.setFontSize(16);
  //           doc.setTextColor(17, 24, 39);
  //           doc.text(title, 20, startY);
  //           const rows = Object.entries(data).map(([key, value]) => [key, value]);
  //           autoTable(doc, {
  //             head: [[title.split(" by ")[1], "Count"]],
  //             body: rows,
  //             startY: startY + 10,
  //             styles: { fontSize: 10, cellPadding: 3, textColor: [75, 85, 99] },
  //             headStyles: { fillColor: [99, 102, 241], textColor: 255 },
  //           });
  //           return doc.lastAutoTable.finalY + 15;
  //         }
  //         return startY;
  //       };
        
  //       yPosition = addTable("Registrations by Role", event.byRole, yPosition);
  //       yPosition = addTable("Registrations by Year", event.byYear, yPosition);
  //       yPosition = addTable("Registrations by Department", event.byDept, yPosition);
  //       addTable("Registrations by College", event.byCollege, yPosition);
        
  //       doc.save(`${eventName}_Analytics.pdf`);
  //     } else {
  //       let csvContent = `Event: ${eventName}\r\nTotal Registrations: ${event.total}\r\n\r\n`;
  //       const addCSVSection = (title, data) => {
  //         csvContent += `${title.toUpperCase()}\r\nCategory,Count\r\n`;
  //         Object.entries(data).forEach(([key, count]) => csvContent += `${key},${count}\r\n`);
  //         csvContent += "\r\n";
  //       };
        
  //       addCSVSection("Registrations by Role", event.byRole);
  //       addCSVSection("Registrations by Year", event.byYear);
  //       addCSVSection("Registrations by Department", event.byDept);
  //       addCSVSection("Registrations by College", event.byCollege);
        
  //       const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8" });
  //       saveAs(blob, `${eventName}_Analytics.csv`);
  //     }
  //     setExportFormat(null);
  //   };

  //   const renderChartPairFrame = (eventName, stats, type1, data1, desc1, type2, data2, desc2) => {
  //     const chartData1 = data1 ? Object.entries(data1).map(([key, value]) => ({ name: key || "Undefined", value: value || 0 })).sort((a, b) => b.value - a.value) : [];
  //     const chartData2 = data2 ? Object.entries(data2).map(([key, value]) => ({ name: key || "Undefined", value: value || 0 })).sort((a, b) => b.value - a.value) : [];

  //     return (
  //       <motion.div
  //         initial={{ opacity: 0, y: 20 }}
  //         animate={{ opacity: 1, y: 0 }}
  //         className="chart-frame"
  //       >
  //         <div className="chart-pair-container">
  //           <div className="chart-section">
  //             <h3 className="chart-title">{type1}</h3>
  //             {chartData1.length === 0 ? (
  //               <p className="chart-no-data">No data available</p>
  //             ) : (
  //               <>
  //                 <p className="chart-description">{desc1}</p>
  //                 <div className="chart-grid">
  //                   <div className="chart-container">
  //                     <h4 className="chart-subtitle">Bar Chart</h4>
  //                     <ResponsiveContainer width="100%" height={200}>
  //                       <BarChart data={chartData1}>
  //                         <XAxis dataKey="name" tick={{ fontSize: 12 }} />
  //                         <YAxis />
  //                         <Tooltip contentStyle={{ borderRadius: "8px", border: "none", boxShadow: "0 4px 12px rgba(0,0,0,0.15)" }} />
  //                         <Bar dataKey="value" fill="#6366f1" radius={[6, 6, 0, 0]} />
  //                       </BarChart>
  //                     </ResponsiveContainer>
  //                   </div>
  //                   <div className="chart-container">
  //                     <h4 className="chart-subtitle">Pie Chart</h4>
  //                     <ResponsiveContainer width="100%" height={200}>
  //                       <PieChart>
  //                         <Pie
  //                           data={chartData1}
  //                           dataKey="value"
  //                           nameKey="name"
  //                           outerRadius={80}
  //                           label={({ percent }) => `${(percent * 100).toFixed(0)}%`}
  //                           labelLine={true}
  //                         >
  //                           {chartData1.map((entry, index) => (
  //                             <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
  //                           ))}
  //                         </Pie>
  //                         <Tooltip contentStyle={{ borderRadius: "8px", border: "none", boxShadow: "0 4px 12px rgba(0,0,0,0.15)" }} />
  //                       </PieChart>
  //                     </ResponsiveContainer>
  //                   </div>
  //                 </div>
  //                 <div className="chart-total">Total: {chartData1.reduce((sum, item) => sum + item.value, 0)}</div>
  //               </>
  //             )}
  //           </div>
  //           <div className="chart-section">
  //             <h3 className="chart-title">{type2}</h3>
  //             {chartData2.length === 0 ? (
  //               <p className="chart-no-data">No data available</p>
  //             ) : (
  //               <>
  //                 <p className="chart-description">{desc2}</p>
  //                 <div className="chart-grid">
  //                   <div className="chart-container">
  //                     <h4 className="chart-subtitle">Bar Chart</h4>
  //                     <ResponsiveContainer width="100%" height={200}>
  //                       <BarChart data={chartData2}>
  //                         <XAxis dataKey="name" tick={{ fontSize: 12 }} />
  //                         <YAxis />
  //                         <Tooltip contentStyle={{ borderRadius: "8px", border: "none", boxShadow: "0 4px 12px rgba(0,0,0,0.15)" }} />
  //                         <Bar dataKey="value" fill="#6366f1" radius={[6, 6, 0, 0]} />
  //                       </BarChart>
  //                     </ResponsiveContainer>
  //                   </div>
  //                   <div className="chart-container">
  //                     <h4 className="chart-subtitle">Pie Chart</h4>
  //                     <ResponsiveContainer width="100%" height={200}>
  //                       <PieChart>
  //                         <Pie
  //                           data={chartData2}
  //                           dataKey="value"
  //                           nameKey="name"
  //                           outerRadius={80}
  //                           label={({ percent }) => `${(percent * 100).toFixed(0)}%`}
  //                           labelLine={true}
  //                         >
  //                           {chartData2.map((entry, index) => (
  //                             <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
  //                           ))}
  //                         </Pie>
  //                         <Tooltip contentStyle={{ borderRadius: "8px", border: "none", boxShadow: "0 4px 12px rgba(0,0,0,0.15)" }} />
  //                       </PieChart>
  //                     </ResponsiveContainer>
  //                   </div>
  //                 </div>
  //                 <div className="chart-total">Total: {chartData2.reduce((sum, item) => sum + item.value, 0)}</div>
  //               </>
  //             )}
  //           </div>
  //         </div>
  //       </motion.div>
  //     );
  //   };

  //   const displayName = selectedEvent ? getEventDisplayName(selectedEvent) : "Select an Event";

  //   return (
  //     <div className={`app-container ${darkMode ? "dark-mode" : ""}`}>
  //       <motion.div
  //         initial={{ opacity: 0, y: -20 }}
  //         animate={{ opacity: 1, y: 0 }}
  //         className="header-frame"
  //       >
  //         <h1 className="header-title">Event Analytics Dashboard</h1>
  //         <p className="header-subtitle">Gain actionable insights from your event registrations</p>
  //         <button onClick={() => setDarkMode(!darkMode)} className="dark-mode-toggle">
  //           {darkMode ? "☀️" : "🌙"}
  //         </button>
  //       </motion.div>

  //       <motion.div
  //         initial={{ opacity: 0 }}
  //         animate={{ opacity: 1 }}
  //         className="selection-frame"
  //       >
  //         <div className="selection-container">
  //           <div className="selection-input">
  //             <label className="selection-label">Event Selection</label>
  //             <select
  //               className="selection-dropdown"
  //               value={selectedEvent}
  //               onChange={(e) => setSelectedEvent(e.target.value)}
  //             >
  //               <option value="">Select an Event</option>
  //               {eventCollections.map((event) => (
  //                 <option key={event.id} value={event.id}>
  //                   {event.displayName}
  //                 </option>
  //               ))}
  //             </select>
  //           </div>
  //           {selectedEvent && analytics[selectedEvent] && (
  //             <div className="export-wrapper">
  //               <motion.button
  //                 whileHover={{ scale: 1.05 }}
  //                 whileTap={{ scale: 0.95 }}
  //                 onClick={() => setExportFormat(exportFormat ? null : "open")}
  //                 className="export-button"
  //               >
  //                 <span className="export-icon">↓</span> Export
  //               </motion.button>
  //               <AnimatePresence>
  //                 {exportFormat === "open" && (
  //                   <motion.div
  //                     initial={{ opacity: 0, y: -10 }}
  //                     animate={{ opacity: 1, y: 0 }}
  //                     exit={{ opacity: 0, y: -10 }}
  //                     className="export-dropdown"
  //                   >
  //                     <button onClick={() => exportAnalytics("pdf")} className="export-option">
  //                       Export as PDF
  //                     </button>
  //                     <button onClick={() => exportAnalytics("csv")} className="export-option">
  //                       Export as CSV
  //                     </button>
  //                   </motion.div>
  //                 )}
  //               </AnimatePresence>
  //             </div>
  //           )}
  //         </div>
  //       </motion.div>

  //       {loading ? (
  //         <div className="loading-frame">
  //           {[...Array(3)].map((_, i) => (
  //             <div key={i} className="skeleton-card"></div>
  //           ))}
  //         </div>
  //       ) : !selectedEvent ? (
  //         <motion.div
  //           initial={{ opacity: 0 }}
  //           animate={{ opacity: 1 }}
  //           className="message-frame"
  //         >
  //           <h3 className="message-title">Select an Event</h3>
  //           <p className="message-text">Choose an event to explore its analytics</p>
  //         </motion.div>
  //       ) : !analytics[selectedEvent] ? (
  //         <motion.div
  //           initial={{ opacity: 0 }}
  //           animate={{ opacity: 1 }}
  //           className="message-frame"
  //         >
  //           <h3 className="message-title">No Data Available</h3>
  //           <p className="message-text">No registrations found for this event</p>
  //         </motion.div>
  //       ) : (
  //         <div className="analytics-frame">
  //           <motion.div
  //             initial={{ opacity: 0 }}
  //             animate={{ opacity: 1 }}
  //             className="summary-frame"
  //           >
  //             <div className="summary-header">
  //               <h2 className="summary-title">{displayName}</h2>
  //               <div className="summary-total">Total: {analytics[selectedEvent].total}</div>
  //             </div>
  //             <div className="summary-grid">
  //               {["Registrations", "Roles", "Departments", "Colleges"].map((label, index) => (
  //                 <motion.div
  //                   key={label}
  //                   initial={{ opacity: 0, scale: 0.95 }}
  //                   animate={{ opacity: 1, scale: 1 }}
  //                   transition={{ delay: index * 0.1 }}
  //                   className="summary-item"
  //                 >
  //                   <div className="summary-label">{label}</div>
  //                   <div className="summary-value">
  //                     {label === "Registrations" ? analytics[selectedEvent].total :
  //                     label === "Roles" ? Object.keys(analytics[selectedEvent].byRole).length :
  //                     label === "Departments" ? Object.keys(analytics[selectedEvent].byDept).length :
  //                     Object.keys(analytics[selectedEvent].byCollege).length}
  //                   </div>
  //                 </motion.div>
  //               ))}
  //             </div>
  //           </motion.div>

  //           {renderChartPairFrame(
  //             displayName,
  //             analytics[selectedEvent],
  //             "Registrations by Role",
  //             analytics[selectedEvent].byRole,
  //             "Distribution of participant roles such as students, faculty, or professionals.",
  //             "Registrations by Year",
  //             analytics[selectedEvent].byYear,
  //             "Breakdown of participants by their academic year."
  //           )}
  //           {renderChartPairFrame(
  //             displayName,
  //             analytics[selectedEvent],
  //             "Registrations by Department",
  //             analytics[selectedEvent].byDept,
  //             "Participation spread across different departments.",
  //             "Registrations by College",
  //             analytics[selectedEvent].byCollege,
  //             "Representation of registrations from various colleges."
  //           )}
  //         </div>
  //       )}

  //       <motion.div
  //         initial={{ opacity: 0 }}
  //         animate={{ opacity: 1 }}
  //         className="footer-frame"
  //       >
  //         <footer className="footer">© 2025 Event Analytics Dashboard • Crafted with ❤️</footer>
  //       </motion.div>
  //     </div>
  //   );
  // };

  // export default EventAnalytics;


import React, { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "./firebase";
import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";
import { saveAs } from "file-saver";
import {
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { motion, AnimatePresence } from "framer-motion";
import "./EventAnalytics.css";

const COLORS = ["#6366f1", "#f472b6", "#facc15", "#2dd4bf", "#60a5fa", "#a78bfa", "#fb923c", "#4ade80", "#f87171", "#22d3ee"];

const EventAnalytics = () => {
  const [eventCollections, setEventCollections] = useState([]);
  const [analytics, setAnalytics] = useState({});
  const [loading, setLoading] = useState(true);
  const [selectedEvent, setSelectedEvent] = useState("");
  const [exportFormat, setExportFormat] = useState(null);
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const fetchEventCollections = async () => {
      setLoading(true);
      try {
        const eventsSnapshot = await getDocs(collection(db, "events"));
        const publishedEvents = eventsSnapshot.docs
          .map(doc => doc.data())
          .filter(event => event.status === "published");

        const dynamicCollectionNames = publishedEvents.map(event => ({
          id: `Registrations_${event.title.replace(/\s+/g, "_")}`,
          displayName: event.title,
        }));

        const validCollections = [];
        // console.log("🎯 Dropdown Options (Valid Collections):",validCollections);

        for (const { id, displayName } of dynamicCollectionNames) {
          const docsSnap = await getDocs(collection(db, id));
          if (!docsSnap.empty) {
            validCollections.push({ id, displayName });
          }
        }

        validCollections.sort((a, b) => a.displayName.localeCompare(b.displayName));
        // console.log("🎯 Dropdown Options (Valid Collections):", validCollections);
        setEventCollections(validCollections);

        if (validCollections.length > 0) {
          setSelectedEvent(validCollections[0].id);
        }
      } catch (error) {
        console.error("Error fetching events/collections:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchEventCollections();
  }, []);

  useEffect(() => {
    const fetchEventAnalytics = async () => {
      if (!selectedEvent) return;
      setLoading(true);
      try {
        const registrationsSnap = await getDocs(collection(db, selectedEvent));
        const eventData = { total: 0, byYear: {}, byDept: {}, byRole: {}, byCollege: {} };
        
        registrationsSnap.forEach((doc) => {
          const reg = doc.data();
          const year = reg.year || "Not Specified";
          const dept = reg.dept || "Not Specified";
          const role = reg.role || "Not Specified";
          const college = reg.college || "Not Specified";
          
          eventData.total += 1;
          eventData.byYear[year] = (eventData.byYear[year] || 0) + 1;
          eventData.byDept[dept] = (eventData.byDept[dept] || 0) + 1;
          eventData.byRole[role] = (eventData.byRole[role] || 0) + 1;
          eventData.byCollege[college] = (eventData.byCollege[college] || 0) + 1;
        });
        
        setAnalytics({ [selectedEvent]: eventData });
      } catch (error) {
        console.error("Error fetching event analytics:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchEventAnalytics();
  }, [selectedEvent]);

  const getEventDisplayName = (eventId) => {
    const event = eventCollections.find(e => e.id === eventId);
    return event ? event.displayName : eventId;
  };

  const exportAnalytics = (format) => {
    if (!selectedEvent || !analytics[selectedEvent]) {
      alert("No data available to export.");
      return;
    }
    
    const eventName = getEventDisplayName(selectedEvent);
    const event = analytics[selectedEvent];
    
    if (format === "pdf") {
      const doc = new jsPDF();
      doc.setFontSize(24);
      doc.setTextColor(99, 102, 241);
      doc.text(`${eventName}`, 20, 20);
      doc.setFontSize(12);
      doc.setTextColor(75, 85, 99);
      doc.text(`Total Registrations: ${event.total}`, 20, 30);
      
      let yPosition = 40;
      const addTable = (title, data, startY) => {
        if (Object.keys(data).length > 0) {
          doc.setFontSize(16);
          doc.setTextColor(17, 24, 39);
          doc.text(title, 20, startY);
          const rows = Object.entries(data).map(([key, value]) => [key, value]);
          autoTable(doc, {
            head: [[title.split(" by ")[1], "Count"]],
            body: rows,
            startY: startY + 10,
            styles: { fontSize: 10, cellPadding: 3, textColor: [75, 85, 99] },
            headStyles: { fillColor: [99, 102, 241], textColor: 255 },
          });
          return doc.lastAutoTable.finalY + 15;
        }
        return startY;
      };
      
      yPosition = addTable("Registrations by Role", event.byRole, yPosition);
      yPosition = addTable("Registrations by Year", event.byYear, yPosition);
      yPosition = addTable("Registrations by Department", event.byDept, yPosition);
      addTable("Registrations by College", event.byCollege, yPosition);
      
      doc.save(`${eventName}_Analytics.pdf`);
    } else {
      let csvContent = `Event: ${eventName}\r\nTotal Registrations: ${event.total}\r\n\r\n`;
      const addCSVSection = (title, data) => {
        csvContent += `${title.toUpperCase()}\r\nCategory,Count\r\n`;
        Object.entries(data).forEach(([key, count]) => csvContent += `${key},${count}\r\n`);
        csvContent += "\r\n";
      };
      
      addCSVSection("Registrations by Role", event.byRole);
      addCSVSection("Registrations by Year", event.byYear);
      addCSVSection("Registrations by Department", event.byDept);
      addCSVSection("Registrations by College", event.byCollege);
      
      const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8" });
      saveAs(blob, `${eventName}_Analytics.csv`);
    }
    setExportFormat(null);
  };

  const renderChartPairFrame = (eventName, stats, type1, data1, desc1, type2, data2, desc2) => {
    const chartData1 = data1 ? Object.entries(data1).map(([key, value]) => ({ name: key || "Undefined", value: value || 0 })).sort((a, b) => b.value - a.value) : [];
    const chartData2 = data2 ? Object.entries(data2).map(([key, value]) => ({ name: key || "Undefined", value: value || 0 })).sort((a, b) => b.value - a.value) : [];

    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="chart-frame"
      >
        <div className="chart-pair-container">
          <div className="chart-section">
            <h3 className="chart-title">{type1}</h3>
            {chartData1.length === 0 ? (
              <p className="chart-no-data">No data available</p>
            ) : (
              <>
                <p className="chart-description">{desc1}</p>
                <div className="chart-grid">
                  <div className="chart-container">
                    <h4 className="chart-subtitle">Bar Chart</h4>
                    <ResponsiveContainer width="100%" height={200}>
                      <BarChart data={chartData1}>
                        <XAxis dataKey="name" tick={{ fontSize: 12 }} />
                        <YAxis />
                        <Tooltip contentStyle={{ borderRadius: "8px", border: "none", boxShadow: "0 4px 12px rgba(0,0,0,0.15)" }} />
                        <Bar dataKey="value" fill="#6366f1" radius={[6, 6, 0, 0]} />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                  <div className="chart-container">
                    <h4 className="chart-subtitle">Pie Chart</h4>
                    <ResponsiveContainer width="100%" height={200}>
                      <PieChart>
                        <Pie
                          data={chartData1}
                          dataKey="value"
                          nameKey="name"
                          outerRadius={80}
                          label={({ percent }) => `${(percent * 100).toFixed(0)}%`}
                          labelLine={true}
                        >
                          {chartData1.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                          ))}
                        </Pie>
                        <Tooltip contentStyle={{ borderRadius: "8px", border: "none", boxShadow: "0 4px 12px rgba(0,0,0,0.15)" }} />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                </div>
                <div className="chart-total">Total: {chartData1.reduce((sum, item) => sum + item.value, 0)}</div>
              </>
            )}
          </div>
          <div className="chart-section">
            <h3 className="chart-title">{type2}</h3>
            {chartData2.length === 0 ? (
              <p className="chart-no-data">No data available</p>
            ) : (
              <>
                <p className="chart-description">{desc2}</p>
                <div className="chart-grid">
                  <div className="chart-container">
                    <h4 className="chart-subtitle">Bar Chart</h4>
                    <ResponsiveContainer width="100%" height={200}>
                      <BarChart data={chartData2}>
                        <XAxis dataKey="name" tick={{ fontSize: 12 }} />
                        <YAxis />
                        <Tooltip contentStyle={{ borderRadius: "8px", border: "none", boxShadow: "0 4px 12px rgba(0,0,0,0.15)" }} />
                        <Bar dataKey="value" fill="#6366f1" radius={[6, 6, 0, 0]} />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                  <div className="chart-container">
                    <h4 className="chart-subtitle">Pie Chart</h4>
                    <ResponsiveContainer width="100%" height={200}>
                      <PieChart>
                        <Pie
                          data={chartData2}
                          dataKey="value"
                          nameName="name"
                          outerRadius={80}
                          label={({ percent }) => `${(percent * 100).toFixed(0)}%`}
                          labelLine={true}
                        >
                          {chartData2.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                          ))}
                        </Pie>
                        <Tooltip contentStyle={{ borderRadius: "8px", border: "none", boxShadow: "0 4px 12px rgba(0,0,0,0.15)" }} />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                </div>
                <div className="chart-total">Total: {chartData2.reduce((sum, item) => sum + item.value, 0)}</div>
              </>
            )}
          </div>
        </div>
      </motion.div>
    );
  };

  const displayName = selectedEvent ? getEventDisplayName(selectedEvent) : "Select an Event";

  return (
    <div className={`app-container ${darkMode ? "dark-mode" : ""}`}>
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="header-frame"
      >
        <h1 className="header-title">Event Analytics Dashboard</h1>
        <p className="header-subtitle">Gain actionable insights from your event registrations</p>
        <button onClick={() => setDarkMode(!darkMode)} className="dark-mode-toggle">
          {darkMode ? "☀️" : "🌙"}
        </button>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="selection-frame"
      >
        <div className="selection-container">
          <div className="selection-input">
            <label className="selection-label">Event Selection</label>
            <select
              className="selection-dropdown"
              value={selectedEvent}
              onChange={(e) => setSelectedEvent(e.target.value)}
            >
              <option value="">Select an Event</option>
              {eventCollections.map((event) => (
                <option key={event.id} value={event.id}>
                  {event.displayName}
                </option>
              ))}
            </select>
          </div>
          {selectedEvent && analytics[selectedEvent] && (
            <div className="export-wrapper">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setExportFormat(exportFormat ? null : "open")}
                className="export-button"
              >
                <span className="export-icon">↓</span> Export
              </motion.button>
              <AnimatePresence>
                {exportFormat === "open" && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="export-dropdown"
                  >
                    <button onClick={() => exportAnalytics("pdf")} className="export  export-option">
                      Export as PDF
                    </button>
                    <button onClick={() => exportAnalytics("csv")} className="export-option">
                      Export as CSV
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          )}
        </div>
      </motion.div>

      {loading ? (
        <div className="loading-frame">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="skeleton-card"></div>
          ))}
        </div>
      ) : !selectedEvent ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="message-frame"
        >
          <h3 className="message-title">Select an Event</h3>
          <p className="message-text">Choose an event to explore its analytics</p>
        </motion.div>
      ) : !analytics[selectedEvent] ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="message-frame"
        >
          <h3 className="message-title">No Data Available</h3>
          <p className="message-text">No registrations found for this event</p>
        </motion.div>
      ) : (
        <div className="analytics-frame">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="summary-frame"
          >
            <div className="summary-header">
              <h2 className="summary-title">{displayName}</h2>
              <div className="summary-total">Total: {analytics[selectedEvent].total}</div>
            </div>
            <div className="summary-grid">
              {["Registrations", "Roles", "Departments", "Colleges"].map((label, index) => (
                <motion.div
                  key={label}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.1 }}
                  className="summary-item"
                >
                  <div className="summary-label">{label}</div>
                  <div className="summary-value">
                    {label === "Registrations" ? analytics[selectedEvent].total :
                    label === "Roles" ? Object.keys(analytics[selectedEvent].byRole).length :
                    label === "Departments" ? Object.keys(analytics[selectedEvent].byDept).length :
                    Object.keys(analytics[selectedEvent].byCollege).length}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {renderChartPairFrame(
            displayName,
            analytics[selectedEvent],
            "Registrations by Role",
            analytics[selectedEvent].byRole,
            "Distribution of participant roles such as students, faculty, or professionals.",
            "Registrations by Year",
            analytics[selectedEvent].byYear,
            "Breakdown of participants by their academic year."
          )}
          {renderChartPairFrame(
            displayName,
            analytics[selectedEvent],
            "Registrations by Department",
            analytics[selectedEvent].byDept,
            "Participation spread across different departments.",
            "Registrations by College",
            analytics[selectedEvent].byCollege,
            "Representation of registrations from various colleges."
          )}
        </div>
      )}

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="footer-frame"
      >
        <footer className="footer"> 2025 Event Analytics Dashboard </footer>
      </motion.div>
    </div>
  );
};

export default EventAnalytics;