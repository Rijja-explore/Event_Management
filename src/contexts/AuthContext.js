

import React, { useContext, useEffect, useState, createContext } from "react";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../components/firebase"; // Adjust if your path is different

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const logout = () => signOut(auth); // ✅ Added logout function

  const value = { currentUser, logout }; // ✅ Included logout in context value

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
