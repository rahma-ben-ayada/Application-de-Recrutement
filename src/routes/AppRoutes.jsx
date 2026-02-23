import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from '../context/AuthContext';

// Auth
import Login          from '../pages/auth/Login';
import Register       from '../pages/auth/Register';
import ForgotPassword from '../pages/auth/ForgotPassword';
import LandingPage from '../pages/LandingPage';

// Admin
import DashboardAdmin        from '../pages/admin/DashboardAdmin';
import GestionRecruteurs     from '../pages/admin/GestionRecruteurs';
import ConsultationCandidats from '../pages/admin/ConsultationCandidats';
import Parametres            from '../pages/admin/Parametres';

// Recruteur
import DashboardRecruteur from '../pages/recruteur/DashboardRecruteur';
import MesOffres          from '../pages/recruteur/MesOffres';
import Candidatures       from '../pages/recruteur/Candidatures';
import ScoreIntelligent   from '../pages/recruteur/ScoreIntelligent';
import PlanifierEntretien from '../pages/recruteur/PlanifierEntretien';
import ProfilRecruteur    from '../pages/recruteur/Profil';

// Candidat
import OffresEmploi    from '../pages/candidat/OffresEmploi';
import MesCandidatures from '../pages/candidat/MesCandidatures';
import ProfilCandidat  from '../pages/candidat/Profil';

import ProtectedRoute from './ProtectedRoute';

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>

          {/* ===== Auth ===== */}
          <Route path="/login"           element={<Login />} />
          <Route path="/register"        element={<Register />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/"      element={<LandingPage />} />
          <Route path="/home"  element={<LandingPage />} />

          {/* ===== Admin ===== */}
          <Route path="/admin" element={<ProtectedRoute role="admin" />}>
            <Route path="dashboard"  element={<DashboardAdmin />} />
            <Route path="recruteurs" element={<GestionRecruteurs />} />
            <Route path="candidats"  element={<ConsultationCandidats />} />
            <Route path="parametres" element={<Parametres />} />
          </Route>

          {/* ===== Recruteur ===== */}
          <Route path="/recruteur" element={<ProtectedRoute role="recruteur" />}>
            <Route path="dashboard"    element={<DashboardRecruteur />} />
            <Route path="offres"       element={<MesOffres />} />
            <Route path="candidatures" element={<Candidatures />} />
            <Route path="score"        element={<ScoreIntelligent />} />
            <Route path="entretiens"   element={<PlanifierEntretien />} />
            <Route path="profil"       element={<ProfilRecruteur />} />
          </Route>

          {/* ===== Candidat ===== */}
          <Route path="/candidat" element={<ProtectedRoute role="candidat" />}>
            <Route path="offres"       element={<OffresEmploi />} />
            <Route path="candidatures" element={<MesCandidatures />} />
            <Route path="profil"       element={<ProfilCandidat />} />
          </Route>

          {/* ===== Redirections ===== */}
          <Route path="/"  element={<Navigate to="/login" replace />} />
          <Route path="*"  element={<Navigate to="/login" replace />} />

        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}