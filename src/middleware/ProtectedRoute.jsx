import useAuth from "../hooks/useAuth";
import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children }) {
  const { user, token, loading } = useAuth();

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!user || !token) {
    return <Navigate to="/forbidden" replace />;
  }

  return children;
}
