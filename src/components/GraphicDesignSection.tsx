import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { GRAPHIC_PROJECTS } from '../data/portfolioData';
import { GraphicProject, GraphicCategory } from '../types';
import { Eye, ArrowUpRight } from 'lucide-react';
import { SmartImage } from './SmartImage';

interface GraphicDesignSectionProps {
  onSelectGraphic: (graphic: GraphicProject) => void;
  onCursorChange: (mode: 'default' | 'view' | 'play' | 'open', text?: string) => void;
}

export function GraphicDesignSection({ onSelectGraphic, onCursorChange }: GraphicDesignSectionProps) {
  const [activeFilter, setActiveFilter] = useState<'ALL' | GraphicCategory>('ALL');

  const categories: Array<'ALL' | GraphicCategory> = ['ALL', 'SOCIAL MEDIA', 'LAYOUT', 'DIGITAL DESIGN'];

  const filteredProjects = activeFilter === 'ALL'
    ? GRAPHIC_PROJECTS
    : GRAPHIC_PROJECTS.filter((g) => g.graphicCategory === activeFilter);

  return (
    <section
      id="graphic-design"
      className="py-16 sm:py-24 lg:py-28 px-6 sm:px-8 lg:px-12 max-w-7xl mx-auto border-b border-[var(--border-color)]"
    >
      {/* Header & Filter Controls */}
      <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-12 sm:mb-16 gap-6 border-b border-[var(--border-color)] pb-6">
        <div>
          <h2 className="text-[10px] font-bold tracking-[0.3em] uppercase text-[var(--text-faint)] italic mb-3">
            04 / Archive 02
          </h2>
          <h3 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tighter text-[var(--text-primary)] uppercase">
            Graphic / Design
          </h3>
          <p className="text-[11px] sm:text-xs font-medium text-[var(--text-muted)] tracking-widest uppercase mt-2">
            Social media content, promotional campaigns, editorial layouts, and digital branding assets.
          </p>
        </div>

        {/* Filter Buttons */}
        <div className="flex flex-wrap items-center gap-2">
          {categories.map((cat) => {
            const isActive = activeFilter === cat;
            return (
              <button
                key={cat}
                id={`filter-graphic-${cat.toLowerCase().replace(/\s+/g, '-')}`}
                onClick={() => setActiveFilter(cat)}
                onMouseEnter={() => onCursorChange('open', cat)}
                onMouseLeave={() => onCursorChange('default')}
                className={`px-3.5 py-1.5 text-[10px] font-bold tracking-[0.2em] uppercase transition-all border cursor-pointer ${
                  isActive
                    ? 'bg-[var(--btn-primary-bg)] text-[var(--btn-primary-text)] border-[var(--btn-primary-bg)] shadow-xs'
                    : 'bg-transparent text-[var(--text-muted)] border-[var(--border-color)] hover:border-[var(--color-accent)] hover:text-[var(--text-primary)]'
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>
      </div>

      {/* Asymmetric Gallery Grid */}
      <motion.div
        layout
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8"
      >
        <AnimatePresence mode="popLayout">
          {filteredProjects.map((project, idx) => {
            const isTall = project.aspectRatio === 'portrait';
            const isSquare = project.aspectRatio === 'square';

            return (
              <motion.div
                layout
                key={project.id}
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.4 }}
                className={`group flex flex-col ${idx % 3 === 1 ? 'lg:translate-y-4' : ''}`}
              >
                {/* Visual Thumbnail Frame */}
                <div
                  id={`graphic-card-${project.id}`}
                  onClick={() => onSelectGraphic(project)}
                  onMouseEnter={() => onCursorChange('view', 'VIEW')}
                  onMouseLeave={() => onCursorChange('default')}
                  data-cursor="view"
                  className="editorial-card relative bg-[var(--bg-card)] border border-[var(--border-color)] hover:border-[var(--color-accent)] overflow-hidden cursor-pointer transition-colors shadow-sm"
                >
                  <div
                    className={`overflow-hidden relative ${
                      isTall
                        ? 'aspect-[3/4]'
                        : isSquare
                        ? 'aspect-square'
                        : 'aspect-[16/10]'
                    }`}
                  >
                    <SmartImage
                      src={project.thumbnail}
                      fallbackSrc={project.fallbackPoster}
                      alt={project.title}
                      className="editorial-img w-full h-full object-cover"
                    />

                    {/* Hover Overlay */}
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <div className="w-12 h-12 bg-[var(--btn-primary-bg)] text-[var(--btn-primary-text)] flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                        <Eye className="w-5 h-5" />
                      </div>
                    </div>

                    {/* Category Label */}
                    <div className="absolute bottom-3 left-3 font-bold text-[9px] text-[var(--text-primary)] bg-[var(--bg-canvas)]/90 border border-[var(--border-color)] px-2.5 py-0.5 uppercase tracking-widest backdrop-blur-xs font-mono">
                      {project.graphicCategory}
                    </div>
                  </div>
                </div>

                {/* Project Metadata */}
                <div className="pt-4 space-y-2 flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between font-mono text-[10px] text-[var(--text-faint)] mb-1">
                      <span className="font-bold text-[var(--text-primary)]">{project.number}</span>
                      <span>{project.year}</span>
                    </div>
                    <h4
                      onClick={() => onSelectGraphic(project)}
                      className="text-base font-black text-[var(--text-primary)] uppercase tracking-tight group-hover:text-[var(--color-accent)] transition-colors cursor-pointer"
                    >
                      {project.title}
                    </h4>
                    <p className="text-xs text-[var(--text-muted)] line-clamp-2 mt-1 leading-relaxed font-medium uppercase tracking-wider">
                      {project.description}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-[var(--border-color)] flex items-center justify-between">
                    <span className="text-[9px] font-bold text-[var(--text-muted)] uppercase tracking-wider font-mono">
                      {project.format || 'Digital Asset'}
                    </span>
                    <button
                      onClick={() => onSelectGraphic(project)}
                      onMouseEnter={() => onCursorChange('open', 'EXPAND')}
                      onMouseLeave={() => onCursorChange('default')}
                      className="text-[10px] font-bold text-[var(--text-primary)] hover:text-[var(--color-accent)] uppercase flex items-center gap-1 border-b border-[var(--border-color)] hover:border-[var(--color-accent)] cursor-pointer"
                    >
                      <span>DETAILS</span>
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </motion.div>
    </section>
  );
}

