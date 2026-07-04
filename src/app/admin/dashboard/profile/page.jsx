'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';
import { Save, Upload, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';

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
          github: data.github || '',
          linkedin: data.linkedin || '',
          twitter: data.twitter || '',
          website: data.website || '',
          resumeUrl: data.resumeUrl || '',
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
    <div className="max-w-4xl mx-auto space-y-6 sm:space-y-8">
      {/* Page Header */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold">Profile</h1>
        <p className="text-sm sm:text-base text-muted-foreground mt-1">Manage your personal information</p>
      </div>

      <motion.form
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-8"
      >
        {/* Avatar Section */}
        <Card>
          <CardContent className="pt-6">
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
                <p className="text-sm text-muted-foreground mt-1">
                  JPG, PNG or GIF. Max size 2MB.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Basic Info */}
        <Card>
          <CardContent className="pt-6">
            <h2 className="text-xl font-bold mb-6">Basic Information</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label>Full Name</Label>
                <Input
                  {...register('name', { required: 'Name is required' })}
                />
                {errors.name && (
                  <p className="text-sm text-destructive">{errors.name.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label>Job Title</Label>
                <Input
                  {...register('title', { required: 'Title is required' })}
                />
                {errors.title && (
                  <p className="text-sm text-destructive">{errors.title.message}</p>
                )}
              </div>

              <div className="md:col-span-2 space-y-2">
                <Label>Subtitle / Roles (comma separated)</Label>
                <Input
                  {...register('subtitle')}
                  placeholder="React Developer, Next.js Developer, ..."
                />
              </div>

              <div className="md:col-span-2 space-y-2">
                <Label>Description</Label>
                <Textarea
                  rows={4}
                  {...register('description', { required: 'Description is required' })}
                />
                {errors.description && (
                  <p className="text-sm text-destructive">{errors.description.message}</p>
                )}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Contact Info */}
        <Card>
          <CardContent className="pt-6">
            <h2 className="text-xl font-bold mb-6">Contact Information</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label>Email</Label>
                <Input
                  type="email"
                  {...register('email', { required: 'Email is required' })}
                />
                {errors.email && (
                  <p className="text-sm text-destructive">{errors.email.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label>Phone</Label>
                <Input {...register('phone')} />
              </div>

              <div className="md:col-span-2 space-y-2">
                <Label>Location</Label>
                <Input {...register('location')} />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Social Links */}
        <Card>
          <CardContent className="pt-6">
            <h2 className="text-xl font-bold mb-6">Social Links</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label>GitHub URL</Label>
                <Input
                  type="url"
                  {...register('github')}
                  placeholder="https://github.com/username"
                />
              </div>

              <div className="space-y-2">
                <Label>LinkedIn URL</Label>
                <Input
                  type="url"
                  {...register('linkedin')}
                  placeholder="https://linkedin.com/in/username"
                />
              </div>

              <div className="space-y-2">
                <Label>Twitter URL</Label>
                <Input
                  type="url"
                  {...register('twitter')}
                  placeholder="https://twitter.com/username"
                />
              </div>

              <div className="space-y-2">
                <Label>Website URL</Label>
                <Input
                  type="url"
                  {...register('website')}
                  placeholder="https://yourwebsite.com"
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Resume */}
        <Card>
          <CardContent className="pt-6">
            <h2 className="text-xl font-bold mb-6">Resume</h2>
            <div className="space-y-2">
              <Label>Resume URL (PDF link)</Label>
              <Input
                type="url"
                {...register('resumeUrl')}
                placeholder="https://drive.google.com/file/d/.../view or direct PDF link"
              />
              <p className="text-sm text-muted-foreground">
                Upload your resume to Google Drive, Dropbox, or any file hosting and paste the link here.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Submit Button */}
        <div className="flex justify-end">
          <Button
            type="submit"
            variant="gradient"
            disabled={isLoading}
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
          </Button>
        </div>
      </motion.form>
    </div>
  );
}
