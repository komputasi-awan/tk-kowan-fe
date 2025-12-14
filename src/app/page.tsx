"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { DocumentIcon, SparklesIcon, ChartBarIcon } from "@/components/Icons";

export default function LandingPage() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);

  // Check auth state on mount
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setIsLoggedIn(!!user);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  return (
    <div className="min-h-screen relative overflow-hidden bg-slate-50 flex flex-col">
      {/* Background Blobs - Simplified on mobile, full on desktop */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-100 h-100 sm:w-150 sm:h-150 lg:w-200 lg:h-200 animate-float">
          <div className="absolute inset-0 rounded-full bg-linear-to-bl from-blue-600/15 sm:from-blue-600/25 via-indigo-500/8 sm:via-indigo-500/15 to-transparent blur-[50px] sm:blur-[100px]" />
        </div>
        <div className="absolute -bottom-40 -left-20 w-75 h-75 sm:w-100 sm:h-100 lg:w-150 lg:h-150 animate-float-delayed">
          <div className="absolute inset-0 rounded-full bg-linear-to-tr from-cyan-600/10 sm:from-cyan-600/20 via-blue-500/5 sm:via-blue-500/10 to-transparent blur-[50px] sm:blur-[100px]" />
        </div>
      </div>

      {/* Simple Navbar */}
      <nav className="relative z-10 px-4 sm:px-6 py-4 sm:py-6 flex justify-between items-center max-w-7xl mx-auto w-full">
        <div className="flex items-center gap-1.5 sm:gap-2">
          <div className="w-7 h-7 sm:w-8 sm:h-8 bg-linear-to-br from-blue-600 to-indigo-700 rounded-lg flex items-center justify-center text-white shadow-lg shadow-blue-900/20">
            <DocumentIcon className="w-4 h-4 sm:w-5 sm:h-5" />
          </div>
          <span className="text-lg sm:text-xl font-bold text-slate-800 tracking-tight">CV Scorer</span>
        </div>
        
        {loading ? (
           <div className="w-12 sm:w-16 h-4 sm:h-5" />
        ) : !isLoggedIn ? (
          <Link 
            href="/login" 
            className="text-xs sm:text-sm font-semibold text-slate-600 hover:text-blue-600 transition-colors hover:scale-105 active:scale-95 px-2 py-1 rounded-lg hover:bg-blue-50"
          >
            Sign In
          </Link>
        ) : null} 
        {/* ^ If isLoggedIn == true, return null (empty) */}
      </nav>

      {/* Hero Section */}
      <main className="relative z-10 flex-1 flex flex-col items-center justify-center text-center px-4 sm:px-6 lg:px-8 py-8 sm:py-12 md:py-16 lg:pb-20 animate-fade-in">
        
        <div className="inline-flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-3 py-1 rounded-full bg-blue-50 border border-blue-100 text-blue-600 text-[10px] sm:text-xs font-semibold uppercase tracking-wide mb-4 sm:mb-6 animate-slide-up hover:bg-blue-100 transition-colors cursor-default">
          <SparklesIcon className="w-2.5 h-2.5 sm:w-3 sm:h-3 animate-pulse-slow" />
          <span>Powered by AI Gemini</span>
        </div>

        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-slate-900 tracking-tight mb-4 sm:mb-6 max-w-4xl leading-tight animate-slide-up-delay-1">
          Optimize Your Resume <br className="hidden sm:block" />
          <span className="sm:hidden"> </span><span className="text-transparent bg-clip-text bg-linear-to-r from-blue-600 to-indigo-600">
            Pass the ATS Check
          </span>
        </h1>

        <p className="text-sm sm:text-base md:text-lg text-slate-600 mb-6 sm:mb-8 md:mb-10 max-w-xs sm:max-w-md md:max-w-2xl leading-relaxed animate-slide-up-delay-2 px-2 sm:px-0">
          Stop guessing why you're not getting interviews. Upload your CV and job description to get an instant match score and actionable feedback.
        </p>

        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 w-full sm:w-auto animate-slide-up-delay-3 max-w-sm sm:max-w-none">
          
          {loading ? (
             <button className="px-6 sm:px-8 py-3 sm:py-4 bg-slate-200 text-slate-400 font-bold rounded-xl animate-pulse cursor-wait w-full sm:w-auto text-sm sm:text-base">
               Loading...
             </button>
          ) : isLoggedIn ? (
            <Link 
              href="/dashboard" 
              className="px-6 sm:px-8 py-3 sm:py-4 bg-linear-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold rounded-xl shadow-lg shadow-blue-600/25 transition-all hover:scale-105 active:scale-95 flex items-center justify-center gap-2 group w-full sm:w-auto text-sm sm:text-base"
            >
              Go to Dashboard
            </Link>
          ) : (
            <>
              <Link 
                href="/register" 
                className="px-6 sm:px-8 py-3 sm:py-4 bg-linear-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold rounded-xl shadow-lg shadow-blue-600/25 transition-all hover:scale-105 active:scale-95 flex items-center justify-center gap-1.5 sm:gap-2 group w-full sm:w-auto text-sm sm:text-base"
              >
                <ChartBarIcon className="w-4 h-4 sm:w-5 sm:h-5 group-hover:rotate-12 transition-transform" />
                <span className="hidden xs:inline">Analyze My CV Now</span>
                <span className="xs:hidden">Analyze CV</span>
              </Link>
              <Link 
                href="/login" 
                className="px-6 sm:px-8 py-3 sm:py-4 bg-white text-slate-700 font-bold rounded-xl border border-slate-200 hover:bg-slate-50 hover:border-slate-300 transition-all hover:scale-105 active:scale-95 flex items-center justify-center w-full sm:w-auto text-sm sm:text-base"
              >
                Sign In
              </Link>
            </>
          )}

        </div>

      </main>
    </div>
  );
}