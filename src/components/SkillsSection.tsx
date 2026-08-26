import { useState } from 'react';
import { motion } from 'motion/react';
import { SKILLS_LIST, SOFTWARE_TOOLS } from '../data/portfolioData';

interface SkillsSectionProps {
  onCursorChange: (mode: 'default' | 'view' | 'play' | 'open', text?: string) => void;
}

export function SkillsSection({ onCursorChange }: SkillsSectionProps) {
  const [hoveredSkillId, setHoveredSkillId] = useState<string | null>(null);

  return (
    <section
      id="skills"
      className="py-14 sm:py-20 lg:py-28 px-4 sm:px-6 md:px-8 lg:px-12 max-w-7xl mx-auto border-b border-[var(--border-color)]"
    >
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 sm:mb-16 gap-4 sm:gap-6 border-b border-[var(--border-color)] pb-5 sm:pb-6">
        <div>
          <h2 className="text-[10px] font-bold tracking-[0.3em] uppercase text-[var(--text-faint)] italic mb-2 sm:mb-3">
            02 / Expertise Matrix
          </h2>
          <h3 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tighter text-[var(--text-primary)] uppercase">
            Skills / Capabilities
          </h3>
        </div>
        <p className="text-[10px] sm:text-xs font-medium text-[var(--text-muted)] tracking-widest uppercase max-w-md">
          Core creative and technical competencies derived from multidisciplinary engineering and multimedia design background.
        </p>
      </div>

      {/* Typographic Interactive List */}
      <div className="divide-y divide-[var(--border-color)] border-b border-[var(--border-color)]">
        {SKILLS_LIST.map((skill) => {
          const isHovered = hoveredSkillId === skill.id;

          return (
            <div
              key={skill.id}
              id={`skill-item-${skill.id}`}
              onMouseEnter={() => {
                setHoveredSkillId(skill.id);
                onCursorChange('open', 'SKILL');
              }}
              onMouseLeave={() => {
                setHoveredSkillId(null);
                onCursorChange('default');
              }}
              className="py-5 sm:py-8 transition-colors duration-200 group cursor-default"
            >
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-3 sm:gap-6 items-center">
                {/* Number */}
                <div className="lg:col-span-1 flex items-center justify-between lg:block">
                  <motion.span
                    animate={{ x: isHovered ? 6 : 0 }}
                    transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                    className="font-mono text-lg sm:text-2xl font-black text-[var(--color-accent)] inline-block"
                  >
                    {skill.number}
                  </motion.span>
                  {skill.software && (
                    <span className="lg:hidden font-mono text-[8.5px] font-bold text-[var(--pill-tag-text)] bg-[var(--pill-tag-bg)] border border-[var(--border-color)] px-2 py-0.5 uppercase tracking-wider">
                      {skill.software}
                    </span>
                  )}
                </div>

                {/* Skill Title & Optional Software Tool */}
                <div className="lg:col-span-5">
                  <h4 className="text-lg sm:text-2xl font-black text-[var(--text-primary)] uppercase tracking-tight group-hover:text-[var(--color-accent)] transition-colors">
                    {skill.title}
                  </h4>
                  {skill.software && (
                    <span className="hidden lg:inline-block mt-1 font-mono text-[9px] font-bold text-[var(--pill-tag-text)] bg-[var(--pill-tag-bg)] border border-[var(--border-color)] px-2.5 py-0.5 uppercase tracking-wider">
                      {skill.software}
                    </span>
                  )}
                </div>

                {/* Skill Description & Technical Tags */}
                <div className="lg:col-span-6 space-y-2 sm:space-y-3">
                  {skill.description && (
                    <p className="text-xs sm:text-sm text-[var(--text-muted)] leading-relaxed font-medium">
                      {skill.description}
                    </p>
                  )}
                  {skill.tags && skill.tags.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 pt-0.5">
                      {skill.tags.map((tag) => (
                        <span
                          key={tag}
                          className="font-mono text-[8.5px] sm:text-[9px] font-bold text-[var(--text-primary)] bg-[var(--bg-subtle)] border border-[var(--border-color)] px-2 py-0.5 uppercase tracking-wider group-hover:border-[var(--color-accent)] transition-colors"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Software Tools Section */}
      <div className="mt-12 sm:mt-16 pt-8 sm:pt-12 border-t border-[var(--border-color)]">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-start">
          <div className="lg:col-span-3">
            <h4 className="text-[10px] font-bold tracking-[0.3em] uppercase text-[var(--text-faint)] italic mb-1.5 sm:mb-2">
              System Tools
            </h4>
            <h3 className="text-2xl sm:text-3xl font-black text-[var(--text-primary)] uppercase">
              Tools
            </h3>
          </div>

          <div className="lg:col-span-9 grid grid-cols-1 sm:grid-cols-2 gap-3.5 sm:gap-6">
            {SOFTWARE_TOOLS.map((tool) => (
              <div
                key={tool.name}
                className="p-4 sm:p-6 bg-[var(--bg-card)] border border-[var(--border-color)] space-y-2 sm:space-y-3 group hover:border-[var(--color-accent)] transition-colors shadow-xs"
              >
                <div className="flex items-center justify-between">
                  <span className="font-mono text-[9px] sm:text-[10px] text-[var(--text-muted)] font-bold uppercase tracking-wider">
                    {tool.category}
                  </span>
                  <span className="w-1.5 h-1.5 bg-[var(--color-accent)]" />
                </div>
                <h4 className="text-base sm:text-lg font-black text-[var(--text-primary)] uppercase">
                  {tool.name}
                </h4>
                <p className="text-xs text-[var(--text-muted)] leading-relaxed font-medium">
                  {tool.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

