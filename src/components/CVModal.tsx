import { useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { PERSONAL_INFO, SKILLS_LIST, EXPERIENCE_LIST, EDUCATION_DATA, THESIS_DATA, SOFTWARE_TOOLS } from '../data/portfolioData';
import { X, Mail, MapPin, Copy } from 'lucide-react';
import { SmartImage } from './SmartImage';

interface CVModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCursorChange: (mode: 'default' | 'view' | 'play' | 'open', text?: string) => void;
  onShowToast: (message: string) => void;
}

export function CVModal({ isOpen, onClose, onCursorChange, onShowToast }: CVModalProps) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  if (!isOpen) return null;

  const handleCopyText = () => {
    const cvText = `
ODSEY B. BANDOJO
Creative Multimedia Designer
Location: ${PERSONAL_INFO.location}
Email: ${PERSONAL_INFO.email}
LinkedIn: ${PERSONAL_INFO.socials.linkedin}
Instagram: ${PERSONAL_INFO.socials.instagram}

PROFILE:
${PERSONAL_INFO.aboutBio1} ${PERSONAL_INFO.aboutBio2}

SKILLS & CAPABILITIES:
${SKILLS_LIST.map(s => `• ${s.number}. ${s.title}${s.software ? ` [${s.software}]` : ''}\n  ${s.description}`).join('\n\n')}

SOFTWARE TOOLS:
${SOFTWARE_TOOLS.map(t => `• ${t.name} (${t.category})`).join('\n')}

EXPERIENCE:
${EXPERIENCE_LIST.map(e => `${e.company} — ${e.role} (${e.period})\n${e.descriptions.map(d => `  - ${d}`).join('\n')}`).join('\n\n')}

THESIS PROJECT:
Prototype Designer (${THESIS_DATA.period} — Completed April 2026)
${THESIS_DATA.summary.map(s => `  - ${s}`).join('\n')}

EDUCATION:
${EDUCATION_DATA.institution}
${EDUCATION_DATA.degree} (${EDUCATION_DATA.period})
    `.trim();

    navigator.clipboard.writeText(cvText);
    onShowToast('Full CV copied to clipboard!');
  };

  return (
    <AnimatePresence>
      <div
        id="cv-modal-backdrop"
        className="fixed inset-0 z-[9999] bg-black/80 backdrop-blur-md flex items-center justify-center p-4 sm:p-6 lg:p-10 overflow-y-auto"
        onClick={onClose}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.96, y: 20 }}
          transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          onClick={(e) => e.stopPropagation()}
          className="relative w-full max-w-4xl bg-[var(--bg-canvas)] text-[var(--text-primary)] border border-[var(--border-color)] shadow-2xl overflow-hidden my-auto max-h-[90vh] flex flex-col"
        >
          {/* Header Bar */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-[var(--border-color)] bg-[var(--bg-card)]">
            <span className="text-[10px] font-bold tracking-[0.3em] uppercase text-[var(--text-muted)] font-mono">
              Curriculum Vitae // Source of Truth
            </span>

            <div className="flex items-center gap-2">
              <button
                onClick={handleCopyText}
                onMouseEnter={() => onCursorChange('open', 'COPY')}
                onMouseLeave={() => onCursorChange('default')}
                className="px-3 py-1.5 bg-[var(--btn-primary-bg)] text-[var(--btn-primary-text)] text-[10px] font-bold tracking-[0.2em] uppercase hover:opacity-85 transition-opacity flex items-center gap-1.5 cursor-pointer shadow-xs"
              >
                <Copy className="w-3.5 h-3.5" />
                <span>COPY CV TEXT</span>
              </button>

              <button
                onClick={onClose}
                onMouseEnter={() => onCursorChange('open', 'CLOSE')}
                onMouseLeave={() => onCursorChange('default')}
                className="p-1.5 text-[var(--text-primary)] hover:bg-[var(--btn-primary-bg)] hover:text-[var(--btn-primary-text)] transition-colors cursor-pointer border border-[var(--border-color)]"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Printable CV Content */}
          <div className="overflow-y-auto p-6 sm:p-10 space-y-8 font-sans">
            {/* Header Identity */}
            <div className="border-b border-[var(--border-color)] pb-6 flex flex-col-reverse sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="space-y-1 flex-1">
                <h2 className="text-3xl sm:text-4xl font-black text-[var(--text-primary)] uppercase tracking-tighter">
                  {PERSONAL_INFO.name}
                </h2>
                <p className="text-[11px] font-bold text-[var(--color-accent)] tracking-widest uppercase">
                  {PERSONAL_INFO.title}
                </p>
                <div className="flex flex-wrap items-center gap-4 sm:gap-6 font-mono text-[10px] text-[var(--text-muted)] pt-2 uppercase tracking-wider">
                  <span className="flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-[var(--color-accent)]" />
                    {PERSONAL_INFO.location}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Mail className="w-3.5 h-3.5 text-[var(--color-accent)]" />
                    {PERSONAL_INFO.email}
                  </span>
                  <a
                    href={PERSONAL_INFO.socials.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 text-[var(--color-accent)] hover:underline font-bold"
                  >
                    <span>LINKEDIN ↗</span>
                  </a>
                  <a
                    href={PERSONAL_INFO.socials.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 text-[var(--color-accent)] hover:underline font-bold"
                  >
                    <span>INSTAGRAM ↗</span>
                  </a>
                </div>
              </div>

              {/* Profile Photo Thumbnail */}
              <div className="w-16 h-20 sm:w-20 sm:h-24 bg-[var(--bg-card)] border border-[var(--border-color)] overflow-hidden shrink-0 shadow-sm">
                <SmartImage
                  src={PERSONAL_INFO.profileImage}
                  fallbackSrc={PERSONAL_INFO.fallbackProfileImage}
                  alt={PERSONAL_INFO.name}
                  className="w-full h-full object-cover object-top"
                />
              </div>
            </div>

            {/* Profile */}
            <div className="space-y-2">
              <h3 className="text-[10px] font-bold tracking-[0.3em] uppercase text-[var(--text-faint)] italic">
                Profile
              </h3>
              <p className="text-xs sm:text-sm text-[var(--text-primary)] leading-relaxed font-medium uppercase tracking-wider">
                {PERSONAL_INFO.aboutBio1} {PERSONAL_INFO.aboutBio2}
              </p>
            </div>

            {/* Skills & Capabilities */}
            <div className="space-y-3">
              <h3 className="text-[10px] font-bold tracking-[0.3em] uppercase text-[var(--text-faint)] italic">
                Skills & Capabilities
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {SKILLS_LIST.map((skill) => (
                  <div key={skill.id} className="p-3.5 bg-[var(--bg-card)] border border-[var(--border-color)] space-y-1.5 text-xs shadow-xs">
                    <span className="font-mono text-[var(--color-accent)] font-black">{skill.number}.</span>
                    <h4 className="font-black text-[var(--text-primary)] uppercase tracking-tight">{skill.title}</h4>
                    {skill.software && (
                      <span className="text-[9px] font-bold text-[var(--color-accent)] bg-[var(--bg-subtle)] border border-[var(--border-color)] px-2 py-0.5 inline-block uppercase tracking-wider font-mono">
                        {skill.software}
                      </span>
                    )}
                    {skill.description && (
                      <p className="text-[var(--text-muted)] leading-relaxed text-[11px] font-medium pt-1">
                        {skill.description}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Experience */}
            <div className="space-y-4">
              <h3 className="text-[10px] font-bold tracking-[0.3em] uppercase text-[var(--text-faint)] italic">
                Experience
              </h3>
              <div className="space-y-4">
                {EXPERIENCE_LIST.map((exp) => (
                  <div key={exp.id} className="border-l-2 border-[var(--color-accent)] pl-4 space-y-1.5">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                      <h4 className="font-black text-sm uppercase text-[var(--text-primary)] tracking-tight">
                        {exp.company}
                      </h4>
                      <span className="font-mono text-[10px] text-[var(--text-muted)] tracking-widest uppercase">{exp.period}</span>
                    </div>
                    <p className="text-[10px] font-bold text-[var(--color-accent)] uppercase tracking-widest">{exp.role}</p>
                    <div className="space-y-1 text-[11px] text-[var(--text-muted)] uppercase tracking-wider font-medium">
                      {exp.descriptions.map((d, i) => (
                        <p key={i}>• {d}</p>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Thesis */}
            <div className="space-y-2">
              <h3 className="text-[10px] font-bold tracking-[0.3em] uppercase text-[var(--text-faint)] italic">
                Thesis Project ({THESIS_DATA.statusBadge})
              </h3>
              <div className="border-l-2 border-[var(--color-accent)] pl-4 space-y-1.5 text-xs">
                <h4 className="font-black text-xs uppercase tracking-tight text-[var(--text-primary)] leading-snug">
                  {THESIS_DATA.title}
                </h4>
                <div className="flex flex-wrap items-center gap-2">
                  <span className="font-bold text-[10px] text-[var(--color-accent)] uppercase tracking-wider">{THESIS_DATA.role}</span>
                  <span className="text-[var(--text-faint)]">•</span>
                  <span className="font-mono text-[10px] text-[var(--text-muted)] tracking-widest uppercase">{THESIS_DATA.period}</span>
                </div>
                <div className="space-y-1 text-[11px] text-[var(--text-muted)] uppercase tracking-wider font-medium pt-1">
                  {THESIS_DATA.summary.map((s, i) => (
                    <p key={i}>• {s}</p>
                  ))}
                </div>
              </div>
            </div>

            {/* Education */}
            <div className="space-y-2 border-t border-[var(--border-color)] pt-4">
              <h3 className="text-[10px] font-bold tracking-[0.3em] uppercase text-[var(--text-faint)] italic">
                Education
              </h3>
              <div className="text-xs space-y-0.5">
                <p className="font-black text-sm uppercase text-[var(--text-primary)] tracking-tight">{EDUCATION_DATA.institution}</p>
                <p className="text-[11px] font-bold text-[var(--color-accent)] uppercase tracking-widest">{EDUCATION_DATA.degree}</p>
                <p className="font-mono text-[10px] text-[var(--text-muted)] tracking-widest uppercase">{EDUCATION_DATA.period}</p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}

