'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { MapPin, Calendar, Building2, ExternalLink } from 'lucide-react';
import { experienceData as fallbackExperience } from '@/lib/data';

function formatDate(dateString) {
  if (!dateString) return 'Present';
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
}

function ExperienceCard({ experience, index, isInView, isLast }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
      animate={isInView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.2 }}
      className="relative flex gap-8"
    >
      {/* Timeline Line & Dot */}
      <div className="hidden md:flex flex-col items-center">
        <div className="timeline-dot z-10" />
        {!isLast && (
          <div className="w-0.5 flex-1 bg-gradient-to-b from-blue-500 to-purple-500 opacity-30" />
        )}
      </div>

      {/* Card */}
      <div className="flex-1 glass-card mb-8 group card-hover">
        {/* Header */}
        <div className="flex flex-wrap items-start justify-between gap-4 mb-6">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500/20 to-purple-500/20 flex items-center justify-center">
                <Building2 className="w-6 h-6 text-blue-400" />
              </div>
              <div>
                <h3 className="text-xl font-bold group-hover:text-white transition-colors">
                  {experience.position}
                </h3>
                {experience.companyUrl ? (
                  <a
                    href={experience.companyUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-400 hover:text-blue-400 transition-colors flex items-center gap-1.5 cursor-pointer"
                  >
                    {experience.company}
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                ) : (
                  <p className="text-gray-400">{experience.company}</p>
                )}
              </div>
            </div>
          </div>

          {/* Date Badge */}
          <div className="flex items-center gap-2 px-4! py-2! rounded-full bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-blue-500/20">
            <Calendar className="w-4 h-4 text-blue-400" />
            <span className="text-sm text-gray-300">
              {formatDate(experience.startDate)} - {formatDate(experience.endDate)}
            </span>
          </div>
        </div>

        {/* Description */}
        <p className="text-gray-400 leading-relaxed mb-6">
          {experience.description}
        </p>

        {/* Footer */}
        <div className="flex flex-wrap items-center gap-4 pt-4! border-t border-white/5">
          {experience.location && (
            <span className="flex items-center gap-2 text-sm text-gray-500">
              <MapPin className="w-4 h-4" />
              {experience.location}
            </span>
          )}
          {experience.isCurrent && (
            <span className="px-3! py-1! rounded-full text-xs font-medium bg-green-500/20 text-green-400 border border-green-500/30">
              Current Position
            </span>
          )}
        </div>
      </div>
    </motion.div>
  );
}

export default function ExperienceSection({ experiences }) {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' });

  // Use passed experiences or fallback
  const experienceList = experiences && experiences.length > 0 ? experiences : fallbackExperience;

  return (
    <section id="experience" ref={sectionRef} className="section relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/3 left-1/4 w-[400px] h-[400px] bg-blue-500/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-1/3 right-1/4 w-[400px] h-[400px] bg-purple-500/10 rounded-full blur-[120px]" />
      </div>

      <div className="container mx-auto px-6! relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="badge-gradient mb-4 inline-block">Experience</span>
          <h2 className="section-title">
            My Professional <span className="gradient-text">Journey</span>
          </h2>
          <p className="section-subtitle mx-auto mt-4">
            A timeline of my career progression and the impactful work I&apos;ve done.
          </p>
        </motion.div>

        {/* Timeline */}
        <div className="max-w-4xl mx-auto">
          {experienceList.map((exp, index) => (
            <ExperienceCard
              key={exp.id}
              experience={exp}
              index={index}
              isInView={isInView}
              isLast={index === experienceList.length - 1}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
