'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';
import { 
  Plus, 
  Edit2, 
  Trash2, 
  Save, 
  X, 
  Loader2, 
  Briefcase,
  MapPin,
  Calendar 
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';

export default function ExperiencePage() {
  const [experiences, setExperiences] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [showForm, setShowForm] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm();

  const isCurrent = watch('isCurrent');

  useEffect(() => {
    fetchExperiences();
  }, []);

  const fetchExperiences = async () => {
    try {
      const response = await fetch('/api/experience');
      if (response.ok) {
        const data = await response.json();
        setExperiences(data);
      }
    } catch (error) {
      console.error('Failed to fetch experiences:', error);
      toast.error('Failed to fetch experiences');
    } finally {
      setIsLoading(false);
    }
  };

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    try {
      const url = editingId ? `/api/experience/${editingId}` : '/api/experience';
      const method = editingId ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...data,
          isCurrent: data.isCurrent || false,
          endDate: data.isCurrent ? null : data.endDate,
        }),
      });

      if (response.ok) {
        toast.success(editingId ? 'Experience updated!' : 'Experience added!');
        reset();
        setEditingId(null);
        setShowForm(false);
        fetchExperiences();
      } else {
        const error = await response.json();
        toast.error(error.error || 'Failed to save experience');
      }
    } catch (error) {
      toast.error('Failed to save experience');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleEdit = (experience) => {
    setEditingId(experience.id);
    reset({
      company: experience.company,
      companyUrl: experience.companyUrl || '',
      position: experience.position,
      employmentType: experience.employmentType,
      description: experience.description,
      startDate: experience.startDate?.split('T')[0],
      endDate: experience.endDate?.split('T')[0] || '',
      isCurrent: experience.isCurrent,
      location: experience.location || '',
      logoUrl: experience.logoUrl || '',
    });
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (!confirm('Are you sure you want to delete this experience?')) return;

    try {
      const response = await fetch(`/api/experience/${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        toast.success('Experience deleted!');
        fetchExperiences();
      } else {
        toast.error('Failed to delete experience');
      }
    } catch (error) {
      toast.error('Failed to delete experience');
    }
  };

  const handleCancel = () => {
    reset();
    setEditingId(null);
    setShowForm(false);
  };

  const formatDate = (dateString) => {
    if (!dateString) return '';
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      year: 'numeric',
    });
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="w-8 h-8 animate-spin text-blue-500" />
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6 sm:space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold">Experience</h1>
          <p className="text-sm sm:text-base text-muted-foreground mt-1">Manage your work experience</p>
        </div>
        {!showForm && (
          <Button
            onClick={() => setShowForm(true)}
            variant="gradient"
            className="w-fit"
          >
            <Plus className="w-5 h-5" />
            Add Experience
          </Button>
        )}
      </div>

      {/* Form */}
      <AnimatePresence>
        {showForm && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
          >
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-bold">
                    {editingId ? 'Edit Experience' : 'Add New Experience'}
                  </h2>
                  <Button
                    variant="ghost"
                    size="icon-sm"
                    onClick={handleCancel}
                  >
                    <X className="w-5 h-5" />
                  </Button>
                </div>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label>Company *</Label>
                      <Input
                        {...register('company', { required: 'Company is required' })}
                        placeholder="Google"
                      />
                      {errors.company && (
                        <p className="text-sm text-destructive">{errors.company.message}</p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Label>Position *</Label>
                      <Input
                        {...register('position', { required: 'Position is required' })}
                        placeholder="Senior Frontend Developer"
                      />
                      {errors.position && (
                        <p className="text-sm text-destructive">{errors.position.message}</p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Label>Employment Type</Label>
                      <select
                        {...register('employmentType')}
                        className="flex h-11 w-full rounded-xl border border-border bg-[var(--glass-bg)] px-4 py-3 text-[15px] text-foreground transition-all outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
                      >
                        <option value="Full-time">Full-time</option>
                        <option value="Part-time">Part-time</option>
                        <option value="Contract">Contract</option>
                        <option value="Freelance">Freelance</option>
                        <option value="Internship">Internship</option>
                      </select>
                    </div>

                    <div className="space-y-2">
                      <Label>Location</Label>
                      <Input
                        {...register('location')}
                        placeholder="San Francisco, CA"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label>Start Date *</Label>
                      <Input
                        type="date"
                        {...register('startDate', { required: 'Start date is required' })}
                      />
                      {errors.startDate && (
                        <p className="text-sm text-destructive">{errors.startDate.message}</p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Label>End Date</Label>
                      <Input
                        type="date"
                        {...register('endDate')}
                        disabled={isCurrent}
                      />
                    </div>

                    <div className="md:col-span-2 flex items-center gap-3">
                      <input
                        type="checkbox"
                        id="isCurrent"
                        {...register('isCurrent')}
                        className="w-5 h-5 rounded border-border bg-muted"
                      />
                      <Label htmlFor="isCurrent" className="cursor-pointer">
                        I currently work here
                      </Label>
                    </div>

                    <div className="space-y-2">
                      <Label>Company Logo URL</Label>
                      <Input
                        type="url"
                        {...register('logoUrl')}
                        placeholder="https://example.com/logo.png"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label>Company Website URL</Label>
                      <Input
                        type="url"
                        {...register('companyUrl')}
                        placeholder="https://company.com"
                      />
                    </div>

                    <div className="md:col-span-2 space-y-2">
                      <Label>Description *</Label>
                      <Textarea
                        rows={4}
                        {...register('description', { required: 'Description is required' })}
                        placeholder="Describe your responsibilities and achievements..."
                      />
                      {errors.description && (
                        <p className="text-sm text-destructive">{errors.description.message}</p>
                      )}
                    </div>
                  </div>

                  <div className="flex justify-end gap-3">
                    <Button
                      type="button"
                      variant="glass"
                      onClick={handleCancel}
                    >
                      Cancel
                    </Button>
                    <Button
                      type="submit"
                      variant="gradient"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 className="w-5 h-5 animate-spin" />
                          Saving...
                        </>
                      ) : (
                        <>
                          <Save className="w-5 h-5" />
                          {editingId ? 'Update' : 'Add'} Experience
                        </>
                      )}
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Experience List */}
      <div className="space-y-4">
        {experiences.length === 0 ? (
          <Card>
            <CardContent className="pt-12 pb-12 text-center">
              <Briefcase className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
              <p className="text-muted-foreground">No experience added yet</p>
              <p className="text-sm text-muted-foreground mt-1">
                Click "Add Experience" to add your work history
              </p>
            </CardContent>
          </Card>
        ) : (
          experiences.map((exp, index) => (
            <motion.div
              key={exp.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card>
                <CardContent className="pt-6">
                  <div className="flex items-start gap-4">
                    {/* Logo */}
                    <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-blue-500/20 to-purple-500/20 flex items-center justify-center flex-shrink-0 overflow-hidden">
                      {exp.logoUrl ? (
                        <img src={exp.logoUrl} alt={exp.company} className="w-full h-full object-cover" />
                      ) : (
                        <Briefcase className="w-6 h-6 text-primary" />
                      )}
                    </div>

                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-4">
                        <div>
                          <h3 className="text-lg font-semibold">{exp.position}</h3>
                          <p className="text-primary">{exp.company}</p>
                          <div className="flex flex-wrap items-center gap-3 mt-2 text-sm text-muted-foreground">
                            {exp.employmentType && (
                              <Badge variant="glass" className="text-xs">
                                {exp.employmentType}
                              </Badge>
                            )}
                            <span className="flex items-center gap-1">
                              <Calendar className="w-4 h-4" />
                              {formatDate(exp.startDate)} - {exp.isCurrent ? 'Present' : formatDate(exp.endDate)}
                            </span>
                            {exp.location && (
                              <span className="flex items-center gap-1">
                                <MapPin className="w-4 h-4" />
                                {exp.location}
                              </span>
                            )}
                          </div>
                        </div>

                        {/* Actions */}
                        <div className="flex gap-2 flex-shrink-0">
                          <Button
                            variant="ghost"
                            size="icon-sm"
                            onClick={() => handleEdit(exp)}
                          >
                            <Edit2 className="w-4 h-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon-sm"
                            onClick={() => handleDelete(exp.id)}
                            className="text-muted-foreground hover:text-destructive hover:bg-destructive/10"
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>

                      <p className="text-muted-foreground mt-3 text-sm line-clamp-2">
                        {exp.description}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))
        )}
      </div>
    </div>
  );
}
