import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api",
});

// Interceptor->Do something before every request or after every response — automatically.”
//Request Interceptor
API.interceptors.request.use((config) => {
  //Before a request is sent to the server.
  const token = localStorage.getItem("jwtToken");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

//  Response Interceptor
// ⛔ Handle token expiration and redirect
API.interceptors.response.use(
  //After the server sends back a response.
  (response) => response,
  (error) => {
    if (
      error.response &&
      error.response.status === 401 &&
      error.response.data.message?.toLowerCase().includes("token")
    ) {
      // Clear token
      localStorage.removeItem("jwtToken");

      // Redirect to login page

      setTimeout(() => {
        window.location.href = "/login";
      }, 100);

      alert("Session expired. Please log in again.");
    }

    return Promise.reject(error);
  }
);

export default API;

//Axios library, which is used to make HTTP requests (GET, POST, PUT, DELETE) from frontend to backend.

// Request Interceptor
// What it does:
// Runs before every request is sent.
// Fetches the JWT token from localStorage.
// If token exists, adds it to the Authorization header

// | Term                           | Meaning                                            |
// | ------------------------------ | -------------------------------------------------- |
// | `interceptors.request.use`     | Hook to modify the request before it's sent        |
// | `config`                       | Contains request details like headers, method, URL |
// | `config.headers.Authorization` | Adds auth token to request headers                 |

//  Response Interceptor
// What it does:
// Runs after the server responds.
// Checks if the token is expired or invalid (401 status).
// If expired:
// Removes token from localStorage.
// Redirects user to login page after short delay.
// Shows alert to inform the user.

// | Term                              | Meaning                                              |
// | --------------------------------- | ---------------------------------------------------- |
// | `interceptors.response.use()`     | Hook to handle server's response after request completes.             |
// | `error.response.status === 401`   | Unauthorized – usually token expired or invalid      |
// | `window.location.href = "/login"` | Redirects user to login page                         |
// | `Promise.reject(error)`           | Allows error to continue to calling `.catch()` block |
