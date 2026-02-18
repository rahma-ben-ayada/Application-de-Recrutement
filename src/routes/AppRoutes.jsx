import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from '../context/AuthContext';

import Login          from '../pages/auth/Login';
import Register       from '../pages/auth/Register';
import ForgotPassword from '../pages/auth/ForgotPassword';

import DashboardAdmin    from '../pages/admin/DashboardAdmin';
import DashboardRecruteur from '../pages/recruteur/DashboardRecruteur';
import DashboardCandidat  from '../pages/candidat/DashboardCandidat';

import ProtectedRoute from './ProtectedRoute';

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/login"           element={<Login />} />
          <Route path="/register"        element={<Register />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />

          <Route path="/admin" element={<ProtectedRoute role="admin" />}>
            <Route path="dashboard" element={<DashboardAdmin />} />
          </Route>

          <Route path="/recruteur" element={<ProtectedRoute role="recruteur" />}>
            <Route path="dashboard" element={<DashboardRecruteur />} />
          </Route>

          <Route path="/candidat" element={<ProtectedRoute role="candidat" />}>
            <Route path="dashboard" element={<DashboardCandidat />} />
          </Route>

          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}