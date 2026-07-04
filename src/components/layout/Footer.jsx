'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { Mail, Heart, ArrowUp } from 'lucide-react';
import { GithubIcon, LinkedinIcon, TwitterIcon } from '@/components/ui/Icons';
import { navLinks, profileData as fallbackProfile } from '@/lib/data';

export default function Footer({ profile }) {
  const data = profile || fallbackProfile;
  
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative bg-[var(--bg-secondary)] border-t border-white/5">
      {/* Gradient Glow */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-[120px]" />
      </div>

      <div className="container mx-auto px-6! py-16! relative">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center font-bold text-xl shadow-lg shadow-purple-500/25">
                {data.name?.split(' ').map(n => n[0]).join('') || 'VJ'}
              </div>
              <div>
                <h3 className="font-semibold text-xl">{data.name || 'Vasu Jha'}</h3>
                <p className="text-sm text-gray-400">{data.title || 'Frontend Developer'}</p>
              </div>
            </Link>
            <p className="text-gray-400 max-w-md mb-6 leading-relaxed">
              {data.description?.slice(0, 150) || "Passionate about creating beautiful, performant web experiences. Let's build something amazing together."}
            </p>
            <div className="flex gap-3">
              {[
                data.github && { icon: GithubIcon, href: data.github },
                data.linkedin && { icon: LinkedinIcon, href: data.linkedin },
                data.twitter && { icon: TwitterIcon, href: data.twitter },
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
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold text-lg mb-6">Quick Links</h4>
            <ul className="space-y-3">
              {navLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-gray-400 hover:text-white transition-colors duration-300"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold text-lg mb-6">Contact</h4>
            <ul className="space-y-4">
              <li>
                <a
                  href={`mailto:${data.email || 'contact@vasujha.dev'}`}
                  className="text-gray-400 hover:text-white transition-colors duration-300 flex items-center gap-2"
                >
                  <Mail className="w-4 h-4" />
                  {data.email || 'contact@vasujha.dev'}
                </a>
              </li>
              <li className="text-gray-400">
                📍 {data.location || 'New Delhi, India'}
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-16 pt-8! border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-gray-400 text-sm flex flex-wrap items-center justify-center sm:justify-start gap-1">
            <span>© {currentYear} {data.name || 'Vasu Jha'}.</span>
            <span className="flex items-center gap-1">
              Made with <Heart className="w-4 h-4 text-red-500 fill-red-500" /> using Next.js
            </span>
          </p>
          
          {/* Back to Top Button */}
          <motion.button
            onClick={scrollToTop}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center gap-2 px-4! py-2! rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 text-sm font-medium transition-all duration-300"
          >
            <ArrowUp className="w-4 h-4" />
            Back to Top
          </motion.button>
        </div>
      </div>
    </footer>
  );
}
