import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function ProtectedRoute({ role }) {
  const { user } = useAuth();

  // Check if user exists in localStorage as a fallback
  const getUserFromStorage = () => {
    try {
      const userStr = localStorage.getItem('user');
      return userStr ? JSON.parse(userStr) : null;
    } catch (error) {
      console.error('Error parsing user from localStorage:', error);
      return null;
    }
  };

  const currentUser = user || getUserFromStorage();
  const token = localStorage.getItem('token');

  // If no token exists, redirect to login
  if (!token) {
    console.log('ProtectedRoute: No token found, redirecting to login');
    return <Navigate to="/login" replace />;
  }

  // If no user exists, redirect to login
  if (!currentUser) {
    console.log('ProtectedRoute: No user found, redirecting to login');
    return <Navigate to="/login" replace />;
  }

  // If role doesn't match, redirect to login
  if (role && currentUser.role !== role) {
    console.log(`ProtectedRoute: Role mismatch. Expected ${role}, got ${currentUser.role}`);
    return <Navigate to="/login" replace />;
  }

  console.log(`ProtectedRoute: Access granted for ${currentUser.role}`);
  return <Outlet />;
}