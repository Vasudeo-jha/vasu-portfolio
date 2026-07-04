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
    <div className="max-w-4xl mx-auto space-y-6 sm:space-y-8">
      {/* Page Header */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold">About Section</h1>
        <p className="text-sm sm:text-base text-muted-foreground mt-1">Manage your About Me section content and image</p>
      </div>

      <motion.form
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-8"
      >
        {/* About Image Section */}
        <Card>
          <CardContent className="pt-6">
            <h2 className="text-xl font-bold mb-6">About Section Image</h2>
            <p className="text-sm text-muted-foreground mb-4">
              This image will be displayed in the About Me section (separate from profile avatar).
            </p>
            <div className="flex items-start gap-6">
              <div className="relative">
                <div className="w-32 h-32 rounded-2xl bg-gradient-to-br from-blue-500/30 to-purple-600/30 flex items-center justify-center text-5xl overflow-hidden border border-border">
                  {imagePreview ? (
                    <img src={imagePreview} alt="About" className="w-full h-full object-cover" />
                  ) : (
                    '👨‍💻'
                  )}
                </div>
                <label className="absolute -bottom-2 -right-2 w-10 h-10 rounded-full bg-primary flex items-center justify-center cursor-pointer hover:bg-primary/80 transition-colors">
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
                <p className="text-sm text-muted-foreground mt-1">
                  JPG, PNG or GIF. Recommended: Square image (1:1 ratio). Max size 2MB.
                </p>
                {imagePreview && (
                  <button
                    type="button"
                    onClick={() => setImagePreview(null)}
                    className="mt-3 text-sm text-destructive hover:text-destructive/80 transition-colors"
                  >
                    Remove Image
                  </button>
                )}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* About Content */}
        <Card>
          <CardContent className="pt-6">
            <h2 className="text-xl font-bold mb-6">About Content</h2>
            <div className="space-y-6">
              <div className="space-y-2">
                <Label>Section Title</Label>
                <Input
                  {...register('title')}
                  placeholder="About Me"
                />
              </div>

              <div className="space-y-2">
                <Label>About Content</Label>
                <Textarea
                  rows={6}
                  {...register('content', { required: 'Content is required' })}
                  placeholder="Write about yourself, your journey, passions, and what drives you..."
                />
                {errors.content && (
                  <p className="text-sm text-destructive">{errors.content.message}</p>
                )}
                <p className="text-xs text-muted-foreground">
                  Tip: Use double line breaks (press Enter twice) to create paragraphs.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Stats */}
        <Card>
          <CardContent className="pt-6">
            <h2 className="text-xl font-bold mb-6">Statistics</h2>
            <p className="text-sm text-muted-foreground mb-6">
              These numbers will be displayed in the About section cards.
            </p>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="space-y-2">
                <Label>Years Experience</Label>
                <Input
                  type="number"
                  min="0"
                  {...register('yearsExperience')}
                />
              </div>

              <div className="space-y-2">
                <Label>Projects Completed</Label>
                <Input
                  type="number"
                  min="0"
                  {...register('projectsCompleted')}
                />
              </div>

              <div className="space-y-2">
                <Label>Happy Clients</Label>
                <Input
                  type="number"
                  min="0"
                  {...register('happyClients')}
                />
              </div>

              <div className="space-y-2">
                <Label>Technologies</Label>
                <Input
                  type="number"
                  min="0"
                  {...register('technologies')}
                />
              </div>
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
