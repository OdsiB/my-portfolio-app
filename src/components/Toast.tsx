import { motion, AnimatePresence } from 'motion/react';

interface ToastProps {
  message: string | null;
  onClose: () => void;
}

export function Toast({ message, onClose }: ToastProps) {
  if (!message) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 30 }}
        className="fixed bottom-6 right-6 z-[99999] bg-[var(--btn-primary-bg)] text-[var(--btn-primary-text)] px-5 py-3.5 border border-[var(--border-color)] shadow-2xl flex items-center gap-3 font-mono text-[10px] font-bold tracking-[0.2em] uppercase"
      >
        <span className="w-1.5 h-1.5 bg-[var(--color-accent)]" />
        <span>{message}</span>
        <button
          onClick={onClose}
          className="ml-3 opacity-60 hover:opacity-100 font-mono text-xs cursor-pointer"
        >
          ✕
        </button>
      </motion.div>
    </AnimatePresence>
  );
}

