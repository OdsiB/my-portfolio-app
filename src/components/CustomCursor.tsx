import { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { useTheme } from '../context/ThemeContext';

interface CustomCursorProps {
  cursorText?: string;
  cursorMode?: 'default' | 'view' | 'play' | 'open' | 'drag';
}

export function CustomCursor({ cursorText = '', cursorMode = 'default' }: CustomCursorProps) {
  const { theme } = useTheme();
  const [pos, setPos] = useState({ x: -100, y: -100 });
  const [isVisible, setIsVisible] = useState(false);
  const [isTouch, setIsTouch] = useState(true); // Default true until verified as desktop pointer

  const isBlackBlue = theme === 'black-blue';

  useEffect(() => {
    // Check if device is desktop with fine pointer
    const mediaQuery = window.matchMedia('(hover: hover) and (pointer: fine)');
    const updateTouch = () => {
      setIsTouch(!mediaQuery.matches || window.innerWidth < 1024);
    };

    updateTouch();
    mediaQuery.addEventListener('change', updateTouch);
    window.addEventListener('resize', updateTouch);

    if (mediaQuery.matches && window.innerWidth >= 1024) {
      document.body.classList.add('custom-cursor-active');
    } else {
      document.body.classList.remove('custom-cursor-active');
    }

    const onMouseMove = (e: MouseEvent) => {
      setPos({ x: e.clientX, y: e.clientY });
      if (!isVisible) setIsVisible(true);
    };

    const onMouseLeave = () => setIsVisible(false);
    const onMouseEnter = () => setIsVisible(true);

    window.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseleave', onMouseLeave);
    document.addEventListener('mouseenter', onMouseEnter);

    return () => {
      mediaQuery.removeEventListener('change', updateTouch);
      window.removeEventListener('resize', updateTouch);
      window.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseleave', onMouseLeave);
      document.removeEventListener('mouseenter', onMouseEnter);
      document.body.classList.remove('custom-cursor-active');
    };
  }, [isVisible]);

  if (isTouch || !isVisible) {
    return null;
  }

  const isExpanded = cursorMode !== 'default' || cursorText !== '';
  const label = cursorText || (cursorMode === 'view' ? 'VIEW' : cursorMode === 'play' ? 'PLAY' : cursorMode === 'open' ? 'OPEN' : '');

  return (
    <motion.div
      id="custom-mouse-cursor"
      className="fixed top-0 left-0 pointer-events-none z-[99999] flex items-center justify-center -translate-x-1/2 -translate-y-1/2"
      animate={{
        x: pos.x,
        y: pos.y,
      }}
      transition={{
        type: 'spring',
        damping: 32,
        stiffness: 450,
        mass: 0.25,
      }}
    >
      <motion.div
        className={`flex items-center justify-center rounded-full transition-colors duration-200 ${
          isBlackBlue
            ? isExpanded
              ? 'bg-white text-[#08090e] shadow-[0_0_30px_rgba(255,255,255,0.45)] border border-white font-black'
              : 'bg-white ring-2 ring-white/60 shadow-[0_0_12px_rgba(255,255,255,0.9)]'
            : isExpanded
              ? 'bg-[var(--cursor-bg)] text-[var(--cursor-text)] shadow-2xl border border-[var(--cursor-border)] font-bold'
              : 'bg-[var(--cursor-bg)] ring-2 ring-[var(--cursor-ring)] shadow-xs'
        }`}
        animate={{
          width: isExpanded ? 76 : 10,
          height: isExpanded ? 76 : 10,
          scale: 1,
        }}
        transition={{
          type: 'spring',
          damping: 24,
          stiffness: 350,
        }}
      >
        {isExpanded && label && (
          <motion.span
            initial={{ opacity: 0, scale: 0.6 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.6 }}
            className="text-[9px] font-bold tracking-[0.2em] font-mono select-none uppercase"
          >
            {label}
          </motion.span>
        )}
      </motion.div>
    </motion.div>
  );
}
