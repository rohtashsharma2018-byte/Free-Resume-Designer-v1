import React from 'react';
import { LayoutTemplate, PenTool, Layout, FileOutput, UploadCloud, MonitorPlay, Trash2 } from 'lucide-react';

export const UserManual: React.FC = () => {
  return (
    <div className="bg-white rounded-2xl p-8 border border-slate-200 shadow-sm animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-slate-900 mb-2">User Manual</h2>
        <p className="text-slate-500">A step-by-step guide to creating your professional resume using our resume builder.</p>
      </div>

      <div className="space-y-12">
        {/* Step 1: Getting Started */}
        <section className="flex flex-col md:flex-row gap-8 items-start">
          <div className="md:w-1/3 space-y-3">
            <div className="flex items-center gap-3 text-indigo-600 mb-2">
              <div className="bg-indigo-100 p-2 rounded-lg">
                <LayoutTemplate className="w-5 h-5" />
              </div>
              <h3 className="font-semibold text-lg text-slate-900">1. Getting Started</h3>
            </div>
            <p className="text-sm text-slate-600 leading-relaxed">
              Start your journey from the Dashboard. You can choose to create a <strong>Blank Resume</strong> from scratch, or <strong>Bootstrap with Sample Data</strong> if you want to see how a completed resume looks. Alternatively, browse the <strong>Resume Templates</strong> section and click "Use This" on a visual style you like.
            </p>
          </div>
          <div className="md:w-2/3 w-full bg-slate-50 rounded-xl border border-slate-200 p-4 shadow-inner grid grid-cols-2 gap-4">
            <div className="bg-white rounded-lg border border-yellow-200 p-4 flex flex-col items-center justify-center text-center gap-2 shadow-sm">
               <div className="w-10 h-10 rounded-full bg-yellow-100 flex items-center justify-center text-yellow-600">
                 <LayoutTemplate className="w-5 h-5" />
               </div>
               <span className="text-sm font-medium text-slate-800">Blank Resume</span>
            </div>
            <div className="bg-white rounded-lg border border-slate-200 p-4 flex flex-col items-center justify-center text-center gap-2 shadow-sm">
               <div className="w-10 h-10 rounded-full bg-indigo-50 flex items-center justify-center text-indigo-600">
                 <LayoutTemplate className="w-5 h-5" />
               </div>
               <span className="text-sm font-medium text-slate-800">Template Sample</span>
            </div>
          </div>
        </section>

        {/* Step 2: Filling Details */}
        <section className="flex flex-col md:flex-row gap-8 items-start">
          <div className="md:w-1/3 space-y-3">
            <div className="flex items-center gap-3 text-indigo-600 mb-2">
              <div className="bg-indigo-100 p-2 rounded-lg">
                <PenTool className="w-5 h-5" />
              </div>
              <h3 className="font-semibold text-lg text-slate-900">2. Filling Content</h3>
            </div>
            <p className="text-sm text-slate-600 leading-relaxed">
              Once inside the editor, the screen is split. On the left sidebar, click on each category (Personal Info, Experience, Education, Skills) to fill out your details. The live preview updates automatically on the right side as you type.
            </p>
          </div>
          <div className="md:w-2/3 w-full h-48 bg-slate-100 rounded-xl border border-slate-200 flex overflow-hidden shadow-inner">
             <div className="w-1/3 bg-white border-r border-slate-200 p-3">
                <div className="h-4 bg-slate-200 rounded w-1/2 mb-4"></div>
                <div className="space-y-2">
                  <div className="h-6 bg-indigo-50 text-indigo-400 rounded text-xs flex items-center px-2">Personal</div>
                  <div className="h-6 bg-slate-50 text-slate-400 rounded text-xs flex items-center px-2">Experience</div>
                  <div className="h-6 bg-slate-50 text-slate-400 rounded text-xs flex items-center px-2">Education</div>
                </div>
             </div>
             <div className="w-2/3 p-4 flex flex-col gap-3">
                <div className="h-3 bg-slate-300 w-1/3 rounded"></div>
                <div className="h-2 bg-slate-200 w-1/4 rounded"></div>
                <div className="mt-4 h-2 bg-slate-200 w-full rounded"></div>
                <div className="h-2 bg-slate-200 w-full rounded"></div>
                <div className="h-2 bg-slate-200 w-5/6 rounded"></div>
             </div>
          </div>
        </section>

        {/* Step 3: Edit vs Preview */}
        <section className="flex flex-col md:flex-row gap-8 items-start align-middle">
          <div className="md:w-1/3 space-y-3">
            <div className="flex items-center gap-3 text-indigo-600 mb-2">
              <div className="bg-indigo-100 p-2 rounded-lg">
                <MonitorPlay className="w-5 h-5" />
              </div>
              <h3 className="font-semibold text-lg text-slate-900">3. Full Window Preview</h3>
            </div>
            <p className="text-sm text-slate-600 leading-relaxed">
              Want to see exactly how it looks before printing? Use the toolbar buttons to toggle between "Edit Mode" (split screen) and "Preview Mode" (full-width view of the resume document).
            </p>
          </div>
          <div className="md:w-2/3 w-full bg-slate-50 rounded-xl border border-slate-200 p-6 shadow-inner flex flex-col items-center justify-center">
             <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-2 flex gap-2 mb-4">
                <div className="px-3 py-1 bg-indigo-600 text-white rounded text-xs">Edit Mode</div>
                <div className="px-3 py-1 bg-slate-100 text-slate-500 rounded text-xs">Preview Mode</div>
             </div>
             <div className="w-full bg-white max-w-sm rounded border border-slate-200 h-24 shadow-sm flex flex-col p-3 gap-2">
                 <div className="h-2 bg-slate-800 rounded w-1/4 mx-auto"></div>
                 <div className="h-2 bg-slate-300 rounded w-1/3 mx-auto"></div>
                 <div className="h-1 bg-slate-200 rounded w-full mt-2"></div>
                 <div className="h-1 bg-slate-200 rounded w-4/5 mx-auto"></div>
             </div>
          </div>
        </section>

        {/* Step 4: Exporting */}
        <section className="flex flex-col md:flex-row gap-8 items-start">
          <div className="md:w-1/3 space-y-3">
            <div className="flex items-center gap-3 text-indigo-600 mb-2">
              <div className="bg-indigo-100 p-2 rounded-lg">
                <FileOutput className="w-5 h-5" />
              </div>
              <h3 className="font-semibold text-lg text-slate-900">4. Export Functions</h3>
            </div>
            <p className="text-sm text-slate-600 leading-relaxed">
              When you're satisfied with your resume, export it! Click <strong>Print / Save PDF</strong> to trigger the browser's print dialog (remember to check "Save as PDF"). You can also click <strong>Export JSON</strong> to download a backup file of all your data.
            </p>
          </div>
          <div className="md:w-2/3 w-full bg-slate-50 rounded-xl border border-slate-200 p-6 shadow-inner flex justify-center gap-4">
            <button className="px-4 py-2 bg-indigo-600 text-white rounded shadow text-sm font-medium flex items-center gap-2">
              <Layout className="w-4 h-4" />
              Print / Save PDF
            </button>
            <button className="px-4 py-2 bg-white border border-slate-300 text-slate-700 rounded shadow-sm text-sm font-medium flex items-center gap-2">
              <FileOutput className="w-4 h-4" />
              Export JSON
            </button>
          </div>
        </section>

        {/* Step 5: Importing */}
        <section className="flex flex-col md:flex-row gap-8 items-start">
          <div className="md:w-1/3 space-y-3">
            <div className="flex items-center gap-3 text-indigo-600 mb-2">
              <div className="bg-indigo-100 p-2 rounded-lg">
                <UploadCloud className="w-5 h-5" />
              </div>
              <h3 className="font-semibold text-lg text-slate-900">5. Importing Backups</h3>
            </div>
            <p className="text-sm text-slate-600 leading-relaxed">
              If you have previously exported a JSON backup of your resume, you can restore it easily. From the Dashboard, click <strong>Import JSON</strong> and select your file. All your personal info, experience, and education will be immediately restored.
            </p>
          </div>
          <div className="md:w-2/3 w-full h-32 bg-slate-50 border-2 border-dashed border-slate-300 rounded-xl flex items-center justify-center flex-col text-slate-500">
             <UploadCloud className="w-8 h-8 text-indigo-400 mb-2" />
             <span className="text-sm">Click to upload your resume.json file</span>
          </div>
        </section>

        {/* Step 6: Data Management */}
        <section className="flex flex-col md:flex-row gap-8 items-start">
          <div className="md:w-1/3 space-y-3">
            <div className="flex items-center gap-3 text-red-600 mb-2">
              <div className="bg-red-100 p-2 rounded-lg">
                <Trash2 className="w-5 h-5" />
              </div>
              <h3 className="font-semibold text-lg text-slate-900">6. Data Management</h3>
            </div>
            <p className="text-sm text-slate-600 leading-relaxed">
              Need a fresh start? From the Dashboard, you can select <strong>Delete All Resumes Data</strong> to permanently clear your local storage. This action is irreversible, so please ensure you have exported any necessary backups via the JSON export function before proceeding.
            </p>
          </div>
          <div className="md:w-2/3 w-full bg-slate-50 rounded-xl border border-slate-200 p-6 shadow-inner flex justify-center">
             <button className="px-4 py-2 bg-red-600 text-white rounded shadow text-sm font-medium flex items-center gap-2">
               <Trash2 className="w-4 h-4" />
               Delete All Resumes Data
             </button>
          </div>
        </section>

      </div>
    </div>
  );
};
