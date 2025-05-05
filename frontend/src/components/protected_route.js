import React from "react";

const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem("jwtToken");

  if (!token) {
    return <h1>Unauthorized</h1>;
  }

  return children;
};

export default ProtectedRoute;

// children -> Always use "children" as prop to render the child components inside the parent component.
