import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import LoginForm from './components/LoginForm';
import EventOrganizer from './components/EventOrganizer';
import EventOrganizerSignIn from './components/EventOrganizerSignIn';
import Admin from './components/Admin';
import ProtectedRoute from './components/ProtectedRoute';
import ViewEvents from './components/ViewEvents';
import Register from './components/Register';
import EventAnalytics from "./components/EventAnalytics";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/signin" element={<EventOrganizerSignIn />} />
        <Route path="/viewevents" element={<ViewEvents />} />
        <Route path="/register" element={<Register />} />
        <Route path="/analytics" element={<EventAnalytics />} />
        <Route
          path="/eventorganizer"
          element={<ProtectedRoute>
            <EventOrganizer />
          </ProtectedRoute>} />
        <Route
          path="/admin"
          element={<ProtectedRoute>
            <Admin />
          </ProtectedRoute>} />
          {/* <Route path="/admin" element={<Admin/>}/> */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;