import React from 'react';
import { Navigate } from 'react-router-dom';
import { UserAuth } from './contexts/AuthContext';

const ProtectedRoute = ({ children }) => {
  const {currentUser} = UserAuth();
  console.log('User have Currently:', currentUser);
  if(!currentUser){
    return <Navigate to='/' />
  }
return children;
}

export default ProtectedRoute
