'use client';

import { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';
import { Send, Mail, Phone, MapPin, Loader2 } from 'lucide-react';
import { profileData as fallbackProfile, socialLinksData } from '@/lib/data';

export default function ContactSection({ profile }) {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Use passed profile or fallback
  const data = profile || fallbackProfile;

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = async (formData) => {
    setIsSubmitting(true);
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        toast.success('Message sent successfully!');
        reset();
      } else {
        toast.error('Failed to send message. Please try again.');
      }
    } catch (error) {
      toast.error('Something went wrong. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const contactInfo = [
    { icon: Mail, label: 'Email', value: data.email, href: `mailto:${data.email}` },
    { icon: Phone, label: 'Phone', value: data.phone, href: data.phone ? `tel:${data.phone}` : null },
    { icon: MapPin, label: 'Location', value: data.location, href: null },
  ];

  return (
    <section id="contact" ref={sectionRef} className="section relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-0 w-[500px] h-[500px] bg-blue-500/10 rounded-full blur-[150px]" />
        <div className="absolute bottom-1/4 right-0 w-[500px] h-[500px] bg-purple-500/10 rounded-full blur-[150px]" />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="badge-gradient mb-4 inline-block">Get in Touch</span>
          <h2 className="section-title">
            Let&apos;s Work <span className="gradient-text">Together</span>
          </h2>
          <p className="section-subtitle mx-auto mt-4">
            Have a project in mind? I&apos;d love to hear from you. Send me a message and let&apos;s create something amazing.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="glass-card">
              <h3 className="text-2xl font-bold mb-6">Send a Message</h3>
              
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                {/* Name */}
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2">
                    Your Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    {...register('name', { required: 'Name is required' })}
                    className="input-glass"
                    placeholder="John Doe"
                  />
                  {errors.name && (
                    <p className="mt-2 text-sm text-red-400">{errors.name.message}</p>
                  )}
                </div>

                {/* Email */}
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                    Your Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    {...register('email', {
                      required: 'Email is required',
                      pattern: {
                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                        message: 'Invalid email address',
                      },
                    })}
                    className="input-glass"
                    placeholder="john@example.com"
                  />
                  {errors.email && (
                    <p className="mt-2 text-sm text-red-400">{errors.email.message}</p>
                  )}
                </div>

                {/* Subject */}
                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-gray-300 mb-2">
                    Subject
                  </label>
                  <input
                    type="text"
                    id="subject"
                    {...register('subject', { required: 'Subject is required' })}
                    className="input-glass"
                    placeholder="Project Inquiry"
                  />
                  {errors.subject && (
                    <p className="mt-2 text-sm text-red-400">{errors.subject.message}</p>
                  )}
                </div>

                {/* Message */}
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-2">
                    Message
                  </label>
                  <textarea
                    id="message"
                    rows={5}
                    {...register('message', { required: 'Message is required' })}
                    className="input-glass resize-none"
                    placeholder="Tell me about your project..."
                  />
                  {errors.message && (
                    <p className="mt-2 text-sm text-red-400">{errors.message.message}</p>
                  )}
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="btn-primary w-full justify-center disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      Sending...
                    </>
                  ) : (
                    <>
                      <Send className="w-5 h-5" />
                      Send Message
                    </>
                  )}
                </button>
              </form>
            </div>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="space-y-8"
          >
            {/* Info Cards */}
            <div className="space-y-4">
              {contactInfo.map((info, index) => (
                <motion.div
                  key={info.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.5 + index * 0.1 }}
                  className="glass-card-sm flex items-center gap-4 group card-hover"
                >
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-500/20 to-purple-500/20 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <info.icon className="w-6 h-6 text-blue-400" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 mb-1">{info.label}</p>
                    {info.href ? (
                      <a
                        href={info.href}
                        className="text-lg font-medium hover:text-blue-400 transition-colors"
                      >
                        {info.value}
                      </a>
                    ) : (
                      <p className="text-lg font-medium">{info.value}</p>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Social Links */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.8 }}
              className="glass-card"
            >
              <h3 className="text-xl font-bold mb-4">Connect With Me</h3>
              <p className="text-gray-400 mb-6">
                Follow me on social media to stay updated with my latest projects and insights.
              </p>
              <div className="flex flex-wrap gap-3">
                {socialLinksData.map((social) => (
                  <a
                    key={social.platform}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 text-sm font-medium transition-all duration-300 hover:-translate-y-1"
                  >
                    {social.platform}
                  </a>
                ))}
              </div>
            </motion.div>

            {/* Availability */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.9 }}
              className="glass-card-sm p-6 border-l-4 border-green-500"
            >
              <div className="flex items-center gap-3 mb-2">
                <span className="w-3 h-3 rounded-full bg-green-500 animate-pulse" />
                <p className="font-semibold text-green-400">Available for Work</p>
              </div>
              <p className="text-gray-400 text-sm">
                I&apos;m currently open to new opportunities. Let&apos;s discuss how I can help with your project!
              </p>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
