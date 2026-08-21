import { motion } from 'motion/react';
import { EXPERIENCE_LIST, EDUCATION_DATA } from '../data/portfolioData';
import { Calendar } from 'lucide-react';

interface ExperienceEducationProps {
  onCursorChange: (mode: 'default' | 'view' | 'play' | 'open', text?: string) => void;
}

export function ExperienceEducation({ onCursorChange }: ExperienceEducationProps) {
  return (
    <section
      id="experience"
      className="py-16 sm:py-24 lg:py-28 px-6 sm:px-8 lg:px-12 max-w-7xl mx-auto border-b border-[var(--border-color)]"
    >
      {/* Experience Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 sm:mb-16 gap-6 border-b border-[var(--border-color)] pb-6">
        <div>
          <h2 className="text-[10px] font-bold tracking-[0.3em] uppercase text-[var(--text-faint)] italic mb-3">
            07 / Timeline
          </h2>
          <h3 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tighter text-[var(--text-primary)] uppercase">
            Experience
          </h3>
        </div>
        <p className="text-[11px] sm:text-xs font-bold text-[var(--text-muted)] tracking-widest uppercase max-w-sm">
          Hands-on professional roles spanning digital graphic design and enterprise IT hardware infrastructure.
        </p>
      </div>

      {/* Experience Vertical Timeline */}
      <div className="space-y-12 sm:space-y-16 relative mb-20">
        {EXPERIENCE_LIST.map((item, idx) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.5, delay: idx * 0.1 }}
            className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-12 items-start border-b border-[var(--border-color)] pb-12"
          >
            {/* Number & Role Identifier */}
            <div className="lg:col-span-4 space-y-1">
              <span className="font-mono text-3xl sm:text-4xl font-black text-[var(--color-accent)] block mb-1">
                {item.number}
              </span>
              <h4 className="text-xl sm:text-2xl font-black text-[var(--text-primary)] uppercase tracking-tight">
                {item.company}
              </h4>
              <p className="text-[11px] font-bold text-[var(--text-muted)] uppercase tracking-widest">
                {item.role}
              </p>
              <div className="inline-flex items-center gap-1.5 font-mono text-[10px] text-[var(--text-faint)] tracking-widest uppercase pt-1">
                <Calendar className="w-3 h-3" />
                <span>{item.period}</span>
              </div>
            </div>

            {/* Role Descriptions from CV */}
            <div className="lg:col-span-8 space-y-4">
              <div className="space-y-3">
                {item.descriptions.map((desc, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <span className="w-1.5 h-1.5 bg-[var(--color-accent)] mt-2 shrink-0" />
                    <p className="text-xs sm:text-sm text-[var(--text-muted)] leading-relaxed font-medium uppercase tracking-wider">
                      {desc}
                    </p>
                  </div>
                ))}
              </div>

              {/* Skills Applied Tags */}
              <div className="pt-3 flex flex-wrap gap-1.5 border-t border-[var(--border-color)]">
                {item.skillsApplied.map((skill) => (
                  <span
                    key={skill}
                    className="px-2.5 py-1 bg-[var(--pill-tag-bg)] text-[var(--pill-tag-text)] text-[9px] font-bold tracking-widest uppercase border border-[var(--border-color)] font-mono"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Education (Small Minimalist Section) */}
      <div id="education" className="pt-8 border-t border-[var(--border-color)]">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          <div className="lg:col-span-4">
            <h2 className="text-[10px] font-bold tracking-[0.3em] uppercase text-[var(--text-faint)] italic mb-1">
              08 / Credential
            </h2>
            <h3 className="text-2xl sm:text-3xl font-black text-[var(--text-primary)] uppercase tracking-tighter">
              Education
            </h3>
          </div>

          <div className="lg:col-span-8 p-6 sm:p-8 bg-[var(--bg-card)] border border-[var(--border-color)] space-y-4 shadow-sm">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[var(--border-color)] pb-4">
              <div>
                <h4 className="text-base sm:text-lg font-black text-[var(--text-primary)] uppercase tracking-tight">
                  {EDUCATION_DATA.institution}
                </h4>
                <p className="text-[10px] font-bold text-[var(--text-muted)] uppercase tracking-widest mt-0.5">
                  {EDUCATION_DATA.degree}
                </p>
              </div>
              <span className="font-mono text-[9px] font-bold text-[var(--text-primary)] tracking-widest uppercase bg-[var(--bg-subtle)] px-2.5 py-1 border border-[var(--border-color)] self-start sm:self-auto">
                {EDUCATION_DATA.period}
              </span>
            </div>

            <div className="space-y-1.5 font-mono text-[10px] text-[var(--text-muted)] uppercase tracking-wider font-medium">
              {EDUCATION_DATA.highlights?.map((h, i) => (
                <p key={i} className="leading-relaxed">
                  • {h}
                </p>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

