'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { skillsData as fallbackSkills } from '@/lib/data';

// Tech icons mapping (using emoji fallbacks)
const techIcons = {
  'React.js': '⚛️',
  'React': '⚛️',
  'Next.js': '▲',
  'JavaScript': '🟨',
  'TypeScript': '🔷',
  'Tailwind CSS': '💨',
  'Tailwind': '💨',
  'Redux Toolkit': '🔄',
  'Redux': '🔄',
  'Node.js': '🟢',
  'Node': '🟢',
  'PostgreSQL': '🐘',
  'Postgres': '🐘',
  'Prisma ORM': '◼️',
  'Prisma': '◼️',
  'Git': '📦',
  'GitHub': '📦',
  'Figma': '🎨',
  'REST APIs': '🔌',
  'API': '🔌',
  'HTML': '🔶',
  'CSS': '🔵',
  'Python': '🐍',
  'Java': '☕',
  'MongoDB': '🍃',
  'MySQL': '🐬',
  'Docker': '🐳',
  'AWS': '☁️',
  'Firebase': '🔥',
};

function SkillCard({ skill, index, isInView }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.08 }}
      className="glass-card-sm group card-hover"
    >
      {/* Icon & Name */}
      <div className="flex items-center gap-4 mb-4">
        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500/20 to-purple-500/20 flex items-center justify-center text-2xl group-hover:scale-110 transition-transform duration-300">
          {techIcons[skill.name] || '💻'}
        </div>
        <div className="flex-1">
          <h3 className="font-semibold text-lg group-hover:text-white transition-colors">
            {skill.name}
          </h3>
          <p className="text-sm text-gray-500">{skill.category}</p>
        </div>
        <span className="text-2xl font-bold gradient-text">{skill.percentage}%</span>
      </div>

      {/* Progress Bar */}
      <div className="progress-bar">
        <motion.div
          initial={{ width: 0 }}
          animate={isInView ? { width: `${skill.percentage}%` } : { width: 0 }}
          transition={{ duration: 1, delay: 0.5 + index * 0.08, ease: [0.4, 0, 0.2, 1] }}
          className="progress-bar-fill"
        />
      </div>
    </motion.div>
  );
}

export default function SkillsSection({ skills }) {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' });

  // Use passed skills or fallback
  const skillsToShow = skills && skills.length > 0 ? skills : fallbackSkills;
  
  // Group skills by category
  const categories = [...new Set(skillsToShow.map(skill => skill.category))];

  return (
    <section id="skills" ref={sectionRef} className="section relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-purple-500/10 rounded-full blur-[150px]" />
        <div className="absolute bottom-1/4 left-0 w-[400px] h-[400px] bg-blue-500/10 rounded-full blur-[120px]" />
      </div>

      <div className="container mx-auto px-6! relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="badge-gradient mb-4 inline-block">My Skills</span>
          <h2 className="section-title">
            Technologies I <span className="gradient-text">Work With</span>
          </h2>
          <p className="section-subtitle mx-auto mt-4">
            A comprehensive overview of my technical skills and proficiency levels in various technologies.
          </p>
        </motion.div>

        {/* Skills Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {skillsToShow.map((skill, index) => (
            <SkillCard
              key={skill.id || skill.name}
              skill={skill}
              index={index}
              isInView={isInView}
            />
          ))}
        </div>

        {/* Category Tags */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="flex flex-wrap justify-center gap-3 mt-12"
        >
          {categories.map((category) => (
            <span
              key={category}
              className="px-4! py-2! rounded-full text-sm font-medium bg-white/5 border border-white/10 text-gray-400"
            >
              {category}
            </span>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
