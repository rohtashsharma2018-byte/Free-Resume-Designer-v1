import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Download, X, Sparkles } from 'lucide-react';

interface BeforeInstallPromptEvent extends Event {
  readonly platforms: string[];
  readonly userChoice: Promise<{
    outcome: 'accepted' | 'dismissed';
    platform: string;
  }>;
  prompt(): Promise<void>;
}

export const PWAInstallPrompt: React.FC = () => {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [isDismissedByUser, setIsDismissedByUser] = useState(false);

  useEffect(() => {
    // Check if app is already running in standalone/installed mode
    const isStandalone = window.matchMedia('(display-mode: standalone)').matches 
      || (navigator as any).standalone 
      || document.referrer.includes('android-app://');

    if (isStandalone) {
      return;
    }

    // Check if user dismissed this session's prompt already
    const promptSessionDismissed = sessionStorage.getItem('pwa_prompt_dismissed') === 'true';
    if (promptSessionDismissed) {
      return;
    }

    const handleBeforeInstallPrompt = (e: Event) => {
      // Prevent browser default mini-infobar
      e.preventDefault();
      // Store the event for custom triggering
      setDeferredPrompt(e as BeforeInstallPromptEvent);
      // Wait slightly for a pleasant delayed appearance
      setTimeout(() => {
        if (!isDismissedByUser) {
          setIsVisible(true);
        }
      }, 3000);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

    return () => {
      window.removeEventListener('beforebeforeinstallprompt', handleBeforeInstallPrompt);
    };
  }, [isDismissedByUser]);

  const handleInstallClick = async () => {
    if (!deferredPrompt) return;

    // Show native browser install dialog
    await deferredPrompt.prompt();

    // Wait for the user's response
    const { outcome } = await deferredPrompt.userChoice;
    console.log(`[PWA] User response to installation offer: ${outcome}`);

    // Clean up
    setDeferredPrompt(null);
    setIsVisible(false);
  };

  const handleDismiss = () => {
    setIsVisible(false);
    setIsDismissedByUser(true);
    // Persist session-level dismissal to optimize UX and prevent nag
    sessionStorage.setItem('pwa_prompt_dismissed', 'true');
  };

  if (!isVisible || !deferredPrompt) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: 50, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 30, scale: 0.95 }}
        transition={{ duration: 0.4, ease: 'easeOut' }}
        className="fixed bottom-6 right-6 z-[9999] max-w-sm w-full bg-slate-900 text-white rounded-xl shadow-2xl border border-indigo-500/20 p-5 overflow-hidden font-sans"
      >
        {/* Glow accent bar */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500" />
        
        <div className="flex items-start gap-3.5">
          <div className="p-2.5 rounded-lg bg-indigo-600/20 text-indigo-400 shrink-0 border border-indigo-500/10">
            <Sparkles className="w-5 h-5" />
          </div>
          
          <div className="flex-1">
            <div className="flex items-center justify-between">
              <h5 className="font-bold text-slate-100 text-sm tracking-tight leading-none mb-1">
                Install Resume Designer
              </h5>
              <button 
                onClick={handleDismiss}
                className="text-slate-400 hover:text-slate-200 transition-colors cursor-pointer"
                aria-label="Dismiss prompt"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed mt-1.5">
              Install our application to your home screen for high-performance offline editing, direct launcher access, and native app full-screen mode.
            </p>
            
            <div className="flex items-center gap-3 mt-4">
              <button
                onClick={handleInstallClick}
                className="flex-1 py-2 px-3 text-white bg-indigo-600 hover:bg-indigo-500 rounded-lg text-xs font-semibold tracking-wide transition-all shadow-md shadow-indigo-600/10 cursor-pointer flex items-center justify-center gap-1.5"
              >
                <Download className="w-3.5 h-3.5" />
                Install on Device
              </button>
              <button
                onClick={handleDismiss}
                className="py-2 px-3 text-slate-400 hover:text-slate-200 hover:bg-slate-800 rounded-lg text-xs font-medium [transition:background-color_150ms] cursor-pointer"
              >
                Not Now
              </button>
            </div>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};
