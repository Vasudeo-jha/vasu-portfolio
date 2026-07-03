'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  LayoutDashboard,
  User,
  FileText,
  Code2,
  Briefcase,
  FolderKanban,
  Share2,
  FileDown,
  Settings,
  LogOut,
  Menu,
  X,
  Bell,
  Search,
} from 'lucide-react';
import { toast } from 'react-hot-toast';

const sidebarLinks = [
  { name: 'Dashboard', href: '/admin/dashboard', icon: LayoutDashboard },
  { name: 'Profile', href: '/admin/dashboard/profile', icon: User },
  { name: 'About', href: '/admin/dashboard/about', icon: FileText },
  { name: 'Skills', href: '/admin/dashboard/skills', icon: Code2 },
  { name: 'Experience', href: '/admin/dashboard/experience', icon: Briefcase },
  { name: 'Projects', href: '/admin/dashboard/projects', icon: FolderKanban },
  { name: 'Social Links', href: '/admin/dashboard/social', icon: Share2 },
  { name: 'Resume', href: '/admin/dashboard/resume', icon: FileDown },
  { name: 'Settings', href: '/admin/dashboard/settings', icon: Settings },
];

export default function AdminLayout({ children }) {
  const router = useRouter();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    try {
      const response = await fetch('/api/auth/me');
      if (response.ok) {
        const data = await response.json();
        setUser(data.user);
      } else {
        router.push('/admin/login');
      }
    } catch (error) {
      router.push('/admin/login');
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      await fetch('/api/auth/logout', { method: 'POST' });
      toast.success('Logged out successfully');
      router.push('/admin/login');
    } catch (error) {
      toast.error('Failed to logout');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex">
      {/* Sidebar Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed lg:static inset-y-0 left-0 z-50 w-72 bg-[var(--bg-secondary)] border-r border-white/5 transform transition-transform duration-300 lg:transform-none ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="p-6! border-b border-white/5">
            <Link href="/admin/dashboard" className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center font-bold text-lg shadow-lg shadow-purple-500/25">
                VJ
              </div>
              <div>
                <h1 className="font-semibold">Portfolio CMS</h1>
                <p className="text-xs text-gray-500">Admin Dashboard</p>
              </div>
            </Link>
          </div>

          {/* Navigation */}
          <nav className="flex-1 overflow-y-auto p-4! space-y-1">
            {sidebarLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="flex items-center gap-3 px-4! py-3! rounded-xl text-gray-400 hover:text-white hover:bg-white/5 transition-all duration-300"
              >
                <link.icon className="w-5 h-5" />
                <span className="font-medium">{link.name}</span>
              </Link>
            ))}
          </nav>

          {/* Logout */}
          <div className="p-4! border-t border-white/5">
            <button
              onClick={handleLogout}
              className="flex items-center gap-3 w-full px-4! py-3! rounded-xl text-gray-400 hover:text-red-400 hover:bg-red-500/10 transition-all duration-300"
            >
              <LogOut className="w-5 h-5" />
              <span className="font-medium">Logout</span>
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-h-screen">
        {/* Header */}
        <header className="sticky top-0 z-30 bg-[var(--bg-primary)]/80 backdrop-blur-xl border-b border-white/5">
          <div className="flex items-center justify-between px-6! py-4!">
            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="lg:hidden p-2! rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all duration-300"
            >
              {sidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>

            {/* Search */}
            <div className="hidden md:flex items-center flex-1 max-w-md mx-4">
              <div className="relative w-full">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                <input
                  type="text"
                  placeholder="Search..."
                  className="input-glass pl-12! py-2.5!"
                />
              </div>
            </div>

            {/* Right Actions */}
            <div className="flex items-center gap-4">
              <button className="relative p-2.5! rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all duration-300">
                <Bell className="w-5 h-5" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full" />
              </button>

              <div className="flex items-center gap-3 pl-4! border-l border-white/10">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center font-bold text-sm">
                  {user?.email?.charAt(0).toUpperCase() || 'A'}
                </div>
                <div className="hidden sm:block">
                  <p className="text-sm font-medium">{user?.email || 'Admin'}</p>
                  <p className="text-xs text-gray-500 capitalize">{user?.role || 'Administrator'}</p>
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 p-6!">
          {children}
        </main>
      </div>
    </div>
  );
}
