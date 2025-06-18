import { useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { useDispatch, useSelector } from "react-redux";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Login from "./Components/Authentication/Login";
import Register from "./Components/Authentication/Register";
import NotesDashboard from "./Components/Notes/NoteDashboard";

function App() {
  const userId = useSelector((state) => state.user.userId);

  useEffect(() => {}, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/login"
          element={userId ? <Navigate to="/dashboard" /> : <Login />}
        />
        <Route
          path="/register"
          element={userId ? <Navigate to="/dashboard" /> : <Register />}
        />
        <Route
          path="/dashboard"
          element={userId ? <NotesDashboard /> : <Navigate to="/login" />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
