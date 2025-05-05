import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Register from "./components/register";
import Login from "./components/login";
import Dashboard from "./components/dashboard";
import ProtectedRoute from "./components/protected_route";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
