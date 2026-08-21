import { PERSONAL_INFO } from '../data/portfolioData';
import { ArrowUp } from 'lucide-react';

interface FooterProps {
  onCursorChange: (mode: 'default' | 'view' | 'play' | 'open', text?: string) => void;
}

export function Footer({ onCursorChange }: FooterProps) {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer
      id="main-footer"
      className="border-t border-[var(--border-color)] bg-[var(--bg-footer)] py-14 sm:py-16 px-6 sm:px-8 lg:px-12"
    >
      <div className="max-w-7xl mx-auto space-y-10">
        {/* Top Tier */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tighter text-[var(--text-primary)] uppercase">
              {PERSONAL_INFO.shortName}
            </h2>
            <p className="text-[10px] font-bold tracking-[0.2em] uppercase text-[var(--text-muted)] mt-1">
              {PERSONAL_INFO.title}
            </p>
          </div>

          <button
            onClick={scrollToTop}
            onMouseEnter={() => onCursorChange('open', 'TOP')}
            onMouseLeave={() => onCursorChange('default')}
            className="self-start md:self-auto inline-flex items-center gap-2 text-[10px] font-bold text-[var(--text-primary)] hover:text-[var(--color-accent)] uppercase tracking-[0.2em] transition-colors py-1.5 border-b border-[var(--border-color)] hover:border-[var(--color-accent)] cursor-pointer"
          >
            <span>BACK TO TOP</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Middle Tier: Disciplines */}
        <div className="border-t border-[var(--border-color)] pt-5 text-[10px] font-bold text-[var(--text-muted)] tracking-[0.2em] uppercase font-mono">
          {PERSONAL_INFO.disciplines}
        </div>

        {/* Bottom Tier: Copyright & Meta */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-[9px] font-bold text-[var(--text-faint)] tracking-widest uppercase pt-4 border-t border-[var(--border-color)] font-mono">
          <div>
            © 2026 {PERSONAL_INFO.shortName}. ALL RIGHTS RESERVED.
          </div>
          <div className="flex items-center gap-3">
            <span>NEGROS OCCIDENTAL, PHILIPPINES</span>
            <span>•</span>
            <span>COMPUTER ENGINEERING + CREATIVE MULTIMEDIA</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

