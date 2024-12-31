import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";

import SignUp from "./auth/SignUp";
import Login from "./auth/Login";
import Home from "./pages/home";

import "./App.css";

function App() {
  // State to track login status using a token
  const [hasTokenIn, sethasTokenIn] = useState(() => {
    return localStorage.getItem("token") || null;
  });

  // Effect to sync token state with localStorage
  useEffect(() => {
    if (hasTokenIn) {
      localStorage.setItem("token", hasTokenIn);
    } else {
      localStorage.removeItem("token");
    }
  }, [hasTokenIn]);

  return (
    <Router>
      <Routes>
        {/* Route for login page */}
        <Route
          path="/login"
          element={
            hasTokenIn ? (
              <Navigate to="/" />
            ) : (
              <Login sethasTokenIn={sethasTokenIn} />
            )
          }
        />
        {/* Route for signup page */}
        <Route
          path="/signup"
          element={hasTokenIn ? <Navigate to="/" /> : <SignUp />}
        />
        {/* Protected route for home page */}
        <Route
          path="/"
          element={hasTokenIn ? <Home /> : <Navigate to="/login" />}
        />
        {/* Fallback route */}
        <Route
          path="*"
          element={hasTokenIn ? <Navigate to="/" /> : <Navigate to="/login" />}
        />
      </Routes>
    </Router>
  );
}

export default App;
