'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';
import { Save, Upload, Loader2 } from 'lucide-react';

export default function AboutPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [isFetching, setIsFetching] = useState(true);
  const [imagePreview, setImagePreview] = useState(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  // Fetch about data on mount
  useEffect(() => {
    fetchAbout();
  }, []);

  const fetchAbout = async () => {
    try {
      const response = await fetch('/api/about');
      if (response.ok) {
        const data = await response.json();
        reset({
          title: data.title || '',
          content: data.content || '',
          yearsExperience: data.yearsExperience || 0,
          projectsCompleted: data.projectsCompleted || 0,
          happyClients: data.happyClients || 0,
          technologies: data.technologies || 0,
        });
        if (data.imageUrl) {
          setImagePreview(data.imageUrl);
        }
      }
    } catch (error) {
      console.error('Failed to fetch about:', error);
    } finally {
      setIsFetching(false);
    }
  };

  const onSubmit = async (data) => {
    setIsLoading(true);
    try {
      const response = await fetch('/api/about', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...data,
          yearsExperience: parseInt(data.yearsExperience) || 0,
          projectsCompleted: parseInt(data.projectsCompleted) || 0,
          happyClients: parseInt(data.happyClients) || 0,
          technologies: parseInt(data.technologies) || 0,
          imageUrl: imagePreview,
        }),
      });

      if (response.ok) {
        toast.success('About section updated successfully!');
      } else {
        const error = await response.json();
        toast.error(error.error || 'Failed to update about section');
      }
    } catch (error) {
      toast.error('Failed to update about section');
    } finally {
      setIsLoading(false);
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  if (isFetching) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="w-8 h-8 animate-spin text-blue-500" />
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Page Header */}
      <div>
        <h1 className="text-3xl font-bold">About Section</h1>
        <p className="text-gray-400 mt-1">Manage your About Me section content and image</p>
      </div>

      <motion.form
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-8"
      >
        {/* About Image Section */}
        <div className="glass-card">
          <h2 className="text-xl font-bold mb-6">About Section Image</h2>
          <p className="text-sm text-gray-400 mb-4">
            This image will be displayed in the About Me section (separate from profile avatar).
          </p>
          <div className="flex items-start gap-6">
            <div className="relative">
              <div className="w-32 h-32 rounded-2xl bg-gradient-to-br from-blue-500/30 to-purple-600/30 flex items-center justify-center text-5xl overflow-hidden border border-white/10">
                {imagePreview ? (
                  <img src={imagePreview} alt="About" className="w-full h-full object-cover" />
                ) : (
                  '👨‍💻'
                )}
              </div>
              <label className="absolute -bottom-2 -right-2 w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center cursor-pointer hover:bg-blue-600 transition-colors">
                <Upload className="w-5 h-5" />
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="hidden"
                />
              </label>
            </div>
            <div className="flex-1">
              <p className="font-medium">Upload About Section Image</p>
              <p className="text-sm text-gray-400 mt-1">
                JPG, PNG or GIF. Recommended: Square image (1:1 ratio). Max size 2MB.
              </p>
              {imagePreview && (
                <button
                  type="button"
                  onClick={() => setImagePreview(null)}
                  className="mt-3 text-sm text-red-400 hover:text-red-300 transition-colors"
                >
                  Remove Image
                </button>
              )}
            </div>
          </div>
        </div>

        {/* About Content */}
        <div className="glass-card">
          <h2 className="text-xl font-bold mb-6">About Content</h2>
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Section Title
              </label>
              <input
                type="text"
                {...register('title')}
                className="input-glass"
                placeholder="About Me"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                About Content
              </label>
              <textarea
                rows={6}
                {...register('content', { required: 'Content is required' })}
                className="input-glass resize-none"
                placeholder="Write about yourself, your journey, passions, and what drives you..."
              />
              {errors.content && (
                <p className="mt-2 text-sm text-red-400">{errors.content.message}</p>
              )}
              <p className="text-xs text-gray-500 mt-2">
                Tip: Use double line breaks (press Enter twice) to create paragraphs.
              </p>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="glass-card">
          <h2 className="text-xl font-bold mb-6">Statistics</h2>
          <p className="text-sm text-gray-400 mb-6">
            These numbers will be displayed in the About section cards.
          </p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Years Experience
              </label>
              <input
                type="number"
                min="0"
                {...register('yearsExperience')}
                className="input-glass"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Projects Completed
              </label>
              <input
                type="number"
                min="0"
                {...register('projectsCompleted')}
                className="input-glass"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Happy Clients
              </label>
              <input
                type="number"
                min="0"
                {...register('happyClients')}
                className="input-glass"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Technologies
              </label>
              <input
                type="number"
                min="0"
                {...register('technologies')}
                className="input-glass"
              />
            </div>
          </div>
        </div>

        {/* Submit Button */}
        <div className="flex justify-end">
          <button
            type="submit"
            disabled={isLoading}
            className="btn-primary disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {isLoading ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                Saving...
              </>
            ) : (
              <>
                <Save className="w-5 h-5" />
                Save Changes
              </>
            )}
          </button>
        </div>
      </motion.form>
    </div>
  );
}
