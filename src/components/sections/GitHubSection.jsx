'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { GitCommit, Star, GitFork, Flame, Code2 } from 'lucide-react';
import { GithubIcon } from '@/components/ui/Icons';

const githubStats = {
  username: 'vasujha',
  contributions: 1247,
  repositories: 45,
  stars: 128,
  forks: 34,
  streak: 42,
  topLanguages: [
    { name: 'JavaScript', percentage: 45, color: '#f7df1e' },
    { name: 'TypeScript', percentage: 25, color: '#3178c6' },
    { name: 'CSS', percentage: 15, color: '#563d7c' },
    { name: 'HTML', percentage: 10, color: '#e34c26' },
    { name: 'Python', percentage: 5, color: '#3572a5' },
  ],
};

function StatCard({ icon: Icon, value, label, delay, isInView }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay }}
      className="glass-card-sm text-center group card-hover"
    >
      <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-500/20 to-purple-500/20 flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
        <Icon className="w-7 h-7 text-blue-400" />
      </div>
      <p className="text-3xl font-bold gradient-text mb-2">{value.toLocaleString()}</p>
      <p className="text-gray-400 text-sm">{label}</p>
    </motion.div>
  );
}

function LanguageBar({ language, index, isInView }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={isInView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
      className="flex items-center gap-4"
    >
      <div className="w-24 text-sm text-gray-300 font-medium">{language.name}</div>
      <div className="flex-1 h-3 bg-white/5 rounded-full overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={isInView ? { width: `${language.percentage}%` } : { width: 0 }}
          transition={{ duration: 1, delay: 0.5 + index * 0.1, ease: [0.4, 0, 0.2, 1] }}
          className="h-full rounded-full"
          style={{ backgroundColor: language.color }}
        />
      </div>
      <div className="w-12 text-right text-sm text-gray-400">{language.percentage}%</div>
    </motion.div>
  );
}

export default function GitHubSection() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' });

  const stats = [
    { icon: GitCommit, value: githubStats.contributions, label: 'Contributions' },
    { icon: Code2, value: githubStats.repositories, label: 'Repositories' },
    { icon: Star, value: githubStats.stars, label: 'Total Stars' },
    { icon: GitFork, value: githubStats.forks, label: 'Total Forks' },
  ];

  return (
    <section ref={sectionRef} className="section relative overflow-hidden bg-[var(--bg-secondary)]">
      {/* Background Effects */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/4 w-[400px] h-[400px] bg-blue-500/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-purple-500/10 rounded-full blur-[120px]" />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="badge-gradient mb-4 inline-block">Open Source</span>
          <h2 className="section-title">
            GitHub <span className="gradient-text">Activity</span>
          </h2>
          <p className="section-subtitle mx-auto mt-4">
            My contributions to the open-source community and coding activity.
          </p>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {stats.map((stat, index) => (
            <StatCard
              key={stat.label}
              icon={stat.icon}
              value={stat.value}
              label={stat.label}
              delay={0.1 + index * 0.1}
              isInView={isInView}
            />
          ))}
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Coding Streak */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="glass-card"
          >
            <div className="flex items-center gap-4 mb-6">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-orange-500/20 to-red-500/20 flex items-center justify-center">
                <Flame className="w-7 h-7 text-orange-400" />
              </div>
              <div>
                <h3 className="text-xl font-bold">Coding Streak</h3>
                <p className="text-gray-400 text-sm">Consecutive days of commits</p>
              </div>
            </div>
            
            <div className="flex items-end gap-4">
              <span className="text-6xl font-bold gradient-text">{githubStats.streak}</span>
              <span className="text-2xl text-gray-400 mb-2">days</span>
            </div>

            <div className="mt-6 flex gap-1">
              {Array.from({ length: 30 }).map((_, i) => (
                <div
                  key={i}
                  className={`w-3 h-3 rounded-sm ${
                    i < githubStats.streak % 30
                      ? 'bg-gradient-to-br from-green-500 to-green-600'
                      : 'bg-white/5'
                  }`}
                />
              ))}
            </div>
          </motion.div>

          {/* Top Languages */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="glass-card"
          >
            <div className="flex items-center gap-4 mb-6">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-500/20 to-purple-500/20 flex items-center justify-center">
                <Code2 className="w-7 h-7 text-blue-400" />
              </div>
              <div>
                <h3 className="text-xl font-bold">Top Languages</h3>
                <p className="text-gray-400 text-sm">Most used programming languages</p>
              </div>
            </div>

            <div className="space-y-4">
              {githubStats.topLanguages.map((lang, index) => (
                <LanguageBar
                  key={lang.name}
                  language={lang}
                  index={index}
                  isInView={isInView}
                />
              ))}
            </div>
          </motion.div>
        </div>

        {/* GitHub Profile Link */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="text-center mt-12"
        >
          <a
            href={`https://github.com/${githubStats.username}`}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary inline-flex"
          >
            <GithubIcon className="w-5 h-5" />
            View GitHub Profile
          </a>
        </motion.div>
      </div>
    </section>
  );
}
