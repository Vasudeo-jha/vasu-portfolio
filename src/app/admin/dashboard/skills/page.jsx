'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';
import { Plus, Trash2, GripVertical, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

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
    <div className="max-w-4xl mx-auto space-y-6 sm:space-y-8">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold">Skills</h1>
          <p className="text-sm sm:text-base text-muted-foreground mt-1">Manage your technical skills</p>
        </div>
        <Button
          onClick={() => setShowAddModal(true)}
          variant="gradient"
          className="w-fit"
        >
          <Plus className="w-5 h-5" />
          Add Skill
        </Button>
      </div>

      {/* Skills List */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <Card>
          <CardContent className="pt-6">
            <div className="space-y-4">
              {skills.map((skill, index) => (
                <div
                  key={index}
                  className="flex items-center gap-4 p-4 rounded-xl bg-muted/30 hover:bg-muted/50 transition-colors group"
                >
                  <GripVertical className="w-5 h-5 text-muted-foreground cursor-grab" />
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-medium">{skill.name}</span>
                      <span className="text-sm text-muted-foreground">{skill.percentage}%</span>
                    </div>
                    <div className="progress-bar">
                      <div
                        className="progress-bar-fill"
                        style={{ width: `${skill.percentage}%` }}
                      />
                    </div>
                  </div>

                  <Badge variant="glass">
                    {skill.category}
                  </Badge>

                  <Button
                    variant="ghost"
                    size="icon-sm"
                    onClick={() => handleDeleteSkill(skill.id, index)}
                    className="text-muted-foreground hover:text-destructive hover:bg-destructive/10 opacity-0 group-hover:opacity-100 transition-all"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              ))}
              {skills.length === 0 && (
                <p className="text-center text-muted-foreground py-8">No skills added yet. Click "Add Skill" to get started.</p>
              )}
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Add Skill Modal */}
      <Dialog open={showAddModal} onOpenChange={setShowAddModal}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add New Skill</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit(handleAddSkill)} className="space-y-4">
            <div className="space-y-2">
              <Label>Skill Name</Label>
              <Input
                {...register('name', { required: 'Name is required' })}
                placeholder="e.g., React.js"
              />
              {errors.name && (
                <p className="text-sm text-destructive">{errors.name.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label>Proficiency (%)</Label>
              <Input
                type="number"
                min="0"
                max="100"
                {...register('percentage', {
                  required: 'Percentage is required',
                  min: { value: 0, message: 'Min is 0' },
                  max: { value: 100, message: 'Max is 100' },
                })}
                placeholder="85"
              />
              {errors.percentage && (
                <p className="text-sm text-destructive">{errors.percentage.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label>Category</Label>
              <select
                {...register('category', { required: 'Category is required' })}
                className="flex h-11 w-full rounded-xl border border-border bg-[var(--glass-bg)] px-4 py-3 text-[15px] text-foreground transition-all outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
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
                <p className="text-sm text-destructive">{errors.category.message}</p>
              )}
            </div>

            <DialogFooter>
              <Button
                type="button"
                variant="glass"
                onClick={() => setShowAddModal(false)}
              >
                Cancel
              </Button>
              <Button type="submit" variant="gradient" disabled={isLoading}>
                {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : 'Add Skill'}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
