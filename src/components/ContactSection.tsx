import React, { useState } from 'react';
import { PERSONAL_INFO } from '../data/portfolioData';
import { MagneticButton } from './MagneticButton';
import { Mail, Copy, Check, ArrowUpRight, Send } from 'lucide-react';

interface ContactSectionProps {
  onCursorChange: (mode: 'default' | 'view' | 'play' | 'open', text?: string) => void;
  onShowToast: (message: string) => void;
}

export function ContactSection({ onCursorChange, onShowToast }: ContactSectionProps) {
  const [copied, setCopied] = useState(false);
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    projectType: 'Video Editing',
    message: '',
  });

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(PERSONAL_INFO.email);
    setCopied(true);
    onShowToast(`Copied ${PERSONAL_INFO.email} to clipboard!`);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formState.name || !formState.email || !formState.message) {
      onShowToast('Please fill in all required fields.');
      return;
    }

    const subject = encodeURIComponent(`Project Inquiry: ${formState.projectType} — from ${formState.name}`);
    const body = encodeURIComponent(
      `Hi Odsey,\n\nName: ${formState.name}\nEmail: ${formState.email}\nProject Type: ${formState.projectType}\n\nMessage:\n${formState.message}\n\nSent via odseybandojo.design`
    );

    window.location.href = `mailto:${PERSONAL_INFO.email}?subject=${subject}&body=${body}`;
    onShowToast('Opening your email client to send message...');
  };

  return (
    <section
      id="contact"
      className="py-20 sm:py-28 lg:py-36 px-6 sm:px-8 lg:px-12 max-w-7xl mx-auto"
    >
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
        {/* Left Column: Massive Editorial Call to Action */}
        <div className="lg:col-span-7 space-y-6">
          <div className="space-y-2">
            <h2 className="text-[10px] font-bold tracking-[0.3em] uppercase text-[var(--text-faint)] italic">
              09 / Connection
            </h2>
            <h3 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-[var(--text-primary)] leading-[0.95] uppercase">
              <span>Let's Work</span>
              <span className="block text-[var(--color-accent)]">Together.</span>
            </h3>
          </div>

          <p className="text-xs sm:text-sm font-bold text-[var(--text-muted)] max-w-xl uppercase tracking-widest leading-relaxed">
            Have a project, creative opportunity, or idea? Let's connect.
          </p>

          {/* Primary Action Buttons */}
          <div className="space-y-4 pt-2">
            <div className="flex flex-wrap items-center gap-3">
              <MagneticButton
                as="a"
                href={`mailto:${PERSONAL_INFO.email}`}
                id="contact-email-btn"
                onMouseEnter={() => onCursorChange('open', 'MAIL')}
                onMouseLeave={() => onCursorChange('default')}
                className="px-6 py-3.5 bg-[var(--btn-primary-bg)] text-[var(--btn-primary-text)] text-[11px] font-bold tracking-[0.2em] uppercase hover:opacity-85 transition-opacity flex items-center gap-3 shadow-md"
              >
                <Mail className="w-3.5 h-3.5" />
                <span>EMAIL ME</span>
                <span className="text-[9px] opacity-70 font-mono">({PERSONAL_INFO.email})</span>
              </MagneticButton>

              <MagneticButton
                as="button"
                onClick={handleCopyEmail}
                id="contact-copy-btn"
                onMouseEnter={() => onCursorChange('open', 'COPY')}
                onMouseLeave={() => onCursorChange('default')}
                className="px-5 py-3.5 border border-[var(--btn-secondary-border)] text-[var(--text-primary)] text-[10px] font-bold tracking-[0.2em] uppercase hover:bg-[var(--btn-secondary-hover-bg)] hover:text-[var(--btn-secondary-hover-text)] transition-all flex items-center gap-2 cursor-pointer shadow-xs"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-[var(--color-accent)]" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? 'COPIED' : 'COPY EMAIL'}</span>
              </MagneticButton>
            </div>
          </div>

          {/* Social Media Links & Placeholders */}
          <div className="pt-6 border-t border-[var(--border-color)] space-y-3">
            <span className="text-[10px] font-bold text-[var(--text-faint)] uppercase tracking-widest block font-mono">
              Channels & Social Profiles
            </span>
            <div className="flex flex-wrap items-center gap-2">
              <MagneticButton
                as="a"
                href={PERSONAL_INFO.socials.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                onMouseEnter={() => onCursorChange('open', 'LINKEDIN')}
                onMouseLeave={() => onCursorChange('default')}
                className="px-3.5 py-1.5 border border-[var(--border-color)] hover:border-[var(--color-accent)] text-[10px] font-bold tracking-widest text-[var(--text-primary)] hover:text-[var(--color-accent)] uppercase transition-all flex items-center gap-1.5"
              >
                <span>LINKEDIN</span>
                <ArrowUpRight className="w-3 h-3" />
              </MagneticButton>

              <MagneticButton
                as="a"
                href={PERSONAL_INFO.socials.instagram}
                target="_blank"
                rel="noopener noreferrer"
                onMouseEnter={() => onCursorChange('open', 'INSTAGRAM')}
                onMouseLeave={() => onCursorChange('default')}
                className="px-3.5 py-1.5 border border-[var(--border-color)] hover:border-[var(--color-accent)] text-[10px] font-bold tracking-widest text-[var(--text-primary)] hover:text-[var(--color-accent)] uppercase transition-all flex items-center gap-1.5"
              >
                <span>INSTAGRAM</span>
                <ArrowUpRight className="w-3 h-3" />
              </MagneticButton>
            </div>
          </div>
        </div>

        {/* Right Column: Interactive Quick Brief Generator Form */}
        <div className="lg:col-span-5 bg-[var(--bg-card)] border border-[var(--border-color)] p-6 sm:p-8 shadow-sm">
          <div className="flex items-center justify-between border-b border-[var(--border-color)] pb-3 mb-5">
            <span className="text-[10px] text-[var(--text-primary)] font-black uppercase tracking-[0.2em]">
              Quick Creative Brief
            </span>
            <span className="w-1.5 h-1.5 bg-[var(--color-accent)]" />
          </div>

          <form onSubmit={handleFormSubmit} className="space-y-4">
            <div>
              <label className="block text-[9px] font-bold text-[var(--text-muted)] uppercase tracking-widest mb-1">
                Your Name / Company *
              </label>
              <input
                type="text"
                required
                value={formState.name}
                onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                placeholder="e.g. John Doe"
                className="w-full bg-[var(--bg-subtle)] border border-[var(--border-color)] px-3 py-2 text-xs text-[var(--text-primary)] focus:outline-none focus:border-[var(--color-accent)] font-mono uppercase"
              />
            </div>

            <div>
              <label className="block text-[9px] font-bold text-[var(--text-muted)] uppercase tracking-widest mb-1">
                Your Email Address *
              </label>
              <input
                type="email"
                required
                value={formState.email}
                onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                placeholder="johndoe@example.com"
                className="w-full bg-[var(--bg-subtle)] border border-[var(--border-color)] px-3 py-2 text-xs text-[var(--text-primary)] focus:outline-none focus:border-[var(--color-accent)] font-mono uppercase"
              />
            </div>

            <div>
              <label className="block text-[9px] font-bold text-[var(--text-muted)] uppercase tracking-widest mb-1">
                Project Scope
              </label>
              <select
                value={formState.projectType}
                onChange={(e) => setFormState({ ...formState, projectType: e.target.value })}
                className="w-full bg-[var(--bg-subtle)] border border-[var(--border-color)] px-3 py-2 text-xs text-[var(--text-primary)] focus:outline-none focus:border-[var(--color-accent)] font-mono uppercase"
              >
                <option value="Video Editing">Video Editing (Shorts / Promotional / Travel)</option>
                <option value="Graphic Design">Graphic Design & Social Media Content</option>
                <option value="Jersey Design">Jersey & Apparel Sublimation Design</option>
                <option value="Motion Graphics">Motion Graphics & Kinetic Typography</option>
                <option value="Prototype UI">Prototype & Interface Layout</option>
                <option value="Other Creative Role">Full-time / Freelance Opportunity</option>
              </select>
            </div>

            <div>
              <label className="block text-[9px] font-bold text-[var(--text-muted)] uppercase tracking-widest mb-1">
                Project Details / Message *
              </label>
              <textarea
                required
                rows={3}
                value={formState.message}
                onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                placeholder="Timeline, deliverables, or creative objectives..."
                className="w-full bg-[var(--bg-subtle)] border border-[var(--border-color)] px-3 py-2 text-xs text-[var(--text-primary)] focus:outline-none focus:border-[var(--color-accent)] font-mono uppercase"
              />
            </div>

            <button
              type="submit"
              onMouseEnter={() => onCursorChange('open', 'SEND')}
              onMouseLeave={() => onCursorChange('default')}
              className="w-full py-3 bg-[var(--btn-primary-bg)] text-[var(--btn-primary-text)] text-[10px] font-bold tracking-[0.2em] uppercase hover:opacity-85 transition-opacity flex items-center justify-center gap-2 cursor-pointer shadow-sm"
            >
              <Send className="w-3 h-3" />
              <span>SEND INQUIRY BRIEF</span>
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}

