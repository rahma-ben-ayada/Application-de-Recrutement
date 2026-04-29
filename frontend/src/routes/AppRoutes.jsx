import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from '../context/AuthContext';
import { SidebarProvider } from '../context/SidebarContext';
import { AlertProvider } from '../context/AlertContext';

// Auth
import Login            from '../pages/auth/Login';
import Register         from '../pages/auth/Register';
import ForgotPassword   from '../pages/auth/ForgotPassword';
import Callback         from '../pages/auth/Callback';
import PendingApproval  from '../pages/auth/PendingApproval';
import LandingPage      from '../pages/LandingPage';
import LoginAdmin       from '../pages/auth/LoginAdmin';

// Public Pages
import Fonctionnalités from '../pages/Fonctionnalités';
import Offres          from '../pages/Offres';
import OffreDetails    from '../pages/OffreDetails';
import Entreprises     from '../pages/Entreprises';
import Ressources      from '../pages/Ressources';
import ArticleDetails  from '../pages/ArticleDetails';

// Admin
import DashboardAdmin        from '../pages/admin/DashboardAdmin';
import GestionRecruteurs     from '../pages/admin/GestionRecruteurs';
import ConsultationCandidats from '../pages/admin/ConsultationCandidats';
import GestionOffres         from '../pages/admin/GestionOffres';
import Parametres            from '../pages/admin/Parametres';

// Recruteur
import DashboardRecruteur from '../pages/recruteur/DashboardRecruteur';
import MesOffres          from '../pages/recruteur/MesOffres';
import Candidatures       from '../pages/recruteur/Candidatures';
import PlanifierEntretien from '../pages/recruteur/PlanifierEntretien';
import EntretiensRH       from '../pages/recruteur/EntretiensRH';
import ProfilRecruteur    from '../pages/recruteur/Profil';

// Candidat
import OffresEmploi       from '../pages/candidat/OffresEmploi';
import MesFavoris         from '../pages/candidat/Favoris';
import Alertes            from '../pages/candidat/Alertes';
import MesCandidatures    from '../pages/candidat/MesCandidatures';
import MesEntretiens      from '../pages/candidat/MesEntretiens';
import ProfilCandidat     from '../pages/candidat/Profil';
import ParametresCandidat from '../pages/candidat/Parametres';

import ProtectedRoute from './ProtectedRoute';
import PublicRoute from './PublicRoute';

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <SidebarProvider>
        <AuthProvider>
          <AlertProvider>
            <Routes>

          {/* Landing */}
          <Route path="/"     element={<LandingPage />} />
          <Route path="/home" element={<LandingPage />} />

          {/* Public Pages */}
          <Route path="/fonctionnalites" element={<Fonctionnalités />} />
          <Route path="/offres"           element={<Offres />} />
          <Route path="/offres/:id"       element={<OffreDetails />} />
          <Route path="/entreprises"      element={<Entreprises />} />
          <Route path="/ressources"       element={<Ressources />} />
          <Route path="/article/:id"      element={<ArticleDetails />} />

          {/* Auth */}
          <Route path="/login"             element={<Login />} />
          <Route path="/register"          element={<Register />} />
          <Route path="/forgot-password"   element={<ForgotPassword />} />
          <Route path="/auth/callback"     element={<Callback />} />
          <Route path="/pending-approval"  element={<PendingApproval />} />
          <Route path="/admin-portal"      element={<LoginAdmin />} />

          {/* Admin */}
          <Route path="/admin" element={<ProtectedRoute role="admin" />}>
          <Route index element={<Navigate to="/admin/dashboard" replace />} />
          <Route path="dashboard"  element={<DashboardAdmin />} />
          <Route path="recruteurs" element={<GestionRecruteurs />} />
          <Route path="candidats"  element={<ConsultationCandidats />} />
          <Route path="offres"     element={<GestionOffres />} />
          <Route path="parametres" element={<Parametres />} />
          </Route>

          {/* Recruteur */}
          <Route path="/recruteur" element={<ProtectedRoute role="recruteur" />}>
            <Route index element={<Navigate to="/recruteur/dashboard" replace />} />
            <Route path="dashboard"    element={<DashboardRecruteur />} />
            <Route path="offres"       element={<MesOffres />} />
            <Route path="candidatures" element={<Candidatures />} />
            <Route path="entretiens"   element={<EntretiensRH />} />
            <Route path="planifier"    element={<PlanifierEntretien />} />
            <Route path="profil"       element={<ProfilRecruteur />} />
          </Route>

          {/* Candidat */}
          <Route path="/candidat" element={<ProtectedRoute role="candidat" />}>
            <Route index element={<Navigate to="/candidat/offres" replace />} />
            <Route path="offres"       element={<OffresEmploi />} />
            <Route path="favoris"      element={<MesFavoris />} />
            <Route path="alertes"      element={<Alertes />} />
            <Route path="candidatures" element={<MesCandidatures />} />
            <Route path="entretiens"   element={<MesEntretiens />} />
            <Route path="profil"       element={<ProfilCandidat />} />
            <Route path="parametres"   element={<ParametresCandidat />} />
          </Route>

          {/* 404 */}
          <Route path="*" element={<Navigate to="/" replace />} />

            </Routes>
          </AlertProvider>
        </AuthProvider>
      </SidebarProvider>
    </BrowserRouter>
  );
}