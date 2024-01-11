// PrivateRoute.js
import React from 'react';
import { Navigate } from 'react-router-dom';
const PrivateRoute = ({ children}) => {
    // const isAuthenticated = useSelector((state) => state.auth.authToken !== null);
    const isAuthenticated = localStorage.getItem('token')!==null;
        
    if (isAuthenticated ) {
      return children
    }
      
    return <Navigate to="/" />
  }

export default PrivateRoute;