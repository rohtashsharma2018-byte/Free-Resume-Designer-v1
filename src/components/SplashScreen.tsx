import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
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
          className="fixed inset-0 z-[99999] bg-indigo-600 flex flex-col items-center justify-center font-sans select-none overflow-hidden"
        >
          <div className="relative z-10 flex flex-col items-center justify-center">
            {/* Micro progress status and custom feedback loader */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.1 }}
              className="flex flex-col items-center"
            >
              <div className="w-32 h-32 relative flex items-center justify-center">
                <svg className="absolute inset-0 transform -rotate-90 w-full h-full" viewBox="0 0 100 100">
                  <circle
                    className="text-indigo-800"
                    strokeWidth="8"
                    stroke="currentColor"
                    fill="transparent"
                    r="40"
                    cx="50"
                    cy="50"
                  />
                  <circle
                    className="text-white transition-all duration-75 ease-linear"
                    strokeWidth="8"
                    strokeDasharray="251.3"
                    strokeDashoffset={251.3 - (progress / 100) * 251.3}
                    strokeLinecap="round"
                    stroke="currentColor"
                    fill="transparent"
                    r="40"
                    cx="50"
                    cy="50"
                  />
                </svg>
                <div className="relative font-bold text-white text-2xl tracking-tighter">
                  {progress}%
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

