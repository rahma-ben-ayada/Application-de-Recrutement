import React from 'react';
import Sidebar from '../components/common/Sidebar';
import Navbar from '../components/common/Navbar';

export default function RecruteurLayout({ children }) {
  return (
    <div style={{ display: 'flex', minHeight: '100vh' }}>
      <Sidebar role="recruteur" />
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
        <Navbar />
        <main style={{
          flex: 1,
          padding: '32px 40px',
          background: '#F8FAFC',
        }}>
          {children}
        </main>
      </div>
    </div>
  );
}