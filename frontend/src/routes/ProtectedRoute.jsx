import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function ProtectedRoute({ role }) {
  const { user, loading } = useAuth();

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

  // Show loading spinner while checking authentication
  if (loading) {
    return (
      <div style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: '#FFFFFF',
      }}>
        <div style={{
          width: '40px',
          height: '40px',
          border: '3px solid #E5E7EB',
          borderTopColor: '#5B73F7',
          borderRadius: '50%',
          animation: 'spin 1s linear infinite',
        }} />
        <style>{`
          @keyframes spin {
            to { transform: rotate(360deg); }
          }
        `}</style>
      </div>
    );
  }

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