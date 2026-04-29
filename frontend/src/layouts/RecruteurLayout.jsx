import React from 'react';
import { useAuth } from '../context/AuthContext';
import { useSidebar } from '../context/SidebarContext';
import Sidebar from '../components/common/Sidebar';
import Header from '../components/common/Header';
import './Layout.css';

export default function RecruteurLayout({ children, title = 'Espace Recruteur' }) {
  const { loading, user } = useAuth();
  const { toggleSidebar } = useSidebar();

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

  // If no user after loading, don't render the layout
  if (!user) {
    return null;
  }

  return (
    <div className="layout-container">
      <Sidebar role="recruteur" />
      <div className="layout-main">
        <Header title={title} onMenuToggle={toggleSidebar} />
        <main className="layout-content">
          {children}
        </main>
      </div>
    </div>
  );
}
