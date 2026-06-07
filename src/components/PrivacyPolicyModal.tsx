import React, { useState } from "react";
import { ShieldCheck, CheckCircle2 } from "lucide-react";

interface PrivacyPolicyModalProps {
  onProceed: () => void;
}

export const PrivacyPolicyModal: React.FC<PrivacyPolicyModalProps> = ({ onProceed }) => {
  const [hasRead, setHasRead] = useState(false);

  return (
    <div className="fixed inset-0 z-[1000] bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[80vh] flex flex-col overflow-hidden">
        <header className="p-6 border-b border-slate-100 flex items-center gap-3">
          <ShieldCheck className="w-8 h-8 text-indigo-600" />
          <h2 className="text-2xl font-bold text-slate-900">Privacy Policy</h2>
        </header>
        
        <div className="p-6 overflow-y-auto prose prose-slate max-w-none flex-1">
            <p className="font-semibold text-slate-800">
              Date of Last Revision: June 7, 2026
            </p>
            <p>
              Welcome to Free Resume Designer. Your privacy is paramount. This
              application is architected as a fully local, sandbox environment.
            </p>

            <h3 className="text-xl font-bold text-slate-900 mt-6 mb-3">
              1. Data Storage & Local Processing
            </h3>
            <p>
              All data entered into this application (including PII such as your
              name, contact details, experiences, and education) is processed
              strictly within your local browser environment. It is persisted
              locally using IndexedDB mechanisms allocated to your specific
              browser profile.
            </p>

            <h3 className="text-xl font-bold text-slate-900 mt-6 mb-3">
              2. No External Transmissions
            </h3>
            <p>
              We do not transmit, sync, or back up your personal details to
              external cloud servers or databases. There is no backend tracking
              or retention of your resumes. Consequently, we cannot recover your
              data if you clear your browser cache or uninstall your web
              browser.
            </p>

            <h3 className="text-xl font-bold text-slate-900 mt-6 mb-3">
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

        <footer className="p-6 border-t border-slate-100 bg-slate-50 flex flex-col gap-4">
          <div className="flex items-center gap-4">
              <button
                onClick={() => setHasRead(false)}
                className={`flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-lg font-semibold transition ${!hasRead ? "bg-slate-200 text-slate-700" : "bg-white text-slate-600 border border-slate-300 hover:bg-slate-100"}`}
              >
                Not Read
              </button>
              <button
                onClick={() => setHasRead(true)}
                className={`flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-lg font-semibold transition ${hasRead ? "bg-indigo-600 text-white" : "bg-white text-slate-600 border border-slate-300 hover:bg-slate-100"}`}
              >
                <CheckCircle2 className="w-5 h-5" />
                Yes, Read
              </button>
          </div>
          
          <button
            onClick={onProceed}
            disabled={!hasRead}
            className={`w-full py-3 rounded-lg font-bold text-white transition ${hasRead ? "bg-slate-900 hover:bg-slate-800" : "bg-slate-300 cursor-not-allowed"}`}
          >
            Proceed
          </button>
        </footer>
      </div>
    </div>
  );
};
