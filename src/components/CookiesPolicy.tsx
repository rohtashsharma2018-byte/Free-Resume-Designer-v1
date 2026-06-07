import React from "react";
import { ArrowLeft, Cookie, Zap } from "lucide-react";

interface CookiesPolicyProps {
  onBack: () => void;
}

export const CookiesPolicy: React.FC<CookiesPolicyProps> = ({ onBack }) => {
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans">
      {/* Dynamic Header */}
      <header className="bg-slate-900 border-b border-slate-800 px-6 py-4 sticky top-0 z-50">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              onClick={onBack}
              className="p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500"
              aria-label="Back to Home"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <h1 className="text-xl font-bold tracking-tight text-white flex items-center gap-2">
              <Zap className="w-5 h-5 text-indigo-400" />
              Free Resume Designer
            </h1>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 max-w-4xl mx-auto w-full px-6 py-16 animate-in fade-in slide-in-from-bottom-4 duration-500">
        <div className="bg-white rounded-3xl p-10 md:p-16 mb-12 shadow-sm border border-slate-200">
          <div className="flex items-center gap-4 mb-8 text-slate-900">
            <Cookie className="w-10 h-10 text-emerald-600" />
            <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight">
              Cookies Policy
            </h2>
          </div>

          <div className="prose prose-slate max-w-none space-y-6 text-slate-600 leading-relaxed">
            <p className="font-semibold text-slate-800">
              Date of Last Revision: June 7, 2026
            </p>
            <p>
              This application avoids using traditional tracking or marketing
              cookies.
            </p>

            <h3 className="text-xl font-bold text-slate-900 mt-8 mb-4">
              1. Local Configuration Storage
            </h3>
            <p>
              We use local browser storage (such as `localStorage` or
              `IndexedDB`) solely to maintain the operational state of your
              application—primarily drafting and auto-saving your resumes, and
              remembering your chosen structural templates.
            </p>

            <h3 className="text-xl font-bold text-slate-900 mt-8 mb-4">
              2. Third-Party Trackers
            </h3>
            <p>
              We actively prohibit the inclusion of third-party advertising,
              demographic tracking scripts, or cross-site tracking systems.
            </p>

            <h3 className="text-xl font-bold text-slate-900 mt-8 mb-4">
              3. Managing Local Data
            </h3>
            <p>
              You have full control over these local records. You may wipe all
              data stored by this application instantaneously by clearing your
              browser's site data or cache.
            </p>
          </div>
        </div>
      </main>

      {/* Simple Footer */}
      <footer className="bg-white border-t border-slate-200 py-8 px-6 text-center text-sm text-slate-500">
        <p>
          &copy; {new Date().getFullYear()} Free Resume Designer. Crafted for
          absolute privacy.
        </p>
      </footer>
    </div>
  );
};
