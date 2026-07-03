import AdminLayout from './AdminLayout';

// Force dynamic rendering for admin pages (requires authentication)
export const dynamic = 'force-dynamic';

export default function DashboardLayout({ children }) {
  return <AdminLayout>{children}</AdminLayout>;
}
