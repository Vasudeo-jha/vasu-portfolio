'use client';

import { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { ExternalLink, ArrowRight, Star } from 'lucide-react';
import { GithubIcon } from '@/components/ui/Icons';
import { projectsData as fallbackProjects } from '@/lib/data';

function ProjectCard({ project, index, isInView }) {
  const [isHovered, setIsHovered] = useState(false);
  const isFeatured = project.isFeatured || project.featured;
  const techStack = project.techStack || [];
  const description = project.shortDescription || project.description || '';

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="group relative"
    >
      <div className="glass-card-np overflow-hidden card-hover">
        {/* Image Container */}
        <div className="relative h-64 overflow-hidden">
          {/* Placeholder gradient */}
          <div className="absolute inset-0 bg-gradient-to-br from-blue-600/40 to-purple-600/40 flex items-center justify-center">
            <span className="text-6xl opacity-50">🖼️</span>
          </div>

          {/* Featured Badge */}
          {isFeatured && (
            <div className="absolute top-4 left-4 z-10">
              <span className="flex items-center gap-1 px-3! py-1.5! rounded-full text-xs font-semibold bg-gradient-to-r from-yellow-500 to-orange-500 text-white shadow-lg">
                <Star className="w-3 h-3 fill-current" />
                Featured
              </span>
            </div>
          )}

          {/* Overlay on Hover */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: isHovered ? 1 : 0 }}
            className="absolute inset-0 bg-gradient-to-t from-[var(--bg-primary)] via-[var(--bg-primary)]/80 to-transparent flex items-end justify-center pb-6!"
          >
            <div className="flex gap-3">
              {project.liveUrl && (
                <motion.a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex items-center gap-2 px-5! py-2.5! rounded-xl bg-gradient-to-r from-blue-500 to-purple-600 text-white text-sm font-medium shadow-lg"
                >
                  <ExternalLink className="w-4 h-4" />
                  Live Demo
                </motion.a>
              )}
              {project.githubUrl && (
                <motion.a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex items-center gap-2 px-5! py-2.5! rounded-xl bg-white/10 backdrop-blur-sm border border-white/20 text-white text-sm font-medium"
                >
                  <GithubIcon className="w-4 h-4" />
                  GitHub
                </motion.a>
              )}
            </div>
          </motion.div>
        </div>

        {/* Content */}
        <div className="p-6!">
          <h3 className="text-xl font-bold mb-3 group-hover:text-white transition-colors">
            {project.title}
          </h3>
          <p className="text-gray-400 text-sm leading-relaxed mb-4 line-clamp-2">
            {description}
          </p>

          {/* Tech Stack */}
          <div className="flex flex-wrap gap-2 mb-4">
            {techStack.slice(0, 4).map((tech) => (
              <span
                key={tech}
                className="px-3! py-1! rounded-full text-xs font-medium bg-white/5 border border-white/10 text-gray-300"
              >
                {tech}
              </span>
            ))}
            {techStack.length > 4 && (
              <span className="px-3! py-1! rounded-full text-xs font-medium bg-white/5 border border-white/10 text-gray-400">
                +{techStack.length - 4} more
              </span>
            )}
          </div>

          {/* View Details Link */}
          {project.liveUrl ? (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm font-medium text-blue-400 hover:text-blue-300 transition-colors group/link cursor-pointer"
            >
              View Details
              <ExternalLink className="w-4 h-4 group-hover/link:translate-x-1 transition-transform" />
            </a>
          ) : (
            <Link
              href={`/projects/${project.slug}`}
              className="inline-flex items-center gap-2 text-sm font-medium text-blue-400 hover:text-blue-300 transition-colors group/link"
            >
              View Details
              <ArrowRight className="w-4 h-4 group-hover/link:translate-x-1 transition-transform" />
            </Link>
          )}
        </div>
      </div>
    </motion.div>
  );
}

export default function ProjectsSection({ projects }) {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' });
  const [showAll, setShowAll] = useState(false);

  // Use passed projects or fallback
  const projectsToShow = projects && projects.length > 0 ? projects : fallbackProjects;
  
  const featuredProjects = projectsToShow.filter(p => p.isFeatured || p.featured);
  const displayedProjects = showAll ? projectsToShow : (featuredProjects.length > 0 ? featuredProjects : projectsToShow.slice(0, 6));

  return (
    <section id="projects" ref={sectionRef} className="section relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 right-0 w-[500px] h-[500px] bg-blue-500/10 rounded-full blur-[150px]" />
        <div className="absolute bottom-1/4 left-0 w-[500px] h-[500px] bg-purple-500/10 rounded-full blur-[150px]" />
      </div>

      <div className="container mx-auto px-6! relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="badge-gradient mb-4 inline-block">Portfolio</span>
          <h2 className="section-title">
            Featured <span className="gradient-text">Projects</span>
          </h2>
          <p className="section-subtitle mx-auto mt-4">
            A showcase of my best work, demonstrating my skills and passion for building great products.
          </p>
        </motion.div>

        {/* Projects Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {displayedProjects.map((project, index) => (
            <ProjectCard
              key={project.id}
              project={project}
              index={index}
              isInView={isInView}
            />
          ))}
        </div>

        {/* Show More Button */}
        {!showAll && projectsToShow.length > displayedProjects.length && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="text-center mt-12"
          >
            <button
              onClick={() => setShowAll(true)}
              className="btn-secondary"
            >
              View All Projects
              <ArrowRight className="w-4 h-4" />
            </button>
          </motion.div>
        )}
      </div>
    </section>
  );
}
