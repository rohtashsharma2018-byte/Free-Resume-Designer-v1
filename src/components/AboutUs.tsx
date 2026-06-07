import React from "react";
import {
  ArrowLeft,
  Palette,
  Unlock,
  HardDriveDownload,
  FileCheck2,
  ShieldCheck,
  Zap,
} from "lucide-react";

interface AboutUsProps {
  onBack: () => void;
}

export const AboutUs: React.FC<AboutUsProps> = ({ onBack }) => {
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
        {/* Intro Banner */}
        <div className="bg-gradient-to-br from-indigo-950 via-slate-900 to-slate-800 rounded-3xl p-10 md:p-16 mb-12 shadow-xl border border-slate-700 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-full h-full bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-indigo-500/10 via-transparent to-transparent pointer-events-none" />
          <h2 className="text-3xl md:text-5xl font-extrabold text-white tracking-tight mb-6 leading-tight">
            Empowering Your Professional Trajectory.
          </h2>
          <p className="text-lg md:text-xl text-indigo-100/80 leading-relaxed max-w-2xl font-light">
            At Free Resume Designer, our mission is to democratize professional
            resume building. We provide a powerful, high-fidelity design
            facility to all users—completely free of conditions, paywalls, or
            compromises.
          </p>
        </div>

        {/* Features Grid */}
        <div className="space-y-4 mb-20">
          <h3 className="text-2xl font-bold text-slate-900 tracking-tight mb-8">
            Why Choose Free Resume Designer?
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Feature 1 */}
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200 hover:shadow-md hover:border-indigo-200 transition-all group">
              <div className="w-12 h-12 bg-indigo-50 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Palette className="w-6 h-6 text-indigo-600" />
              </div>
              <h4 className="text-lg font-bold text-slate-900 mb-3 block">
                No Learning Curve
              </h4>
              <p className="text-slate-600 leading-relaxed text-sm">
                Build stunning, highly-polished resumes effortlessly, even if
                you have zero design or technical experience. Our intuitive
                workspace handles the heavy lifting.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200 hover:shadow-md hover:border-emerald-200 transition-all group">
              <div className="w-12 h-12 bg-emerald-50 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Unlock className="w-6 h-6 text-emerald-600" />
              </div>
              <h4 className="text-lg font-bold text-slate-900 mb-3 block">
                Unconditional Access
              </h4>
              <p className="text-slate-600 leading-relaxed text-sm">
                Construct your resume without forced signups, hidden watermarks,
                or premium barriers. The entire suite of tools is
                unconditionally free.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200 hover:shadow-md hover:border-amber-200 transition-all group">
              <div className="w-12 h-12 bg-amber-50 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <HardDriveDownload className="w-6 h-6 text-amber-600" />
              </div>
              <h4 className="text-lg font-bold text-slate-900 mb-3 block">
                Data Resiliency
              </h4>
              <p className="text-slate-600 leading-relaxed text-sm">
                Seamlessly export your complete profile as a portable JSON
                backup. Retrieve and restore your data at any time, protecting
                against browser clearing or device swapping.
              </p>
            </div>

            {/* Feature 4 */}
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200 hover:shadow-md hover:border-rose-200 transition-all group">
              <div className="w-12 h-12 bg-rose-50 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <FileCheck2 className="w-6 h-6 text-rose-600" />
              </div>
              <h4 className="text-lg font-bold text-slate-900 mb-3 block">
                Strategic Formatting
              </h4>
              <p className="text-slate-600 leading-relaxed text-sm">
                Gain access to a highly-curated library of modern, stunning
                layouts engineered to pass corporate Applicant Tracking Systems
                (ATS) while maintaining aesthetic brilliance.
              </p>
            </div>

            {/* Feature 5 */}
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200 hover:shadow-md hover:border-sky-200 transition-all group md:col-span-2">
              <div className="w-12 h-12 bg-sky-50 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <ShieldCheck className="w-6 h-6 text-sky-600" />
              </div>
              <h4 className="text-lg font-bold text-slate-900 mb-3 block">
                Privacy & Security First
              </h4>
              <p className="text-slate-600 leading-relaxed text-sm max-w-3xl">
                We value your privacy implicitly. Your data remains entirely
                under your control—processed locally and securely saved directly
                onto your device's indexed storage. We do not transmit, analyze,
                or harvest your professional details.
              </p>
            </div>
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
