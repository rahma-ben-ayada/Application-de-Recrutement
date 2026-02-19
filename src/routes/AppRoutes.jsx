import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from '../context/AuthContext';

// Auth
import Login          from '../pages/auth/Login';
import Register       from '../pages/auth/Register';
import ForgotPassword from '../pages/auth/ForgotPassword';
// Admin
import DashboardAdmin        from '../pages/admin/DashboardAdmin';
import GestionRecruteurs     from '../pages/admin/GestionRecruteurs';
import ConsultationCandidats from '../pages/admin/ConsultationCandidats';

// Recruteur (à développer)
// import DashboardRecruteur from '../pages/recruteur/DashboardRecruteur';

// Candidat — PAS de dashboard
// import OffresDEmploi from '../pages/candidat/OffresDEmploi';

import ProtectedRoute from './ProtectedRoute';

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          {/* Auth */}
          <Route path="/login"           element={<Login />} />
          <Route path="/register"        element={<Register />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />

          {/* Admin */}
          <Route path="/admin" element={<ProtectedRoute role="admin" />}>
          <Route path="dashboard"  element={<DashboardAdmin />} />
          <Route path="recruteurs" element={<GestionRecruteurs />} />
          <Route path="candidats"  element={<ConsultationCandidats />} />
          </Route>

          {/* Recruteur — à compléter */}
          {/* <Route path="/recruteur" element={<ProtectedRoute role="recruteur" />}> */}
          {/*   <Route path="dashboard" element={<DashboardRecruteur />} /> */}
          {/* </Route> */}

          {/* Candidat — PAS de dashboard */}
          {/* <Route path="/candidat" element={<ProtectedRoute role="candidat" />}> */}
          {/*   <Route path="offres" element={<OffresDEmploi />} /> */}
          {/* </Route> */}

          {/* Redirect */}
          <Route path="/"  element={<Navigate to="/login" replace />} />
          <Route path="*"  element={<Navigate to="/login" replace />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}