import React, { useState } from "react";
import {
  FileText,
  Sparkles,
  CheckCircle2,
  ChevronRight,
  Layout,
  ShieldAlert,
  Zap,
  Settings,
  Award,
  RefreshCw,
  Layers,
  ArrowRight,
  ShieldCheck,
  Download,
  HelpCircle,
  ChevronDown,
  Monitor,
  Cpu,
  Code2,
  Users,
  X,
  Palette,
} from "lucide-react";
import { ResumePreview } from "./ResumePreview";
import { ResumeData } from "../types";
import { getDemoResume } from "../lib/mockData";

interface TemplateItem {
  id: string;
  name: string;
  desc: string;
  tag: string;
  previewColor: string;
}

interface LandingPageProps {
  onStartDesigning: () => void;
  onCreateWithTemplate: (title: string, templateId: string) => void;
  onExploreSample: () => void;
  onNavigateAbout: () => void;
  onNavigatePrivacy: () => void;
  onNavigateCookies: () => void;
  onNavigateTerms: () => void;
  onNavigateContact: () => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({
  onStartDesigning,
  onCreateWithTemplate,
  onExploreSample,
  onNavigateAbout,
  onNavigatePrivacy,
  onNavigateCookies,
  onNavigateTerms,
  onNavigateContact,
}) => {
  const [activeFaq, setActiveFaq] = useState<number | null>(null);

  const featuredTemplates: TemplateItem[] = [
    {
      id: "modern-minimal",
      name: "Modern Minimal",
      desc: "Minimalist whitespace with absolute focus on elegance and readability.",
      tag: "Popular",
      previewColor: "#6366f1",
    },
    {
      id: "creative-bold",
      name: "Creative Bold",
      desc: "Asymmetric layout with rich custom side-borders and impactful headers.",
      tag: "Designers",
      previewColor: "#ca8a04",
    },
    {
      id: "classic-professional",
      name: "Classic Professional",
      desc: "Timeless traditional layout ideal for corporate and established industries.",
      tag: "Professional",
      previewColor: "#334155",
    },
    {
      id: "academic-technical",
      name: "Academic/Technical",
      desc: "Structured single-column layout optimized for detailed publications and tech stacks.",
      tag: "Technical",
      previewColor: "#0ea5e9",
    },
    {
      id: "executive-premium",
      name: "Executive Premium",
      desc: "Refined multi-column design crafted for senior leadership and c-suite roles.",
      tag: "Premium",
      previewColor: "#dc2626",
    },
    {
      id: "ats-optimized",
      name: "ATS Optimized",
      desc: "Rigid structure built strictly to pass automated tracking systems and standard parsers.",
      tag: "ATS Ready",
      previewColor: "#16a34a",
    },
  ];

  const features = [
    {
      icon: <ShieldCheck className="w-6 h-6 text-emerald-500" />,
      title: "100% Offline & Private",
      desc: "Your data stays entirely in your browser sandbox. No server uploads, no privacy leakage, no trackers. Fully compliant with enterprise data policies.",
    },
    {
      icon: <Layers className="w-6 h-6 text-indigo-500" />,
      title: "Dual-Engine Compiles",
      desc: "Live viewport sandbox that renders in real-time alongside direct high-fidelity PDF compile using client side libraries.",
    },
    {
      icon: <CheckCircle2 className="w-6 h-6 text-orange-500" />,
      title: "ATS-Grade compliance",
      desc: "Engineered in collaboration with hiring practitioners. Standard text extraction vectors match precisely what recruitment parsers search for.",
    },
    {
      icon: <Zap className="w-6 h-6 text-sky-500" />,
      title: "Asynchronous Auto-Saves",
      desc: "Integrated IndexedDB engine automatically saves a live draft in your browser sandbox every key click. Never lose formatting edits.",
    },
    {
      icon: <Code2 className="w-6 h-6 text-purple-500" />,
      title: "Tailored Customization",
      desc: "Swap colors on any palette, adjust standard display fonts (Serif, Sans, Mono, Grotesk), and scale the design from small to medium dynamically.",
    },
    {
      icon: <Users className="w-6 h-6 text-rose-500" />,
      title: "Completely Free",
      desc: "No premium paywalls. No PDF download restrictions. No watermarks. Enjoy a lifetime of high-performance resume styling for free.",
    },
  ];

  const faqs = [
    {
      q: "Is it really 100% free with no watermarks?",
      a: "Yes, completely! Free Resume Designer was built with architectural honesty. We don't believe in holding your job hunt hostage behind subscription paywalls or adding non-removable credits. You can download unlimited PDF documents without limits.",
    },
    {
      q: "Where does my professional data get stored?",
      a: "Your data is stored strictly inside your browser's integrated local database (IndexedDB) and localStorage on your hard drive. No external databases or cloud servers are contacted. Your records are entirely owned by you, offline-ready.",
    },
    {
      q: "Are the templates optimized for applicant tracking systems?",
      a: "Absolutely. Our templates (especially the ATS-Optimized layout) are styled using semantic hierarchical text flow guidelines. This ensures index algorithms can easily parse your experiences, titles, skills, and timelines without reading artifacts.",
    },
    {
      q: "Can I import or backup my resumes?",
      a: "Yes! Every design you build has an offline backup utility. You can export a clean, structured JSON file of your entire design configuration and resume details, and easily re-import it whenever you need to update it in the future.",
    },
    {
      q: "Does this require an internet connection to run?",
      a: "No! Once the app is loaded, our service worker activates and caches everything. You can run the entire builder, edit details, adjust styles, and compile high-resolution PDF documents completely offline on an airplane or remote workspaces.",
    },
  ];

  return (
    <div
      className="bg-slate-50 min-h-screen text-slate-800 font-sans"
      id="landing-page-root"
    >
      {/* Navigation Sub-bar */}
      <nav className="bg-white/90 backdrop-blur-md border-b border-slate-250 sticky top-0 z-[60] py-3.5 px-6 shadow-sm">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="bg-indigo-600 text-white p-2 rounded-xl shadow-md shadow-indigo-600/20">
              <FileText className="w-5 h-5" />
            </div>
            <div>
              <span className="font-extrabold text-base tracking-tight text-slate-900 block">
                Free Resume Designer
              </span>
            </div>
          </div>

          <div className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-600">
            <button
              onClick={onNavigateAbout}
              className="hover:text-indigo-600 transition-colors cursor-pointer"
            >
              About Us
            </button>
            <a
              href="#how-to-use-anchor"
              className="hover:text-indigo-600 transition-colors"
            >
              How to Use
            </a>
            <a
              href="#features-anchor"
              className="hover:text-indigo-600 transition-colors"
            >
              Features
            </a>
            <a
              href="#templates-anchor"
              className="hover:text-indigo-600 transition-colors"
            >
              Sample Layouts
            </a>
            <a
              href="#security-anchor"
              className="hover:text-indigo-600 transition-colors"
            >
              Safety Sandbox
            </a>
            <a
              href="#faq-anchor"
              className="hover:text-indigo-600 transition-colors"
            >
              FAQs
            </a>
            <button
              onClick={onNavigateContact}
              className="hover:text-indigo-600 transition-colors cursor-pointer"
            >
              Contact Us
            </button>
          </div>

          <button
            onClick={onStartDesigning}
            className="px-4 py-2 bg-yellow-400 hover:bg-yellow-500 text-yellow-950 font-semibold rounded-xl text-sm transition-all duration-150 flex items-center gap-1.5 cursor-pointer shadow-sm hover:shadow-md border border-transparent"
          >
            <span>Enter Dashboard</span>
            <ChevronRight className="w-4 h-4 text-yellow-800" />
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <header
        className="relative py-20 px-6 overflow-hidden bg-radial from-white via-slate-50 to-indigo-50/20 border-b border-slate-200"
        id="hero-header"
      >
        <div className="absolute top-10 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-indigo-200/20 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-5xl mx-auto text-center relative z-10">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-indigo-50 border border-indigo-100 rounded-full text-xs font-semibold text-indigo-700 mb-6 shadow-2xs">
            <Sparkles className="w-3.5 h-3.5 text-indigo-500 fill-indigo-500/10" />
            <span>100% Free • Infinite Local Restores • Offline Enabled</span>
          </div>

          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-slate-900 max-w-4xl mx-auto leading-[1.1] mb-6">
            Build high-performance,{" "}
            <span className="text-indigo-600 relative inline-block">
              ATS-optimized resumes
            </span>{" "}
            without paywalls.
          </h1>

          <p className="text-slate-500 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed mb-10">
            A secure offline-first application to structure, style, and compile
            immaculate single or double column resumes. Zero premium lockouts.
            Pure security.
          </p>

          <div className="flex flex-col sm:flex-row justify-center items-center gap-4 max-w-md mx-auto mb-16">
            <button
              onClick={onStartDesigning}
              className="w-full sm:w-auto px-7 py-3.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl font-bold text-base transition-all cursor-pointer shadow-lg shadow-indigo-600/20 hover:scale-[1.01] flex items-center justify-center gap-2 group"
            >
              <span>Build Your Resume</span>
              <ArrowRight className="w-5 h-5 text-indigo-200 group-hover:translate-x-0.5 transition-transform" />
            </button>

            <button
              onClick={onExploreSample}
              className="w-full sm:w-auto px-7 py-3.5 bg-slate-800 hover:bg-slate-900 text-white rounded-xl font-bold text-base transition-all cursor-pointer shadow-sm hover:shadow-md flex items-center justify-center gap-2"
            >
              <span>Load Interactive Demo</span>
            </button>
          </div>

          {/* Value Highlights Pill */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto py-6 border-y border-slate-200 bg-white/50 backdrop-blur-xs rounded-2xl px-6">
            <div className="text-center">
              <span className="block text-2xl font-black text-indigo-600">
                0%
              </span>
              <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider font-mono">
                Server Uploads
              </span>
            </div>
            <div className="text-center border-l border-slate-200">
              <span className="block text-2xl font-black text-emerald-600">
                Perfect
              </span>
              <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider font-mono">
                A4 Layouts
              </span>
            </div>
            <div className="text-center border-l md:border-l border-slate-200">
              <span className="block text-2xl font-black text-indigo-600">
                Offline
              </span>
              <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider font-mono">
                Service Workers
              </span>
            </div>
            <div className="text-center border-l border-slate-200">
              <span className="block text-2xl font-black text-orange-600">
                Lifetime
              </span>
              <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider font-mono">
                Free Compilation
              </span>
            </div>
          </div>
        </div>
      </header>

      {/* How to Use Designer Section */}
      <section
        className="py-24 px-6 bg-white relative border-b border-slate-200"
        id="how-to-use-anchor"
      >
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-extrabold text-slate-900 tracking-tight mb-4">
              How to use designer
            </h2>
            <p className="text-slate-500 text-lg max-w-2xl mx-auto leading-relaxed">
              Create your professional resume in four simple offline steps.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Step 1 */}
            <div className="bg-slate-50 rounded-3xl p-8 border border-slate-200 text-center relative overflow-hidden group hover:shadow-xl hover:border-indigo-200 transition-all duration-300">
              <div className="absolute top-0 right-0 p-6 opacity-5">
                <Layout className="w-32 h-32 text-indigo-900 transform rotate-12 group-hover:scale-110 transition-transform duration-500" />
              </div>
              <div className="bg-indigo-100 w-20 h-20 mx-auto rounded-full flex items-center justify-center mb-6 relative z-10 shadow-inner">
                <Layout className="w-10 h-10 text-indigo-600" />
              </div>
              <h3 className="text-2xl font-bold text-slate-900 mb-3 relative z-10">
                Select Template
              </h3>
              <p className="text-slate-600 relative z-10 text-sm">
                Choose from a variety of ATS-compliant, modern, and professional
                aesthetic templates.
              </p>
            </div>

            {/* Step 2 */}
            <div className="bg-slate-50 rounded-3xl p-8 border border-slate-200 text-center relative overflow-hidden group hover:shadow-xl hover:border-emerald-200 transition-all duration-300">
              <div className="absolute top-0 right-0 p-6 opacity-5">
                <FileText className="w-32 h-32 text-emerald-900 transform -rotate-12 group-hover:scale-110 transition-transform duration-500" />
              </div>
              <div className="bg-emerald-100 w-20 h-20 mx-auto rounded-full flex items-center justify-center mb-6 relative z-10 shadow-inner">
                <FileText className="w-10 h-10 text-emerald-600" />
              </div>
              <h3 className="text-2xl font-bold text-slate-900 mb-3 relative z-10">
                Fill Details
              </h3>
              <p className="text-slate-600 relative z-10 text-sm">
                Input your objective, work experience, education, and technical
                skills securely offline.
              </p>
            </div>

            {/* Step 3 */}
            <div className="bg-slate-50 rounded-3xl p-8 border border-slate-200 text-center relative overflow-hidden group hover:shadow-xl hover:border-orange-200 transition-all duration-300">
              <div className="absolute top-0 right-0 p-6 opacity-5">
                <Palette className="w-32 h-32 text-orange-900 transform rotate-12 group-hover:scale-110 transition-transform duration-500" />
              </div>
              <div className="bg-orange-100 w-20 h-20 mx-auto rounded-full flex items-center justify-center mb-6 relative z-10 shadow-inner">
                <Palette className="w-10 h-10 text-orange-600" />
              </div>
              <h3 className="text-2xl font-bold text-slate-900 mb-3 relative z-10">
                Format
              </h3>
              <p className="text-slate-600 relative z-10 text-sm">
                Fine-tune layout spacing, accent colors, and custom typographic
                font combinations.
              </p>
            </div>

            {/* Step 4 */}
            <div className="bg-slate-50 rounded-3xl p-8 border border-slate-200 text-center relative overflow-hidden group hover:shadow-xl hover:border-sky-200 transition-all duration-300">
              <div className="absolute top-0 right-0 p-6 opacity-5">
                <Download className="w-32 h-32 text-sky-900 transform -rotate-12 group-hover:scale-110 transition-transform duration-500" />
              </div>
              <div className="bg-sky-100 w-20 h-20 mx-auto rounded-full flex items-center justify-center mb-6 relative z-10 shadow-inner">
                <Download className="w-10 h-10 text-sky-600" />
              </div>
              <h3 className="text-2xl font-bold text-slate-900 mb-3 relative z-10">
                Export
              </h3>
              <p className="text-slate-600 relative z-10 text-sm">
                Download your immaculate high-resolution PDF or save it as a
                structured JSON backup.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Bento Grid Features */}
      <section className="py-20 px-6 max-w-7xl mx-auto" id="features-anchor">
        <div className="text-center mb-16">
          <p className="text-xs font-black uppercase text-indigo-600 tracking-wider font-mono mb-2">
            Architectural Excellence
          </p>
          <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight">
            Engineered with deep focus on professional trajectories
          </h2>
          <p className="text-slate-500 text-sm md:text-base max-w-xl mx-auto mt-3 leading-relaxed">
            Standard content styling with rigorous focus on high-fidelity,
            high-speed, and total database privacy.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feat, idx) => (
            <div
              key={idx}
              className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs hover:shadow-md transition-all duration-200 hover:-translate-y-0.5 flex flex-col gap-4"
            >
              <div className="p-3 bg-slate-50 rounded-xl w-fit border border-slate-100">
                {feat.icon}
              </div>
              <div>
                <h3 className="font-bold text-slate-900 text-lg mb-1.5">
                  {feat.title}
                </h3>
                <p className="text-slate-500 text-sm leading-relaxed">
                  {feat.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Templates Collection Anchor Section */}
      <section
        className="py-20 px-6 bg-slate-950 text-white relative overflow-hidden"
        id="templates-anchor"
      >
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 mb-16">
            <div>
              <p className="text-xs font-bold uppercase text-indigo-400 tracking-wider font-mono mb-1">
                Interactive Templates
              </p>
              <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight">
                Designed for direct ATS compatibility
              </h2>
              <p className="text-slate-400 text-sm max-w-xl mt-2 leading-relaxed">
                Choose any high-performance structural layout below to load your
                resume. You can swap styling with zero data loss at any time.
              </p>
            </div>

            <button
              onClick={onStartDesigning}
              className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-sm font-bold transition-all cursor-pointer flex items-center gap-2 group shrink-0"
            >
              <span>Launch Dashboard Studio</span>
              <ChevronRight className="w-4 h-4 text-white group-hover:translate-x-0.5 transition-transform" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredTemplates.map((tpl) => {
              const baseDemo = getDemoResume();
              const templateData: ResumeData = {
                ...baseDemo,
                templateId: tpl.id as any,
                title: tpl.name,
                primaryColor: tpl.previewColor,
              };

              return (
                <div
                  key={tpl.id}
                  className="bg-slate-900 rounded-2xl border border-slate-800 p-6 flex flex-col justify-between hover:border-slate-750 transition shadow-lg hover:shadow-xl"
                >
                  <div>
                    <div className="flex justify-between items-center mb-4">
                      <span className="text-[10px] font-mono font-bold tracking-wider uppercase px-2 py-0.5 rounded bg-slate-800 text-slate-300">
                        {tpl.tag}
                      </span>
                      <div
                        className="w-3.5 h-3.5 rounded-full"
                        style={{ backgroundColor: tpl.previewColor }}
                      />
                    </div>

                    {/* Visual A4 Live Resume Snippet Container */}
                    <div className="bg-white rounded-xl border border-slate-800/80 p-2 h-[415px] overflow-hidden group/item relative mb-5 shadow-inner">
                      <div className="w-[210mm] absolute left-1/2 -translate-x-1/2 top-4 origin-top scale-[0.35] transition-transform duration-300 group-hover/item:scale-[0.36] h-[297mm]">
                        <ResumePreview data={templateData} zoom={1.0} />
                      </div>

                      {/* Interactive Subtle Dark Overlay for premium vibe */}
                      <div className="absolute inset-0 bg-slate-900/5 group-hover/item:bg-transparent transition-all pointer-events-none rounded-xl" />
                    </div>

                    <h3 className="text-lg font-bold text-slate-100 mb-1">
                      {tpl.name}
                    </h3>
                    <p className="text-slate-400 text-xs leading-relaxed mb-6">
                      {tpl.desc}
                    </p>
                  </div>

                  <button
                    onClick={() =>
                      onCreateWithTemplate(`New ${tpl.name} Resume`, tpl.id)
                    }
                    className="w-full py-2.5 bg-slate-800 hover:bg-slate-700 hover:text-white text-slate-300 rounded-xl text-xs font-semibold transition cursor-pointer flex items-center justify-center gap-1.5 border border-slate-700"
                  >
                    <Layout className="w-4 h-4 text-indigo-400" />
                    <span>Create with {tpl.name}</span>
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Security Info Sandbox Banner */}
      <section className="py-20 px-6 max-w-5xl mx-auto" id="security-anchor">
        <div className="bg-gradient-to-r from-slate-900 to-indigo-950 rounded-3xl p-8 md:p-12 text-white relative overflow-hidden shadow-xl border border-slate-800 flex flex-col md:flex-row gap-8 items-center">
          <div className="absolute right-0 bottom-0 top-0 w-1/3 opacity-10 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-indigo-400 via-indigo-900 to-slate-900 pointer-events-none" />

          <div className="flex-1">
            <div className="inline-flex items-center gap-1 bg-emerald-950 border border-emerald-800 px-3 py-1 rounded-full text-[10px] font-mono tracking-wider font-semibold text-emerald-400 uppercase mb-4 shadow-2xs">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Hardened Privacy Standard</span>
            </div>

            <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight mb-4 leading-snug">
              Secure Sandbox Architecture. No accounts. No server leaks.
            </h2>
            <p className="text-indigo-200 text-sm leading-relaxed mb-6">
              Many resume builders collect your address, phone number, and
              career credentials on external tables for lead tracking and
              demographic targeting. Free Resume Designer is completely
              sandboxed. Your dataset resides only inside the IndexedDB
              directory allocated to this page on your home hard disk. No
              tracking scripts, pure formatting execution.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <button
                onClick={onStartDesigning}
                className="px-5 py-2.5 bg-white text-slate-900 font-bold rounded-xl text-sm transition-all hover:bg-indigo-50 cursor-pointer shadow-sm text-center"
              >
                Start Completely Offline
              </button>
              <div className="flex items-center gap-2 text-indigo-300 font-mono text-xs">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span>IndexedDB Client Sync Active</span>
              </div>
            </div>
          </div>

          <div className="w-full md:w-72 bg-slate-950/40 border border-slate-800/80 p-5 rounded-2xl backdrop-blur-xs flex flex-col gap-4">
            <h4 className="font-mono text-[11px] font-bold text-slate-400 tracking-wider uppercase">
              Local Database Health
            </h4>

            <div className="space-y-3 font-sans text-xs">
              <div className="flex justify-between items-center py-1.5 border-b border-slate-900">
                <span className="text-slate-400 flex items-center gap-1.5">
                  <Cpu className="w-3.5 h-3.5 text-indigo-400" /> State Engine:
                </span>
                <span className="font-mono text-emerald-400 font-bold uppercase bg-emerald-950/20 px-1.5 py-0.5 rounded">
                  Active & Safe
                </span>
              </div>
              <div className="flex justify-between items-center py-1.5 border-b border-slate-900">
                <span className="text-slate-400 flex items-center gap-1.5">
                  <Monitor className="w-3.5 h-3.5 text-indigo-400" /> Host
                  Domain:
                </span>
                <span className="font-mono text-slate-300">
                  Localhost Sandbox
                </span>
              </div>
              <div className="flex justify-between items-center py-1.5">
                <span className="text-slate-400 flex items-center gap-1.5">
                  <Download className="w-3.5 h-3.5 text-indigo-400" /> PDF
                  Engine:
                </span>
                <span className="font-mono text-slate-300">
                  Client react-pdf v4
                </span>
              </div>
            </div>

            <p className="text-[10px] text-slate-500 leading-normal bg-slate-950/50 p-2.5 rounded border border-slate-900 text-center font-mono">
              IndexedDB allows the application to write up to 500MB
              isomorphically. Safe for hundreds of resume backup drafts.
            </p>
          </div>
        </div>
      </section>

      {/* Styled Accordion FAQ Section */}
      <section className="py-20 px-6 max-w-4xl mx-auto" id="faq-anchor">
        <div className="text-center mb-16">
          <p className="text-xs font-black uppercase text-indigo-600 tracking-wider font-mono mb-2">
            Humble Answers
          </p>
          <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">
            Frequently Asked Questions
          </h2>
          <p className="text-slate-500 text-sm max-w-md mx-auto mt-3">
            Have questions about exports, PDF engines, compliance, or storage?
            We have standard responses.
          </p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, idx) => {
            const isOpen = activeFaq === idx;
            return (
              <div
                key={idx}
                className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs transition duration-150"
              >
                <button
                  onClick={() => setActiveFaq(isOpen ? null : idx)}
                  className="w-full px-6 py-5 flex justify-between items-center text-left font-semibold text-slate-900 hover:text-indigo-600 transition cursor-pointer"
                >
                  <span className="text-base">{faq.q}</span>
                  <ChevronDown
                    className={`w-5 h-5 text-slate-400 transition-transform duration-250 ${isOpen ? "rotate-180 text-indigo-600" : ""}`}
                  />
                </button>

                {isOpen && (
                  <div className="px-6 pb-5 text-slate-500 text-sm leading-relaxed border-t border-slate-100 pt-3 animate-in slide-in-from-top-1 duration-150">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* Minimal Footer */}
      <footer className="bg-slate-900 text-slate-400 py-12 px-6 border-t border-slate-800 text-center text-xs">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-2">
            <div className="bg-slate-800 p-1.5 rounded-lg border border-slate-700">
              <FileText className="w-4 h-4 text-indigo-400" />
            </div>
            <span className="font-bold text-slate-200">
              Free Resume Designer
            </span>
          </div>

          <div className="flex flex-wrap justify-center gap-6 font-medium">
            <button
              onClick={onNavigatePrivacy}
              className="hover:text-slate-200 transition cursor-pointer"
            >
              Privacy Policy
            </button>
            <span className="text-slate-500">•</span>
            <button
              onClick={onNavigateCookies}
              className="hover:text-slate-200 transition cursor-pointer"
            >
              Cookies Policy
            </button>
            <span className="text-slate-500">•</span>
            <button
              onClick={onNavigateTerms}
              className="hover:text-slate-200 transition cursor-pointer"
            >
              Terms & Conditions
            </button>
            <span className="text-slate-500">•</span>
            <button
              onClick={onNavigateAbout}
              className="hover:text-slate-200 transition cursor-pointer"
            >
              About Us
            </button>
            <span className="text-slate-500">•</span>
            <button
              onClick={onNavigateContact}
              className="hover:text-slate-200 transition cursor-pointer"
            >
              Contact Us
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
};
