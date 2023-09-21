"use client";
import React, { useState, useEffect, createContext, useContext } from "react";
import { onAuthStateChanged, getAuth } from "firebase/auth";
import firebaseApp from "@/firebase/config";
import { BiLoaderAlt } from "react-icons/bi";

const auth = getAuth(firebaseApp);

export const AuthContext = createContext({});

export const useAuthContext = () => useContext(AuthContext);

export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  return (
    <AuthContext.Provider value={{ user }}>
      {loading ? (
        <div className="min-h-screen flex justify-center items-center">
          <BiLoaderAlt size="40px" className="animate-spin text-white" />
        </div>
      ) : (
        children
      )}
    </AuthContext.Provider>
  );
};
