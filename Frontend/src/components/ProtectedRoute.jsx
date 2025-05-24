import { Navigate } from 'react-router-dom';
import Cookies from 'js-cookie';

export const ProtectedRoute = ({ children }) => {
  const token = Cookies.get('token') || localStorage.getItem('token');
//   console.log("Auth check - Token:", token);
  
  if (!token) {
    console.log("No token found, redirecting to login");
    return <Navigate to="/login" replace />;
  }

  return children;
}; 