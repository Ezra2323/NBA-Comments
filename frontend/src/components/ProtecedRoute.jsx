import { Navigate } from 'react-router-dom';
import { auth } from '../auth.js';

const ProtectedRoute = ({ children }) => {
  const usuario = auth.getCurrentUser();
  
  if (!usuario) {
    
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute;