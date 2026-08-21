import { motion } from 'motion/react';
import { SELECTED_PROJECTS } from '../data/portfolioData';
import { SelectedProject } from '../types';
import { ArrowUpRight, Play, Eye } from 'lucide-react';
import { SmartImage } from './SmartImage';

interface SelectedWorkProps {
  onSelectProject: (project: SelectedProject) => void;
  onCursorChange: (mode: 'default' | 'view' | 'play' | 'open', text?: string) => void;
}

export function SelectedWork({ onSelectProject, onCursorChange }: SelectedWorkProps) {
  return (
    <section
      id="selected-work"
      className="py-16 sm:py-24 lg:py-28 px-6 sm:px-8 lg:px-12 max-w-7xl mx-auto border-b border-[var(--border-color)]"
    >
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 sm:mb-20 gap-6 border-b border-[var(--border-color)] pb-6">
        <div>
          <h2 className="text-[10px] font-bold tracking-[0.3em] uppercase text-[var(--text-faint)] italic mb-3">
            01 / Selected Work
          </h2>
          <h3 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tighter text-[var(--text-primary)] uppercase">
            Selected Work
          </h3>
        </div>
        <p className="text-[11px] sm:text-xs font-medium text-[var(--text-muted)] tracking-widest uppercase max-w-sm">
          Selected projects across video editing, graphic design, and digital content.
        </p>
      </div>

      {/* Asymmetric Editorial Gallery */}
      <div className="space-y-20 sm:space-y-28">
        {/* Project 01: Large Vertical/Hero presentation */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-7"
          >
            <div
              id="selected-project-01"
              onClick={() => onSelectProject(SELECTED_PROJECTS[0])}
              onMouseEnter={() => onCursorChange('play', 'PLAY')}
              onMouseLeave={() => onCursorChange('default')}
              data-cursor="play"
              className="editorial-card group relative bg-[var(--bg-card)] border border-[var(--border-color)] hover:border-[var(--color-accent)] overflow-hidden cursor-pointer transition-all duration-300 shadow-md"
            >
              <div className="aspect-[4/5] sm:aspect-[16/10] lg:aspect-[4/5] overflow-hidden relative">
                <SmartImage
                  src={SELECTED_PROJECTS[0].thumbnail}
                  fallbackSrc={SELECTED_PROJECTS[0].fallbackPoster}
                  alt={SELECTED_PROJECTS[0].title}
                  className="editorial-img w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <div className="w-14 h-14 bg-[var(--btn-primary-bg)] text-[var(--btn-primary-text)] flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                    <Play className="w-6 h-6 fill-current ml-0.5" />
                  </div>
                </div>
                {/* Visual Corner Tag */}
                <div className="absolute bottom-4 left-4 bg-[var(--bg-canvas)]/90 border border-[var(--border-color)] px-3 py-1 text-[9px] font-bold tracking-widest uppercase text-[var(--text-primary)] backdrop-blur-xs">
                  {SELECTED_PROJECTS[0].number} // SHORT-FORM
                </div>
              </div>
            </div>
          </motion.div>

          <div className="lg:col-span-5 space-y-5">
            <div className="flex items-center gap-4">
              <span className="font-mono text-2xl sm:text-3xl font-black text-[var(--text-primary)]">
                {SELECTED_PROJECTS[0].number}
              </span>
              <span className="h-[1px] flex-1 bg-[var(--border-color)]" />
              <span className="font-mono text-[10px] text-[var(--text-faint)] tracking-widest uppercase">
                {SELECTED_PROJECTS[0].year}
              </span>
            </div>

            <div>
              <h4 className="text-2xl sm:text-3xl lg:text-4xl font-black text-[var(--text-primary)] uppercase tracking-tight">
                {SELECTED_PROJECTS[0].title}
              </h4>
              <p className="text-[10px] text-[var(--color-accent)] tracking-[0.2em] uppercase mt-1 font-bold">
                {SELECTED_PROJECTS[0].category}
              </p>
            </div>

            <p className="text-xs sm:text-sm text-[var(--text-muted)] leading-relaxed font-medium uppercase tracking-wider">
              {SELECTED_PROJECTS[0].description}
            </p>

            <div className="flex flex-wrap gap-2 pt-2">
              {SELECTED_PROJECTS[0].tools?.map((tool) => (
                <span
                  key={tool}
                  className="px-2.5 py-1 bg-[var(--pill-tag-bg)] text-[var(--pill-tag-text)] border border-[var(--border-color)] text-[9px] font-bold tracking-widest uppercase font-mono"
                >
                  {tool}
                </span>
              ))}
            </div>

            <button
              onClick={() => onSelectProject(SELECTED_PROJECTS[0])}
              onMouseEnter={() => onCursorChange('open', 'VIEW')}
              onMouseLeave={() => onCursorChange('default')}
              className="inline-flex items-center gap-2 text-[10px] font-bold tracking-[0.2em] text-[var(--text-primary)] uppercase group hover:text-[var(--color-accent)] transition-colors pt-2 border-b border-[var(--border-color)] hover:border-[var(--color-accent)] cursor-pointer"
            >
              <span>EXPLORE PROJECT CASE</span>
              <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </button>
          </div>
        </div>

        {/* Project 02: Wide Cinematic Layout (Reversed columns) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          <div className="lg:col-span-5 order-2 lg:order-1 space-y-5">
            <div className="flex items-center gap-4">
              <span className="font-mono text-2xl sm:text-3xl font-black text-[var(--text-primary)]">
                {SELECTED_PROJECTS[1].number}
              </span>
              <span className="h-[1px] flex-1 bg-[var(--border-color)]" />
              <span className="font-mono text-[10px] text-[var(--text-faint)] tracking-widest uppercase">
                {SELECTED_PROJECTS[1].year}
              </span>
            </div>

            <div>
              <h4 className="text-2xl sm:text-3xl lg:text-4xl font-black text-[var(--text-primary)] uppercase tracking-tight">
                {SELECTED_PROJECTS[1].title}
              </h4>
              <p className="text-[10px] text-[var(--color-accent)] tracking-[0.2em] uppercase mt-1 font-bold">
                {SELECTED_PROJECTS[1].category}
              </p>
            </div>

            <p className="text-xs sm:text-sm text-[var(--text-muted)] leading-relaxed font-medium uppercase tracking-wider">
              {SELECTED_PROJECTS[1].description}
            </p>

            <div className="flex flex-wrap gap-2 pt-2">
              {SELECTED_PROJECTS[1].tools?.map((tool) => (
                <span
                  key={tool}
                  className="px-2.5 py-1 bg-[var(--pill-tag-bg)] text-[var(--pill-tag-text)] border border-[var(--border-color)] text-[9px] font-bold tracking-widest uppercase font-mono"
                >
                  {tool}
                </span>
              ))}
            </div>

            <button
              onClick={() => onSelectProject(SELECTED_PROJECTS[1])}
              onMouseEnter={() => onCursorChange('open', 'VIEW')}
              onMouseLeave={() => onCursorChange('default')}
              className="inline-flex items-center gap-2 text-[10px] font-bold tracking-[0.2em] text-[var(--text-primary)] uppercase group hover:text-[var(--color-accent)] transition-colors pt-2 border-b border-[var(--border-color)] hover:border-[var(--color-accent)] cursor-pointer"
            >
              <span>EXPLORE PROJECT CASE</span>
              <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </button>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-7 order-1 lg:order-2"
          >
            <div
              id="selected-project-02"
              onClick={() => onSelectProject(SELECTED_PROJECTS[1])}
              onMouseEnter={() => onCursorChange('play', 'PLAY')}
              onMouseLeave={() => onCursorChange('default')}
              data-cursor="play"
              className="editorial-card group relative bg-[var(--bg-card)] border border-[var(--border-color)] hover:border-[var(--color-accent)] overflow-hidden cursor-pointer transition-all duration-300 shadow-md"
            >
              <div className="aspect-[16/9] overflow-hidden relative">
                <SmartImage
                  src={SELECTED_PROJECTS[1].thumbnail}
                  fallbackSrc={SELECTED_PROJECTS[1].fallbackPoster}
                  alt={SELECTED_PROJECTS[1].title}
                  className="editorial-img w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <div className="w-14 h-14 bg-[var(--btn-primary-bg)] text-[var(--btn-primary-text)] flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                    <Play className="w-6 h-6 fill-current ml-0.5" />
                  </div>
                </div>
                <div className="absolute bottom-4 left-4 bg-[var(--bg-canvas)]/90 border border-[var(--border-color)] px-3 py-1 text-[9px] font-bold tracking-widest uppercase text-[var(--text-primary)] backdrop-blur-xs">
                  {SELECTED_PROJECTS[1].number} // PROMOTIONAL
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Project 03 & 04: Asymmetrical Split Composition */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* Project 03: Square Graphic */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-6 space-y-5"
          >
            <div
              id="selected-project-03"
              onClick={() => onSelectProject(SELECTED_PROJECTS[2])}
              onMouseEnter={() => onCursorChange('view', 'VIEW')}
              onMouseLeave={() => onCursorChange('default')}
              data-cursor="view"
              className="editorial-card group relative bg-[var(--bg-card)] border border-[var(--border-color)] hover:border-[var(--color-accent)] overflow-hidden cursor-pointer transition-all duration-300 shadow-md"
            >
              <div className="aspect-square overflow-hidden relative">
                <SmartImage
                  src={SELECTED_PROJECTS[2].thumbnail}
                  fallbackSrc={SELECTED_PROJECTS[2].fallbackPoster}
                  alt={SELECTED_PROJECTS[2].title}
                  className="editorial-img w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <div className="w-12 h-12 bg-[var(--btn-primary-bg)] text-[var(--btn-primary-text)] flex items-center justify-center shadow-md">
                    <Eye className="w-5 h-5" />
                  </div>
                </div>
                <div className="absolute bottom-4 left-4 bg-[var(--bg-canvas)]/90 border border-[var(--border-color)] px-3 py-1 text-[9px] font-bold tracking-widest uppercase text-[var(--text-primary)] backdrop-blur-xs">
                  {SELECTED_PROJECTS[2].number} // SOCIAL MEDIA
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between font-mono text-xs">
                <span className="text-[var(--text-primary)] font-black text-lg">{SELECTED_PROJECTS[2].number}</span>
                <span className="text-[var(--text-faint)] uppercase">{SELECTED_PROJECTS[2].year}</span>
              </div>
              <h4 className="text-xl sm:text-2xl font-black text-[var(--text-primary)] uppercase">
                {SELECTED_PROJECTS[2].title}
              </h4>
              <p className="text-[10px] text-[var(--color-accent)] tracking-[0.2em] uppercase font-bold">
                {SELECTED_PROJECTS[2].category}
              </p>
              <p className="text-xs sm:text-sm text-[var(--text-muted)] leading-relaxed font-medium uppercase tracking-wider">
                {SELECTED_PROJECTS[2].description}
              </p>
            </div>
          </motion.div>

          {/* Project 04: Portrait Poster */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.8, delay: 0.15 }}
            className="lg:col-span-6 space-y-5 lg:mt-12"
          >
            <div
              id="selected-project-04"
              onClick={() => onSelectProject(SELECTED_PROJECTS[3])}
              onMouseEnter={() => onCursorChange('view', 'VIEW')}
              onMouseLeave={() => onCursorChange('default')}
              data-cursor="view"
              className="editorial-card group relative bg-[var(--bg-card)] border border-[var(--border-color)] hover:border-[var(--color-accent)] overflow-hidden cursor-pointer transition-all duration-300 shadow-md"
            >
              <div className="aspect-[3/4] overflow-hidden relative">
                <SmartImage
                  src={SELECTED_PROJECTS[3].thumbnail}
                  fallbackSrc={SELECTED_PROJECTS[3].fallbackPoster}
                  alt={SELECTED_PROJECTS[3].title}
                  className="editorial-img w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <div className="w-12 h-12 bg-[var(--btn-primary-bg)] text-[var(--btn-primary-text)] flex items-center justify-center shadow-md">
                    <Eye className="w-5 h-5" />
                  </div>
                </div>
                <div className="absolute bottom-4 left-4 bg-[var(--bg-canvas)]/90 border border-[var(--border-color)] px-3 py-1 text-[9px] font-bold tracking-widest uppercase text-[var(--text-primary)] backdrop-blur-xs">
                  {SELECTED_PROJECTS[3].number} // POSTER LAYOUT
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between font-mono text-xs">
                <span className="text-[var(--text-primary)] font-black text-lg">{SELECTED_PROJECTS[3].number}</span>
                <span className="text-[var(--text-faint)] uppercase">{SELECTED_PROJECTS[3].year}</span>
              </div>
              <h4 className="text-xl sm:text-2xl font-black text-[var(--text-primary)] uppercase">
                {SELECTED_PROJECTS[3].title}
              </h4>
              <p className="text-[10px] text-[var(--color-accent)] tracking-[0.2em] uppercase font-bold">
                {SELECTED_PROJECTS[3].category}
              </p>
              <p className="text-xs sm:text-sm text-[var(--text-muted)] leading-relaxed font-medium uppercase tracking-wider">
                {SELECTED_PROJECTS[3].description}
              </p>
            </div>
          </motion.div>
        </div>

        {/* Project 05: Thesis Full-Width Featured Card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.8 }}
          className="border-t border-[var(--border-color)] pt-14"
        >
          <div
            id="selected-project-05"
            onClick={() => onSelectProject(SELECTED_PROJECTS[4])}
            onMouseEnter={() => onCursorChange('view', 'THESIS')}
            onMouseLeave={() => onCursorChange('default')}
            data-cursor="view"
            className="editorial-card group relative bg-[var(--bg-card)] text-[var(--text-primary)] p-8 sm:p-12 lg:p-14 border border-[var(--border-color)] hover:border-[var(--color-accent)] cursor-pointer overflow-hidden transition-all duration-300 shadow-xl"
          >
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-6 space-y-5">
                <div className="flex items-center gap-3">
                  <span className="px-2.5 py-1 bg-[var(--color-accent-badge)] text-[var(--color-accent-badge-text)] font-bold text-[9px] tracking-[0.2em] uppercase font-mono">
                    COMPLETED 04/2026
                  </span>
                  <span className="font-mono text-[10px] text-[var(--text-faint)] tracking-widest uppercase">
                    {SELECTED_PROJECTS[4].year}
                  </span>
                </div>

                <div>
                  <span className="font-mono text-2xl sm:text-3xl font-black text-[var(--text-primary)] block mb-1">
                    {SELECTED_PROJECTS[4].number}
                  </span>
                  <h4 className="text-3xl sm:text-4xl lg:text-5xl font-black uppercase tracking-tight">
                    {SELECTED_PROJECTS[4].title}
                  </h4>
                  <p className="text-[10px] text-[var(--color-accent)] tracking-[0.2em] uppercase mt-2 font-bold">
                    {SELECTED_PROJECTS[4].subtitle} • {SELECTED_PROJECTS[4].category}
                  </p>
                </div>

                <p className="text-xs sm:text-sm text-[var(--text-muted)] leading-relaxed max-w-lg font-medium uppercase tracking-wider">
                  {SELECTED_PROJECTS[4].description}
                </p>

                <div className="inline-flex items-center gap-2 text-[10px] font-bold tracking-[0.2em] text-[var(--text-primary)] group-hover:text-[var(--color-accent)] transition-colors pt-2 uppercase border-b border-[var(--border-color)] group-hover:border-[var(--color-accent)]">
                  <span>VIEW FULL THESIS CASE STUDY</span>
                  <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </div>
              </div>

              <div className="lg:col-span-6">
                <div className="aspect-[16/10] overflow-hidden border border-[var(--border-color)] relative">
                  <SmartImage
                    src={SELECTED_PROJECTS[4].thumbnail}
                    fallbackSrc={SELECTED_PROJECTS[4].fallbackPoster}
                    alt={SELECTED_PROJECTS[4].title}
                    className="editorial-img w-full h-full object-cover opacity-90 group-hover:opacity-100 transition-opacity"
                  />
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

