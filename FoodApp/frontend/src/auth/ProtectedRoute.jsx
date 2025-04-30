import { useAuth } from "./AuthContext";
import { Navigate } from "react-router-dom";

function ProtectedRoute({ children, allowedRole }) {
  const { auth } = useAuth();

  // 1. Loading state
  if (auth === null) {
    
    return <Navigate to={`/${allowedRole}/login`} />; // or a fancy spinner
  }

  // 2. Not logged in
  if (!auth?.isLoggedIn) {
    return <Navigate to={`/${allowedRole}/login`} replace />;
  }

  // 3. Logged in but wrong role
  if (allowedRole && auth?.role !== allowedRole) {
    return <Navigate to={`/${auth.role}/dashboard`} replace />;
  }

  return children;
}

export default ProtectedRoute;
