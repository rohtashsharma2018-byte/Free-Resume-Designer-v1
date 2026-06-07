import React, { useState } from 'react';
import { ResumeData } from '../types';
import { Plus, Search, Trash2, Copy, FileJson, Upload, FileText, Calendar, Compass, RefreshCw, Layers, BookOpen, Download, Loader2 } from 'lucide-react';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';
import { getResumeCompletionScore } from '../lib/completion';
import { ResumePreview } from './ResumePreview';
import { UserManual } from './UserManual';
import { PDFDocument } from './PDFDocument';
import { pdf } from '@react-pdf/renderer';

const DUMMY_RESUME: ResumeData = {
  id: 'dummy',
  title: 'Dummy',
  templateId: 'modern-minimal',
  primaryColor: '#4f46e5',
  fontSize: 'sm',
  fontFamily: 'sans',
  personalInfo: {
    fullName: 'Eleanor Vance',
    jobTitle: 'Senior Infrastructure Architect',
    email: 'eleanor@vance.io',
    phone: '+1 (415) 555-0199',
    location: 'San Francisco, CA (Remote)',
    website: 'vance-eleanor.com',
    linkedin: 'linkedin.com/in/eleanorv',
    github: 'github.com/eleanor-git',
    bio: 'Staff Level Infrastructure Engineer with 8+ years designing scalable cloud-native architectures, distributed storage systems, and self-healing CI/CD networks. Proven expert at diagnosing complex container orchestration overhead to drive 40% compute optimizations.',
  },
  education: [{ id: '1', institution: 'Example University', degree: 'BSc', fieldOfStudy: 'Computer Science', location: 'San Francisco, CA', startDate: '2010', endDate: '2014', currentlyStudying: false, description: 'Graduated with honors.' }],
  experience: [{ id: '1', company: 'Genpact India', position: 'Staff Platform Architect', location: 'San Francisco, CA', startDate: '2022', endDate: 'Present', currentlyWorking: true, description: 'Architected next-generation global multi-region telemetry pipeline processing 40B+ daily transactional payloads.' }],
  skills: [{ id: '1', name: 'Technical', skills: ['TypeScript', 'Kubernetes', 'Terraform', 'AWS'] }],
  projects: [{ id: '1', title: 'Custom Paxos Consensus Module', role: 'Independent Creator', link: 'https://github.com', startDate: '2023', endDate: '2023', isCurrent: false, description: 'Engineered a highly stable, non-blocking Paxos distributed consensus framework in pure Rust.' }],
  certifications: [{ id: '1', name: 'AWS Certified Solutions Architect', issuer: 'AWS', date: '2024', link: '#' }],
  awards: [{ id: '1', name: 'Excellence in Contribution', issuer: 'Company', date: '2023', link: '#' }],
  achievements: [{ id: '1', name: 'Saved $4M annual cost', date: '2023', link: '#' }],
  languages: [{ id: '1', name: 'English', proficiency: 'Native' }],
  createdAt: Date.now(),
  updatedAt: Date.now(),
};

interface DashboardProps {
  resumes: ResumeData[];
  onSelect: (id: string) => void;
  onCreate: (title?: string, templateId?: string) => void;
  onDelete: (id: string) => void;
  onDeleteAll: () => void;
  onDuplicate: (resume: ResumeData) => void;
  onImport: (resume: ResumeData) => void;
  bootstrapSample: () => void;
}

