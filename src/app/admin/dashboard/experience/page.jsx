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
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Experience</h1>
          <p className="text-gray-400 mt-1">Manage your work experience</p>
        </div>
        {!showForm && (
          <button
            onClick={() => setShowForm(true)}
            className="btn-primary"
          >
            <Plus className="w-5 h-5" />
            Add Experience
          </button>
        )}
      </div>

      {/* Form */}
      <AnimatePresence>
        {showForm && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="glass-card"
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold">
                {editingId ? 'Edit Experience' : 'Add New Experience'}
              </h2>
              <button
                onClick={handleCancel}
                className="p-2 rounded-xl hover:bg-white/10 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Company *
                  </label>
                  <input
                    type="text"
                    {...register('company', { required: 'Company is required' })}
                    className="input-glass"
                    placeholder="Google"
                  />
                  {errors.company && (
                    <p className="mt-2 text-sm text-red-400">{errors.company.message}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Position *
                  </label>
                  <input
                    type="text"
                    {...register('position', { required: 'Position is required' })}
                    className="input-glass"
                    placeholder="Senior Frontend Developer"
                  />
                  {errors.position && (
                    <p className="mt-2 text-sm text-red-400">{errors.position.message}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Employment Type
                  </label>
                  <select
                    {...register('employmentType')}
                    className="input-glass"
                  >
                    <option value="Full-time">Full-time</option>
                    <option value="Part-time">Part-time</option>
                    <option value="Contract">Contract</option>
                    <option value="Freelance">Freelance</option>
                    <option value="Internship">Internship</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Location
                  </label>
                  <input
                    type="text"
                    {...register('location')}
                    className="input-glass"
                    placeholder="San Francisco, CA"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Start Date *
                  </label>
                  <input
                    type="date"
                    {...register('startDate', { required: 'Start date is required' })}
                    className="input-glass"
                  />
                  {errors.startDate && (
                    <p className="mt-2 text-sm text-red-400">{errors.startDate.message}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    End Date
                  </label>
                  <input
                    type="date"
                    {...register('endDate')}
                    className="input-glass"
                    disabled={isCurrent}
                  />
                </div>

                <div className="md:col-span-2 flex items-center gap-3">
                  <input
                    type="checkbox"
                    id="isCurrent"
                    {...register('isCurrent')}
                    className="w-5 h-5 rounded border-white/20 bg-white/5"
                  />
                  <label htmlFor="isCurrent" className="text-sm font-medium text-gray-300">
                    I currently work here
                  </label>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Company Logo URL
                  </label>
                  <input
                    type="url"
                    {...register('logoUrl')}
                    className="input-glass"
                    placeholder="https://example.com/logo.png"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Company Website URL
                  </label>
                  <input
                    type="url"
                    {...register('companyUrl')}
                    className="input-glass"
                    placeholder="https://company.com"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Description *
                  </label>
                  <textarea
                    rows={4}
                    {...register('description', { required: 'Description is required' })}
                    className="input-glass resize-none"
                    placeholder="Describe your responsibilities and achievements..."
                  />
                  {errors.description && (
                    <p className="mt-2 text-sm text-red-400">{errors.description.message}</p>
                  )}
                </div>
              </div>

              <div className="flex justify-end gap-3">
                <button
                  type="button"
                  onClick={handleCancel}
                  className="btn-secondary"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="btn-primary disabled:opacity-70"
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
                </button>
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Experience List */}
      <div className="space-y-4">
        {experiences.length === 0 ? (
          <div className="glass-card text-center py-12">
            <Briefcase className="w-12 h-12 mx-auto text-gray-500 mb-4" />
            <p className="text-gray-400">No experience added yet</p>
            <p className="text-sm text-gray-500 mt-1">
              Click "Add Experience" to add your work history
            </p>
          </div>
        ) : (
          experiences.map((exp, index) => (
            <motion.div
              key={exp.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="glass-card"
            >
              <div className="flex items-start gap-4">
                {/* Logo */}
                <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-blue-500/20 to-purple-500/20 flex items-center justify-center flex-shrink-0 overflow-hidden">
                  {exp.logoUrl ? (
                    <img src={exp.logoUrl} alt={exp.company} className="w-full h-full object-cover" />
                  ) : (
                    <Briefcase className="w-6 h-6 text-blue-400" />
                  )}
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <h3 className="text-lg font-semibold">{exp.position}</h3>
                      <p className="text-blue-400">{exp.company}</p>
                      <div className="flex flex-wrap items-center gap-3 mt-2 text-sm text-gray-400">
                        {exp.employmentType && (
                          <span className="px-2 py-0.5 rounded-full bg-white/5 text-xs">
                            {exp.employmentType}
                          </span>
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
                      <button
                        onClick={() => handleEdit(exp)}
                        className="p-2 rounded-xl bg-white/5 hover:bg-white/10 transition-colors"
                      >
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(exp.id)}
                        className="p-2 rounded-xl bg-white/5 hover:bg-red-500/20 text-gray-400 hover:text-red-400 transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  <p className="text-gray-400 mt-3 text-sm line-clamp-2">
                    {exp.description}
                  </p>
                </div>
              </div>
            </motion.div>
          ))
        )}
      </div>
    </div>
  );
}
