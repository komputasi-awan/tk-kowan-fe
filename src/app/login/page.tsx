"use client";

import { useState, useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "@/lib/firebase"; 
import { useRouter } from "next/navigation";
import Link from "next/link";
import { authService } from "@/services/authService";
import { 
  DocumentIcon, GoogleIcon, EyeIcon, EyeOffIcon, 
  LockIcon, ErrorIcon, Spinner, ChartIcon, TargetIcon 
} from "@/components/Icons";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loadingEmail, setLoadingEmail] = useState(false);
  const [loadingGoogle, setLoadingGoogle] = useState(false);
  const [loadingAuth, setLoadingAuth] = useState(true);

  const isLoading = loadingEmail || loadingGoogle;

  // Logic Redirect (UI/Session Logic)
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        router.replace("/dashboard"); 
      } else {
        setLoadingAuth(false);
      }
    });
    return () => unsubscribe();
  }, [router]);

  if (loadingAuth) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <Spinner className="w-8 h-8 text-blue-600" />
      </div>
    );
  }

  const handleEmailLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoadingEmail(true);
    setError("");

    try {
      await authService.signInWithEmail(email, password); 
      router.push("/dashboard");
    } catch (err: any) {
      setError(err.message); 
    } finally {
      setLoadingEmail(false);
    }
  };

  const handleGoogleLogin = async () => {
    setLoadingGoogle(true);
    setError("");

    try {
      await authService.signInWithGoogle(); 
      router.push("/dashboard");
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoadingGoogle(false);
    }
  };

  return (
    <div className="min-h-screen relative overflow-hidden bg-slate-50 flex flex-col items-center justify-center py-4 px-4 sm:py-6 md:py-8">
      {/* Gradient Blobs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -left-40 w-200 h-200">
          <div className="absolute inset-0 rounded-full bg-linear-to-br from-blue-600/25 via-blue-500/15 to-transparent blur-[100px]" />
        </div>
        <div className="absolute -top-20 -right-32 w-175 h-175">
          <div className="absolute inset-0 rounded-full bg-linear-to-bl from-indigo-600/20 via-indigo-500/10 to-transparent blur-[100px]" />
        </div>
        <div className="absolute -bottom-40 -left-20 w-150 h-150">
          <div className="absolute inset-0 rounded-full bg-linear-to-tr from-cyan-500/15 via-sky-400/10 to-transparent blur-[100px]" />
        </div>
        <div className="absolute -bottom-32 -right-40 w-187.5 h-187.5">
          <div className="absolute inset-0 rounded-full bg-linear-to-tl from-blue-700/20 via-indigo-600/10 to-transparent blur-[100px]" />
        </div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-250 h-250">
          <div className="absolute inset-0 rounded-full bg-linear-to-r from-blue-400/5 via-transparent to-indigo-400/5 blur-[120px]" />
        </div>
      </div>

      {/* Floating Glassmorphism Elements - Simplified on mobile */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="hidden md:flex absolute top-20 left-[8%] w-14 h-14 bg-white/60 backdrop-blur-xl rounded-2xl border border-slate-200/60 shadow-lg shadow-blue-900/10 items-center justify-center rotate-12">
          <div className="w-7 h-7 rounded-xl bg-linear-to-br from-blue-500 to-blue-700" />
        </div>
        <div className="hidden md:flex absolute top-28 right-[10%] w-12 h-12 bg-white/60 backdrop-blur-xl rounded-xl border border-slate-200/60 shadow-lg shadow-indigo-900/10 items-center justify-center -rotate-6">
          <div className="w-6 h-6 rounded-lg bg-linear-to-br from-indigo-500 to-indigo-700" />
        </div>
        <div className="hidden lg:flex absolute top-1/2 left-[4%] -translate-y-1/2 w-16 h-16 bg-white/50 backdrop-blur-xl rounded-2xl border border-slate-200/50 shadow-xl shadow-blue-900/10 items-center justify-center rotate-6">
          <DocumentIcon className="w-8 h-8 text-blue-600" />
        </div>
        <div className="hidden md:flex absolute bottom-28 left-[10%] w-14 h-14 bg-white/60 backdrop-blur-xl rounded-2xl border border-slate-200/60 shadow-lg shadow-cyan-900/10 items-center justify-center -rotate-12">
          <TargetIcon className="w-7 h-7 text-cyan-600" />
        </div>
        <div className="hidden md:flex absolute bottom-36 right-[8%] w-12 h-12 bg-white/60 backdrop-blur-xl rounded-xl border border-slate-200/60 shadow-lg shadow-indigo-900/10 items-center justify-center rotate-12">
          <ChartIcon className="w-6 h-6 text-indigo-600" />
        </div>
        <div className="hidden lg:flex absolute top-1/3 right-[5%] w-10 h-10 bg-white/50 backdrop-blur-xl rounded-xl border border-slate-200/50 shadow-lg shadow-blue-900/10 items-center justify-center -rotate-6">
          <div className="w-5 h-5 rounded-md bg-linear-to-br from-sky-400 to-cyan-600" />
        </div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 w-full max-w-sm sm:max-w-md md:max-w-lg lg:max-w-115 flex flex-col items-center">
        
        <div className="flex items-center gap-2 sm:gap-3 mb-4 sm:mb-6">
          <div className="w-10 h-10 sm:w-12 sm:h-12 bg-linear-to-br from-blue-600 to-indigo-700 rounded-xl flex items-center justify-center shadow-lg shadow-blue-900/20">
            <DocumentIcon className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
          </div>
          <span className="text-xl sm:text-2xl font-bold text-slate-800 tracking-tight font-heading">
            CV Scorer
          </span>
        </div>

        <div className="w-full bg-white/80 backdrop-blur-2xl rounded-2xl shadow-2xl shadow-slate-900/10 border border-slate-200/60 p-4 sm:p-6 md:p-8">
          {/* Header */}
          <div className="text-center mb-4 sm:mb-6">
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight mb-1 sm:mb-2 font-heading">
              Welcome Back
            </h1>
            <p className="text-slate-500 text-xs sm:text-sm">
              Sign in to access your CV scoring dashboard
            </p>
          </div>

          {error && (
            <div role="alert" className="flex items-center gap-2 sm:gap-3 bg-red-50 text-red-700 p-2 sm:p-3 rounded-xl border border-red-200 mb-4 sm:mb-5">
              <ErrorIcon className="w-4 h-4 sm:w-5 sm:h-5 shrink-0" />
              <p className="text-xs sm:text-sm font-medium">{error}</p>
            </div>
          )}

          <button
            type="button"
            onClick={handleGoogleLogin}
            disabled={isLoading}
            className="w-full flex items-center justify-center gap-2 sm:gap-3 bg-white hover:bg-slate-50 border border-slate-300 text-slate-700 font-medium py-2.5 sm:py-3 rounded-xl transition-all duration-200 shadow-sm hover:shadow-md hover:border-slate-400 disabled:opacity-50 disabled:cursor-not-allowed mb-4 sm:mb-5"
          >
            {loadingGoogle ? (
              <Spinner className="text-slate-500" />
            ) : (
              <GoogleIcon className="w-4 h-4 sm:w-5 sm:h-5" />
            )}
            <span className="text-xs sm:text-sm">{loadingGoogle ? "Signing in..." : "Continue with Google"}</span>
          </button>

          <div className="relative mb-4 sm:mb-5">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-slate-200" />
            </div>
            <div className="relative flex justify-center">
              <span className="px-3 sm:px-4 bg-white/80 text-[10px] sm:text-xs text-slate-400 font-medium">
                or continue with email
              </span>
            </div>
          </div>

          <form onSubmit={handleEmailLogin} className="space-y-3 sm:space-y-4">
            <div className="space-y-1 sm:space-y-1.5">
              <label htmlFor="email" className="block text-xs sm:text-sm font-semibold text-slate-700">Email Address</label>
              <input
                id="email"
                type="email"
                required
                autoComplete="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={isLoading}
                placeholder="name@company.com"
                className="w-full px-3 sm:px-4 py-2.5 sm:py-3 text-sm sm:text-base text-slate-500 bg-slate-50 border border-slate-200 rounded-xl outline-none transition-all duration-200 placeholder:text-slate-400 focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 disabled:opacity-50 disabled:cursor-not-allowed"
              />
            </div>

            <div className="space-y-1 sm:space-y-1.5">
              <div className="flex justify-between items-center">
                <label htmlFor="password" className="block text-xs sm:text-sm font-semibold text-slate-700">Password</label>
              </div>
              <div className="relative">
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  required
                  autoComplete="current-password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  disabled={isLoading}
                  placeholder="Enter your password"
                  className="w-full px-3 sm:px-4 py-2.5 sm:py-3 text-sm sm:text-base text-slate-500 bg-slate-50 border border-slate-200 rounded-xl outline-none transition-all duration-200 placeholder:text-slate-400 focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 disabled:opacity-50 disabled:cursor-not-allowed"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  disabled={isLoading}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                  className="absolute right-3 sm:right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors disabled:cursor-not-allowed"
                >
                  {showPassword ? <EyeOffIcon className="w-4 h-4 sm:w-5 sm:h-5" /> : <EyeIcon className="w-4 h-4 sm:w-5 sm:h-5" />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full flex items-center justify-center gap-1.5 sm:gap-2 bg-linear-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold py-2.5 sm:py-3 rounded-xl transition-all duration-200 shadow-lg shadow-blue-600/25 hover:shadow-blue-700/30 disabled:opacity-50 disabled:cursor-not-allowed mt-2"
            >
              {loadingEmail ? (
                <>
                  <Spinner className="text-white/80" />
                  <span className="text-xs sm:text-sm">Signing in...</span>
                </>
              ) : (
                <span className="text-xs sm:text-sm">Sign In</span>
              )}
            </button>
          </form>

          <p className="text-center text-slate-600 mt-4 sm:mt-5 text-xs sm:text-sm">
            Don&apos;t have an account? {" "}
            <Link href="/register" className="text-blue-600 hover:text-blue-700 font-semibold transition-colors">
              Create account
            </Link>
          </p>
        </div>
        
        <div className="flex items-center gap-1.5 sm:gap-2 mt-4 sm:mt-6 text-slate-400 text-[10px] sm:text-xs">
          <LockIcon className="w-2.5 h-2.5 sm:w-3 sm:h-3" />
          <span>Secured with 256-bit encryption</span>
        </div>
      </div>
    </div>
  );
}