const TEMPLATES = [
  { id: 'modern-minimal', title: 'Modern Minimal' },
  { id: 'classic-professional', title: 'Classic Professional' },
  { id: 'creative-bold', title: 'Creative Bold' },
  { id: 'academic-technical', title: 'Academic Technical' },
  { id: 'executive-premium', title: 'Executive Premium' },
  { id: 'ats-optimized', title: 'ATS Optimized' },
  { id: 'template-two-colum-1', title: 'Template Two Column 1' },
  { id: 'template-two-colum-2', title: 'Template Two Column 2' },
  { id: 'template-mixed-column', title: 'Template Mixed Column 1' },
  { id: 'template-two-colum-3', title: 'Template Two Column 3' },
  { id: 'template-column-4', title: 'Template Two Column 4' },
  { id: 'template-column-5', title: 'Template Two Column 5' },
  { id: 'template-mixed-column-2', title: 'Template Mixed Column 2' },
  { id: 'template-mixed-column-3', title: 'Template Mixed Column 3' },
  { id: 'template-mixed-column-4', title: 'Template Mixed Column 4' },
  { id: 'template-mixed-column-5', title: 'Template Mixed Column 5' },
  { id: 'template-single-column-1', title: 'Template Single Column 1' },
  { id: 'template-single-column-2', title: 'Template Single Column 2' },
  { id: 'template-single-column-3', title: 'Template Single Column 3' },
  { id: 'template-single-column-4', title: 'Template Single Column 4' },
  { id: 'template-single-column-5', title: 'Template Single Column 5' },
  { id: 'template-ats-compliant-1', title: 'Template ATS Compliant 1' },
  { id: 'template-ats-compliant-2', title: 'Template ATS Compliant 2' },
  { id: 'template-ats-compliant-3', title: 'Template ATS Compliant 3' },
  { id: 'template-ats-compliant-4', title: 'Template ATS Compliant 4' },
  { id: 'template-ats-compliant-5', title: 'Template ATS Compliant 5' },
  { id: 'template-ats-compliant-6', title: 'Template ATS Compliant 6' },
  { id: 'template-ats-compliant-7', title: 'Template ATS Compliant 7' },
  { id: 'template-ats-compliant-8', title: 'Template ATS Compliant 8' },
  { id: 'template-ats-compliant-9', title: 'Template ATS Compliant 9' },
  { id: 'template-ats-compliant-10', title: 'Template ATS Compliant 10' },
  { id: 'template-industry-pro-11', title: 'Modern Edge Pro' },
  { id: 'template-industry-pro-12', title: 'Sustainable Tech' },
  { id: 'template-industry-pro-13', title: 'Dynamic Branding' },
  { id: 'template-industry-pro-14', title: 'Global Consulting' },
  { id: 'template-industry-pro-15', title: 'Minimalist Zen' },
];

