"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { onAuthStateChanged, User, signOut } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { AnalysisData } from "@/types";
import Navbar from "@/components/Navbar";
import { cvService } from "@/services/cvService";
import { 
  SparklesIcon, UploadCloudIcon, FileTextIcon, CheckCircleIcon, 
  ExclamationCircleIcon, Spinner, ChartBarIcon, ExternalLinkIcon, 
  LightBulbIcon, ClipboardListIcon 
} from "@/components/Icons";

function getScoreColor(score: number): string {
  if (score >= 75) return "text-emerald-600";
  if (score >= 50) return "text-amber-500";
  return "text-red-500";
}

function getScoreBgColor(score: number): string {
  if (score >= 75) return "from-emerald-500/10 to-emerald-500/5";
  if (score >= 50) return "from-amber-500/10 to-amber-500/5";
  return "from-red-500/10 to-red-500/5";
}

function getScoreLabel(score: number): string {
  if (score >= 75) return "Excellent Match";
  if (score >= 50) return "Good Match";
  return "Needs Improvement";
}

export default function DashboardPage() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [file, setFile] = useState<File | null>(null);
  const [jobDesc, setJobDesc] = useState("");
  const [isDragging, setIsDragging] = useState(false);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<AnalysisData | null>(null);
  const [error, setError] = useState("");

  // Auth Check
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (u) => !u ? router.push("/login") : setUser(u));
    return () => unsubscribe();
  }, [router]);

  // Handle Analyze
  const handleAnalyze = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file) return setError("Please upload a CV (PDF).");
    if (!jobDesc.trim()) return setError("Please enter the job description.");

    setLoading(true);
    setError("");
    setResult(null);

    try {
      const data = await cvService.analyze(file, user?.uid || "unknown", jobDesc);
      
      setResult(data);
    } catch (err: any) {
      console.error(err);
      setError(err.response?.data?.detail || "Failed to analyze.");
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    await signOut(auth);
    router.push("/login");
  };

  // Drag & Drop UI Logic
  const handleDragOver = (e: React.DragEvent) => { e.preventDefault(); setIsDragging(true); };
  const handleDragLeave = (e: React.DragEvent) => { e.preventDefault(); setIsDragging(false); };
  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const f = e.dataTransfer.files?.[0];
    f?.type === "application/pdf" ? setFile(f) : setError("PDF only.");
  };

  if (!user) return null;

  return (
    <div className="min-h-screen w-full bg-slate-50 relative">
      {/* Background Blobs */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute -top-40 -right-40 w-200 h-200 animate-float">
          <div className="absolute inset-0 rounded-full bg-linear-to-bl from-blue-600/25 via-blue-500/15 to-transparent blur-[100px]" />
        </div>
        <div className="absolute -bottom-40 -left-40 w-200 h-200 animate-float-delayed">
          <div className="absolute inset-0 rounded-full bg-linear-to-tr from-indigo-600/20 via-indigo-500/10 to-transparent blur-[100px]" />
        </div>
      </div>

      {/* Navbar */}
      <Navbar user={user} onLogout={handleLogout} />

      {/* Main Content */}
      <main className="relative z-10 px-4 sm:px-6 lg:px-8 py-6 sm:py-8 animate-fade-in">
        <div className="max-w-7xl mx-auto">
          
          <div className="mb-6 sm:mb-8 animate-slide-up text-center sm:text-left">
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight font-heading">Dashboard</h1>
            <p className="text-slate-500 mt-1 text-sm sm:text-base">Analyze your CV against job descriptions using AI</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-start">
            
            {/* === LEFT COLUMN: FORM === */}
            <div className="lg:col-span-5 relative lg:sticky lg:top-24 animate-slide-up-delay-1">
              <div className="bg-white/80 backdrop-blur-xl rounded-2xl shadow-xl shadow-slate-900/5 border border-slate-200/60 p-5 sm:p-6 hover:shadow-2xl transition-all duration-300">
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center shrink-0 animate-pulse-slow">
                    <SparklesIcon className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <h2 className="text-lg sm:text-xl font-bold text-slate-900 font-heading">New Analysis</h2>
                    <p className="text-slate-500 text-xs sm:text-sm">Start by uploading your CV</p>
                  </div>
                </div>

                <form onSubmit={handleAnalyze} className="space-y-4 sm:space-y-5">
                  {/* Upload Area */}
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">
                      Upload CV <span className="text-slate-400 font-normal ml-1">(PDF)</span>
                    </label>
                    <div
                      onDragOver={handleDragOver}
                      onDragLeave={handleDragLeave}
                      onDrop={handleDrop}
                      className={`relative border-2 border-dashed rounded-xl transition-all duration-300 min-h-32 sm:min-h-40 flex flex-col justify-center hover:scale-105 hover:shadow-lg group ${
                        isDragging ? "border-blue-500 bg-blue-50/50 scale-105" : file ? "border-emerald-400 bg-emerald-50/30" : "border-slate-200 hover:border-blue-400 hover:bg-slate-50/50"
                      }`}
                    >
                      <input type="file" accept="application/pdf" onChange={(e) => setFile(e.target.files?.[0] || null)} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10" disabled={loading} />
                      {file ? (
                        <div className="p-4 animate-slide-up">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-emerald-100 rounded-lg flex items-center justify-center shrink-0 animate-pulse-slow">
                              <FileTextIcon className="w-5 h-5 text-emerald-600" />
                            </div>
                            <div className="flex-1 min-w-0">
                              <p className="font-medium text-sm text-slate-800 truncate">{file.name}</p>
                              <p className="text-xs text-slate-500">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
                            </div>
                            <button type="button" onClick={(e) => { e.stopPropagation(); setFile(null); }} className="relative z-20 p-1.5 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all duration-200 hover:scale-110 active:scale-95">
                              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                            </button>
                          </div>
                          <div className="mt-2 flex items-center gap-1.5 text-emerald-600 justify-center bg-white/50 py-1 rounded-md animate-fade-in">
                            <CheckCircleIcon className="w-3.5 h-3.5" /> <span className="text-xs font-medium">Ready</span>
                          </div>
                        </div>
                      ) : (
                        <div className="p-6 text-center">
                          <UploadCloudIcon className={`w-10 h-10 mx-auto mb-2 transition-all duration-300 group-hover:scale-110 ${isDragging ? "text-blue-500" : "text-slate-300"}`} />
                          <p className="font-medium text-sm text-slate-700">{isDragging ? "Drop here" : "Drag & drop PDF"}</p>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Job Desc Input */}
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">Job Description</label>
                    <textarea value={jobDesc} onChange={(e) => setJobDesc(e.target.value)} disabled={loading} className="w-full h-32 px-4 py-3 text-slate-500 bg-slate-50 border border-slate-200 rounded-xl outline-none transition-all duration-300 focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 hover:border-slate-300 hover:bg-white disabled:opacity-50 resize-none text-sm placeholder:text-slate-400" placeholder="Paste requirements here..." required />
                  </div>

                  {error && (
                    <div className="flex items-center gap-2 bg-red-50 text-red-700 p-3 rounded-xl border border-red-200 animate-slide-up">
                      <ExclamationCircleIcon className="w-4 h-4 shrink-0 animate-pulse" /> <p className="text-xs font-medium">{error}</p>
                    </div>
                  )}

                  <button type="submit" disabled={loading || !jobDesc.trim()} className="w-full flex items-center justify-center gap-2 bg-linear-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold py-3.5 rounded-xl transition-all duration-300 shadow-lg hover:shadow-blue-700/30 hover:scale-105 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed">
                    {loading ? <><Spinner className="w-5 h-5" /> <span>Processing...</span></> : <><SparklesIcon className="w-5 h-5" /> <span>Analyze Match</span></>}
                  </button>
                </form>
              </div>
            </div>

            {/* === RIGHT COLUMN: RESULT === */}
            <div className="lg:col-span-7 flex flex-col animate-slide-up-delay-2">
              {loading ? (
                // LOADING STATE
                <div className="bg-white/80 backdrop-blur-xl rounded-2xl shadow-xl shadow-slate-900/5 border border-slate-200/60 p-8 sm:p-12 min-h-100 sm:min-h-140 flex flex-col items-center justify-center h-full animate-fade-in">
                  <div className="relative">
                    <div className="w-16 h-16 sm:w-20 sm:h-20 border-4 border-blue-100 rounded-full animate-pulse" />
                    <div className="absolute inset-0 w-16 h-16 sm:w-20 sm:h-20 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" />
                  </div>
                  <h3 className="text-lg sm:text-xl font-bold text-slate-800 mt-6 font-heading animate-pulse">Analyzing Your CV</h3>
                  <p className="text-slate-500 mt-2 text-center max-w-sm text-sm sm:text-base animate-fade-in">Comparing qualifications with requirements...</p>
                </div>
              ) : result ? (
                // RESULT STATE
                <div className="space-y-6">
                  <div className={`bg-white/90 backdrop-blur-xl rounded-2xl shadow-xl shadow-slate-900/5 border border-slate-200/60 p-5 sm:p-8 relative overflow-hidden hover:shadow-2xl transition-all duration-300 animate-slide-up`}>
                    <div className={`absolute inset-0 bg-linear-to-br ${getScoreBgColor(result.ai_analysis.match_score)} pointer-events-none`} />
                    <div className="relative flex flex-col sm:flex-row sm:items-center justify-between gap-6">
                      <div className="flex items-center gap-5">
                        <div className="w-14 h-14 sm:w-16 sm:h-16 bg-white rounded-2xl shadow-lg flex items-center justify-center hover:scale-110 transition-transform duration-200">
                          <ChartBarIcon className={`w-7 h-7 sm:w-8 sm:h-8 ${getScoreColor(result.ai_analysis.match_score)}`} />
                        </div>
                        <div>
                          <p className="text-xs sm:text-sm font-medium text-slate-500 uppercase tracking-wide">Match Score</p>
                          <div className="flex items-baseline gap-2 mt-1">
                            <span className={`text-4xl sm:text-5xl font-extrabold ${getScoreColor(result.ai_analysis.match_score)}`}>{result.ai_analysis.match_score}</span>
                            <span className="text-xl sm:text-2xl text-slate-400 font-medium">/100</span>
                          </div>
                          <p className={`text-sm font-medium mt-1 ${getScoreColor(result.ai_analysis.match_score)}`}>{getScoreLabel(result.ai_analysis.match_score)}</p>
                        </div>
                      </div>
                      {result.s3_url && (
                        <a href={result.s3_url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-5 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-sm font-medium transition-all duration-200 hover:scale-105 active:scale-95 w-full sm:w-auto justify-center">
                          <ExternalLinkIcon className="w-4 h-4" /> View PDF
                        </a>
                      )}
                    </div>
                  </div>

                  <div className="bg-white/90 backdrop-blur-xl rounded-2xl shadow-xl shadow-slate-900/5 border border-slate-200/60 p-5 sm:p-8 hover:shadow-2xl transition-all duration-300 animate-slide-up-delay-1">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-10 h-10 bg-indigo-50 rounded-xl flex items-center justify-center animate-pulse-slow"><SparklesIcon className="w-5 h-5 text-indigo-600" /></div>
                      <h3 className="text-lg font-bold text-slate-900">AI Summary</h3>
                    </div>
                    <p className="text-slate-600 leading-relaxed text-sm sm:text-base">{result.ai_analysis.summary}</p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="bg-white/90 backdrop-blur-xl rounded-2xl shadow-xl shadow-slate-900/5 border border-slate-200/60 p-5 sm:p-6 hover:shadow-2xl transition-all duration-300 animate-slide-up-delay-2">
                      <div className="flex items-center gap-3 mb-4">
                        <div className="w-10 h-10 bg-red-50 rounded-xl flex items-center justify-center animate-pulse-slow"><ExclamationCircleIcon className="w-5 h-5 text-red-500" /></div>
                        <h3 className="text-lg font-bold text-slate-900">Missing Skills</h3>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {result.ai_analysis.missing_skills.length > 0 ? (
                          result.ai_analysis.missing_skills.map((skill, idx) => (
                            <span key={idx} className="px-3 py-1.5 bg-red-50 text-red-700 text-sm rounded-lg border border-red-100 font-medium hover:bg-red-100 transition-colors">{skill}</span>
                          ))
                        ) : <span className="text-slate-400 text-sm italic">None identified</span>}
                      </div>
                    </div>
                    <div className="bg-white/90 backdrop-blur-xl rounded-2xl shadow-xl shadow-slate-900/5 border border-slate-200/60 p-5 sm:p-6 hover:shadow-2xl transition-all duration-300 animate-slide-up-delay-2">
                      <div className="flex items-center gap-3 mb-4">
                        <div className="w-10 h-10 bg-amber-50 rounded-xl flex items-center justify-center animate-pulse-slow"><LightBulbIcon className="w-5 h-5 text-amber-500" /></div>
                        <h3 className="text-lg font-bold text-slate-900">Recommendation</h3>
                      </div>
                      <p className="text-slate-600 text-sm leading-relaxed italic">&ldquo;{result.ai_analysis.project_recommendation}&rdquo;</p>
                    </div>
                  </div>
                </div>
              ) : (
                // EMPTY STATE
                <div className="bg-white/60 backdrop-blur-xl rounded-2xl border-2 border-dashed border-slate-200 p-6 sm:p-8 h-full min-h-100 sm:min-h-140 flex flex-col items-center justify-center text-center hover:border-slate-300 transition-colors duration-300 animate-fade-in">
                  <div className="w-16 h-16 sm:w-20 sm:h-20 bg-linear-to-br from-blue-50 to-indigo-50 rounded-2xl flex items-center justify-center mb-6 shadow-sm animate-pulse-slow">
                    <ClipboardListIcon className="w-8 h-8 sm:w-10 sm:h-10 text-indigo-400" />
                  </div>
                  <h3 className="text-xl sm:text-2xl font-bold text-slate-800 font-heading mb-2 animate-slide-up">Ready to Analyze</h3>
                  <p className="text-slate-500 max-w-md mb-8 animate-slide-up-delay-1 text-sm sm:text-base">Upload your CV on the left to unlock detailed insights about your job fit.</p>
                  
                  {/* Feature List Icons */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full max-w-lg text-left bg-white/50 p-6 rounded-xl border border-slate-100 animate-slide-up-delay-2">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center shrink-0 border border-blue-100 hover:bg-blue-100 transition-colors duration-200">
                        <svg className="w-4 h-4 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                        </svg>
                      </div>
                      <span className="text-sm font-medium text-slate-600">Match Score Analysis</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center shrink-0 border border-blue-100 hover:bg-blue-100 transition-colors duration-200">
                        <svg className="w-4 h-4 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                        </svg>
                      </div>
                      <span className="text-sm font-medium text-slate-600">AI-Powered Insights</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center shrink-0 border border-blue-100 hover:bg-blue-100 transition-colors duration-200">
                        <svg className="w-4 h-4 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </div>
                      <span className="text-sm font-medium text-slate-600">Skill Gap Detection</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center shrink-0 border border-blue-100 hover:bg-blue-100 transition-colors duration-200">
                        <svg className="w-4 h-4 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                        </svg>
                      </div>
                      <span className="text-sm font-medium text-slate-600">Smart Recommendations</span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}