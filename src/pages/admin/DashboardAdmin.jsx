import React from 'react';
import AdminLayout from '../../layouts/AdminLayout';
import PowerBIPlaceholder from '../../components/common/PowerBIPlaceholder';

export default function DashboardAdmin() {
  return (
    <AdminLayout title="Dashboard Administrateur">
      <PowerBIPlaceholder title="Dashboard Power BI" height={600} />
    </AdminLayout>
  );
}