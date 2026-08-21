import { PERSONAL_INFO } from '../data/portfolioData';
import { MapPin, Mail, FileText } from 'lucide-react';
import { MagneticButton } from './MagneticButton';
import { SmartImage } from './SmartImage';

interface AboutSectionProps {
  onCursorChange: (mode: 'default' | 'view' | 'play' | 'open', text?: string) => void;
  onOpenCVModal?: () => void;
}

export function AboutSection({ onCursorChange, onOpenCVModal }: AboutSectionProps) {
  return (
    <section
      id="about"
      className="py-16 sm:py-24 lg:py-28 px-6 sm:px-8 lg:px-12 max-w-7xl mx-auto border-b border-[var(--border-color)]"
    >
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 sm:mb-16 gap-6 border-b border-[var(--border-color)] pb-6">
        <div>
          <h2 className="text-[10px] font-bold tracking-[0.3em] uppercase text-[var(--text-faint)] italic mb-3">
            06 / Profile
          </h2>
          <h3 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tighter text-[var(--text-primary)] uppercase">
            About Me
          </h3>
        </div>
        <div className="flex items-center gap-2 font-mono text-[11px] text-[var(--text-muted)] tracking-wider uppercase">
          <MapPin className="w-3.5 h-3.5 text-[var(--color-accent)]" />
          <span>{PERSONAL_INFO.location}</span>
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-center">
        {/* Left Column: Editorial Portrait Placeholder Frame */}
        <div className="lg:col-span-5">
          <div className="relative">
            <div className="aspect-[4/5] bg-[var(--bg-card)] border border-[var(--border-color)] p-3 sm:p-4 shadow-lg">
              <div className="w-full h-full overflow-hidden border border-[var(--border-color)] relative bg-[var(--bg-subtle)]">
                <SmartImage
                  src={PERSONAL_INFO.profileImage}
                  fallbackSrc={PERSONAL_INFO.fallbackProfileImage}
                  alt={PERSONAL_INFO.name}
                  className="w-full h-full object-cover object-top hover:scale-[1.02] transition-transform duration-500"
                />
                <div className="absolute bottom-3 left-3 right-3 bg-[var(--bg-canvas)]/95 border border-[var(--border-color)] p-3 text-[var(--text-primary)] text-[9px] font-bold uppercase tracking-widest flex items-center justify-between backdrop-blur-xs font-mono">
                  <span>ODSEY B. BANDOJO</span>
                  <span className="text-[var(--color-accent)]">MULTIMEDIA DESIGNER</span>
                </div>
              </div>
            </div>

            {/* Editorial Corner Stamps */}
            <div className="absolute -bottom-3 -right-3 text-[9px] font-bold text-[var(--text-primary)] bg-[var(--bg-card)] px-3 py-1 border border-[var(--border-color)] uppercase tracking-widest hidden sm:block font-mono shadow-sm">
              ENGINEERING + DESIGN
            </div>
          </div>
        </div>

        {/* Right Column: Statement & Bio Breakdown */}
        <div className="lg:col-span-7 space-y-6">
          <div className="space-y-4 text-xs sm:text-sm text-[var(--text-primary)] leading-relaxed uppercase tracking-wider">
            <p className="font-bold text-sm sm:text-base leading-snug">
              {PERSONAL_INFO.aboutBio1}
            </p>
            <p className="text-[var(--text-muted)] font-medium">
              {PERSONAL_INFO.aboutBio2}
            </p>
          </div>

          {/* Key Attributes Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-[var(--border-color)]">
            <div className="p-5 bg-[var(--bg-card)] border border-[var(--border-color)] space-y-1 shadow-xs">
              <span className="text-[9px] text-[var(--color-accent)] font-bold uppercase tracking-widest block font-mono">
                CREATIVE CORE
              </span>
              <h4 className="text-sm font-black text-[var(--text-primary)] uppercase">
                Video Editing & Graphic Layout
              </h4>
              <p className="text-xs text-[var(--text-muted)] uppercase tracking-wider font-medium">
                Premiere Pro, After Effects, kinetic typography, and digital campaign collaterals.
              </p>
            </div>

            <div className="p-5 bg-[var(--bg-card)] border border-[var(--border-color)] space-y-1 shadow-xs">
              <span className="text-[9px] text-[var(--color-accent)] font-bold uppercase tracking-widest block font-mono">
                TECHNICAL FOUNDATION
              </span>
              <h4 className="text-sm font-black text-[var(--text-primary)] uppercase">
                Computer Engineering & IT Support
              </h4>
              <p className="text-xs text-[var(--text-muted)] uppercase tracking-wider font-medium">
                Hardware troubleshooting, terminal commands, workstation maintenance, and prototype UI logic.
              </p>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="flex flex-wrap items-center gap-3 pt-2">
            <MagneticButton
              as="a"
              href={`mailto:${PERSONAL_INFO.email}`}
              onMouseEnter={() => onCursorChange('open', 'MAIL')}
              onMouseLeave={() => onCursorChange('default')}
              className="px-5 py-2.5 bg-[var(--btn-primary-bg)] text-[var(--btn-primary-text)] text-[10px] font-bold tracking-[0.2em] uppercase hover:opacity-85 transition-opacity flex items-center gap-2 shadow-sm"
            >
              <Mail className="w-3.5 h-3.5" />
              <span>SEND AN EMAIL</span>
            </MagneticButton>

            {onOpenCVModal && (
              <MagneticButton
                as="button"
                onClick={onOpenCVModal}
                onMouseEnter={() => onCursorChange('open', 'CV')}
                onMouseLeave={() => onCursorChange('default')}
                className="px-5 py-2.5 border border-[var(--btn-secondary-border)] text-[var(--text-primary)] text-[10px] font-bold tracking-[0.2em] uppercase hover:bg-[var(--btn-secondary-hover-bg)] hover:text-[var(--btn-secondary-hover-text)] transition-all flex items-center gap-2 cursor-pointer"
              >
                <FileText className="w-3.5 h-3.5" />
                <span>VIEW CV SUMMARY</span>
              </MagneticButton>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

