'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  User,
  Code2,
  FolderKanban,
  MessageSquare,
  Plus,
  ArrowRight,
  Loader2,
  RefreshCw,
  Briefcase,
  Info,
} from 'lucide-react';

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    profile: null,
    skills: [],
    projects: [],
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    setIsLoading(true);
    try {
      const [profileRes, skillsRes, projectsRes] = await Promise.all([
        fetch('/api/profile'),
        fetch('/api/skills'),
        fetch('/api/projects'),
      ]);

      const [profile, skills, projects] = await Promise.all([
        profileRes.ok ? profileRes.json() : null,
        skillsRes.ok ? skillsRes.json() : [],
        projectsRes.ok ? projectsRes.json() : [],
      ]);

      setStats({ profile, skills, projects });
    } catch (error) {
      console.error('Failed to fetch dashboard data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Loader2 className="w-8 h-8 animate-spin text-blue-500" />
      </div>
    );
  }

  const quickActions = [
    { 
      name: 'Edit Profile', 
      description: 'Update your personal info',
      href: '/admin/dashboard/profile', 
      icon: User, 
      color: 'from-purple-500 to-pink-500',
      count: stats.profile ? '1' : '0',
    },
    { 
      name: 'Manage Skills', 
      description: 'Add or edit your skills',
      href: '/admin/dashboard/skills', 
      icon: Code2, 
      color: 'from-blue-500 to-cyan-500',
      count: stats.skills.length,
    },
    { 
      name: 'Manage Projects', 
      description: 'Add or edit projects',
      href: '/admin/dashboard/projects', 
      icon: FolderKanban, 
      color: 'from-green-500 to-emerald-500',
      count: stats.projects.length,
    },
    { 
      name: 'Manage Experience', 
      description: 'Add or edit work experience',
      href: '/admin/dashboard/experience', 
      icon: Briefcase, 
      color: 'from-orange-500 to-amber-500',
    },
    { 
      name: 'Edit About', 
      description: 'Update about section',
      href: '/admin/dashboard/about', 
      icon: Info, 
      color: 'from-teal-500 to-cyan-500',
    },
  ];

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Dashboard</h1>
          <p className="text-gray-400 mt-1">
            Welcome back{stats.profile?.name ? `, ${stats.profile.name}` : ''}! Manage your portfolio here.
          </p>
        </div>
        <button
          onClick={fetchDashboardData}
          className="btn-secondary"
        >
          <RefreshCw className="w-4 h-4" />
          Refresh
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid sm:grid-cols-3 gap-6">
        {quickActions.map((action, index) => (
          <motion.div
            key={action.name}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: index * 0.1 }}
          >
            <Link
              href={action.href}
              className="block glass-card hover:border-white/20 transition-all duration-300 group"
            >
              <div className="flex items-start justify-between mb-4">
                <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${action.color} flex items-center justify-center group-hover:scale-110 transition-transform`}>
                  <action.icon className="w-7 h-7 text-white" />
                </div>
                <span className="text-4xl font-bold text-white/80">{action.count}</span>
              </div>
              <h3 className="text-lg font-bold mb-1">{action.name}</h3>
              <p className="text-sm text-gray-400 mb-4">{action.description}</p>
              <div className="flex items-center text-sm text-blue-400 group-hover:text-blue-300">
                <span>Manage</span>
                <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>
          </motion.div>
        ))}
      </div>

      {/* Quick Add Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.3 }}
        className="glass-card"
      >
        <h2 className="text-xl font-bold mb-6">Quick Actions</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <Link
            href="/admin/dashboard/skills"
            className="flex items-center gap-4 p-4! rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 hover:border-blue-500/50 transition-all duration-300"
          >
            <div className="w-12 h-12 rounded-xl bg-blue-500/20 flex items-center justify-center">
              <Plus className="w-6 h-6 text-blue-400" />
            </div>
            <div>
              <p className="font-medium">Add New Skill</p>
              <p className="text-sm text-gray-400">Add a technical skill</p>
            </div>
          </Link>

          <Link
            href="/admin/dashboard/projects"
            className="flex items-center gap-4 p-4! rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 hover:border-green-500/50 transition-all duration-300"
          >
            <div className="w-12 h-12 rounded-xl bg-green-500/20 flex items-center justify-center">
              <Plus className="w-6 h-6 text-green-400" />
            </div>
            <div>
              <p className="font-medium">Add New Project</p>
              <p className="text-sm text-gray-400">Showcase your work</p>
            </div>
          </Link>

          <Link
            href="/admin/dashboard/profile"
            className="flex items-center gap-4 p-4! rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 hover:border-purple-500/50 transition-all duration-300"
          >
            <div className="w-12 h-12 rounded-xl bg-purple-500/20 flex items-center justify-center">
              <User className="w-6 h-6 text-purple-400" />
            </div>
            <div>
              <p className="font-medium">Update Profile</p>
              <p className="text-sm text-gray-400">Edit your info</p>
            </div>
          </Link>
        </div>
      </motion.div>

      {/* Recent Projects */}
      {stats.projects.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.4 }}
          className="glass-card"
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold">Recent Projects</h2>
            <Link 
              href="/admin/dashboard/projects"
              className="text-sm text-blue-400 hover:text-blue-300 transition-colors flex items-center gap-1"
            >
              View All
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="space-y-3">
            {stats.projects.slice(0, 5).map((project) => (
              <div
                key={project.id}
                className="flex items-center gap-4 p-4! rounded-xl bg-white/5 hover:bg-white/10 transition-colors"
              >
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500/20 to-purple-500/20 flex items-center justify-center">
                  <FolderKanban className="w-5 h-5 text-blue-400" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-medium truncate">{project.title}</p>
                  <p className="text-sm text-gray-400 truncate">
                    {(project.techStack || []).slice(0, 3).join(', ')}
                  </p>
                </div>
                <span
                  className={`px-3! py-1! rounded-full text-xs font-medium ${
                    project.status === 'COMPLETED'
                      ? 'bg-green-500/20 text-green-400'
                      : project.status === 'IN_PROGRESS'
                      ? 'bg-yellow-500/20 text-yellow-400'
                      : 'bg-gray-500/20 text-gray-400'
                  }`}
                >
                  {project.status?.replace('_', ' ') || 'Draft'}
                </span>
              </div>
            ))}
          </div>
        </motion.div>
      )}

      {/* Recent Skills */}
      {stats.skills.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.5 }}
          className="glass-card p-6!"
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold">Your Skills</h2>
            <Link 
              href="/admin/dashboard/skills"
              className="text-sm text-blue-400 hover:text-blue-300 transition-colors flex items-center gap-1"
            >
              Manage
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="flex flex-wrap gap-2">
            {stats.skills.map((skill) => (
              <span
                key={skill.id}
                className="px-4! py-2! rounded-xl bg-white/5 border border-white/10 text-sm font-medium"
              >
                {skill.name}
                <span className="ml-2 text-gray-400">{skill.percentage}%</span>
              </span>
            ))}
          </div>
        </motion.div>
      )}

      {/* Empty State */}
      {stats.skills.length === 0 && stats.projects.length === 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.4 }}
          className="glass-card p-12! text-center"
        >
          <div className="w-20 h-20 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-blue-500/20 to-purple-500/20 flex items-center justify-center">
            <FolderKanban className="w-10 h-10 text-blue-400" />
          </div>
          <h3 className="text-xl font-bold mb-2">Get Started</h3>
          <p className="text-gray-400 mb-6 max-w-md mx-auto">
            Your portfolio is empty. Start by adding your skills and projects to showcase your work.
          </p>
          <div className="flex items-center justify-center gap-4">
            <Link href="/admin/dashboard/skills" className="btn-primary">
              <Plus className="w-5 h-5" />
              Add Skills
            </Link>
            <Link href="/admin/dashboard/projects" className="btn-secondary">
              <Plus className="w-5 h-5" />
              Add Projects
            </Link>
          </div>
        </motion.div>
      )}
    </div>
  );
}
