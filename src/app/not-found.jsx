'use client';

import Link from 'next/link';
import { Home, ArrowLeft } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-blue-500/10 rounded-full blur-[150px]" />
        <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-purple-500/10 rounded-full blur-[150px]" />
      </div>

      <div className="text-center relative z-10 px-6!">
        {/* 404 Text */}
        <h1 className="text-[150px] sm:text-[200px] font-bold leading-none gradient-text mb-4">
          404
        </h1>
        
        <h2 className="text-2xl sm:text-3xl font-bold mb-4">
          Page Not Found
        </h2>
        
        <p className="text-gray-400 max-w-md mx-auto mb-8">
          Oops! The page you&apos;re looking for doesn&apos;t exist or has been moved. 
          Let&apos;s get you back on track.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link href="/" className="btn-primary">
            <Home className="w-5 h-5" />
            Go Home
          </Link>
          <button 
            onClick={() => window.history.back()} 
            className="btn-secondary"
          >
            <ArrowLeft className="w-5 h-5" />
            Go Back
          </button>
        </div>
      </div>
    </div>
  );
}
