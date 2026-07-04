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
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

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
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold">Dashboard</h1>
          <p className="text-muted-foreground mt-1 text-sm sm:text-base">
            Welcome back{stats.profile?.name ? `, ${stats.profile.name}` : ''}! Manage your portfolio here.
          </p>
        </div>
        <Button
          onClick={fetchDashboardData}
          variant="glass"
          size="sm"
          className="w-fit"
        >
          <RefreshCw className="w-4 h-4" />
          Refresh
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        {quickActions.map((action, index) => (
          <motion.div
            key={action.name}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: index * 0.1 }}
          >
            <Link href={action.href}>
              <Card className="hover:border-border/50 transition-all duration-300 group cursor-pointer h-full">
                <CardContent className="pt-4 sm:pt-6">
                  <div className="flex items-start justify-between mb-3 sm:mb-4">
                    <div className={`w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-gradient-to-br ${action.color} flex items-center justify-center group-hover:scale-110 transition-transform`}>
                      <action.icon className="w-6 h-6 sm:w-7 sm:h-7 text-white" />
                    </div>
                    <span className="text-3xl sm:text-4xl font-bold text-foreground/80">{action.count}</span>
                  </div>
                  <h3 className="text-base sm:text-lg font-bold mb-1">{action.name}</h3>
                  <p className="text-xs sm:text-sm text-muted-foreground mb-3 sm:mb-4">{action.description}</p>
                  <div className="flex items-center text-xs sm:text-sm text-primary group-hover:text-primary/80">
                    <span>Manage</span>
                    <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                  </div>
                </CardContent>
              </Card>
            </Link>
          </motion.div>
        ))}
      </div>

      {/* Quick Add Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.3 }}
      >
        <Card>
          <CardContent className="pt-6">
            <h2 className="text-lg sm:text-xl font-bold mb-4 sm:mb-6">Quick Actions</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
              <Link
                href="/admin/dashboard/skills"
                className="flex items-center gap-3 sm:gap-4 p-3 sm:p-4 rounded-xl bg-muted/30 border border-border hover:bg-muted/50 hover:border-blue-500/50 transition-all duration-300"
              >
                <div className="w-10 h-10 sm:w-12 sm:h-12 flex-shrink-0 rounded-xl bg-blue-500/20 flex items-center justify-center">
                  <Plus className="w-5 h-5 sm:w-6 sm:h-6 text-blue-400" />
                </div>
                <div className="min-w-0">
                  <p className="font-medium text-sm sm:text-base">Add New Skill</p>
                  <p className="text-xs sm:text-sm text-muted-foreground">Add a technical skill</p>
                </div>
              </Link>

              <Link
                href="/admin/dashboard/projects"
                className="flex items-center gap-3 sm:gap-4 p-3 sm:p-4 rounded-xl bg-muted/30 border border-border hover:bg-muted/50 hover:border-green-500/50 transition-all duration-300"
              >
                <div className="w-10 h-10 sm:w-12 sm:h-12 flex-shrink-0 rounded-xl bg-green-500/20 flex items-center justify-center">
                  <Plus className="w-5 h-5 sm:w-6 sm:h-6 text-green-400" />
                </div>
                <div className="min-w-0">
                  <p className="font-medium text-sm sm:text-base">Add New Project</p>
                  <p className="text-xs sm:text-sm text-muted-foreground">Showcase your work</p>
                </div>
              </Link>

              <Link
                href="/admin/dashboard/profile"
                className="flex items-center gap-3 sm:gap-4 p-3 sm:p-4 rounded-xl bg-muted/30 border border-border hover:bg-muted/50 hover:border-purple-500/50 transition-all duration-300"
              >
                <div className="w-10 h-10 sm:w-12 sm:h-12 flex-shrink-0 rounded-xl bg-purple-500/20 flex items-center justify-center">
                  <User className="w-5 h-5 sm:w-6 sm:h-6 text-purple-400" />
                </div>
                <div className="min-w-0">
                  <p className="font-medium text-sm sm:text-base">Update Profile</p>
                  <p className="text-xs sm:text-sm text-muted-foreground">Edit your info</p>
                </div>
              </Link>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Recent Projects */}
      {stats.projects.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.4 }}
        >
          <Card>
            <CardContent className="pt-4 sm:pt-6">
              <div className="flex items-center justify-between mb-4 sm:mb-6">
                <h2 className="text-lg sm:text-xl font-bold">Recent Projects</h2>
                <Link 
                  href="/admin/dashboard/projects"
                  className="text-xs sm:text-sm text-primary hover:text-primary/80 transition-colors flex items-center gap-1"
                >
                  View All
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
              <div className="space-y-2 sm:space-y-3">
                {stats.projects.slice(0, 5).map((project) => (
                  <div
                    key={project.id}
                    className="flex items-center gap-3 sm:gap-4 p-3 sm:p-4 rounded-xl bg-muted/30 hover:bg-muted/50 transition-colors"
                  >
                    <div className="w-9 h-9 sm:w-10 sm:h-10 flex-shrink-0 rounded-xl bg-gradient-to-br from-blue-500/20 to-purple-500/20 flex items-center justify-center">
                      <FolderKanban className="w-4 h-4 sm:w-5 sm:h-5 text-primary" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-sm sm:text-base truncate">{project.title}</p>
                      <p className="text-xs sm:text-sm text-muted-foreground truncate">
                        {(project.techStack || []).slice(0, 3).join(', ')}
                      </p>
                    </div>
                    <Badge
                      variant={
                        project.status === 'COMPLETED'
                          ? 'default'
                          : project.status === 'IN_PROGRESS'
                          ? 'secondary'
                          : 'outline'
                      }
                    >
                      {project.status?.replace('_', ' ') || 'Draft'}
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      )}

      {/* Recent Skills */}
      {stats.skills.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.5 }}
        >
          <Card>
            <CardContent className="pt-4 sm:pt-6">
              <div className="flex items-center justify-between mb-4 sm:mb-6">
                <h2 className="text-lg sm:text-xl font-bold">Your Skills</h2>
                <Link 
                  href="/admin/dashboard/skills"
                  className="text-xs sm:text-sm text-primary hover:text-primary/80 transition-colors flex items-center gap-1"
                >
                  Manage
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
              <div className="flex flex-wrap gap-2">
                {stats.skills.map((skill) => (
                  <Badge
                    key={skill.id}
                    variant="glass"
                    className="px-3 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm"
                  >
                    {skill.name}
                    <span className="ml-1.5 sm:ml-2 text-muted-foreground">{skill.percentage}%</span>
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      )}

      {/* Empty State */}
      {stats.skills.length === 0 && stats.projects.length === 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.4 }}
        >
          <Card>
            <CardContent className="pt-12 pb-12 text-center">
              <div className="w-20 h-20 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-blue-500/20 to-purple-500/20 flex items-center justify-center">
                <FolderKanban className="w-10 h-10 text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-2">Get Started</h3>
              <p className="text-muted-foreground mb-6 max-w-md mx-auto">
                Your portfolio is empty. Start by adding your skills and projects to showcase your work.
              </p>
              <div className="flex items-center justify-center gap-4">
                <Link href="/admin/dashboard/skills">
                  <Button variant="gradient">
                    <Plus className="w-5 h-5" />
                    Add Skills
                  </Button>
                </Link>
                <Link href="/admin/dashboard/projects">
                  <Button variant="glass">
                    <Plus className="w-5 h-5" />
                    Add Projects
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      )}
    </div>
  );
}
