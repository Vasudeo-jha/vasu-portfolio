'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Calendar, Briefcase, Award, Code } from 'lucide-react';
import { aboutData as fallbackAbout } from '@/lib/data';

function AnimatedCounter({ value, suffix = '' }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  
  return (
    <span ref={ref} className="gradient-text text-4xl font-bold">
      {isInView ? value : 0}{suffix}
    </span>
  );
}

export default function AboutSection({ profile }) {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' });
  
  // Use profile data or fallback
  const data = profile || fallbackAbout;

  const stats = [
    { 
      icon: Calendar, 
      value: fallbackAbout.stats?.yearsExperience || 3, 
      label: 'Years Experience',
      suffix: '+'
    },
    { 
      icon: Briefcase, 
      value: fallbackAbout.stats?.projectsCompleted || 25, 
      label: 'Projects Completed',
      suffix: '+'
    },
    { 
      icon: Award, 
      value: fallbackAbout.stats?.happyClients || 15, 
      label: 'Happy Clients',
      suffix: '+'
    },
    { 
      icon: Code, 
      value: fallbackAbout.stats?.technologies || 20, 
      label: 'Technologies',
      suffix: '+'
    },
  ];

  return (
    <section id="about" ref={sectionRef} className="section relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-0 w-[400px] h-[400px] bg-blue-500/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-0 right-1/4 w-[300px] h-[300px] bg-purple-500/10 rounded-full blur-[120px]" />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="badge-gradient mb-4 inline-block">About Me</span>
          <h2 className="section-title">
            Get to Know <span className="gradient-text">Me Better</span>
          </h2>
          <p className="section-subtitle mx-auto mt-4">
            Discover my journey, skills, and what drives me to create exceptional digital experiences.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left - Image */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative"
          >
            <div className="relative max-w-md mx-auto lg:mx-0">
              {/* Gradient Background */}
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-3xl blur-2xl" />
              
              {/* Main Card */}
              <div className="relative glass-card">
                {/* Profile Image */}
                <div className="aspect-square rounded-2xl bg-gradient-to-br from-blue-600/30 to-purple-600/30 flex items-center justify-center mb-6 overflow-hidden">
                  {data.avatarUrl ? (
                    <img 
                      src={data.avatarUrl} 
                      alt={data.name || 'Profile'}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <span className="text-9xl">👨‍💻</span>
                  )}
                </div>

                {/* Quick Info */}
                <div className="space-y-4">
                  <div className="flex items-center gap-3 text-gray-300">
                    <div className="w-10 h-10 rounded-xl bg-blue-500/20 flex items-center justify-center">
                      📍
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Location</p>
                      <p className="font-medium">{data.location || 'India'}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 text-gray-300">
                    <div className="w-10 h-10 rounded-xl bg-purple-500/20 flex items-center justify-center">
                      🎓
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Education</p>
                      <p className="font-medium">B.Tech in Computer Science</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 text-gray-300">
                    <div className="w-10 h-10 rounded-xl bg-green-500/20 flex items-center justify-center">
                      💼
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Status</p>
                      <p className="font-medium text-green-400">Open to Work</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Decorative Elements */}
              <div className="absolute -top-4 -right-4 w-24 h-24 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl -z-10 opacity-60" />
              <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-gradient-to-br from-purple-500 to-blue-600 rounded-2xl -z-10 opacity-40" />
            </div>
          </motion.div>

          {/* Right - Content */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <h3 className="text-2xl font-bold mb-6">
              A Passionate Developer Building the Future of Web
            </h3>
            
            <div className="space-y-4 text-gray-400 leading-relaxed mb-10">
              {(data.content || data.description || fallbackAbout.content).split('\n\n').map((paragraph, index) => (
                <p key={index}>{paragraph}</p>
              ))}
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 gap-4">
              {stats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.6 + index * 0.1 }}
                  className="glass-card-sm text-center group hover:bg-white/10 transition-all duration-300"
                >
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500/20 to-purple-500/20 flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                    <stat.icon className="w-6 h-6 text-blue-400" />
                  </div>
                  <AnimatedCounter value={stat.value} suffix={stat.suffix} />
                  <p className="text-gray-400 text-sm mt-2">{stat.label}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
