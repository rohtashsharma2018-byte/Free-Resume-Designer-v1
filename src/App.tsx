import React, { useState, useEffect, useRef } from "react";
import logoUrl from "./assets/images/logo.svg";
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";
import { ResumeData } from "./types";
import {
  getAllResumes,
  saveResume,
  deleteResume,
  deleteAllResumes,
  createDefaultResume,
} from "./lib/db";
import { getDemoResume } from "./lib/mockData";
import { Dashboard } from "./components/Dashboard";
import { LandingPage } from "./components/LandingPage";
import { AboutUs } from "./components/AboutUs";
import { PrivacyPolicy } from "./components/PrivacyPolicy";
import { CookiesPolicy } from "./components/CookiesPolicy";
import { TermsAndConditions } from "./components/TermsAndConditions";
import { ContactUs } from "./components/ContactUs";
import { PrivacyPolicyModal } from "./components/PrivacyPolicyModal";
import { ResumeForm } from "./components/ResumeForm";
import { PWAInstallPrompt } from "./components/PWAInstallPrompt";
import { ResumePreview } from "./components/ResumePreview";
import { PDFDocument } from "./components/PDFDocument";
import { pdf } from "@react-pdf/renderer";
import {
  FileText,
  ArrowLeft,
  Download,
  Eye,
  Sparkles,
  Undo2,
  Redo2,
  Paintbrush,
  Settings,
  Layout,
  ZoomIn,
  ZoomOut,
  Check,
  Info,
  FileJson,
  Copy,
  Loader2,
  Save,
  Maximize2,
  Focus,
  Minimize,
  Columns,
  Rows,
} from "lucide-react";

