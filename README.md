# 🎯 EventSphere – Smart Event Management Platform for Colleges

A powerful, real-time **Event Management System** designed for academic institutions to manage events, streamline approval workflows, and track registrations—all built with **React**, **Firebase**, and intelligent algorithms like **B+ Tree** and **DFS**.
🧠 Built using Agile with Jira, GitHub, and Confluence

---

## 🌟 Core Features

- 🔐 **Secure Role-Based Login** (`@ssn.edu.in` email via Firebase Auth)
- 🧑‍💼 **Admin Dashboard**
  - Approve/Reject events
  - View analytics, download PDF reports
  - Delete outdated or invalid events
- 📝 **Organizer Dashboard**
  - Create events with images, registration links
  - Track approval and registrations
- 👨‍🎓 **Student View (Guest Access)**
  - Public homepage
  - Top 3 upcoming events (via B+ Tree traversal)
  - Register using Google Forms (no login required)
- 🔔 **Email Automation**
  - Email reminders via EmailJS
- 📊 **Visual Analytics**
  - Graphs, charts (Recharts)
  - PDF reports (jsPDF)
- 🧠 **Algorithmic Intelligence**
  - **B+ Tree**: Search, sort, and suggest events
  - **DFS**: Detect scheduling/venue conflicts

---

## 🧾 Tech Stack

| Stack        | Technologies                              |
|--------------|--------------------------------------------|
| Frontend     | React, CSS, JavaScript                     |
| Backend      | Firebase Firestore, Firebase Auth, EmailJS |
| Reports      | jsPDF                                      |
| Analytics    | Recharts                                   |
| Algorithms   | B+ Tree, DFS (in `Algorithm.py`)           |
| Email Engine | EmailJS via `mail_backend/`                |

---

## 📁 Project Structure
---
<pre>```
event-management-system/
├── assets/ # UI icons, images
├── mail_backend/ # Email reminders
├── Algorithm.py # B+ Tree, DFS logic
├── event_clash_detector.py # Conflict detection logic
├── firebase_events.json # Events seed data
├── firebase_registrations.json # Registrations data
├── firebase_fetcher.js # Firestore operations
├── Admin/ # Admin CSS + JS
├── EventAnalytics/ # Charts & reports
├── EventOrganizer/ # Organizer views
├── EventOrganizerSignIn/ # Organizer login UI
├── Home/ # Homepage carousel, guest views
├── app.py # Flask or setup script
├── event_app.py # Entry script
</pre>

---

## 🚀 Setup Instructions

### 📥 Clone the Repository

```bash
git clone https://github.com/yourusername/event-management-system.git
cd event-management-system
```
# React frontend
```bash
npm install
```

# Python backend
```bash
pip install -r requirements.txt
```
🔐 Firebase Setup
---
Add your Firebase project config in firebase.js
Enable Firestore and Authentication (Email only)

▶️ Run the App
Frontend:
```bash
npm start
```
Backend:
```bash
python app.py
```
Visit http://localhost:3000

📊 Dashboards
Admin Panel	Organizer Panel	Guest Homepage
Approve/reject, analytics	Submit events, track	Carousel + registration links

💡 Algorithms in Action
Algorithm	Role
B+ Tree	Fetch 3 upcoming events for homepage carousel
DFS	Detect event clashes by date & venue

📧 Email Integration
Feature	Tool Used
Reminder Emails	EmailJS
No backend needed	Client-side JS setup via mail_backend/

📄 Sample Event Object (Firestore)
```bash
{
  "title": "TechTalk 2025",
  "date": "2025-06-15",
  "category": "Technical",
  "venue": "Auditorium A",
  "registrationLink": "https://forms.gle/eventform",
  "status": "approved"
}
```
Agile Project Workflow
---
Tool	Use Case
Jira	Sprint tracking, user stories
Confluence	Documentation & meeting notes
GitHub	Codebase management & collaboration

ScreenShots
---
![image](https://github.com/user-attachments/assets/f79b2b3e-cb2a-4f27-bf19-f0d5f183c815)
![image](https://github.com/user-attachments/assets/a0dae751-ffac-42d6-8e11-99fde13f9aa3)
![image](https://github.com/user-attachments/assets/173ebcbc-d54c-48db-b338-ac39e00ba46d)
![image](https://github.com/user-attachments/assets/1a791d46-ca96-4f32-b754-57c0ed16e259)
![image](https://github.com/user-attachments/assets/429ec49e-4289-474e-99e9-bd619651f443)
![image](https://github.com/user-attachments/assets/196fcc4a-096c-4685-9edb-acfca2d058c4)
![image](https://github.com/user-attachments/assets/e0eaac82-87b6-4055-aa20-3a669a251ad0)
![image](https://github.com/user-attachments/assets/219fc20d-da8d-4ca4-8347-2d2f8965fd00)
![image](https://github.com/user-attachments/assets/818850e4-c70a-4eeb-9587-b3f8381f76c2)
![image](https://github.com/user-attachments/assets/6fd3f203-2f97-4eb3-8a97-5c4c5b114e0d)
![image](https://github.com/user-attachments/assets/4379794e-03d5-4e8e-9d5b-8783fdb86a55)
![image](https://github.com/user-attachments/assets/0351500a-a466-45ef-9e3e-c6fa1e678933)
![image](https://github.com/user-attachments/assets/35cf4f61-3b69-42a5-b6ae-f2b3897de94c)


Contributors
---
<pre> Rijja H 
 Rohith Krishna S 
 Rohith Varshighan S 
 Saathviga B </pre>


📜 License
---
This project is licensed under the MIT License.






