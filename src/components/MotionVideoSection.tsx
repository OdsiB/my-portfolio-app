import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { VIDEO_PROJECTS } from '../data/portfolioData';
import { VideoProject, VideoCategory } from '../types';
import { Play, Clock, Film } from 'lucide-react';
import { SmartImage } from './SmartImage';

interface MotionVideoSectionProps {
  onSelectVideo: (video: VideoProject) => void;
  onCursorChange: (mode: 'default' | 'view' | 'play' | 'open', text?: string) => void;
}

export function MotionVideoSection({ onSelectVideo, onCursorChange }: MotionVideoSectionProps) {
  const [activeFilter, setActiveFilter] = useState<'ALL' | VideoCategory>('ALL');

  const categories: Array<'ALL' | VideoCategory> = ['ALL', 'SHORTS', 'PROMOTIONAL', 'TRAVEL'];

  const filteredVideos = activeFilter === 'ALL'
    ? VIDEO_PROJECTS
    : VIDEO_PROJECTS.filter((v) => v.videoCategory === activeFilter);

  return (
    <section
      id="motion-video"
      className="py-16 sm:py-24 lg:py-28 px-6 sm:px-8 lg:px-12 max-w-7xl mx-auto border-b border-[var(--border-color)]"
    >
      {/* Header & Filter Controls */}
      <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-12 sm:mb-16 gap-6 border-b border-[var(--border-color)] pb-6">
        <div>
          <h2 className="text-[10px] font-bold tracking-[0.3em] uppercase text-[var(--text-faint)] italic mb-3">
            03 / Archive 01
          </h2>
          <h3 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tighter text-[var(--text-primary)] uppercase">
            Motion / Video
          </h3>
          <p className="text-[11px] sm:text-xs font-medium text-[var(--text-muted)] tracking-widest uppercase mt-2">
            Focused on short-form pacing, promotional storytelling, and cinematic travel edits.
          </p>
        </div>

        {/* Filter Buttons */}
        <div className="flex flex-wrap items-center gap-2">
          {categories.map((cat) => {
            const isActive = activeFilter === cat;
            return (
              <button
                key={cat}
                id={`filter-video-${cat.toLowerCase()}`}
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

      {/* Video Projects Grid */}
      <motion.div
        layout
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8"
      >
        <AnimatePresence mode="popLayout">
          {filteredVideos.map((video) => {
            const isInProduction = video.isEmptySlot || video.status === 'IN PRODUCTION' || !video.videoUrl;
            const hasPlayableVideo = Boolean(video.videoUrl);

            return (
              <motion.div
                layout
                key={video.id}
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.4 }}
                className="group flex flex-col"
              >
                {/* Video Card Preview */}
                <div
                  id={`video-card-${video.id}`}
                  onClick={() => onSelectVideo(video)}
                  onMouseEnter={() => onCursorChange(hasPlayableVideo ? 'play' : 'open', hasPlayableVideo ? 'PLAY' : 'BRIEF')}
                  onMouseLeave={() => onCursorChange('default')}
                  data-cursor={hasPlayableVideo ? 'play' : 'open'}
                  className="editorial-card relative bg-[var(--bg-card)] border border-[var(--border-color)] hover:border-[var(--color-accent)] overflow-hidden cursor-pointer shadow-sm transition-colors"
                >
                  {/* Aspect ratio tailored to category */}
                  <div
                    className={`overflow-hidden relative ${
                      video.aspectRatio === 'portrait'
                        ? 'aspect-[9/16] sm:aspect-[3/4]'
                        : 'aspect-[16/9]'
                    }`}
                  >
                    <SmartImage
                      src={video.thumbnail}
                      fallbackSrc={video.fallbackPoster}
                      alt={video.title}
                      className="editorial-img w-full h-full object-cover opacity-90 group-hover:opacity-100 transition-opacity"
                    />

                    {/* Top Status Badge for In-Production / Empty Slots */}
                    {isInProduction && (
                      <div className="absolute top-3 left-3 z-10">
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-black/80 border border-[var(--color-accent)]/80 text-[var(--color-accent)] text-[9px] font-mono font-black uppercase tracking-wider backdrop-blur-md shadow-lg">
                          <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-accent)] animate-pulse" />
                          IN PRODUCTION
                        </span>
                      </div>
                    )}

                    {/* Play / Brief Overlay */}
                    <div className="absolute inset-0 bg-black/30 group-hover:bg-black/10 transition-colors flex items-center justify-center">
                      <div className="w-12 h-12 bg-[var(--btn-primary-bg)] text-[var(--btn-primary-text)] flex items-center justify-center shadow-xl group-hover:scale-110 transition-transform duration-200">
                        {hasPlayableVideo ? (
                          <Play className="w-5 h-5 fill-current ml-0.5" />
                        ) : (
                          <Film className="w-5 h-5" />
                        )}
                      </div>
                    </div>

                    {/* Badges */}
                    <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-[9px] font-bold tracking-widest text-[var(--text-primary)] z-10">
                      <span className="bg-[var(--bg-canvas)]/90 border border-[var(--border-color)] px-2 py-0.5 uppercase backdrop-blur-xs font-mono">
                        {video.videoCategory}
                      </span>
                      {video.duration && video.duration !== 'TBD' ? (
                        <span className="bg-[var(--bg-canvas)]/90 border border-[var(--border-color)] px-2 py-0.5 flex items-center gap-1 font-mono backdrop-blur-xs">
                          <Clock className="w-2.5 h-2.5 text-[var(--color-accent)]" />
                          {video.duration}
                        </span>
                      ) : (
                        <span className="bg-[var(--bg-canvas)]/90 border border-[var(--border-color)] px-2 py-0.5 font-mono text-[var(--text-muted)] backdrop-blur-xs">
                          SLOT RESERVED
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                {/* Video Info */}
                <div className="pt-4 space-y-2 flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between font-mono text-[10px] text-[var(--text-faint)] mb-1">
                      <span className="font-bold text-[var(--text-primary)]">{video.number}</span>
                      <span>{video.year}</span>
                    </div>
                    <h4
                      onClick={() => onSelectVideo(video)}
                      className="text-base font-black text-[var(--text-primary)] uppercase tracking-tight group-hover:text-[var(--color-accent)] transition-colors cursor-pointer"
                    >
                      {video.title}
                    </h4>
                    <p className="text-xs text-[var(--text-muted)] line-clamp-2 mt-1 leading-relaxed font-medium uppercase tracking-wider">
                      {video.description}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-[var(--border-color)] flex items-center justify-between">
                    <div className="flex flex-wrap gap-1">
                      {video.tools?.map((tool) => (
                        <span
                          key={tool}
                          className="text-[9px] font-bold text-[var(--text-muted)] uppercase tracking-wider font-mono"
                        >
                          {tool}
                        </span>
                      ))}
                    </div>
                    <button
                      onClick={() => onSelectVideo(video)}
                      onMouseEnter={() => onCursorChange(hasPlayableVideo ? 'play' : 'open', hasPlayableVideo ? 'PLAY' : 'BRIEF')}
                      onMouseLeave={() => onCursorChange('default')}
                      className="text-[10px] font-bold text-[var(--text-primary)] hover:text-[var(--color-accent)] uppercase flex items-center gap-1 border-b border-[var(--border-color)] hover:border-[var(--color-accent)] cursor-pointer"
                    >
                      <span>{hasPlayableVideo ? 'PLAY' : 'VIEW BRIEF'}</span>
                      <span>→</span>
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

