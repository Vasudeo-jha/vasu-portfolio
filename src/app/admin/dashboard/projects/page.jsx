'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';
import { Plus, Trash2, Edit2, ExternalLink, Star, Loader2, X } from 'lucide-react';
import { GithubIcon } from '@/components/ui/Icons';

export default function ProjectsPage() {
  const [projects, setProjects] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isFetching, setIsFetching] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingProject, setEditingProject] = useState(null);

  const { register, handleSubmit, reset, setValue, formState: { errors } } = useForm();

  // Fetch projects on mount
  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const response = await fetch('/api/projects');
      if (response.ok) {
        const data = await response.json();
        setProjects(data);
      }
    } catch (error) {
      console.error('Failed to fetch projects:', error);
    } finally {
      setIsFetching(false);
    }
  };

  const openAddModal = () => {
    setEditingProject(null);
    reset({
      title: '',
      slug: '',
      shortDescription: '',
      liveUrl: '',
      githubUrl: '',
      techStack: '',
      featured: false,
    });
    setShowModal(true);
  };

  const openEditModal = (project) => {
    setEditingProject(project);
    setValue('title', project.title);
    setValue('slug', project.slug);
    setValue('shortDescription', project.shortDescription || project.description || '');
    setValue('liveUrl', project.liveUrl || '');
    setValue('githubUrl', project.githubUrl || '');
    setValue('techStack', (project.techStack || []).join(', '));
    setValue('featured', project.featured);
    setShowModal(true);
  };

  const onSubmit = async (data) => {
    setIsLoading(true);
    try {
      const projectData = {
        title: data.title,
        slug: data.slug,
        shortDescription: data.shortDescription,
        techStack: data.techStack.split(',').map(s => s.trim()).filter(Boolean),
        liveUrl: data.liveUrl || null,
        githubUrl: data.githubUrl || null,
        featured: data.featured || false,
      };

      let response;
      if (editingProject) {
        response = await fetch(`/api/projects/${editingProject.id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(projectData),
        });
      } else {
        response = await fetch('/api/projects', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(projectData),
        });
      }

      if (response.ok) {
        const savedProject = await response.json();
        if (editingProject) {
          setProjects(projects.map(p => p.id === editingProject.id ? savedProject : p));
          toast.success('Project updated successfully!');
        } else {
          setProjects([...projects, savedProject]);
          toast.success('Project added successfully!');
        }
        setShowModal(false);
        reset();
      } else {
        const error = await response.json();
        toast.error(error.error || 'Failed to save project');
      }
    } catch (error) {
      toast.error('Failed to save project');
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (confirm('Are you sure you want to delete this project?')) {
      try {
        const response = await fetch(`/api/projects/${id}`, {
          method: 'DELETE',
        });

        if (response.ok) {
          setProjects(projects.filter(p => p.id !== id));
          toast.success('Project deleted!');
        } else {
          toast.error('Failed to delete project');
        }
      } catch (error) {
        toast.error('Failed to delete project');
      }
    }
  };

  if (isFetching) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Loader2 className="w-8 h-8 animate-spin text-blue-500" />
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Projects</h1>
          <p className="text-gray-400 mt-1">Manage your portfolio projects</p>
        </div>
        <button onClick={openAddModal} className="btn-primary">
          <Plus className="w-5 h-5" />
          Add Project
        </button>
      </div>

      {/* Projects Grid */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        {projects.map((project) => (
          <div key={project.id} className="glass-card-np overflow-hidden group">
            {/* Image */}
            <div className="relative h-40 bg-gradient-to-br from-blue-600/30 to-purple-600/30 flex items-center justify-center">
              <span className="text-5xl opacity-50">🖼️</span>
              {project.featured && (
                <div className="absolute top-3 left-3">
                  <span className="flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium bg-yellow-500 text-black">
                    <Star className="w-3 h-3 fill-current" />
                    Featured
                  </span>
                </div>
              )}
            </div>

            {/* Content */}
            <div className="p-5">
              <h3 className="font-bold text-lg mb-2">{project.title}</h3>
              <p className="text-sm text-gray-400 line-clamp-2 mb-4">
                {project.shortDescription || project.description}
              </p>

              {/* Tech Stack */}
              <div className="flex flex-wrap gap-1 mb-4">
                {(project.techStack || []).slice(0, 3).map((tech) => (
                  <span
                    key={tech}
                    className="px-2 py-0.5 rounded text-xs bg-white/5 text-gray-300"
                  >
                    {tech}
                  </span>
                ))}
                {(project.techStack || []).length > 3 && (
                  <span className="px-2 py-0.5 rounded text-xs bg-white/5 text-gray-400">
                    +{(project.techStack || []).length - 3}
                  </span>
                )}
              </div>

              {/* Actions */}
              <div className="flex items-center gap-2 pt-4 border-t border-white/5">
                <button
                  onClick={() => openEditModal(project)}
                  className="flex-1 flex items-center justify-center gap-2 py-2 rounded-lg bg-white/5 hover:bg-white/10 text-sm transition-colors"
                >
                  <Edit2 className="w-4 h-4" />
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(project.id)}
                  className="p-2 rounded-lg text-gray-400 hover:text-red-400 hover:bg-red-500/10 transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
                {project.liveUrl && (
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 rounded-lg text-gray-400 hover:text-blue-400 hover:bg-blue-500/10 transition-colors"
                  >
                    <ExternalLink className="w-4 h-4" />
                  </a>
                )}
                {project.githubUrl && (
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 rounded-lg text-gray-400 hover:text-white hover:bg-white/10 transition-colors"
                  >
                    <GithubIcon className="w-4 h-4" />
                  </a>
                )}
              </div>
            </div>
          </div>
        ))}
        {projects.length === 0 && (
          <div className="col-span-full text-center py-12 text-gray-400">
            No projects added yet. Click "Add Project" to get started.
          </div>
        )}
      </motion.div>

      {/* Add/Edit Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto">
          <div
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={() => setShowModal(false)}
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="relative glass-card w-full max-w-2xl my-8"
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold">
                {editingProject ? 'Edit Project' : 'Add New Project'}
              </h2>
              <button
                onClick={() => setShowModal(false)}
                className="p-2 rounded-lg hover:bg-white/10 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Project Title
                  </label>
                  <input
                    type="text"
                    {...register('title', { required: 'Title is required' })}
                    className="input-glass"
                    placeholder="Portfolio CMS"
                  />
                  {errors.title && (
                    <p className="mt-2 text-sm text-red-400">{errors.title.message}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Slug (URL)
                  </label>
                  <input
                    type="text"
                    {...register('slug', { required: 'Slug is required' })}
                    className="input-glass"
                    placeholder="portfolio-cms"
                  />
                  {errors.slug && (
                    <p className="mt-2 text-sm text-red-400">{errors.slug.message}</p>
                  )}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Description
                </label>
                <textarea
                  rows={3}
                  {...register('shortDescription', { required: 'Description is required' })}
                  className="input-glass resize-none"
                  placeholder="A brief description of the project..."
                />
                {errors.shortDescription && (
                  <p className="mt-2 text-sm text-red-400">{errors.shortDescription.message}</p>
                )}
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Live URL
                  </label>
                  <input
                    type="url"
                    {...register('liveUrl')}
                    className="input-glass"
                    placeholder="https://example.com"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    GitHub URL
                  </label>
                  <input
                    type="url"
                    {...register('githubUrl')}
                    className="input-glass"
                    placeholder="https://github.com/..."
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Tech Stack (comma separated)
                </label>
                <input
                  type="text"
                  {...register('techStack', { required: 'Tech stack is required' })}
                  className="input-glass"
                  placeholder="Next.js, React, Tailwind CSS, PostgreSQL"
                />
                {errors.techStack && (
                  <p className="mt-2 text-sm text-red-400">{errors.techStack.message}</p>
                )}
              </div>

              <div className="flex items-center gap-3">
                <input
                  type="checkbox"
                  id="featured"
                  {...register('featured')}
                  className="w-5 h-5 rounded bg-white/5 border-white/10 text-blue-500 focus:ring-blue-500"
                />
                <label htmlFor="featured" className="text-sm font-medium text-gray-300">
                  Mark as Featured Project
                </label>
              </div>

              <div className="flex gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="flex-1 btn-secondary justify-center"
                >
                  Cancel
                </button>
                <button 
                  type="submit" 
                  disabled={isLoading}
                  className="flex-1 btn-primary justify-center disabled:opacity-70"
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      Saving...
                    </>
                  ) : (
                    editingProject ? 'Update Project' : 'Add Project'
                  )}
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </div>
  );
}
