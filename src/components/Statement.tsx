import { motion } from 'motion/react';
import { PERSONAL_INFO } from '../data/portfolioData';

interface StatementProps {
  onCursorChange: (mode: 'default' | 'view' | 'play' | 'open', text?: string) => void;
}

export function Statement({ onCursorChange }: StatementProps) {
  return (
    <section
      id="statement"
      className="py-16 sm:py-24 lg:py-28 px-6 sm:px-8 lg:px-12 max-w-7xl mx-auto border-b border-[var(--border-color)]"
    >
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-start">
        {/* Left Label */}
        <div className="lg:col-span-3">
          <h2 className="text-[10px] font-bold tracking-[0.3em] uppercase text-[var(--text-faint)] italic">
            00 / Creative Ethos
          </h2>
        </div>

        {/* Right Editorial Statement Text */}
        <div className="lg:col-span-9 space-y-8">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.8 }}
            className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tighter text-[var(--text-primary)] leading-[0.9] uppercase max-w-4xl"
          >
            {PERSONAL_INFO.statementHeadline}
          </motion.h2>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.8, delay: 0.15 }}
            className="grid grid-cols-1 md:grid-cols-2 gap-8 text-xs sm:text-sm text-[var(--text-muted)] leading-relaxed uppercase tracking-wider"
          >
            <p className="font-medium">
              {PERSONAL_INFO.statementBody}
            </p>
            <div className="space-y-3 border-l border-[var(--border-color)] pl-6 text-[11px] font-bold text-[var(--text-primary)]">
              <div className="flex items-center">
                <span className="w-4 h-[1.5px] bg-[var(--color-accent)] mr-2 shrink-0"></span>
                <span>Rhythm-driven video editing & post-production</span>
              </div>
              <div className="flex items-center">
                <span className="w-4 h-[1.5px] bg-[var(--color-accent)] mr-2 shrink-0"></span>
                <span>Grid-disciplined graphic design & typography</span>
              </div>
              <div className="flex items-center">
                <span className="w-4 h-[1.5px] bg-[var(--color-accent)] mr-2 shrink-0"></span>
                <span>Engineered technical problem-solving & prototype design</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

