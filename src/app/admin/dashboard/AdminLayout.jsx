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
  PanelLeftClose,
  PanelLeft,
  Moon,
  Sun,
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
  const [theme, setTheme] = useState('dark');

  useEffect(() => {
    // Set sidebar open by default on large screens only
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setSidebarOpen(true);
      }
    };
    handleResize(); // Check on mount
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    // Get initial theme from document
    const currentTheme = document.documentElement.getAttribute('data-theme') || 'dark';
    setTheme(currentTheme);
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
    document.documentElement.setAttribute('data-theme', newTheme);
  };

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
    <div className="h-screen flex overflow-hidden">
      {/* Sidebar Overlay - only on mobile */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed lg:relative inset-y-0 left-0 z-50 w-72 bg-[var(--bg-secondary)] border-r border-[var(--glass-border)] transform transition-all duration-300 flex-shrink-0 ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:w-0 lg:overflow-hidden'
        }`}
      >
        <div className="flex flex-col h-full w-72">
          {/* Logo */}
          <div className="p-6! border-b border-[var(--glass-border)]">
            <Link href="/admin/dashboard" className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center font-bold text-lg text-white shadow-lg shadow-purple-500/25">
                VJ
              </div>
              <div>
                <h1 className="font-semibold text-[var(--text-primary)]">Portfolio CMS</h1>
                <p className="text-xs text-[var(--text-secondary)]">Admin Dashboard</p>
              </div>
            </Link>
          </div>

          {/* Navigation */}
          <nav className="flex-1 overflow-y-auto p-4! space-y-1">
            {sidebarLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => {
                  // Only close sidebar on mobile
                  if (window.innerWidth < 1024) setSidebarOpen(false);
                }}
                className="flex items-center gap-3 px-4! py-3! rounded-xl text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--glass-bg)] transition-all duration-300"
              >
                <link.icon className="w-5 h-5" />
                <span className="font-medium">{link.name}</span>
              </Link>
            ))}
          </nav>

          {/* Logout */}
          <div className="p-4! border-t border-[var(--glass-border)]">
            <button
              onClick={handleLogout}
              className="flex items-center gap-3 w-full px-4! py-3! rounded-xl text-[var(--text-secondary)] hover:text-red-400 hover:bg-red-500/10 transition-all duration-300"
            >
              <LogOut className="w-5 h-5" />
              <span className="font-medium">Logout</span>
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col h-screen min-h-0 overflow-hidden">
        {/* Header */}
        <header className="z-30 bg-[var(--bg-secondary)]/90 backdrop-blur-xl border-b border-[var(--glass-border)] shadow-sm flex-shrink-0">
          <div className="flex items-center justify-between px-6! py-4!">
            {/* Menu Toggle */}
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="p-2! rounded-xl bg-[var(--glass-bg)] border border-[var(--glass-border)] hover:bg-[var(--glass-bg)] transition-all duration-300"
              title={sidebarOpen ? "Close menu" : "Open menu"}
            >
              {sidebarOpen ? (
                <>
                  <X className="w-5 h-5 lg:hidden" />
                  <PanelLeftClose className="w-5 h-5 hidden lg:block" />
                </>
              ) : (
                <>
                  <Menu className="w-5 h-5 lg:hidden" />
                  <PanelLeft className="w-5 h-5 hidden lg:block" />
                </>
              )}
            </button>

            {/* Search */}
            <div className="hidden md:flex items-center flex-1 max-w-md mx-4">
              <div className="relative w-full">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[var(--text-secondary)]" />
                <input
                  type="text"
                  placeholder="Search..."
                  className="input-glass pl-12! py-2.5!"
                />
              </div>
            </div>

            {/* Right Actions */}
            <div className="flex items-center gap-3 sm:gap-4">
              {/* Theme Toggle */}
              <button
                onClick={toggleTheme}
                className="p-2.5! rounded-xl bg-[var(--glass-bg)] border border-[var(--glass-border)] hover:bg-[var(--glass-bg)] transition-all duration-300"
                title={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
              >
                {theme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
              </button>

              <button className="relative p-2.5! rounded-xl bg-[var(--glass-bg)] border border-[var(--glass-border)] hover:bg-[var(--glass-bg)] transition-all duration-300">
                <Bell className="w-5 h-5" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full" />
              </button>

              <div className="flex items-center gap-3 pl-4! border-l border-[var(--glass-border)]">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center font-bold text-sm text-white">
                  {user?.email?.charAt(0).toUpperCase() || 'A'}
                </div>
                <div className="hidden sm:block">
                  <p className="text-sm font-medium">{user?.email || 'Admin'}</p>
                  <p className="text-xs text-[var(--text-secondary)] capitalize">{user?.role || 'Administrator'}</p>
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 min-h-0 overflow-y-auto p-4! sm:p-6! pb-8! sm:pb-10!">
          {children}
        </main>
      </div>
    </div>
  );
}
