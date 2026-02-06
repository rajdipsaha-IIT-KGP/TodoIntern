import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Home from "./Components/Home";
import Login from "./Components/Login";
import Signup from "./Components/Signup";
import ProtectedRoute from "./Components/ProtectedRoute";
import { useAuth } from "./context/AuthContext";

const App = () => {
  const { isAuth, loading } = useAuth();

  if (loading) {
    return (
      <h2 className="flex items-center justify-center min-h-screen text-4xl">
        checking authentication...
      </h2>
    );
  }

  return (
    <BrowserRouter>
      <Routes>
        
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />

       
        <Route
          path="/login"
          element={<Login />}
        />

        <Route
          path="/signup"
          element={ <Signup />}
        />

      
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
