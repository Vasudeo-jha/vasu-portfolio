'use client';

import { useEffect, useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { Mail, ArrowDown, Download, Eye } from 'lucide-react';
import { GithubIcon, LinkedinIcon } from '@/components/ui/Icons';
import Link from 'next/link';
import Image from 'next/image';
import { profileData as fallbackProfile } from '@/lib/data';

const floatingTechs = [
  { name: 'PostgreSQL', color: '#336791', position: { top: '10%', right: '12%' }, delay: 0 },
  { name: 'Next.js', color: '#ffffff', position: { top: '22%', right: '28%' }, delay: 0.5 },
  { name: 'Node.js', color: '#339933', position: { top: '35%', right: '5%' }, delay: 1 },
  { name: 'JavaScript', color: '#F7DF1E', position: { bottom: '25%', right: '8%' }, delay: 1.5 },
  { name: 'Tailwind', color: '#38BDF8', position: { bottom: '12%', right: '22%' }, delay: 2 },
  { name: 'React', color: '#61DAFB', position: { bottom: '35%', right: '25%' }, delay: 2.5 },
];

export default function HeroSection({ profile }) {
  // Use passed profile or fallback
  const data = profile || fallbackProfile;
  // Parse roles from subtitle - support both | and , separators
  const roles = data.subtitle 
    ? data.subtitle.split(/[|,]/).map(r => r.trim()).filter(Boolean)
    : fallbackProfile.roles;
  
  const [currentRole, setCurrentRole] = useState(0);
  const [displayText, setDisplayText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const heroRef = useRef(null);

  // Typing animation
  useEffect(() => {
    const currentText = roles[currentRole];
    
    const timeout = setTimeout(() => {
      if (!isDeleting) {
        if (displayText.length < currentText.length) {
          setDisplayText(currentText.slice(0, displayText.length + 1));
        } else {
          setTimeout(() => setIsDeleting(true), 2000);
        }
      } else {
        if (displayText.length > 0) {
          setDisplayText(displayText.slice(0, -1));
        } else {
          setIsDeleting(false);
          setCurrentRole((prev) => (prev + 1) % roles.length);
        }
      }
    }, isDeleting ? 50 : 100);

    return () => clearTimeout(timeout);
  }, [displayText, isDeleting, currentRole, roles]);

  // Mouse movement effect
  useEffect(() => {
    const handleMouseMove = (e) => {
      if (heroRef.current) {
        const rect = heroRef.current.getBoundingClientRect();
        setMousePosition({
          x: (e.clientX - rect.left - rect.width / 2) / 50,
          y: (e.clientY - rect.top - rect.height / 2) / 50,
        });
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <section
      id="home"
      ref={heroRef}
      className="min-h-screen flex items-center justify-center relative overflow-hidden pt-20!"
    >
      {/* Background Effects */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-blue-500/20 rounded-full blur-[120px] animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-purple-500/20 rounded-full blur-[120px] animate-pulse" style={{ animationDelay: '1s' }} />
        
        {/* Grid Pattern */}
        <div 
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
                              linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
            backgroundSize: '50px 50px'
          }}
        />
      </div>

      <div className="container mx-auto px-6! relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
          >
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 px-4! py-2! rounded-full bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-blue-500/20 mb-8"
            >
              <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
              <span className="text-sm text-[var(--text-secondary)]">Available for work</span>
            </motion.div>

            {/* Heading */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold leading-tight mb-4"
            >
              Hi, I&apos;m{' '}
              <span className="gradient-text">{data.name}</span>{' '}
              <span className="inline-block animate-wave">👋</span>
            </motion.h1>

            {/* Subtitle */}
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-xl sm:text-2xl lg:text-3xl text-gray-300 mb-2"
            >
              {data.title}
            </motion.h2>

            {/* Typing Animation */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="text-lg sm:text-xl text-gray-400 mb-6 h-8"
            >
              <span className="typing-cursor">{displayText}</span>
            </motion.div>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="text-gray-400 text-lg max-w-xl mb-10 leading-relaxed"
            >
              {data.description}
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
              className="flex flex-nowrap gap-2 sm:gap-4 mb-10"
            >
              <Link href="#projects" className="btn-primary !px-4 !py-2.5 sm:!px-8 sm:!py-3.5 text-sm sm:text-[15px]">
                <Eye className="w-4 h-4 sm:w-5 sm:h-5" />
                Projects
              </Link>
              {(data.resumeUrl || true) && (
                <a 
                  href={data.resumeUrl || '/vasu-resume.pdf'} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="btn-secondary !px-4 !py-2.5 sm:!px-8 sm:!py-3.5 text-sm sm:text-[15px]"
                >
                  <Download className="w-4 h-4 sm:w-5 sm:h-5" />
                  Resume
                </a>
              )}
            </motion.div>

            {/* Social Icons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              className="flex items-center gap-4"
            >
              <span className="text-gray-500 text-sm">Connect with me:</span>
              <div className="flex gap-3">
                {[
                  data.github && { icon: GithubIcon, href: data.github },
                  data.linkedin && { icon: LinkedinIcon, href: data.linkedin },
                  { icon: Mail, href: `mailto:${data.email || 'contact@vasujha.dev'}` },
                ].filter(Boolean).map((social, index) => (
                  <motion.a
                    key={index}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.1, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    className="w-11 h-11 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center hover:bg-white/10 hover:border-white/20 transition-all duration-300"
                  >
                    <social.icon className="w-5 h-5" />
                  </motion.a>
                ))}
              </div>
            </motion.div>
          </motion.div>

          {/* Right Content - Profile Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="relative flex justify-center lg:justify-end"
            style={{
              transform: `translate(${mousePosition.x}px, ${mousePosition.y}px)`,
              transition: 'transform 0.1s ease-out'
            }}
          >
            {/* Glow Circle */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-[350px] h-[350px] sm:w-[400px] sm:h-[400px] rounded-full bg-gradient-to-br from-blue-500/30 to-purple-500/30 blur-3xl animate-pulse-glow" />
            </div>

            {/* Profile Image Container */}
            <div className="relative w-[300px] h-[300px] sm:w-[350px] sm:h-[350px] lg:w-[400px] lg:h-[400px]">
              {/* Gradient Border Ring */}
              <div className="absolute inset-0 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 p-1! animate-spin-slow">
                <div className="w-full h-full rounded-full bg-[var(--bg-primary)]" />
              </div>

              {/* Image */}
              <div className="absolute inset-3 rounded-full overflow-hidden bg-gradient-to-br from-blue-500/20 to-purple-500/20">
                {data.avatarUrl ? (
                  <img 
                    src={data.avatarUrl} 
                    alt={data.name || 'Profile'}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full bg-gradient-to-br from-blue-600/40 to-purple-600/40 flex items-center justify-center">
                    <span className="text-8xl">👨‍💻</span>
                  </div>
                )}
              </div>

              {/* Floating Tech Cards */}
              {floatingTechs.map((tech, index) => (
                <motion.div
                  key={tech.name}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 1 + tech.delay * 0.2, type: 'spring' }}
                  className="absolute glass-card-sm px-2! py-1.5! sm:px-3! sm:py-2! flex items-center gap-1.5 sm:gap-2"
                  style={{
                    ...tech.position,
                    animation: `float ${4 + index * 0.5}s ease-in-out infinite`,
                    animationDelay: `${tech.delay}s`
                  }}
                >
                  <div
                    className="w-2 h-2 sm:w-3 sm:h-3 rounded-full"
                    style={{ backgroundColor: tech.color }}
                  />
                  <span className="text-xs sm:text-sm font-medium whitespace-nowrap">{tech.name}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.a
        href="#about"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 cursor-pointer"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="flex flex-col items-center gap-2 text-gray-400 hover:text-white transition-colors"
        >
          <span className="text-sm">Scroll Down</span>
          <ArrowDown className="w-5 h-5" />
        </motion.div>
      </motion.a>

      <style jsx>{`
        @keyframes animate-wave {
          0%, 100% { transform: rotate(0deg); }
          25% { transform: rotate(20deg); }
          75% { transform: rotate(-20deg); }
        }
        .animate-wave {
          animation: animate-wave 1s ease-in-out infinite;
          transform-origin: 70% 70%;
        }
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .animate-spin-slow {
          animation: spin-slow 20s linear infinite;
        }
      `}</style>
    </section>
  );
}
