import { motion } from 'motion/react';
import { MagneticButton } from './MagneticButton';
import { ArrowDown, ArrowUpRight } from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData';

interface HeroProps {
  onCursorChange: (mode: 'default' | 'view' | 'play' | 'open', text?: string) => void;
}

export function Hero({ onCursorChange }: HeroProps) {
  return (
    <section
      id="hero"
      className="relative min-h-[90vh] flex flex-col justify-between pt-28 sm:pt-36 pb-10 sm:pb-12 px-6 sm:px-8 lg:px-12 max-w-7xl mx-auto border-b border-[var(--border-color)]"
    >
      {/* Top Meta Bar */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="flex flex-wrap items-center justify-between gap-4 border-b border-[var(--border-color)] pb-4 font-mono text-[10px] text-[var(--text-muted)] tracking-[0.2em] uppercase"
      >
        <div className="flex items-center gap-2">
          <span className="w-1.5 h-1.5 bg-[var(--color-accent)] shadow-[0_0_6px_var(--color-accent)]" />
          <span className="text-[var(--text-primary)] font-bold">AVAILABLE FOR FREELANCE & ROLES</span>
        </div>
        <div className="hidden sm:flex items-center gap-6">
          <span>{PERSONAL_INFO.location}</span>
          <span>•</span>
          <span>EST. 2026</span>
        </div>
      </motion.div>

      {/* Main Massive Bold Typography Header */}
      <div className="my-auto py-8 sm:py-14">
        <header className="flex flex-col mb-8 relative">
          <div className="flex flex-wrap sm:flex-nowrap items-baseline gap-2 sm:gap-0">
            <h1 className="text-[clamp(2.75rem,11.5vw,6.75rem)] font-black leading-[0.88] tracking-tighter uppercase text-[var(--text-primary)]">
              Odsey
            </h1>
            <span className="sm:ml-6 text-[9px] sm:text-[10px] tracking-[0.2em] sm:tracking-[0.3em] font-bold uppercase sm:border-l sm:border-[var(--color-accent)] sm:pl-3 h-auto sm:h-16 flex items-center text-[var(--color-accent)] whitespace-nowrap">
              Multimedia Designer
            </span>
          </div>

          <div className="flex flex-col lg:flex-row lg:items-baseline mt-2 sm:mt-0 gap-4 sm:gap-6 lg:gap-10">
            <h1 className="text-[clamp(2.75rem,11.5vw,6.75rem)] font-black leading-[0.88] tracking-tighter uppercase text-[var(--text-primary)]">
              Bandojo
            </h1>
            <div className="max-w-md lg:ml-4">
              <p className="text-[11px] sm:text-xs leading-relaxed font-medium text-[var(--text-muted)] uppercase tracking-wider">
                Computer Engineering graduate specializing in Video Editing, Graphic Design, and technical IT solutions. Based in Negros Occidental, PH.
              </p>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-3 pt-4">
                <MagneticButton
                  as="a"
                  href="#selected-work"
                  id="hero-btn-view-work"
                  onMouseEnter={() => onCursorChange('view', 'EXPLORE')}
                  onMouseLeave={() => onCursorChange('default')}
                  className="px-5 py-2.5 bg-[var(--btn-primary-bg)] text-[var(--btn-primary-text)] text-[10px] font-bold tracking-[0.2em] uppercase hover:opacity-85 transition-opacity flex items-center gap-2 shadow-sm"
                >
                  <span>VIEW WORK</span>
                  <ArrowDown className="w-3 h-3" />
                </MagneticButton>

                <MagneticButton
                  as="a"
                  href="#contact"
                  id="hero-btn-lets-connect"
                  onMouseEnter={() => onCursorChange('open', 'HELLO')}
                  onMouseLeave={() => onCursorChange('default')}
                  className="px-5 py-2.5 border border-[var(--btn-secondary-border)] text-[var(--text-primary)] text-[10px] font-bold tracking-[0.2em] uppercase hover:bg-[var(--btn-secondary-hover-bg)] hover:text-[var(--btn-secondary-hover-text)] transition-all flex items-center gap-2"
                >
                  <span>LET'S CONNECT</span>
                  <ArrowUpRight className="w-3 h-3" />
                </MagneticButton>
              </div>
            </div>
          </div>
        </header>

        {/* Sub-Disciplines Bar */}
        <div className="flex flex-wrap items-center gap-4 text-[10px] font-bold uppercase tracking-[0.15em] text-[var(--text-muted)] pt-4 border-t border-[var(--border-color)]">
          <span className="text-[var(--text-primary)] font-black">{PERSONAL_INFO.title}</span>
          <span>/</span>
          <span className="text-[var(--text-faint)]">{PERSONAL_INFO.disciplines}</span>
        </div>
      </div>

      {/* Bottom Exploration Cue */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.3 }}
        className="flex items-center justify-between pt-4 border-t border-[var(--border-color)] text-[9px] font-bold uppercase tracking-[0.2em] text-[var(--text-faint)]"
      >
        <a
          href="#selected-work"
          className="inline-flex items-center gap-2 hover:text-[var(--color-accent)] transition-colors"
          onMouseEnter={() => onCursorChange('open', 'SCROLL')}
          onMouseLeave={() => onCursorChange('default')}
        >
          <span className="animate-bounce text-[var(--color-accent)]">↓</span>
          <span>Scroll to explore</span>
        </a>
        <div className="hidden sm:flex items-center gap-4">
          <span>01—05 HIGHLIGHTS</span>
          <span>/</span>
          <span>MOTION & GRAPHIC ARCHIVE</span>
        </div>
      </motion.div>
    </section>
  );
}

