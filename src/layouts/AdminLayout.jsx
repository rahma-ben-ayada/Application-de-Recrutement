import React, { useState } from 'react';
import Sidebar from '../components/common/Sidebar';
import Header from '../components/common/Header';

export default function AdminLayout({ children, title = 'Dashboard' }) {
  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: '#F8FAFC' }}>
      <Sidebar role="admin" />
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
        <Header title={title} />
        <main style={{
          flex: 1,
          padding: '32px 40px',
          overflowY: 'auto',
        }}>
          {children}
        </main>
      </div>
    </div>
  );
}