export const Dashboard: React.FC<DashboardProps> = ({
  resumes,
  onSelect,
  onCreate,
  onDelete,
  onDeleteAll,
  onDuplicate,
  onImport,
  bootstrapSample,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [importError, setImportError] = useState<string | null>(null);
  const [view, setView] = useState<'saved' | 'templates' | 'manual'>('manual');
  const [isCompilingId, setIsCompilingId] = useState<string | null>(null);
  const [showDeleteAllConfirm, setShowDeleteAllConfirm] = useState(false);
  const [countdown, setCountdown] = useState(10);
  const [canProceed, setCanProceed] = useState(false);

  React.useEffect(() => {
    let timer: NodeJS.Timeout;
    if (showDeleteAllConfirm && countdown > 0) {
      timer = setInterval(() => {
        setCountdown((prev) => prev - 1);
      }, 1000);
    } else if (showDeleteAllConfirm && countdown === 0) {
      setCanProceed(true);
    }
    return () => clearInterval(timer);
  }, [showDeleteAllConfirm, countdown]);

  const handleOpenDeleteAllModal = () => {
    setShowDeleteAllConfirm(true);
    setCountdown(10);
    setCanProceed(false);
  };

  const filteredResumes = resumes.filter((res) =>
    res.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    (res.personalInfo.fullName && res.personalInfo.fullName.toLowerCase().includes(searchQuery.toLowerCase())) ||
    (res.personalInfo.jobTitle && res.personalInfo.jobTitle.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const handleJsonImport = (e: React.ChangeEvent<HTMLInputElement>) => {
    setImportError(null);
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const parsed = JSON.parse(event.target?.result as string);
        if (!parsed.id || !parsed.title || !parsed.personalInfo) {
          throw new Error('Invalid schema format. Must match ResumeData structure.');
        }
        // Save with fresh timestamps or ID to avoid collisions
        const imported: ResumeData = {
          ...parsed,
          createdAt: Date.now(),
          updatedAt: Date.now(),
        };
        onImport(imported);
      } catch (err: any) {
        setImportError(err.message || 'Failed to parse JSON file');
      }
    };
    reader.readAsText(file);
  };

  // Helper to trigger JSON export file draft-download
  const downloadJson = (resume: ResumeData) => {
    const blob = new Blob([JSON.stringify(resume, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${resume.title.toLowerCase().replace(/\s+/g, '_')}_data.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const downloadPdf = async (resume: ResumeData) => {
    setIsCompilingId(resume.id);
    try {
      const fileName = `${resume.title.toLowerCase().replace(/[^a-z0-9]+/g, "_")}_resume.pdf`;
      const doc = <PDFDocument data={resume} />;
      const asPdf = pdf([]);
      asPdf.updateContainer(doc);
      const blob = await asPdf.toBlob();
      const url = URL.createObjectURL(blob);
      const tempLink = document.createElement("a");
      tempLink.href = url;
      tempLink.setAttribute("download", fileName);
      document.body.appendChild(tempLink);
      tempLink.click();
      document.body.removeChild(tempLink);
      URL.revokeObjectURL(url);
    } catch (err) {
      console.error("PDF generation failed:", err);
      alert("Error generating PDF.");
    } finally {
      setIsCompilingId(null);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8" id="dashboard-view">
      {/* Intro visual banner */}
      <div className="bg-yellow-400 rounded-2xl p-8 mb-8 text-yellow-950 relative overflow-hidden shadow-lg border border-yellow-500">
        <div className="absolute right-0 bottom-0 top-0 w-1/3 opacity-10 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-yellow-100 via-yellow-300 to-yellow-400 pointer-events-none" />
        <div className="max-w-2xl">
          <div className="flex flex-wrap gap-4 mt-6">
            <button 
              id="btn-create-blank"
              onClick={() => onCreate('New Resume', 'modern-minimal')} 
              className="px-5 py-2.5 bg-yellow-500 hover:bg-yellow-600 text-yellow-950 rounded-lg font-medium text-sm transition-all flex items-center gap-2 cursor-pointer shadow-sm hover:translate-y-[-1px] border border-yellow-600/50"
            >
              <Plus className="w-4.5 h-4.5" />
              Blank Resume
            </button>
            <button 
              id="btn-bootstrap-sample"
              onClick={bootstrapSample} 
              className="px-5 py-2.5 bg-white/20 hover:bg-white/30 text-yellow-950 rounded-lg font-medium text-sm transition-all flex items-center gap-2 cursor-pointer border border-yellow-600/20"
            >
              <Compass className="w-4.5 h-4.5 text-yellow-700" />
              Build with Template Sample
            </button>
            <label className="px-5 py-2.5 bg-white/10 hover:bg-white/20 text-yellow-950 rounded-lg font-medium text-sm transition-all flex items-center gap-2 cursor-pointer border border-yellow-600/20">
              <Upload className="w-4.5 h-4.5" />
              Import JSON
              <input type="file" accept=".json" onChange={handleJsonImport} className="hidden" />
            </label>
            <button 
              id="btn-delete-all"
              onClick={handleOpenDeleteAllModal}
              className="px-5 py-2.5 bg-red-600 hover:bg-red-700 text-white rounded-lg font-medium text-sm transition-all flex items-center gap-2 cursor-pointer shadow-sm hover:translate-y-[-1px] border border-red-700/50"
            >
              <Trash2 className="w-4.5 h-4.5" />
              Delete All Resumes Data
            </button>
          </div>
          {importError && (
            <p className="mt-3 text-red-700 text-xs font-mono bg-red-100 p-2 rounded border border-red-200">
              Error importing: {importError}
            </p>
          )}
        </div>
      </div>

      {/* Toolbar / Actions */}
      <div className="flex flex-col md:flex-row justify-between items-stretch md:items-center gap-4 mb-6">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-4.5 h-4.5" />
          <input
            id="search-resumes-input"
            type="text"
            placeholder="Search saved resumes by title, role or full name..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-white border border-slate-200 rounded-xl text-slate-700 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500/80 transition-all font-sans"
          />
        </div>
        <div className="text-xs text-slate-500 font-mono flex items-center gap-4">
          <div className="flex bg-slate-100 rounded-lg p-1">
            <button
              onClick={() => setView('saved')}
              className={`px-3 py-1.5 rounded-md text-sm font-medium transition cursor-pointer flex items-center gap-2 ${view === 'saved' ? 'bg-slate-800 text-white shadow-sm' : 'bg-slate-200 text-slate-700 hover:bg-slate-300'}`}
            >
              <Layers className="w-4 h-4" />
              Saved Resumes
            </button>
            <button
              onClick={() => setView('templates')}
              className={`px-3 py-1.5 rounded-md text-sm font-medium transition cursor-pointer flex items-center gap-2 ${view === 'templates' ? 'bg-slate-800 text-white shadow-sm' : 'bg-slate-200 text-slate-700 hover:bg-slate-300'}`}
            >
              <FileText className="w-4 h-4" />
              Resume Templates
            </button>
            <button
              onClick={() => setView('manual')}
              className={`px-3 py-1.5 rounded-md text-sm font-medium transition cursor-pointer flex items-center gap-2 ${view === 'manual' ? 'bg-slate-800 text-white shadow-sm' : 'bg-slate-200 text-slate-700 hover:bg-slate-300'}`}
            >
              <BookOpen className="w-4 h-4" />
              User Manual
            </button>
          </div>
          <div className="flex items-center gap-2">
            <Layers className="w-4 h-4 text-slate-400" />
            {view === 'saved' ? `Showing ${filteredResumes.length} of ${resumes.length} total designs` : view === 'templates' ? 'Browsing templates' : 'Reading Manual'}
          </div>
        </div>
      </div>

      {/* View Content */}
      {view === 'manual' ? (
        <UserManual />
      ) : view === 'saved' ? (
        filteredResumes.length === 0 ? (
          <div className="text-center py-16 bg-slate-50 border border-dashed border-slate-200 rounded-2xl">
            <FileText className="w-12 h-12 text-slate-300 mx-auto mb-3" />
            <h3 className="font-semibold text-slate-700 mb-1 text-sm">No saved resume designs found</h3>
            <p className="text-slate-400 text-xs max-w-xs mx-auto mb-6">
              Get started by creating a brand-new custom blank draft or bootstrapping from our template model.
            </p>
            <div className="flex justify-center gap-3">
              <button
                onClick={() => onCreate('New Resume', 'modern-minimal')}
                className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg text-xs font-medium cursor-pointer"
              >
                Add New Blank
              </button>
              <button
                onClick={bootstrapSample}
                className="px-4 py-2 bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 rounded-lg text-xs font-medium cursor-pointer"
              >
                Load Full Demo
              </button>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" id="saved-resumes-grid">
            {filteredResumes.map((resume) => {
              const templateLabel = resume.templateId.split('-').map(t => t.charAt(0).toUpperCase() + t.slice(1)).join(' ');
              return (
                <div 
                  key={resume.id}
                  className="bg-white rounded-xl border border-slate-200/80 shadow-xs hover:shadow-md transition-all duration-200 overflow-hidden flex flex-col justify-between"
                >
                  {/* Visual Accent Top Bar */}
                  <div className="h-2 w-full transition-all duration-300" style={{ backgroundColor: resume.primaryColor }} />

                  <div className="p-5 flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex justify-between items-start gap-2 mb-2">
                        <div className="flex items-center gap-3">
                          <div className="w-16 h-16 relative">
                            <ResponsiveContainer width="100%" height="100%">
                              <PieChart>
                                <Pie
                                  data={[{ value: getResumeCompletionScore(resume) }, { value: Math.max(0, 100 - getResumeCompletionScore(resume)) }]}
                                  innerRadius={20}
                                  outerRadius={28}
                                  paddingAngle={0}
                                  dataKey="value"
                                  startAngle={90}
                                  endAngle={-270}
                                >
                                  <Cell fill={getResumeCompletionScore(resume) > 80 ? '#22c55e' : getResumeCompletionScore(resume) >= 50 ? '#f97316' : '#ef4444'} />
                                  <Cell fill="#e2e8f0" />
                                </Pie>
                              </PieChart>
                            </ResponsiveContainer>
                            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                              <span className="text-[10px] font-bold text-slate-700">
                                {getResumeCompletionScore(resume)}%
                              </span>
                            </div>
                          </div>
                          <h4 className="font-bold text-slate-900 group-hover:text-indigo-600 transition-colors line-clamp-1 text-base">
                            {resume.title}
                          </h4>
                        </div>
                        <span className="text-xs font-semibold uppercase tracking-wider px-2 py-0.5 rounded bg-slate-100 text-slate-600">
                          {resume.fontSize}
                        </span>
                      </div>

                      <p className="text-sm text-slate-500 font-medium mb-4 flex items-center gap-1.5 font-mono">
                        <FileText className="w-3.5 h-3.5 text-slate-400" />
                        {resume.personalInfo.fullName || 'Anonymous Draft'}
                      </p>

                      <div className="space-y-1 bg-slate-50 p-3 rounded-lg border border-slate-100 mb-4 text-sm font-sans text-slate-600">
                        <div className="flex justify-between">
                          <span className="text-slate-400">Template:</span>
                          <span className="font-medium text-slate-700">{templateLabel}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-slate-400">Experience:</span>
                          <span className="font-medium text-slate-700">{resume.experience.length} details</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-slate-400">Skills:</span>
                          <span className="font-medium text-slate-700">{resume.skills.reduce((acc, c) => acc + (c.skills?.length || 0), 0)} items</span>
                        </div>
                      </div>
                    </div>

                    <div>
                      {/* Timestamp indicators */}
                      <div className="flex items-center justify-between text-xs text-slate-400 border-t border-slate-100 pt-3 mb-4">
                        <span className="flex items-center gap-1">
                          <Calendar className="w-3.5 h-3.5" />
                          {new Date(resume.updatedAt).toLocaleDateString()}
                        </span>
                        <span className="text-right">
                          {new Date(resume.updatedAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </span>
                      </div>

                      {/* Operational Actions */}
                      <div className="flex items-center justify-between gap-2">
                        <button
                          onClick={() => onSelect(resume.id)}
                          className="py-1.5 px-6 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg text-sm transition-colors cursor-pointer text-center"
                        >
                          Edit Details
                        </button>
                        
                        <div className="flex items-center gap-1">
                          <button
                            onClick={() => onDuplicate(resume)}
                            title="Duplicate and draft"
                            className="p-1.5 text-emerald-500 hover:bg-emerald-50 rounded-lg transition-colors cursor-pointer"
                          >
                            <Copy className="w-6 h-6" />
                          </button>

                          <button
                            onClick={() => downloadJson(resume)}
                            title="Export JSON backup"
                            className="p-1.5 text-purple-500 hover:bg-purple-50 rounded-lg transition-colors cursor-pointer"
                          >
                            <FileJson className="w-6 h-6" />
                          </button>

                          <button
                            onClick={() => downloadPdf(resume)}
                            title="Export PDF"
                            disabled={isCompilingId === resume.id}
                            className="p-1.5 text-indigo-500 hover:bg-indigo-50 rounded-lg transition-colors cursor-pointer disabled:opacity-50"
                          >
                            {isCompilingId === resume.id ? <Loader2 className="w-6 h-6 animate-spin text-indigo-500" /> : <Download className="w-6 h-6" />}
                          </button>

                          <button
                            onClick={() => onDelete(resume.id)}
                            title="Delete permanently"
                            className="p-1.5 text-rose-500 hover:bg-rose-50 rounded-lg transition-colors cursor-pointer"
                          >
                            <Trash2 className="w-6 h-6" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )
      ) : (
        <div className="space-y-6">
          <div className="flex items-start gap-6 overflow-x-auto pb-4">
            {TEMPLATES.map(t => {
              const templateData: ResumeData = { ...DUMMY_RESUME, id: t.id, templateId: t.id as any, title: t.title };
              return (
                <div key={t.id} className="min-w-[300px] flex flex-col gap-3">
                  <div className="bg-slate-100 rounded-xl p-2 h-[415px] overflow-hidden border border-slate-200 group relative">
                    <div className="w-[210mm] absolute left-1/2 -translate-x-1/2 top-4 origin-top scale-[0.35] h-[297mm]">
                      <ResumePreview data={templateData} zoom={1.0} />
                    </div>
                  </div>
                  <h4 className="font-bold text-slate-900">{t.title}</h4>
                  <div className="flex gap-2">
                    <button onClick={() => onCreate(t.title, t.id)} className="w-full py-1.5 px-3 bg-slate-600 text-white rounded-lg text-sm cursor-pointer hover:bg-slate-700 transition">Use This</button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
      {showDeleteAllConfirm && (
        <div className="fixed inset-0 z-[400] bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-200">
          <div className="bg-white rounded-2xl shadow-2xl max-w-sm w-full p-6">
            <h3 className="text-lg font-bold text-slate-800 mb-3">Delete Everything?</h3>
            <p className="text-sm text-slate-600 mb-6 font-medium">All resume data will be permanently deleted and cannot be recovered. Please ensure you have exported your resumes in JSON format as a backup if you wish to retain them.</p>
            <div className="flex gap-3">
              <button
                onClick={() => setShowDeleteAllConfirm(false)}
                className="flex-1 py-2.5 border border-slate-200 rounded-lg text-sm font-semibold text-slate-600 hover:bg-slate-50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={() => { onDeleteAll(); setShowDeleteAllConfirm(false); }}
                disabled={!canProceed}
                className={`flex-1 py-2.5 rounded-lg text-sm font-semibold text-white transition-colors ${canProceed ? "bg-red-600 hover:bg-red-700" : "bg-red-300 cursor-not-allowed"}`}
              >
                {canProceed ? "Proceed" : `Wait ${countdown}s`}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
