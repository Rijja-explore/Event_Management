// firebase_fetcher.js
// This script fetches data from Firebase and saves it to a local file for Python to use

import fs from 'fs/promises';
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, getDocs } from 'firebase/firestore';

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBsBFpYLnMyfJv8SzYzKEf62dIwOp4qk8I",
  authDomain: "event-management-b5f16.firebaseapp.com",
  databaseURL: "https://event-management-b5f16-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "event-management-b5f16",
  storageBucket: "event-management-b5f16.firebasestorage.app",
  messagingSenderId: "777325040227",
  appId: "1:777325040227:web:78f0ca75bc03fa13661e56",
  measurementId: "G-WT6S7B0ZVK"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// File paths for storing the fetched data
const EVENTS_FILE = './firebase_events.json';
const REGISTRATIONS_FILE = './firebase_registrations.json';

// Function to fetch all events from Firebase
async function fetchEvents() {
  try {
    console.log("📍 Fetching events collection...");
    const eventsCollection = collection(db, 'events');
    const eventsSnapshot = await getDocs(eventsCollection);
    
    const eventsList = eventsSnapshot.docs.map(doc => {
      return { id: doc.id, ...doc.data() };
    });
    
    console.log(`📍 Fetched ${eventsList.length} events`);
    
    // Save events to file
    await fs.writeFile(EVENTS_FILE, JSON.stringify(eventsList, null, 2));
    console.log(`📍 Events saved to ${EVENTS_FILE}`);
    
    return eventsList;
  } catch (error) {
    console.error(`❌ Error fetching events: ${error.message}`);
    throw error;
  }
}

// Function to fetch all registrations from Firebase
async function fetchRegistrations() {
  try {
    console.log("📍 Fetching registrations...");
    
    // List of registration collections to fetch
    const registrationCollections = [
      "Registrations_Blockchain",
      "Registrations_Creative_Writing",
      "Registrations_Digital_Art",
      "Registrations_Drama",
      "Registrations_Entrepreneurship",
      "Registrations_Music_Production",
      "Registrations_Photography",
      "Registrations_Sycon_2026",
      "Registrations_Wildlife_Conservation"
    ];
    
    const allRegistrations = {};
    
    // Fetch data from each collection
    for (const collectionName of registrationCollections) {
      console.log(`📍 Fetching collection: ${collectionName}`);
      const registrationsRef = collection(db, collectionName);
      const snapshot = await getDocs(registrationsRef);
      
      const registrationsList = snapshot.docs.map(doc => {
        return { id: doc.id, ...doc.data() };
      });
      
      console.log(`📍 Fetched ${registrationsList.length} registrations from ${collectionName}`);
      allRegistrations[collectionName] = registrationsList;
    }
    
    // Save registrations to file
    await fs.writeFile(REGISTRATIONS_FILE, JSON.stringify(allRegistrations, null, 2));
    console.log(`📍 Registrations saved to ${REGISTRATIONS_FILE}`);
    
    return allRegistrations;
  } catch (error) {
    console.error(`❌ Error fetching registrations: ${error.message}`);
    throw error;
  }
}

// Main function to fetch all data
async function fetchAllData() {
  try {
    console.log("Starting data fetch from Firebase...");
    
    // Fetch events and registrations
    const events = await fetchEvents();
    const registrations = await fetchRegistrations();
    
    console.log("✅ All data fetched and saved successfully!");
    
    // Exit the process when done
    process.exit(0);
  } catch (error) {
    console.error(`❌ Error in fetchAllData: ${error.message}`);
    process.exit(1);
  }
}

// Run the fetch function
fetchAllData();