'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';
import { Plus, Trash2, Edit2, ExternalLink, Star, Loader2, X } from 'lucide-react';
import { GithubIcon } from '@/components/ui/Icons';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';

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
    <div className="space-y-6 sm:space-y-8">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold">Projects</h1>
          <p className="text-sm sm:text-base text-muted-foreground mt-1">Manage your portfolio projects</p>
        </div>
        <Button onClick={openAddModal} variant="gradient" className="w-fit">
          <Plus className="w-5 h-5" />
          Add Project
        </Button>
      </div>

      {/* Projects Grid */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        {projects.map((project) => (
          <Card key={project.id} className="overflow-hidden group p-0">
            {/* Image */}
            <div className="relative h-40 bg-gradient-to-br from-blue-600/30 to-purple-600/30 flex items-center justify-center">
              <span className="text-5xl opacity-50">🖼️</span>
              {project.featured && (
                <div className="absolute top-3 left-3">
                  <Badge className="bg-yellow-500 text-black hover:bg-yellow-500">
                    <Star className="w-3 h-3 fill-current" />
                    Featured
                  </Badge>
                </div>
              )}
            </div>

            {/* Content */}
            <CardContent className="p-5">
              <h3 className="font-bold text-lg mb-2">{project.title}</h3>
              <p className="text-sm text-muted-foreground line-clamp-2 mb-4">
                {project.shortDescription || project.description}
              </p>

              {/* Tech Stack */}
              <div className="flex flex-wrap gap-1 mb-4">
                {(project.techStack || []).slice(0, 3).map((tech) => (
                  <Badge key={tech} variant="glass" className="text-xs">
                    {tech}
                  </Badge>
                ))}
                {(project.techStack || []).length > 3 && (
                  <Badge variant="outline" className="text-xs">
                    +{(project.techStack || []).length - 3}
                  </Badge>
                )}
              </div>

              {/* Actions */}
              <div className="flex items-center gap-2 pt-4 border-t border-border">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => openEditModal(project)}
                  className="flex-1"
                >
                  <Edit2 className="w-4 h-4" />
                  Edit
                </Button>
                <Button
                  variant="ghost"
                  size="icon-sm"
                  onClick={() => handleDelete(project.id)}
                  className="text-muted-foreground hover:text-destructive hover:bg-destructive/10"
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
                {project.liveUrl && (
                  <Button
                    variant="ghost"
                    size="icon-sm"
                    asChild
                    className="text-muted-foreground hover:text-primary hover:bg-primary/10"
                  >
                    <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  </Button>
                )}
                {project.githubUrl && (
                  <Button
                    variant="ghost"
                    size="icon-sm"
                    asChild
                    className="text-muted-foreground hover:text-foreground hover:bg-muted"
                  >
                    <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                      <GithubIcon className="w-4 h-4" />
                    </a>
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
        {projects.length === 0 && (
          <div className="col-span-full text-center py-12 text-muted-foreground">
            No projects added yet. Click "Add Project" to get started.
          </div>
        )}
      </motion.div>

      {/* Add/Edit Modal */}
      <Dialog open={showModal} onOpenChange={setShowModal} >
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>
              {editingProject ? 'Edit Project' : 'Add New Project'}
            </DialogTitle>
          </DialogHeader>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 max-h-[70vh] overflow-y-auto pr-2">
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Project Title</Label>
                <Input
                  {...register('title', { required: 'Title is required' })}
                  placeholder="Portfolio CMS"
                />
                {errors.title && (
                  <p className="text-sm text-destructive">{errors.title.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label>Slug (URL)</Label>
                <Input
                  {...register('slug', { required: 'Slug is required' })}
                  placeholder="portfolio-cms"
                />
                {errors.slug && (
                  <p className="text-sm text-destructive">{errors.slug.message}</p>
                )}
              </div>
            </div>

            <div className="space-y-2">
              <Label>Description</Label>
              <Textarea
                rows={3}
                {...register('shortDescription', { required: 'Description is required' })}
                placeholder="A brief description of the project..."
              />
              {errors.shortDescription && (
                <p className="text-sm text-destructive">{errors.shortDescription.message}</p>
              )}
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Live URL</Label>
                <Input
                  type="url"
                  {...register('liveUrl')}
                  placeholder="https://example.com"
                />
              </div>

              <div className="space-y-2">
                <Label>GitHub URL</Label>
                <Input
                  type="url"
                  {...register('githubUrl')}
                  placeholder="https://github.com/..."
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label>Tech Stack (comma separated)</Label>
              <Input
                {...register('techStack', { required: 'Tech stack is required' })}
                placeholder="Next.js, React, Tailwind CSS, PostgreSQL"
              />
              {errors.techStack && (
                <p className="text-sm text-destructive">{errors.techStack.message}</p>
              )}
            </div>

            <div className="flex items-center gap-3">
              <input
                type="checkbox"
                id="featured"
                {...register('featured')}
                className="w-5 h-5 rounded bg-muted border-border text-primary focus:ring-primary"
              />
              <Label htmlFor="featured" className="cursor-pointer">
                Mark as Featured Project
              </Label>
            </div>

            <DialogFooter>
              <Button
                type="button"
                variant="glass"
                onClick={() => setShowModal(false)}
              >
                Cancel
              </Button>
              <Button 
                type="submit" 
                variant="gradient"
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Saving...
                  </>
                ) : (
                  editingProject ? 'Update Project' : 'Add Project'
                )}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
