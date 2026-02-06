import React from "react";
import ReactDOM from "react-dom/client";

import { AuthProvider } from "./context/AuthContext";
import { Toaster } from "react-hot-toast";
import './index.css'
import App from './App.jsx'
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthProvider>
      <App />
      <Toaster position="top-right" reverseOrder={false} />
    </AuthProvider>
  </React.StrictMode>
);
