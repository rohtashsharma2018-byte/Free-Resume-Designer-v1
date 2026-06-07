import React from "react";
import { ArrowLeft, Scale, Zap } from "lucide-react";

interface TermsAndConditionsProps {
  onBack: () => void;
}

export const TermsAndConditions: React.FC<TermsAndConditionsProps> = ({
  onBack,
}) => {
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
            <Scale className="w-10 h-10 text-rose-600" />
            <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight">
              Terms & Conditions
            </h2>
          </div>

          <div className="prose prose-slate max-w-none space-y-6 text-slate-600 leading-relaxed">
            <p className="font-semibold text-slate-800">
              Date of Last Revision: June 7, 2026
            </p>

            <h3 className="text-xl font-bold text-slate-900 mt-8 mb-4">
              1. Acceptance of Terms
            </h3>
            <p>
              By accessing or using the Free Resume Designer, you agree to these
              Terms and Conditions. This tool is provided free of charge to
              assist individuals in formatting their professional trajectories.
            </p>

            <h3 className="text-xl font-bold text-slate-900 mt-8 mb-4">
              2. No Warranty
            </h3>
            <p>
              This application is provided on an "as-is" and "as-available"
              basis, without any warranties of any kind, explicit or implied. We
              do not guarantee uninterrupted availability, error-free
              formatting, or specific job placement outcomes resulting from the
              use of ATS-optimized templates generated here.
            </p>

            <h3 className="text-xl font-bold text-slate-900 mt-8 mb-4">
              3. Limitation of Liability
            </h3>
            <p>
              In no event shall the developers be held liable for any direct,
              indirect, incidental, or consequential damages arising out of the
              performance, usage, or inability to use the provided tools,
              including data loss due to local browser state clearing.
            </p>

            <h3 className="text-xl font-bold text-slate-900 mt-8 mb-4">
              4. Governing Law
            </h3>
            <p>
              These terms shall be governed in accordance with the laws of
              India, without regard to its conflict of law principles.
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
