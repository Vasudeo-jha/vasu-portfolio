'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';
import { Plus, Trash2, GripVertical, Loader2 } from 'lucide-react';

export default function SkillsPage() {
  const [skills, setSkills] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isFetching, setIsFetching] = useState(true);
  const [showAddModal, setShowAddModal] = useState(false);

  const { register, handleSubmit, reset, formState: { errors } } = useForm();

  // Fetch skills on mount
  useEffect(() => {
    fetchSkills();
  }, []);

  const fetchSkills = async () => {
    try {
      const response = await fetch('/api/skills');
      if (response.ok) {
        const data = await response.json();
        setSkills(data);
      }
    } catch (error) {
      console.error('Failed to fetch skills:', error);
    } finally {
      setIsFetching(false);
    }
  };

  const handleAddSkill = async (data) => {
    setIsLoading(true);
    try {
      const response = await fetch('/api/skills', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: data.name,
          percentage: parseInt(data.percentage),
          category: data.category,
        }),
      });

      if (response.ok) {
        const newSkill = await response.json();
        setSkills([...skills, newSkill]);
        setShowAddModal(false);
        reset();
        toast.success('Skill added successfully!');
      } else {
        const error = await response.json();
        toast.error(error.error || 'Failed to add skill');
      }
    } catch (error) {
      toast.error('Failed to add skill');
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteSkill = async (id, index) => {
    try {
      const response = await fetch(`/api/skills/${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        setSkills(skills.filter((_, i) => i !== index));
        toast.success('Skill deleted!');
      } else {
        toast.error('Failed to delete skill');
      }
    } catch (error) {
      toast.error('Failed to delete skill');
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
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Skills</h1>
          <p className="text-gray-400 mt-1">Manage your technical skills</p>
        </div>
        <button
          onClick={() => setShowAddModal(true)}
          className="btn-primary"
        >
          <Plus className="w-5 h-5" />
          Add Skill
        </button>
      </div>

      {/* Skills List */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="glass-card"
      >
        <div className="space-y-4">
          {skills.map((skill, index) => (
            <div
              key={index}
              className="flex items-center gap-4 p-4! rounded-xl bg-white/5 hover:bg-white/10 transition-colors group"
            >
              <GripVertical className="w-5 h-5 text-gray-500 cursor-grab" />
              
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-medium">{skill.name}</span>
                  <span className="text-sm text-gray-400">{skill.percentage}%</span>
                </div>
                <div className="progress-bar">
                  <div
                    className="progress-bar-fill"
                    style={{ width: `${skill.percentage}%` }}
                  />
                </div>
              </div>

              <span className="px-3! py-1! rounded-full text-xs font-medium bg-white/5 border border-white/10 text-gray-300">
                {skill.category}
              </span>

              <button
                onClick={() => handleDeleteSkill(skill.id, index)}
                className="p-2! rounded-lg text-gray-400 hover:text-red-400 hover:bg-red-500/10 opacity-0 group-hover:opacity-100 transition-all"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          ))}
          {skills.length === 0 && (
            <p className="text-center text-gray-400 py-8!">No skills added yet. Click "Add Skill" to get started.</p>
          )}
        </div>
      </motion.div>

      {/* Add Skill Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4!">
          <div
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={() => setShowAddModal(false)}
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="relative glass-card w-full max-w-md"
          >
            <h2 className="text-xl font-bold mb-6">Add New Skill</h2>
            <form onSubmit={handleSubmit(handleAddSkill)} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Skill Name
                </label>
                <input
                  type="text"
                  {...register('name', { required: 'Name is required' })}
                  className="input-glass"
                  placeholder="e.g., React.js"
                />
                {errors.name && (
                  <p className="mt-2 text-sm text-red-400">{errors.name.message}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Proficiency (%)
                </label>
                <input
                  type="number"
                  min="0"
                  max="100"
                  {...register('percentage', {
                    required: 'Percentage is required',
                    min: { value: 0, message: 'Min is 0' },
                    max: { value: 100, message: 'Max is 100' },
                  })}
                  className="input-glass"
                  placeholder="85"
                />
                {errors.percentage && (
                  <p className="mt-2 text-sm text-red-400">{errors.percentage.message}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Category
                </label>
                <select
                  {...register('category', { required: 'Category is required' })}
                  className="input-glass"
                >
                  <option value="">Select category</option>
                  <option value="Frontend">Frontend</option>
                  <option value="Backend">Backend</option>
                  <option value="Database">Database</option>
                  <option value="Language">Language</option>
                  <option value="Tools">Tools</option>
                  <option value="Design">Design</option>
                </select>
                {errors.category && (
                  <p className="mt-2 text-sm text-red-400">{errors.category.message}</p>
                )}
              </div>

              <div className="flex gap-3 pt-4!">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="flex-1 btn-secondary justify-center"
                >
                  Cancel
                </button>
                <button type="submit" className="flex-1 btn-primary justify-center">
                  Add Skill
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </div>
  );
}
