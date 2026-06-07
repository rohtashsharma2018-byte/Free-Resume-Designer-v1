import React from "react";
import { ArrowLeft, ShieldCheck, Zap } from "lucide-react";

interface PrivacyPolicyProps {
  onBack: () => void;
}

export const PrivacyPolicy: React.FC<PrivacyPolicyProps> = ({ onBack }) => {
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
            <ShieldCheck className="w-10 h-10 text-indigo-600" />
            <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight">
              Privacy Policy
            </h2>
          </div>

          <div className="prose prose-slate max-w-none space-y-6 text-slate-600 leading-relaxed">
            <p className="font-semibold text-slate-800">
              Date of Last Revision: June 7, 2026
            </p>
            <p>
              Welcome to Free Resume Designer. Your privacy is paramount. This
              application is architected as a fully local, sandbox environment.
            </p>

            <h3 className="text-xl font-bold text-slate-900 mt-8 mb-4">
              1. Data Storage & Local Processing
            </h3>
            <p>
              All data entered into this application (including PII such as your
              name, contact details, experiences, and education) is processed
              strictly within your local browser environment. It is persisted
              locally using IndexedDB mechanisms allocated to your specific
              browser profile.
            </p>

            <h3 className="text-xl font-bold text-slate-900 mt-8 mb-4">
              2. No External Transmissions
            </h3>
            <p>
              We do not transmit, sync, or back up your personal details to
              external cloud servers or databases. There is no backend tracking
              or retention of your resumes. Consequently, we cannot recover your
              data if you clear your browser cache or uninstall your web
              browser.
            </p>

            <h3 className="text-xl font-bold text-slate-900 mt-8 mb-4">
              3. Local Compliance
            </h3>
            <p>
              This service operates with respect to the Information Technology
              Act, 2000 (India) and the Digital Personal Data Protection Act
              (DPDP), 2023. Since no personal data is collected or processed by
              us centrally, the responsibility for the security of the local
              physical machine processing the resume data remains with the user.
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
