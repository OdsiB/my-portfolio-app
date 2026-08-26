import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, ArrowRight, RefreshCw } from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData';

interface StartupIntroProps {
  onComplete: () => void;
  onCursorChange?: (mode: 'default' | 'view' | 'play' | 'open' | 'drag', text?: string) => void;
}

export const StartupIntro: React.FC<StartupIntroProps> = ({ onComplete, onCursorChange }) => {
  const [isFinished, setIsFinished] = useState(false);
  const [revealedLetters, setRevealedLetters] = useState<number>(0);
  const [showSubtitle, setShowSubtitle] = useState<boolean>(false);
  const [glowComplete, setGlowComplete] = useState<boolean>(false);
  const [key, setKey] = useState(0);

  const letters = ['O', 'D', 'S', 'E', 'Y'];

  useEffect(() => {
    // Step-by-step letter reveal matching the clean bold typography
    const timers: NodeJS.Timeout[] = [];

    letters.forEach((_, index) => {
      timers.push(
        setTimeout(() => {
          setRevealedLetters(index + 1);
        }, 150 + index * 180)
      );
    });

    // Bloom and Subtitle reveal
    timers.push(
      setTimeout(() => {
        setShowSubtitle(true);
        setGlowComplete(true);
      }, 150 + letters.length * 180 + 200)
    );

    // Auto-transition to main site
    timers.push(
      setTimeout(() => {
        setIsFinished(true);
        setTimeout(onComplete, 650);
      }, 3400)
    );

    return () => {
      timers.forEach(t => clearTimeout(t));
    };
  }, [onComplete, key]);

  const handleSkip = () => {
    setIsFinished(true);
    setTimeout(onComplete, 250);
  };

  const handleReplay = (e: React.MouseEvent) => {
    e.stopPropagation();
    setRevealedLetters(0);
    setShowSubtitle(false);
    setGlowComplete(false);
    setKey(prev => prev + 1);
  };

  return (
    <AnimatePresence>
      {!isFinished && (
        <motion.div
          id="startup-intro-overlay"
          key={`intro-${key}`}
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.04, filter: 'blur(12px)' }}
          transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
          onClick={handleSkip}
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[#07080e]/97 backdrop-blur-3xl text-white cursor-pointer select-none overflow-hidden"
        >
          {/* Deep Ambient Background Glow */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(37,99,235,0.25)_0%,_rgba(124,58,237,0.12)_40%,_transparent_72%)] pointer-events-none" />
          
          {/* High-End Technical Scanline Grid Overlay */}
          <div className="absolute inset-0 opacity-[0.03] bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none" />

          {/* Floating Subtle Micro Sparkles */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <motion.div
              animate={{ opacity: [0.15, 0.8, 0.15], y: [-6, 6, -6] }}
              transition={{ duration: 3.2, repeat: Infinity, ease: 'easeInOut' }}
              className="absolute top-[26%] left-[24%] w-1.5 h-1.5 bg-blue-400 rounded-full blur-[0.5px]"
            />
            <motion.div
              animate={{ opacity: [0.2, 0.9, 0.2], y: [6, -8, 6] }}
              transition={{ duration: 3.8, repeat: Infinity, ease: 'easeInOut', delay: 0.4 }}
              className="absolute top-[30%] right-[25%] w-2 h-2 bg-indigo-400 rounded-full blur-[0.5px]"
            />
            <motion.div
              animate={{ opacity: [0.1, 0.7, 0.1], y: [-6, 6, -6] }}
              transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut', delay: 0.8 }}
              className="absolute bottom-[30%] left-[32%] w-1 h-1 bg-cyan-300 rounded-full blur-[0.5px]"
            />
          </div>

          {/* Central Typography Showcase Box */}
          <div className="relative flex flex-col items-center justify-center px-4 max-w-4xl w-full">
            
            {/* Top Minimal Tracker */}
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="flex items-center gap-3 font-mono text-[9px] sm:text-[10px] tracking-[0.3em] uppercase text-slate-400 mb-4 sm:mb-6"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-blue-500 shadow-[0_0_8px_#3b82f6] animate-pulse" />
              <span>INITIALIZING PORTFOLIO</span>
              <span className="text-white/20">•</span>
              <span className="text-slate-500">EST. 2026</span>
            </motion.div>

            {/* Main Bold ODSEY Typography matching the Hero */}
            <div className="relative flex items-center justify-center gap-1 sm:gap-2 md:gap-3 py-2 sm:py-4">
              
              {/* Massive Bold Letter Sequence */}
              {letters.map((char, index) => {
                const isRevealed = revealedLetters > index;
                const isLatest = revealedLetters === index + 1;

                return (
                  <div
                    key={index}
                    className="relative flex items-center justify-center"
                  >
                    <motion.span
                      initial={{ opacity: 0, y: 35, scale: 0.9, filter: 'blur(8px)' }}
                      animate={
                        isRevealed
                          ? {
                              opacity: 1,
                              y: 0,
                              scale: 1,
                              filter: 'blur(0px)',
                            }
                          : { opacity: 0, y: 35, scale: 0.9, filter: 'blur(8px)' }
                      }
                      transition={{
                        duration: 0.45,
                        ease: [0.16, 1, 0.3, 1],
                      }}
                      className={`text-[clamp(3.5rem,14vw,9.5rem)] font-black leading-none tracking-tighter uppercase font-sans select-none transition-all duration-300 ${
                        glowComplete
                          ? 'text-white drop-shadow-[0_0_20px_rgba(59,130,246,0.85)] drop-shadow-[0_0_45px_rgba(99,102,241,0.6)]'
                          : isLatest
                          ? 'text-white drop-shadow-[0_0_16px_rgba(59,130,246,0.9)]'
                          : 'text-white/90'
                      }`}
                    >
                      {char}
                    </motion.span>

                    {/* Animated Laser Underline Segment */}
                    <motion.div
                      initial={{ scaleX: 0 }}
                      animate={isRevealed ? { scaleX: 1 } : { scaleX: 0 }}
                      transition={{ duration: 0.35, ease: 'easeOut' }}
                      className={`absolute -bottom-1 sm:-bottom-2 inset-x-0 h-[2px] sm:h-[3px] rounded-full origin-left ${
                        glowComplete
                          ? 'bg-blue-500 shadow-[0_0_10px_#3b82f6]'
                          : 'bg-blue-400/80 shadow-[0_0_6px_#60a5fa]'
                      }`}
                    />
                  </div>
                );
              })}

              {/* Ambient Glow Bloom behind letters once all are revealed */}
              {glowComplete && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: [0, 0.9, 0.6], scale: [0.9, 1.05, 1] }}
                  transition={{ duration: 0.7, ease: 'easeOut' }}
                  className="absolute inset-0 -z-10 flex items-center justify-center pointer-events-none"
                >
                  <div className="w-full h-full max-w-lg bg-blue-500/20 blur-3xl rounded-full" />
                </motion.div>
              )}
            </div>

            {/* Subtitle & Role Reveal */}
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={showSubtitle ? { opacity: 1, y: 0 } : { opacity: 0, y: 14 }}
              transition={{ duration: 0.5, ease: 'easeOut' }}
              className="flex flex-col items-center mt-4 sm:mt-6 space-y-2 text-center"
            >
              <div className="flex items-center gap-2 sm:gap-3 text-[10px] sm:text-xs md:text-sm font-bold tracking-[0.3em] uppercase text-blue-400 font-mono">
                <Sparkles className="w-3.5 h-3.5 text-blue-400 animate-pulse" />
                <span>BANDOJO • MULTIMEDIA DESIGNER</span>
                <Sparkles className="w-3.5 h-3.5 text-blue-400 animate-pulse" />
              </div>
              <p className="text-[9px] sm:text-[11px] text-slate-400 font-mono tracking-[0.25em] uppercase">
                VIDEO EDITING • GRAPHIC DESIGN • DIGITAL CONTENT
              </p>
            </motion.div>
          </div>

          {/* Bottom Controls: Replay & Skip */}
          <div className="absolute bottom-6 sm:bottom-8 inset-x-6 sm:inset-x-8 flex items-center justify-between pointer-events-auto">
            {/* Replay Button */}
            <motion.button
              type="button"
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.75 }}
              whileHover={{ opacity: 1, scale: 1.04 }}
              onClick={handleReplay}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-white/15 bg-white/5 hover:bg-white/10 text-[10px] sm:text-[11px] font-mono text-slate-300 tracking-wider transition-all"
            >
              <RefreshCw className="w-3 h-3 text-blue-400" />
              <span>REPLAY</span>
            </motion.button>

            {/* Skip / Enter Action */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.85 }}
              transition={{ delay: 0.3, duration: 0.4 }}
              className="flex items-center gap-2 px-3.5 py-2 rounded-full border border-white/20 bg-white/10 hover:bg-white/20 hover:border-white/40 text-[11px] sm:text-xs font-mono text-slate-200 tracking-wider transition-all"
              onMouseEnter={() => onCursorChange?.('open', 'ENTER')}
              onMouseLeave={() => onCursorChange?.('default')}
            >
              <span>CLICK TO ENTER</span>
              <ArrowRight className="w-3.5 h-3.5 text-blue-400" />
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
