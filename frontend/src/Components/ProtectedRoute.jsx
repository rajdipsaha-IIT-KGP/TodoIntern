import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const ProtectedRoute = ({ children }) => {
  const { isAuth, loading } = useAuth();

  if (loading) {
    return (
      <h2 className="flex items-center justify-center text-5xl">
        checking authentication...
      </h2>
    );
  }

  return isAuth ? children : <Navigate to="/login" replace />;
};

export default ProtectedRoute;
