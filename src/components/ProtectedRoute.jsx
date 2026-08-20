import { Navigate, useLocation } from 'react-router-dom';
import { getAuth } from '../auth/authStorage';

function ProtectedRoute({ children, allowedRoles }) {
  const auth = getAuth();
  const location = useLocation();

  if (!auth) {
    return <Navigate to="/login" replace state={{ from: location.pathname }} />;
  }

  if (allowedRoles && !allowedRoles.includes(auth.role)) {
    if (auth.role === 'admin') {
      return <Navigate to="/admin" replace />;
    }
    return <Navigate to="/home" replace />;
  }

  return children;
}

export default ProtectedRoute;