export default function App() {
  // Application State
  const [dashboardInitialView, setDashboardInitialView] = useState<'saved' | 'templates' | 'manual'>('saved');
  const [view, setView] = useState<
    | "landing"
    | "dashboard"
    | "builder"
    | "about"
    | "privacy"
    | "cookies"
    | "terms"
    | "contact"
  >("landing");
  const [resumes, setResumes] = useState<ResumeData[]>([]);
  const [currentResume, setCurrentResume] = useState<ResumeData | null>(null);
  const [resumeToDelete, setResumeToDelete] = useState<string | null>(null);

  const [leftPanelWidth, setLeftPanelWidth] = useState<number>(50);
  const [isDragging, setIsDragging] = useState<boolean>(false);

  const [editorLayout, setEditorLayout] = useState<"side-by-side" | "stacked">(
    "side-by-side",
  );
  const [topPanelHeight, setTopPanelHeight] = useState<number>(50);
  const [isDraggingHeight, setIsDraggingHeight] = useState<boolean>(false);
  const [isFullscreenPreview, setIsFullscreenPreview] =
    useState<boolean>(false);
  const [isFullscreenEdit, setIsFullscreenEdit] = useState<boolean>(false);
  const [isFocusMode, setIsFocusMode] = useState<boolean>(false);
  const [isMobile, setIsMobile] = useState<boolean>(false);
  const [activeSection, setActiveSection] = useState<string>("templates");
  const [showPrivacyModal, setShowPrivacyModal] = useState(() => {
    const lastAcceptedDate = localStorage.getItem('privacyPolicyAcceptedDate');
    const today = new Date().toISOString().split('T')[0];
    return lastAcceptedDate !== today;
  });

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();

    // Auto-initialize zoom scale to fit mobile screen cleanly on mount
    if (window.innerWidth < 768) {
      setZoomScale(0.45);
    } else {
      setZoomScale(0.85);
    }

    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, [view]);

  useEffect(() => {
    if (!isDragging && !isDraggingHeight) return;

    const handleMouseMove = (e: MouseEvent) => {
      e.preventDefault();
      if (isDragging) {
        const newWidth = (e.clientX / window.innerWidth) * 100;
        if (newWidth > 15 && newWidth < 85) {
          // Limit min/max to keep both panels usable
          setLeftPanelWidth(newWidth);
        }
      } else if (isDraggingHeight) {
        const headerHeight = 64; // height of top navigation panel
        const availableHeight = window.innerHeight - headerHeight;
        const relativeY = e.clientY - headerHeight;
        const newHeight = (relativeY / availableHeight) * 100;
        if (newHeight > 15 && newHeight < 85) {
          setTopPanelHeight(newHeight);
        }
      }
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length === 0) return;
      const touch = e.touches[0];
      if (isDragging) {
        const newWidth = (touch.clientX / window.innerWidth) * 100;
        if (newWidth > 15 && newWidth < 85) {
          setLeftPanelWidth(newWidth);
        }
      } else if (isDraggingHeight) {
        const headerHeight = 64; // height of top navigation panel
        const availableHeight = window.innerHeight - headerHeight;
        const relativeY = touch.clientY - headerHeight;
        const newHeight = (relativeY / availableHeight) * 100;
        if (newHeight > 15 && newHeight < 85) {
          setTopPanelHeight(newHeight);
        }
      }
    };

    const handleMouseUp = () => {
      setIsDragging(false);
      setIsDraggingHeight(false);
    };

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
    document.addEventListener("touchmove", handleTouchMove, { passive: false });
    document.addEventListener("touchend", handleMouseUp);

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
      document.removeEventListener("touchmove", handleTouchMove);
      document.removeEventListener("touchend", handleMouseUp);
    };
  }, [isDragging, isDraggingHeight]);

  // PDF Compiling & scale states
  const [isCompiling, setIsCompiling] = useState(false);
  const [zoomScale, setZoomScale] = useState(0.85);
  const [autoSaveMsg, setAutoSaveMsg] = useState<string>(
    "All drafts synchronized offline",
  );
  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [activeTab, setActiveTab] = useState<"edit" | "preview">("edit"); // Responsive split state for small screens
  const [showDownloadMenu, setShowDownloadMenu] = useState(false);

  // Undo/Redo stacks
  const [historyPast, setHistoryPast] = useState<ResumeData[]>([]);
  const [historyFuture, setHistoryFuture] = useState<ResumeData[]>([]);
  const lastStateRef = useRef<string | null>(null);

  // Initialize DB and load files
  useEffect(() => {
    loadResumesList();
  }, []);

  const loadResumesList = async () => {
    try {
      const data = await getAllResumes();
      setResumes(data);
    } catch (err) {
      console.error("Failed to load indices", err);
    }
  };

  // Push to undo stack with standard debouncing to avoid stacking every key click
  const pushToHistory = (state: ResumeData) => {
    if (!currentResume) return;

    // Stringify to compare real structural adjustments
    const currentStr = JSON.stringify(currentResume);
    const lastStr = lastStateRef.current;

    if (currentStr !== lastStr) {
      setHistoryPast((prev) => [...prev.slice(-30), currentResume]); // Max history 30 entries
      setHistoryFuture([]); // clear redo list
      lastStateRef.current = currentStr;
    }
  };

  // Trigger Local Save & update list
  const triggerDBSave = async (stateToSave: ResumeData) => {
    setAutoSaveMsg("Saving...");
    setIsSaving(true);
    setSaveSuccess(false);
    try {
      const updated = {
        ...stateToSave,
        updatedAt: Date.now(),
      };
      await saveResume(updated);

      const timeStr = new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
      });
      setAutoSaveMsg(`Auto-saved at ${timeStr}`);

      // Update local index cache silent so list is accurate
      setResumes((prev) =>
        prev.map((r) => (r.id === updated.id ? updated : r)),
      );
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 2000);
    } catch (err) {
      setAutoSaveMsg("Offline Draft Mode");
      console.error("Auto save failed", err);
    } finally {
      setIsSaving(false);
    }
  };

  // Auto-save timer (every 60 seconds)
  useEffect(() => {
    if (!currentResume || view !== "builder") return;

    const interval = setInterval(() => {
      triggerDBSave(currentResume);
    }, 60000); // exactly every 60 seconds

    return () => clearInterval(interval);
  }, [currentResume, view]);

  // Main input changes
  const handleResumeChange = (updated: ResumeData) => {
    if (currentResume) {
      pushToHistory(currentResume);
    }
    setCurrentResume(updated);
  };

  // Undo execution
  const executeUndo = () => {
    if (historyPast.length === 0 || !currentResume) return;
    const previous = historyPast[historyPast.length - 1];
    const freshPast = historyPast.slice(0, -1);

    setHistoryFuture((prev) => [currentResume, ...prev]);
    setHistoryPast(freshPast);
    setCurrentResume(previous);
    triggerDBSave(previous);
  };

  // Redo execution
  const executeRedo = () => {
    if (historyFuture.length === 0 || !currentResume) return;
    const next = historyFuture[0];
    const freshFuture = historyFuture.slice(1);

    setHistoryPast((prev) => [...prev, currentResume]);
    setHistoryFuture(freshFuture);
    setCurrentResume(next);
    triggerDBSave(next);
  };

  // Create new blank resume
  const handleCreate = async (
    title = "Untitled Designing Resume",
    templateId = "modern-minimal",
  ) => {
    const fresh = createDefaultResume(title);
    fresh.templateId = templateId as ResumeData["templateId"];
    await saveResume(fresh);
    setCurrentResume(fresh);
    setHistoryPast([]);
    setHistoryFuture([]);
    setView("builder");
    loadResumesList();
  };

  // Bootstrap with Eleanor Vance Demo details
  const handleBootstrapDemo = async () => {
    const demo = getDemoResume();
    demo.id = crypto.randomUUID
      ? crypto.randomUUID()
      : Math.random().toString(36).substring(2, 11);
    demo.title = "Eleanor Vance (Staff Infrastructure Architect)";
    demo.createdAt = Date.now();
    demo.updatedAt = Date.now();
    await saveResume(demo);
    setCurrentResume(demo);
    setHistoryPast([]);
    setHistoryFuture([]);
    setView("builder");
    loadResumesList();
  };

  // Delete resume
  const handleDelete = (id: string) => {
    setResumeToDelete(id);
  };

  const confirmDelete = async () => {
    if (resumeToDelete) {
      await deleteResume(resumeToDelete);
      loadResumesList();
      if (currentResume?.id === resumeToDelete) {
        setCurrentResume(null);
        setView("dashboard");
      }
      setResumeToDelete(null);
    }
  };

  const handleDeleteAllResumes = async () => {
    await deleteAllResumes();
    loadResumesList();
    setCurrentResume(null);
    setView("dashboard");
  };

  // Duplicate resume layout
  const handleDuplicate = async (resume: ResumeData) => {
    const freshId = crypto.randomUUID
      ? crypto.randomUUID()
      : Math.random().toString(36).substring(2, 11);
    const duplicated: ResumeData = {
      ...resume,
      id: freshId,
      title: `Copy of ${resume.title}`,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    };
    await saveResume(duplicated);
    loadResumesList();
  };

  // Import JSON action
  const handleImport = async (imported: ResumeData) => {
    const freshId = crypto.randomUUID
      ? crypto.randomUUID()
      : Math.random().toString(36).substring(2, 11);
    const duplicated: ResumeData = {
      ...imported,
      id: freshId,
      title: `${imported.title} (Imported)`,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    };
    await saveResume(duplicated);
    setCurrentResume(duplicated);
    setView("builder");
    loadResumesList();
  };

  // Export metadata to clipboard
  const copyDataToClipboard = () => {
    if (!currentResume) return;
    navigator.clipboard.writeText(JSON.stringify(currentResume, null, 2));
    alert("Resume schema data successfully copied to clipboard!");
  };

  // Compile PDF via react-pdf and trigger download
  const handleDownloadPDF = async () => {
    if (!currentResume) return;
    setIsCompiling(true);
    try {
      const fileName = `${currentResume.title.toLowerCase().replace(/[^a-z0-9]+/g, "_")}_resume.pdf`;
      const doc = <PDFDocument data={currentResume} />;
      const blobResult = await pdf(doc).toBlob();

      const fileUrl = URL.createObjectURL(blobResult);
      const tempLink = document.createElement("a");
      tempLink.href = fileUrl;
      tempLink.download = fileName;
      document.body.appendChild(tempLink);
      tempLink.click();
      document.body.removeChild(tempLink);
      URL.revokeObjectURL(fileUrl);
    } catch (err) {
      console.error("Could not export PDF file:", err);
      alert(
        "Internal PDF compilation error. Please check that images are smaller than 2MB and try again.",
      );
    } finally {
      setIsCompiling(false);
    }
  };

  // Export structured data directly to a JSON file
  const handleExportJSON = () => {
    if (!currentResume) return;
    try {
      const fileName = `${currentResume.title.toLowerCase().replace(/[^a-z0-9]+/g, "_")}_resume.json`;
      const blob = new Blob([JSON.stringify(currentResume, null, 2)], {
        type: "application/json",
      });
      const url = URL.createObjectURL(blob);
      const tempLink = document.createElement("a");
      tempLink.href = url;
      tempLink.download = fileName;
      document.body.appendChild(tempLink);
      tempLink.click();
      document.body.removeChild(tempLink);
      URL.revokeObjectURL(url);
    } catch (err) {
      console.error("Could not export JSON backup:", err);
      alert("Error exporting JSON backup.");
    }
  };

  // Options panel pre-defined color palette
  const colors = [
    { name: "Classic Slate", value: "#1e293b" },
    { name: "Indigo Aura", value: "#6366f1" },
    { name: "Sapphire Blue", value: "#1d4ed8" },
    { name: "Forest Emerald", value: "#059669" },
    { name: "Sunset Amber", value: "#d97706" },
    { name: "Cyber Purple", value: "#a855f7" },
    { name: "Crimson Bold", value: "#be123c" },
    { name: "Ocean Teal", value: "#0d9488" },
  ];

  const templates = [
    { id: "ats-optimized", name: "ATS Optimized (Single Column)" },
    { id: "ats-standout", name: "ATS Standout (Modern Dual Column)" },
    { id: "ats-lunar", name: "ATS Lunar (Orange & Grey Dual)" },
    { id: "ats-universe", name: "ATS Universe (Yellow & Grey Single-Column)" },
    { id: "ats-supernova", name: "ATS Supernova (Rose & Slate Single-Column)" },
    { id: "ats-shining-star", name: "ATS Shining Star (Navy & Silver Duo)" },
    { id: "modern-minimal", name: "Modern Minimal" },
    { id: "classic-professional", name: "Classic Professional" },
    { id: "creative-bold", name: "Creative Bold" },
    { id: "academic-technical", name: "Academic/Technical" },
    { id: "executive-premium", name: "Executive Premium" },
  ];

  if (view === "about") {
    return (
      <div
        className="min-h-screen bg-slate-50 flex flex-col font-sans select-none"
        id="app-root"
      >
        <AboutUs onBack={() => setView("landing")} />
      </div>
    );
  }

  if (view === "privacy") {
    return (
      <div
        className="min-h-screen bg-slate-50 flex flex-col font-sans select-none"
        id="app-root"
      >
        <PrivacyPolicy onBack={() => setView("landing")} />
      </div>
    );
  }

  if (view === "cookies") {
    return (
      <div
        className="min-h-screen bg-slate-50 flex flex-col font-sans select-none"
        id="app-root"
      >
        <CookiesPolicy onBack={() => setView("landing")} />
      </div>
    );
  }

  if (view === "terms") {
    return (
      <div
        className="min-h-screen bg-slate-50 flex flex-col font-sans select-none"
        id="app-root"
      >
        <TermsAndConditions onBack={() => setView("landing")} />
      </div>
    );
  }

  if (view === "contact") {
    return (
      <div
        className="min-h-screen bg-slate-50 flex flex-col font-sans select-none"
        id="app-root"
      >
        <ContactUs onBack={() => setView("landing")} />
      </div>
    );
  }

  if (view === "landing") {
    return (
      <div
        className="min-h-screen bg-slate-50 flex flex-col font-sans select-none"
        id="app-root"
      >
        <LandingPage
          onStartDesigning={() => { setDashboardInitialView('saved'); setView("dashboard"); }}
          onExploreTemplates={() => { setDashboardInitialView('templates'); setView("dashboard"); }}
          onCreateWithTemplate={async (title, templateId) => {
            await handleCreate(title, templateId);
          }}
          onExploreSample={async () => {
            await handleBootstrapDemo();
          }}
          onNavigateAbout={() => setView("about")}
          onNavigatePrivacy={() => setView("privacy")}
          onNavigateCookies={() => setView("cookies")}
          onNavigateTerms={() => setView("terms")}
          onNavigateContact={() => setView("contact")}
        />
        {/* Interactive PWA Install Banner */}
        <PWAInstallPrompt />

      </div>
    );
  }

  return (
    <div
      className="min-h-screen bg-slate-50 flex flex-col font-sans select-none"
      id="app-root"
    >
      {/* Header bar */}
      <header className="bg-white border-b border-slate-200/80 sticky top-0 z-50 px-4 py-3 shadow-xs">
        <div className="max-w-7xl mx-auto flex flex-col gap-2">
          <div className="flex items-center justify-between gap-4 w-full">
            {/* Logo Title */}
            <div className="flex items-center gap-3">
              {view === "builder" ? (
                <button
                  id="btn-back-dashboard"
                  onClick={() => {
                    if (currentResume) {
                      triggerDBSave(currentResume);
                    }
                    setDashboardInitialView("saved");
                    setView("dashboard");
                    loadResumesList();
                  }}
                  className="px-3 py-1.5 bg-yellow-400 hover:bg-yellow-500 text-yellow-950 rounded-lg transition-colors cursor-pointer flex items-center gap-1.5 text-sm font-semibold"
                  title="Save & Return to Dashboard"
                >
                  <ArrowLeft className="w-4 h-4 text-yellow-950" />
                  <span>Back to Dashboard</span>
                </button>
              ) : (
                <button
                  onClick={() => setView("landing")}
                  className="p-1 hover:bg-slate-100 rounded-lg transition cursor-pointer flex items-center gap-2.5 text-left border border-transparent"
                  title="Back to Welcome Landing"
                >
                  <img 
                    src={logoUrl} 
                    className="w-12 h-12 object-contain rounded-lg shadow-sm transition-transform duration-200 hover:scale-105" 
                    alt="Logo" 
                    referrerPolicy="no-referrer" 
                  />
                  <div>
                    <span className="font-extrabold text-[#0f172a] text-sm block tracking-tight">
                      Free Resume Designer
                    </span>
                  </div>
                </button>
              )}
            </div>

            {/* Builder controls toolbar */}
            {view === "builder" && currentResume && (
              <div className="flex-1 max-w-2xl px-2 hidden sm:flex items-center justify-center gap-3">
                {/* Undo / Redo */}
                <div className="flex items-center border-r border-slate-200 pr-3 gap-1">
                  <button
                    id="btn-undo"
                    onClick={executeUndo}
                    disabled={historyPast.length === 0}
                    className="p-1.5 text-slate-500 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition disabled:opacity-30 disabled:hover:bg-transparent cursor-pointer"
                    title="Undo alteration"
                  >
                    <Undo2 className="w-4 h-4" />
                  </button>
                  <button
                    id="btn-redo"
                    onClick={executeRedo}
                    disabled={historyFuture.length === 0}
                    className="p-1.5 text-slate-500 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition disabled:opacity-30 disabled:hover:bg-transparent cursor-pointer"
                    title="Redo alteration"
                  >
                    <Redo2 className="w-4 h-4" />
                  </button>
                </div>

                {/* Theme/Color Select */}
                <div className="relative group/color-picker flex items-center gap-1">
                  <Paintbrush className="w-4 h-4 text-slate-400" />
                  <div className="flex items-center gap-1 bg-slate-50 border border-slate-200 p-1 rounded-lg">
                    {colors.map((c) => (
                      <button
                        id={`color-select-${c.value}`}
                        key={c.value}
                        onClick={() =>
                          handleResumeChange({
                            ...currentResume,
                            primaryColor: c.value,
                          })
                        }
                        style={{ backgroundColor: c.value }}
                        className={`w-4 h-4 rounded-full border border-white cursor-pointer transition-transform duration-100 relative group/colitem`}
                        title={c.name}
                      >
                        {currentResume.primaryColor === c.value && (
                          <Check className="w-2.5 h-2.5 text-white absolute inset-0 m-auto" />
                        )}
                      </button>
                    ))}

                    {/* Hex Picker custom input */}
                    <input
                      id="input-hex-color"
                      type="color"
                      value={currentResume.primaryColor}
                      onChange={(e) =>
                        handleResumeChange({
                          ...currentResume,
                          primaryColor: e.target.value,
                        })
                      }
                      className="w-4 h-4 rounded-full border-0 cursor-pointer overflow-hidden p-0"
                      title="Custom color hex"
                    />
                  </div>
                </div>

                {/* Font Choices and Size */}
                <div className="flex items-center gap-1.5 bg-slate-50 border border-slate-200 p-1 rounded-lg text-sm text-slate-700">
                  <select
                    id="select-font-family"
                    value={currentResume.fontFamily}
                    onChange={(e) =>
                      handleResumeChange({
                        ...currentResume,
                        fontFamily: e.target.value as any,
                      })
                    }
                    className="bg-transparent border-0 outline-none pr-1 cursor-pointer font-medium"
                  >
                    <option value="sans">Clean Sans</option>
                    <option value="serif">Classic Serif</option>
                    <option value="mono">Tech Monospace</option>
                    <option value="display">Display Grotesk</option>
                  </select>
                  <span className="text-slate-300">|</span>
                  <select
                    id="select-font-size"
                    value={currentResume.fontSize}
                    onChange={(e) =>
                      handleResumeChange({
                        ...currentResume,
                        fontSize: e.target.value as any,
                      })
                    }
                    className="bg-transparent border-0 outline-none cursor-pointer font-mono"
                  >
                    <option value="sm">Small</option>
                    <option value="base">Norm</option>
                    <option value="lg">Large</option>
                  </select>
                </div>
              </div>
            )}

            {/* Global Operations */}
            <div className="flex items-center gap-2">
              {view === "builder" && currentResume && (
                <>
                  {/* Layout Selector segmented button group */}
                  <div className="hidden lg:flex bg-slate-100 p-1 rounded-lg border border-slate-200/80">
                    <button
                      id="btn-layout-side"
                      onClick={() => setEditorLayout("side-by-side")}
                      title="Side-by-Side Panel Layout"
                      className={`p-1.5 rounded-md cursor-pointer transition-all flex items-center gap-1 ${
                        editorLayout === "side-by-side"
                          ? "bg-white text-indigo-600 shadow-xs"
                          : "text-slate-500 hover:text-slate-850"
                      }`}
                    >
                      <Columns className="w-4 h-4" />
                    </button>
                    <button
                      id="btn-layout-stacked"
                      onClick={() => setEditorLayout("stacked")}
                      title="Stacked Top/Bottom Layout"
                      className={`p-1.5 rounded-md cursor-pointer transition-all flex items-center gap-1 ${
                        editorLayout === "stacked"
                          ? "bg-white text-indigo-600 shadow-xs"
                          : "text-slate-500 hover:text-slate-850"
                      }`}
                    >
                      <Rows className="w-4 h-4" />
                    </button>
                  </div>

                  <button
                    onClick={() => setIsFullscreenEdit(true)}
                    title="Fullscreen Edit Mode"
                    className="px-3 py-1.5 text-white hover:text-white bg-emerald-600 hover:bg-emerald-700 border border-emerald-700 rounded-lg transition-colors cursor-pointer flex items-center gap-1.5 text-sm font-semibold"
                  >
                    <Maximize2 className="w-4 h-4" />
                    <span>Edit Fullscreen</span>
                  </button>

                  <button
                    onClick={() => setIsFullscreenPreview(true)}
                    title="Fullscreen Preview Mode"
                    className="px-3 py-1.5 text-slate-700 bg-slate-200 hover:bg-slate-300 rounded-lg transition-colors cursor-pointer flex items-center gap-1.5 text-sm font-semibold border border-transparent"
                  >
                    <Eye className="w-4 h-4" />
                    <span>Preview Mode</span>
                  </button>

                  <button
                    onClick={() => triggerDBSave(currentResume)}
                    disabled={isSaving}
                    className="px-4 py-1.5 self-stretch justify-center bg-slate-800 hover:bg-slate-900 text-white text-sm font-semibold rounded-lg transition-all flex items-center gap-1.5 cursor-pointer shadow-sm border border-transparent disabled:opacity-80 disabled:cursor-not-allowed"
                  >
                    {isSaving ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        Saving...
                      </>
                    ) : saveSuccess ? (
                      <>
                        <Check className="w-4 h-4 text-emerald-300" />
                        Saved!
                      </>
                    ) : (
                      <>
                        <Save className="w-4 h-4" />
                        Save
                      </>
                    )}
                  </button>
                </>
              )}
            </div>
          </div>

          {/* Builder controls toolbar (Mobile Version) */}
          {view === "builder" && currentResume && (
            <div className="sm:hidden flex flex-wrap items-center justify-between border-t border-slate-100 pt-2 gap-2 w-full">
              {/* Undo / Redo */}
              <div className="flex items-center border-r border-slate-200 pr-2 gap-1 shrink-0">
                <button
                  id="btn-undo-mobile"
                  onClick={executeUndo}
                  disabled={historyPast.length === 0}
                  className="p-1 text-slate-500 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition disabled:opacity-30 disabled:hover:bg-transparent cursor-pointer"
                  title="Undo alteration"
                >
                  <Undo2 className="w-3.5 h-3.5" />
                </button>
                <button
                  id="btn-redo-mobile"
                  onClick={executeRedo}
                  disabled={historyFuture.length === 0}
                  className="p-1 text-slate-500 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition disabled:opacity-30 disabled:hover:bg-transparent cursor-pointer"
                  title="Redo alteration"
                >
                  <Redo2 className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* Theme/Color Select */}
              <div className="flex items-center gap-1 shrink-0">
                <Paintbrush className="w-3.5 h-3.5 text-slate-400" />
                <div className="flex items-center gap-1 bg-slate-50 border border-slate-200 p-0.5 rounded-md">
                  {colors.map((c) => (
                    <button
                      id={`color-select-${c.value}-mobile`}
                      key={c.value}
                      onClick={() =>
                        handleResumeChange({
                          ...currentResume,
                          primaryColor: c.value,
                        })
                      }
                      style={{ backgroundColor: c.value }}
                      className={`w-3.5 h-3.5 rounded-full border border-white cursor-pointer transition-transform duration-100 relative`}
                      title={c.name}
                    >
                      {currentResume.primaryColor === c.value && (
                        <Check className="w-2 h-2 text-white absolute inset-0 m-auto" />
                      )}
                    </button>
                  ))}

                  {/* Hex Picker custom input */}
                  <input
                    id="input-hex-color-mobile"
                    type="color"
                    value={currentResume.primaryColor}
                    onChange={(e) =>
                      handleResumeChange({
                        ...currentResume,
                        primaryColor: e.target.value,
                      })
                    }
                    className="w-3.5 h-3.5 rounded-full border-0 cursor-pointer overflow-hidden p-0"
                    title="Custom color hex"
                  />
                </div>
              </div>

              {/* Font Choices and Size */}
              <div className="flex items-center gap-1 bg-slate-50 border border-slate-200 p-0.5 rounded-md text-[11px] text-slate-700 shrink-0">
                <select
                  id="select-font-family-mobile"
                  value={currentResume.fontFamily}
                  onChange={(e) =>
                    handleResumeChange({
                      ...currentResume,
                      fontFamily: e.target.value as any,
                    })
                  }
                  className="bg-transparent border-0 outline-none pr-0.5 cursor-pointer font-medium"
                >
                  <option value="sans">Sans</option>
                  <option value="serif">Serif</option>
                  <option value="mono">Mono</option>
                  <option value="display">Grotesk</option>
                </select>
                <span className="text-slate-300">|</span>
                <select
                  id="select-font-size-mobile"
                  value={currentResume.fontSize}
                  onChange={(e) =>
                    handleResumeChange({
                      ...currentResume,
                      fontSize: e.target.value as any,
                    })
                  }
                  className="bg-transparent border-0 outline-none cursor-pointer font-mono"
                >
                  <option value="sm">Sm</option>
                  <option value="base">Def</option>
                  <option value="lg">Lg</option>
                </select>
              </div>
            </div>
          )}
        </div>
      </header>

      {/* Primary Container View */}
      <main className="flex-1 w-full bg-slate-50">
        {view === "dashboard" ? (
          <Dashboard
            resumes={resumes}
            initialView={dashboardInitialView}
            onSelect={(id) => {
              const matched = resumes.find((r) => r.id === id);
              if (matched) {
                setCurrentResume(matched);
                setHistoryPast([]);
                setHistoryFuture([]);
                setView("builder");
              }
            }}
            onCreate={handleCreate}
            onDelete={handleDelete}
            onDeleteAll={handleDeleteAllResumes}
            onDuplicate={handleDuplicate}
            onImport={handleImport}
            bootstrapSample={handleBootstrapDemo}
          />
        ) : (
          // Builder Editor Workplace
          currentResume && (
            <div
              className={`h-[calc(100vh-64px)] overflow-hidden flex flex-col ${
                editorLayout === "side-by-side" && !isMobile
                  ? "md:flex-row"
                  : ""
              }`}
            >
              {/* Form editing module (Left/Top) */}
              <div
                className={`p-3 sm:p-4 md:p-6 flex flex-col justify-between overflow-hidden shrink-0 transition-all duration-75 border-b md:border-b-0 border-slate-200/60 ${
                  editorLayout === "side-by-side" && !isMobile
                    ? "w-[var(--panel-width)] h-full"
                    : "h-[var(--panel-height)] w-full"
                }`}
                style={
                  editorLayout === "side-by-side" && !isMobile
                    ? ({
                        "--panel-width": `${leftPanelWidth}%`,
                      } as React.CSSProperties)
                    : ({
                        "--panel-height": `${topPanelHeight}%`,
                      } as React.CSSProperties)
                }
              >
                {/* Title */}
                <div className="mb-3 bg-white p-3 sm:p-4 rounded-xl border border-slate-100 flex flex-col sm:flex-row gap-3 sm:gap-4 items-stretch sm:items-center justify-between">
                  <div className="flex-1">
                    <label className="text-[10px] uppercase font-mono tracking-wider text-slate-400 block mb-0.5">
                      Resume Display Name
                    </label>
                    <input
                      id="input-resume-title"
                      type="text"
                      value={currentResume.title}
                      onChange={(e) =>
                        handleResumeChange({
                          ...currentResume,
                          title: e.target.value,
                        })
                      }
                      className="font-bold text-slate-800 text-sm bg-transparent border-0 outline-none w-full focus:ring-1 focus:ring-slate-100 rounded p-0.5"
                    />
                  </div>
                </div>

                <div className="flex-1 overflow-hidden">
                  <ResumeForm
                    data={currentResume}
                    onChange={handleResumeChange}
                    activeSection={activeSection}
                    setActiveSection={setActiveSection}
                  />
                </div>
              </div>

              {/* Draggable Divider */}
              {editorLayout === "side-by-side" && !isMobile ? (
                <div
                  className="hidden md:flex flex-col items-center justify-center w-1.5 hover:w-2.5 hover:bg-indigo-300 bg-slate-200 cursor-col-resize z-50 shrink-0 group relative select-none"
                  onMouseDown={() => setIsDragging(true)}
                  onTouchStart={() => setIsDragging(true)}
                >
                  <div
                    className={`absolute inset-y-0 -left-3 -right-3 cursor-col-resize ${isDragging ? "bg-transparent" : ""}`}
                  ></div>
                  <div
                    className={`h-12 w-1 rounded-full transition-colors ${isDragging ? "bg-indigo-600" : "bg-slate-400 group-hover:bg-indigo-600"}`}
                  />
                </div>
              ) : (
                <div
                  className="flex flex-row items-center justify-center h-2 hover:h-3 hover:bg-indigo-300 bg-slate-200 cursor-row-resize z-50 shrink-0 group relative select-none"
                  onMouseDown={() => setIsDraggingHeight(true)}
                  onTouchStart={() => setIsDraggingHeight(true)}
                >
                  <div
                    className={`absolute inset-x-0 -top-3 -bottom-3 cursor-row-resize ${isDraggingHeight ? "bg-transparent" : ""}`}
                  ></div>
                  <div
                    className={`w-16 h-1 rounded-full transition-colors ${isDraggingHeight ? "bg-indigo-600" : "bg-slate-400 group-hover:bg-indigo-600"}`}
                  />
                </div>
              )}

              {/* Styled Preview module (Right/Bottom) */}
              <div
                className={`flex-1 min-w-0 bg-slate-300 border-none p-3 sm:p-6 overflow-auto flex flex-col items-start md:items-center justify-start relative select-none ${isDragging || isDraggingHeight ? "pointer-events-none" : ""}`}
              >
                {/* Zoom Controller & view stats overlay */}
                <div className="absolute right-6 top-6 bg-slate-900/95 backdrop-blur-md rounded-xl p-1.5 flex items-center gap-1.5 z-40 text-white shadow-lg border border-slate-800">
                  <button
                    onClick={() => setZoomScale((z) => Math.max(z - 0.05, 0.5))}
                    className="p-1 hover:bg-slate-800 rounded transition cursor-pointer"
                    title="Zoom Out"
                  >
                    <ZoomOut className="w-3.5 h-3.5" />
                  </button>
                  <span className="text-[10px] font-mono px-1 border-r border-slate-800">
                    {Math.round(zoomScale * 100)}%
                  </span>
                  <button
                    onClick={() => setZoomScale((z) => Math.min(z + 0.05, 1.2))}
                    className="p-1 hover:bg-slate-800 rounded transition cursor-pointer"
                    title="Zoom In"
                  >
                    <ZoomIn className="w-3.5 h-3.5" />
                  </button>

                  {/* Fullscreen trigger button */}
                  <button
                    onClick={() => setIsFullscreenPreview(true)}
                    className="p-1 hover:bg-slate-800 rounded transition cursor-pointer text-slate-300 hover:text-white border-l border-slate-850 pl-1.5 ml-0.5"
                    title="View Fullscreen Preview"
                  >
                    <Maximize2 className="w-3.5 h-3.5" />
                  </button>
                </div>

                <div className="absolute left-6 top-6 bg-slate-900/95 backdrop-blur-md text-slate-300 rounded-xl px-2.5 py-1.5 text-[10px] font-mono z-40 shadow-lg border border-slate-800 flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  Perfect A4 Layout Bound
                </div>

                {/* Main page center */}
                <div className="w-full flex justify-start md:justify-center py-10">
                  <ResumePreview data={currentResume} zoom={zoomScale} />
                </div>
              </div>
            </div>
          )
        )}
      </main>

      {/* Delete Confirmation Modal */}
      {resumeToDelete && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-900/50 backdrop-blur-sm p-4">
          <div className="bg-white rounded-2xl shadow-xl max-w-sm w-full p-6 animate-in fade-in zoom-in duration-200">
            <h3 className="text-xl font-bold text-slate-900 mb-2">
              Delete Resume
            </h3>
            <p className="text-sm text-slate-500 mb-6 leading-relaxed">
              Are you absolutely sure you want to delete this resume? This
              action cannot be undone.
            </p>
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setResumeToDelete(null)}
                className="px-4 py-2 font-medium text-slate-600 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={confirmDelete}
                className="px-4 py-2 font-medium text-white bg-red-600 hover:bg-red-700 rounded-lg transition-colors shadow-sm cursor-pointer hover:shadow"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Fullscreen Preview Modal */}
      {isFullscreenPreview && currentResume && (
        <div className="fixed inset-0 z-[120] bg-slate-900/95 backdrop-blur-md flex flex-col animate-in fade-in duration-200 overflow-hidden">
          <TransformWrapper
            initialScale={zoomScale * 1.15}
            minScale={0.3}
            maxScale={3}
            limitToBounds={false}
            centerOnInit={true}
          >
            {({ zoomIn, zoomOut, resetTransform, state }) => (
              <>
                {/* Header */}
                {!isFocusMode && (
                  <div className="bg-slate-900 border-b border-slate-800 px-4 sm:px-6 py-3 flex flex-col gap-3 text-white z-10 shrink-0 min-w-0 overflow-hidden">
                    <div className="flex items-center gap-3 w-full">
                      <span className="text-sm bg-slate-600 px-2 py-1 rounded font-semibold text-white uppercase tracking-wider shrink-0">
                        Preview Mode
                      </span>
                      <h2 className="font-bold text-base text-slate-100 truncate flex-1 md:max-w-none">
                        {currentResume.title}
                      </h2>
                    </div>

                    {/* Controls */}
                    <div className="flex items-center gap-2 w-full overflow-x-auto scrollbar-none pb-1">
                      <button
                        onClick={() => setIsFocusMode(true)}
                        className="px-4 py-2 bg-yellow-500 hover:bg-yellow-400 text-yellow-950 rounded-lg text-sm font-semibold transition flex items-center gap-2 cursor-pointer border border-yellow-600 shadow-sm shrink-0"
                        title="Enter Focus Mode"
                      >
                        <Focus className="w-5 h-5" />
                        <span className="hidden sm:inline">Focus</span>
                      </button>

                      <div className="flex items-center bg-slate-800 border border-slate-700 rounded-lg py-1.5 px-1 gap-0.5 shrink-0">
                      <button
                        onClick={() => zoomOut(0.1)}
                        className="p-1 hover:bg-slate-700 rounded transition cursor-pointer text-slate-300 hover:text-white"
                        title="Zoom Out"
                      >
                        <ZoomOut className="w-4 h-4" />
                      </button>
                      <span className="text-xs font-mono text-slate-300 w-11 text-center">
                        {Math.round(state.scale * 100)}%
                      </span>
                      <button
                        onClick={() => zoomIn(0.1)}
                        className="p-1 hover:bg-slate-700 rounded transition cursor-pointer text-slate-300 hover:text-white"
                        title="Zoom In"
                      >
                        <ZoomIn className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => resetTransform()}
                        className="p-1 ml-0.5 text-xs font-semibold hover:bg-slate-700 rounded transition cursor-pointer text-slate-300 hover:text-white border-l border-slate-700 pl-2"
                        title="Reset Zoom"
                      >
                        Reset
                      </button>
                    </div>

                    <button
                      onClick={() => {
                        setIsFullscreenPreview(false);
                        setIsFullscreenEdit(true);
                      }}
                      className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 hover:text-white rounded-lg text-sm font-semibold transition flex items-center gap-2 cursor-pointer border border-slate-700 ml-2 shrink-0"
                    >
                      <FileText className="w-5 h-5 text-emerald-400" />
                      <span className="hidden sm:inline">Edit Mode</span>
                    </button>

                    <button
                      onClick={() => setShowDownloadMenu(true)}
                      className="px-4 py-2 text-white bg-slate-800 hover:bg-slate-900 rounded-lg text-sm font-semibold transition-all shadow-sm flex items-center gap-2 cursor-pointer shrink-0"
                    >
                      {isCompiling ? (
                        <Loader2 className="w-5 h-5 animate-spin" />
                      ) : (
                        <Download className="w-5 h-5" />
                      )}
                      <span className="hidden sm:inline">Download</span>
                    </button>

                    <button
                      onClick={() => setIsFullscreenPreview(false)}
                      className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg text-sm font-semibold transition cursor-pointer border border-red-700 shrink-0"
                    >
                      Close
                    </button>
                  </div>
                </div>
                )}

                {isFocusMode && (
                  <button
                    onClick={() => setIsFocusMode(false)}
                    className="fixed top-4 right-4 z-[200] p-3 bg-yellow-500 hover:bg-yellow-400 border border-yellow-600 rounded-full text-yellow-950 transition-colors cursor-pointer shadow-lg group"
                    title="Exit Focus Mode"
                  >
                    <Minimize className="w-5 h-5 group-hover:scale-95 transition-transform" />
                  </button>
                )}

                {/* Fullscreen Content Area */}
                <div className="flex-1 w-full bg-slate-950/40 relative overflow-hidden flex cursor-grab active:cursor-grabbing">
                  <TransformComponent wrapperStyle={{ width: "100%", height: "100%" }}>
                    <div className="p-4 sm:p-12 w-full h-full flex justify-center items-center">
                      <div className="h-fit shrink-0 relative bg-white shadow-2xl transition-shadow duration-300">
                        <ResumePreview data={currentResume} zoom={1} />
                      </div>
                    </div>
                  </TransformComponent>
                </div>
              </>
            )}
          </TransformWrapper>
        </div>
      )}

      {/* Fullscreen Edit Modal */}
      {isFullscreenEdit && currentResume && (
        <div
          className="fixed inset-0 z-[120] bg-slate-50 flex flex-col animate-in fade-in duration-200"
          id="fullscreen-edit-modal"
        >
          {/* Header */}
          {!isFocusMode && (
          <div className="bg-slate-900 border-b border-slate-800 px-4 sm:px-6 py-3 flex flex-col gap-3 text-white z-10 shrink-0 min-w-0 overflow-hidden">
            <div className="flex items-center gap-3 w-full">
              <span className="text-sm bg-emerald-600 px-2 py-1 rounded font-semibold text-white uppercase tracking-wider shrink-0">
                Edit Mode
              </span>
              <h2 className="font-bold text-base text-slate-100 truncate flex-1 md:max-w-none">
                {currentResume.title}
              </h2>
            </div>

            {/* Controls */}
            <div className="flex items-center gap-2 w-full overflow-x-auto scrollbar-none pb-1">
              <button
                onClick={() => setIsFocusMode(true)}
                className="h-10 px-4 bg-yellow-500 hover:bg-yellow-400 text-yellow-950 rounded-lg text-sm font-semibold transition flex items-center gap-2 cursor-pointer border border-yellow-600 shadow-sm shrink-0"
                title="Enter Focus Mode"
              >
                <Focus className="w-4 h-4" />
                <span className="hidden sm:inline">Focus</span>
              </button>

              {/* Manual Save button on fullscreen edit window */}
              <button
                onClick={() => triggerDBSave(currentResume)}
                disabled={isSaving}
                className="h-10 px-4 bg-slate-800 hover:bg-slate-900 text-white text-sm font-semibold rounded-lg transition-all duration-150 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-85 disabled:cursor-not-allowed shadow-md shadow-slate-800/10 border border-transparent shrink-0"
                style={{ minWidth: "140px" }}
              >
                {isSaving ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Saving...
                  </>
                ) : saveSuccess ? (
                  <>
                    <Check className="w-4 h-4 text-emerald-300" />
                    Saved!
                  </>
                ) : (
                  <>
                    <Save className="w-4 h-4" />
                    Save
                  </>
                )}
              </button>

              <button
                onClick={() => {
                  setIsFullscreenEdit(false);
                  setIsFullscreenPreview(true);
                }}
                className="h-10 px-4 bg-slate-100 hover:bg-slate-200 border border-slate-200 text-slate-700 hover:text-slate-900 rounded-lg text-sm font-semibold transition duration-150 cursor-pointer flex items-center gap-2 shadow-sm shrink-0"
              >
                <Eye className="w-4 h-4 text-indigo-600" />
                Preview
              </button>

              <button
                onClick={() => setIsFullscreenEdit(false)}
                className="h-10 px-4 bg-red-600 hover:bg-red-700 text-white rounded-lg text-sm font-semibold transition duration-150 cursor-pointer shadow-md shadow-red-600/10 border border-transparent flex items-center shrink-0"
              >
                Close
              </button>
            </div>
          </div>
          )}

          {isFocusMode && (
            <button
              onClick={() => setIsFocusMode(false)}
              className="fixed top-4 right-4 z-[200] p-3 bg-yellow-500 hover:bg-yellow-400 border border-yellow-600 rounded-full text-yellow-950 transition-colors cursor-pointer shadow-lg group"
              title="Exit Focus Mode"
            >
              <Minimize className="w-5 h-5 group-hover:scale-95 transition-transform" />
            </button>
          )}

          {/* Fullscreen Content Area */}
          <div className="flex-1 overflow-auto p-4 sm:p-8 flex justify-center bg-slate-50">
            <div className="max-w-6xl w-full h-full pb-10">
              <ResumeForm
                data={currentResume}
                onChange={handleResumeChange}
                activeSection={activeSection}
                setActiveSection={setActiveSection}
              />
            </div>
          </div>
        </div>
      )}

      {/* Download Format Selection Modal */}
      {showDownloadMenu && (
        <div className="fixed inset-0 z-[300] bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-200">
          <div className="bg-white rounded-2xl shadow-2xl max-w-xs w-full overflow-hidden flex flex-col">
            <div className="px-5 py-4 border-b border-slate-100 flex flex-col items-center text-center">
              <div className="w-10 h-10 bg-indigo-50 rounded-full flex items-center justify-center mb-2">
                <Download className="w-5 h-5 text-indigo-600" />
              </div>
              <h3 className="text-base font-bold text-slate-800">Choose Export Format</h3>
              <p className="text-xs text-slate-500 mt-0.5">Select how you'd like to export your resume.</p>
            </div>
            <div className="p-3 space-y-2 bg-slate-50">
              <button
                onClick={() => {
                  setShowDownloadMenu(false);
                  handleDownloadPDF();
                }}
                className="w-full bg-white hover:bg-indigo-50 border border-slate-200 hover:border-indigo-200 rounded-xl p-3 flex items-center gap-3 transition-all group shadow-sm hover:shadow-md cursor-pointer text-left"
              >
                <div className="w-8 h-8 rounded-lg bg-indigo-50 flex items-center justify-center shrink-0 group-hover:bg-white group-hover:text-indigo-600 transition-colors">
                  <FileText className="w-4 h-4 text-indigo-500" />
                </div>
                <div>
                  <div className="font-semibold text-sm text-slate-800 group-hover:text-indigo-700 transition-colors">PDF Document</div>
                  <div className="text-[10px] sm:text-[11px] text-slate-500 line-clamp-1">Standard formatting, ready to print.</div>
                </div>
              </button>
              <button
                onClick={() => {
                  setShowDownloadMenu(false);
                  handleExportJSON();
                }}
                className="w-full bg-white hover:bg-blue-50 border border-slate-200 hover:border-blue-200 rounded-xl p-3 flex items-center gap-3 transition-all group shadow-sm hover:shadow-md cursor-pointer text-left"
              >
                <div className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center shrink-0 group-hover:bg-white group-hover:text-blue-600 transition-colors">
                  <FileJson className="w-4 h-4 text-blue-500" />
                </div>
                <div>
                  <div className="font-semibold text-sm text-slate-800 group-hover:text-blue-700 transition-colors">JSON Data</div>
                  <div className="text-[10px] sm:text-[11px] text-slate-500 line-clamp-1">Raw structured data for backups.</div>
                </div>
              </button>
            </div>
            <div className="p-3 border-t border-slate-100 bg-white flex justify-end">
              <button
                onClick={() => setShowDownloadMenu(false)}
                className="px-4 py-1.5 rounded-lg text-sm font-semibold text-slate-600 hover:text-slate-800 hover:bg-slate-100 transition-colors cursor-pointer"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Interactive PWA Install Banner */}
      <PWAInstallPrompt />

      {showPrivacyModal && (
        <PrivacyPolicyModal onProceed={() => {
          const today = new Date().toISOString().split('T')[0];
          localStorage.setItem('privacyPolicyAcceptedDate', today);
          setShowPrivacyModal(false);
        }} />
      )}
    </div>
  );
}
