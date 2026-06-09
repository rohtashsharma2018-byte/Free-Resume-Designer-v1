import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import logoUrl from '../assets/images/logo.svg';

interface SplashScreenProps {
  onFinish: () => void;
}

export const SplashScreen: React.FC<SplashScreenProps> = ({ onFinish }) => {
  const [isVisible, setIsVisible] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Progress over 3 seconds (100 steps * 30ms = 3000ms)
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsVisible(false);
          return 100;
        }
        return prev + 1;
      });
    }, 30);

    return () => clearInterval(interval);
  }, []);

  return (
    <AnimatePresence onExitComplete={onFinish}>
      {isVisible && (
        <motion.div
          key="splash-screen"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="fixed inset-0 z-[99999] bg-white flex flex-col items-center justify-center font-sans select-none overflow-hidden"
        >
          <div className="relative z-10 flex flex-col items-center justify-center">
            {/* Micro progress status and custom feedback loader */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4 }}
              className="flex flex-col items-center"
            >
              {/* The Donut Container wrapping the Brand Logo */}
              <div className="w-44 h-44 relative flex items-center justify-center">
                <svg className="absolute inset-0 transform -rotate-90 w-full h-full" viewBox="0 0 100 100">
                  <circle
                    stroke="#f1f5f9"
                    strokeWidth="6"
                    fill="transparent"
                    r="40"
                    cx="50"
                    cy="50"
                  />
                  <circle
                    stroke="#ff4500"
                    strokeWidth="6"
                    strokeDasharray="251.3"
                    strokeDashoffset={251.3 - (progress / 100) * 251.3}
                    strokeLinecap="round"
                    fill="transparent"
                    className="transition-all duration-75 ease-linear"
                    r="40"
                    cx="50"
                    cy="50"
                  />
                </svg>
                
                {/* Brand Logo in the direct center of the donut */}
                <div className="relative w-20 h-20 flex items-center justify-center rounded-2xl bg-white shadow-xs p-1.5 overflow-hidden">
                  <img 
                    src={logoUrl} 
                    className="w-full h-full object-contain animate-pulse-slow" 
                    alt="Brand Logo"
                    referrerPolicy="no-referrer"
                  />
                </div>
              </div>

              {/* Progress Indicators below */}
              <div className="mt-8 text-center">
                <span className="text-xs font-bold text-slate-400 tracking-widest uppercase font-mono block mb-1">
                  Loading
                </span>
                <span className="text-xl font-black bg-gradient-to-r from-amber-500 to-orange-600 bg-clip-text text-transparent font-sans">
                  {progress}%
                </span>
              </div>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

