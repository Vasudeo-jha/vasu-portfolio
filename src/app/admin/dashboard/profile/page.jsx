'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';
import { Save, Upload, Loader2 } from 'lucide-react';

export default function ProfilePage() {
  const [isLoading, setIsLoading] = useState(false);
  const [isFetching, setIsFetching] = useState(true);
  const [avatarPreview, setAvatarPreview] = useState(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  // Fetch profile on mount
  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const response = await fetch('/api/profile');
      if (response.ok) {
        const data = await response.json();
        reset({
          name: data.name || '',
          title: data.title || '',
          subtitle: data.subtitle || '',
          description: data.description || '',
          email: data.email || '',
          phone: data.phone || '',
          location: data.location || '',
        });
        if (data.avatarUrl) {
          setAvatarPreview(data.avatarUrl);
        }
      }
    } catch (error) {
      console.error('Failed to fetch profile:', error);
    } finally {
      setIsFetching(false);
    }
  };

  const onSubmit = async (data) => {
    setIsLoading(true);
    try {
      const response = await fetch('/api/profile', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...data,
          avatarUrl: avatarPreview,
        }),
      });

      if (response.ok) {
        toast.success('Profile updated successfully!');
      } else {
        const error = await response.json();
        toast.error(error.error || 'Failed to update profile');
      }
    } catch (error) {
      toast.error('Failed to update profile');
    } finally {
      setIsLoading(false);
    }
  };

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatarPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Page Header */}
      <div>
        <h1 className="text-3xl font-bold">Profile</h1>
        <p className="text-gray-400 mt-1">Manage your personal information</p>
      </div>

      <motion.form
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-8"
      >
        {/* Avatar Section */}
        <div className="glass-card">
          <h2 className="text-xl font-bold mb-6">Profile Picture</h2>
          <div className="flex items-center gap-6">
            <div className="relative">
              <div className="w-24 h-24 rounded-2xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-4xl overflow-hidden">
                {avatarPreview ? (
                  <img src={avatarPreview} alt="Avatar" className="w-full h-full object-cover" />
                ) : (
                  '👨‍💻'
                )}
              </div>
              <label className="absolute -bottom-2 -right-2 w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center cursor-pointer hover:bg-blue-600 transition-colors">
                <Upload className="w-4 h-4" />
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleAvatarChange}
                  className="hidden"
                />
              </label>
            </div>
            <div>
              <p className="font-medium">Upload a new photo</p>
              <p className="text-sm text-gray-400 mt-1">
                JPG, PNG or GIF. Max size 2MB.
              </p>
            </div>
          </div>
        </div>

        {/* Basic Info */}
        <div className="glass-card">
          <h2 className="text-xl font-bold mb-6">Basic Information</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Full Name
              </label>
              <input
                type="text"
                {...register('name', { required: 'Name is required' })}
                className="input-glass"
              />
              {errors.name && (
                <p className="mt-2 text-sm text-red-400">{errors.name.message}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Job Title
              </label>
              <input
                type="text"
                {...register('title', { required: 'Title is required' })}
                className="input-glass"
              />
              {errors.title && (
                <p className="mt-2 text-sm text-red-400">{errors.title.message}</p>
              )}
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Subtitle / Roles (comma separated)
              </label>
              <input
                type="text"
                {...register('subtitle')}
                className="input-glass"
                placeholder="React Developer, Next.js Developer, ..."
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Description
              </label>
              <textarea
                rows={4}
                {...register('description', { required: 'Description is required' })}
                className="input-glass resize-none"
              />
              {errors.description && (
                <p className="mt-2 text-sm text-red-400">{errors.description.message}</p>
              )}
            </div>
          </div>
        </div>

        {/* Contact Info */}
        <div className="glass-card">
          <h2 className="text-xl font-bold mb-6">Contact Information</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Email
              </label>
              <input
                type="email"
                {...register('email', { required: 'Email is required' })}
                className="input-glass"
              />
              {errors.email && (
                <p className="mt-2 text-sm text-red-400">{errors.email.message}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Phone
              </label>
              <input
                type="text"
                {...register('phone')}
                className="input-glass"
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Location
              </label>
              <input
                type="text"
                {...register('location')}
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
