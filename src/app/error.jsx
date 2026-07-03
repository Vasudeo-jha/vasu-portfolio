'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { RefreshCcw, Home } from 'lucide-react';

export default function Error({ error, reset }) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-red-500/10 rounded-full blur-[150px]" />
        <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-orange-500/10 rounded-full blur-[150px]" />
      </div>

      <div className="text-center relative z-10 px-6">
        {/* Error Icon */}
        <div className="w-24 h-24 rounded-full bg-red-500/20 flex items-center justify-center mx-auto mb-8">
          <span className="text-5xl">⚠️</span>
        </div>
        
        <h2 className="text-2xl sm:text-3xl font-bold mb-4">
          Something went wrong!
        </h2>
        
        <p className="text-gray-400 max-w-md mx-auto mb-8">
          An unexpected error occurred. We apologize for the inconvenience. 
          Please try again or return to the home page.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <button onClick={reset} className="btn-primary">
            <RefreshCcw className="w-5 h-5" />
            Try Again
          </button>
          <Link href="/" className="btn-secondary">
            <Home className="w-5 h-5" />
            Go Home
          </Link>
        </div>
      </div>
    </div>
  );
}
