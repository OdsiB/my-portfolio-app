import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { BaseProject, VideoProject, GraphicProject, SelectedProject } from '../types';
import { X, Play, Pause, Volume2, VolumeX, Check, ExternalLink, Film, Sparkles } from 'lucide-react';
import { SmartImage } from './SmartImage';

interface ProjectModalProps {
  project: BaseProject | VideoProject | GraphicProject | SelectedProject | null;
  onClose: () => void;
  onCursorChange: (mode: 'default' | 'view' | 'play' | 'open', text?: string) => void;
}

function getYouTubeId(url?: string): string | null {
  if (!url) return null;
  const trimmed = url.trim();
  const match = trimmed.match(/(?:youtube\.com\/(?:watch\?v=|watch\?.+&v=|shorts\/|embed\/)|youtu\.be\/)([\w-]{11})/i);
  return match ? match[1] : null;
}

/**
 * Helper to extract YouTube embed URL from standard YouTube URLs, Shorts, or IDs
 */
function getYouTubeEmbedUrl(url?: string): string | null {
  const id = getYouTubeId(url);
  if (id) {
    return `https://www.youtube.com/embed/${id}?autoplay=1&rel=0`;
  }
  return null;
}

export function ProjectModal({ project, onClose, onCursorChange }: ProjectModalProps) {
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const [videoProgress] = useState(25);
  const [hasStartedVideo, setHasStartedVideo] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  if (!project) return null;

  const isVideo = 'videoCategory' in project || ('type' in project && project.type === 'video');
  const videoUrl = 'videoUrl' in project ? (project as VideoProject | SelectedProject).videoUrl : undefined;
  const ytId = getYouTubeId(videoUrl);
  const youtubeEmbedUrl = getYouTubeEmbedUrl(videoUrl);
  const ytThumbnail = ytId ? `https://img.youtube.com/vi/${ytId}/maxresdefault.jpg` : undefined;
  const isDirectVideo = Boolean(videoUrl && !youtubeEmbedUrl && (videoUrl.endsWith('.mp4') || videoUrl.endsWith('.webm') || videoUrl.startsWith('blob:') || videoUrl.startsWith('http')));
  const isInProduction = Boolean(project.isEmptySlot || project.status === 'IN PRODUCTION' || (isVideo && !videoUrl));

  return (
    <AnimatePresence>
      <div
        id="project-modal-backdrop"
        className="fixed inset-0 z-[9999] bg-black/80 backdrop-blur-md flex items-center justify-center p-4 sm:p-6 lg:p-10 overflow-y-auto"
        onClick={onClose}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          onClick={(e) => e.stopPropagation()}
          className="relative w-full max-w-5xl bg-[var(--bg-canvas)] text-[var(--text-primary)] border border-[var(--border-color)] shadow-2xl overflow-hidden my-auto max-h-[90vh] flex flex-col"
        >
          {/* Top Modal Header */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-[var(--border-color)] bg-[var(--bg-card)]">
            <div className="flex items-center gap-3">
              <span className="font-mono text-xs text-[var(--color-accent)] font-black">
                {project.number}
              </span>
              <span className="text-[10px] font-bold text-[var(--text-muted)] uppercase tracking-widest font-mono">
                {project.category} • {project.year}
              </span>
            </div>

            <button
              onClick={onClose}
              onMouseEnter={() => onCursorChange('open', 'CLOSE')}
              onMouseLeave={() => onCursorChange('default')}
              aria-label="Close modal"
              className="p-1.5 text-[var(--text-primary)] hover:bg-[var(--btn-primary-bg)] hover:text-[var(--btn-primary-text)] transition-colors cursor-pointer border border-[var(--border-color)]"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Modal Body: Scrollable */}
          <div className="overflow-y-auto p-6 sm:p-8 lg:p-10 space-y-6">
            {/* Visual Media Viewer */}
            <div className="relative bg-black border border-[var(--border-color)] overflow-hidden">
              {isVideo ? (
                /* Video Player Frame */
                youtubeEmbedUrl ? (
                  /* YouTube Embed Player with Custom Thumbnail Cover */
                  <div className="relative aspect-[16/9] w-full bg-black flex items-center justify-center overflow-hidden group">
                    {hasStartedVideo ? (
                      <iframe
                        src={youtubeEmbedUrl}
                        title={project.title}
                        className="w-full h-full border-0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                        allowFullScreen
                      />
                    ) : (
                      <div className="relative w-full h-full">
                        <SmartImage
                          src={project.thumbnail || ytThumbnail}
                          fallbackSrc={ytThumbnail || project.fallbackPoster}
                          alt={project.title}
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-black/50 flex flex-col justify-between p-6">
                          <div className="flex items-center justify-between text-[10px] font-bold tracking-widest text-white">
                            <span className="bg-white/10 px-2.5 py-1 uppercase backdrop-blur-xs border border-white/20 font-mono">
                              YOUTUBE VIDEO
                            </span>
                            <span className="font-bold font-mono">
                              {(project as VideoProject).duration || 'HD 1080P'}
                            </span>
                          </div>

                          <div className="flex flex-col items-center justify-center gap-3 my-auto">
                            <button
                              onClick={() => setHasStartedVideo(true)}
                              className="w-16 h-16 sm:w-20 sm:h-20 bg-[var(--color-accent-badge)] text-[var(--color-accent-badge-text)] hover:scale-105 transition-all flex items-center justify-center shadow-2xl rounded-full cursor-pointer"
                              aria-label="Play video"
                            >
                              <Play className="w-7 h-7 sm:w-8 sm:h-8 fill-current ml-1" />
                            </button>
                            <span className="text-[11px] font-bold tracking-widest uppercase text-white/90 bg-black/60 px-3 py-1 backdrop-blur-xs font-mono">
                              Click to Play Video
                            </span>
                          </div>

                          <div className="text-[10px] font-mono text-white/70 uppercase tracking-widest flex items-center justify-between">
                            <span>Ready to stream</span>
                            <span className="text-white/50">{project.title}</span>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                ) : isDirectVideo && videoUrl ? (
                  /* Direct HTML5 MP4/WebM Video Player */
                  <div className="relative aspect-[16/9] w-full bg-black flex items-center justify-center">
                    <video
                      src={videoUrl}
                      controls
                      autoPlay
                      className="w-full h-full object-contain"
                    />
                  </div>
                ) : isInProduction ? (
                  /* Dedicated In-Production / Empty Slot Visual Display */
                  <div className="relative aspect-[16/9] w-full bg-[#0d0f14] flex flex-col justify-between overflow-hidden">
                    <SmartImage
                      src={project.thumbnail}
                      fallbackSrc={project.fallbackPoster}
                      alt={project.title}
                      className="w-full h-full object-cover opacity-30 absolute inset-0"
                    />
                    
                    <div className="relative z-10 p-6 flex items-center justify-between font-mono text-[10px] text-white/70 uppercase tracking-widest border-b border-white/10 bg-black/40 backdrop-blur-xs">
                      <span className="inline-flex items-center gap-2 px-2.5 py-1 bg-[var(--color-accent)]/20 border border-[var(--color-accent)] text-[var(--color-accent)] font-bold">
                        <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-accent)] animate-pulse" />
                        IN POST-PRODUCTION
                      </span>
                      <span className="text-white/50">ARCHIVE SLOT #{project.number}</span>
                    </div>

                    <div className="relative z-10 my-auto text-center px-6 py-8 space-y-3 max-w-lg mx-auto">
                      <div className="w-14 h-14 mx-auto rounded-full bg-white/5 border border-white/20 flex items-center justify-center text-[var(--color-accent)] shadow-2xl backdrop-blur-md">
                        <Film className="w-6 h-6" />
                      </div>
                      <h4 className="text-lg sm:text-2xl font-black text-white uppercase tracking-tight">
                        Video Deliverable In Progress
                      </h4>
                      <p className="text-xs text-white/70 uppercase font-mono tracking-wider leading-relaxed">
                        Upcoming reel currently in editing, color grading & audio mastering. Video stream will be linked upon release.
                      </p>
                    </div>

                    <div className="relative z-10 p-4 sm:p-6 bg-black/60 backdrop-blur-xs border-t border-white/10 flex items-center justify-between font-mono text-[9px] text-white/50 uppercase tracking-widest">
                      <div className="flex items-center gap-2">
                        <Sparkles className="w-3 h-3 text-[var(--color-accent)]" />
                        <span>Planned Release: {project.year}</span>
                      </div>
                      <span>Slot Reserved for YouTube / MP4</span>
                    </div>
                  </div>
                ) : (
                  /* Simulated Video Poster Preview */
                  <div className="relative aspect-[16/9] flex items-center justify-center bg-black">
                    <SmartImage
                      src={project.thumbnail}
                      fallbackSrc={project.fallbackPoster}
                      alt={project.title}
                      className="w-full h-full object-cover opacity-85"
                    />

                    {/* Play/Pause Control HUD */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/30 flex flex-col justify-between p-4 sm:p-6">
                      <div className="flex items-center justify-between text-[10px] font-bold tracking-widest text-white">
                        <span className="bg-white/10 px-2 py-0.5 uppercase backdrop-blur-xs font-mono">
                          PREVIEW ENGINE // 4K 24FPS
                        </span>
                        <span className="font-bold font-mono">
                          {(project as VideoProject).duration || '0:45'}
                        </span>
                      </div>

                      <div className="flex items-center justify-center">
                        <button
                          onClick={() => setIsPlaying(!isPlaying)}
                          className="w-14 h-14 bg-white text-black hover:scale-105 transition-transform flex items-center justify-center shadow-2xl cursor-pointer"
                        >
                          {isPlaying ? <Pause className="w-5 h-5 fill-current" /> : <Play className="w-5 h-5 fill-current ml-0.5" />}
                        </button>
                      </div>

                      {/* Timeline Controls */}
                      <div className="space-y-2">
                        <div className="w-full bg-white/20 h-1 overflow-hidden cursor-pointer">
                          <div
                            className="bg-white h-full transition-all duration-300"
                            style={{ width: `${videoProgress}%` }}
                          />
                        </div>
                        <div className="flex items-center justify-between font-mono text-[9px] text-white/70 uppercase tracking-widest">
                          <div className="flex items-center gap-3">
                            <button
                              onClick={() => setIsMuted(!isMuted)}
                              className="hover:text-white cursor-pointer"
                            >
                              {isMuted ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5" />}
                            </button>
                            <span>00:14 / {(project as VideoProject).duration || '00:45'}</span>
                          </div>
                          <span className="text-white/50">PREVIEW POSTER</span>
                        </div>
                      </div>
                    </div>
                  </div>
                )
              ) : (
                /* High-Res Graphic / Thesis Artwork Viewer */
                <div className="relative aspect-[16/10] bg-[var(--bg-subtle)] flex items-center justify-center p-4">
                  <SmartImage
                    src={project.thumbnail}
                    fallbackSrc={project.fallbackPoster}
                    alt={project.title}
                    className="max-h-[440px] w-auto object-contain shadow-2xl"
                  />
                </div>
              )}
            </div>

            {/* Information Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              <div className="lg:col-span-8 space-y-4">
                <div>
                  <h3 className="text-2xl sm:text-3xl font-black uppercase tracking-tight text-[var(--text-primary)]">
                    {project.title}
                  </h3>
                  <p className="text-[10px] font-bold text-[var(--text-muted)] tracking-widest uppercase mt-1 font-mono">
                    {project.category} • {project.year}
                  </p>
                </div>

                <p className="text-xs sm:text-sm text-[var(--text-primary)] leading-relaxed uppercase tracking-wider font-medium">
                  {project.description}
                </p>

                {/* Detailed Highlights */}
                {project.details && project.details.length > 0 && (
                  <div className="pt-4 border-t border-[var(--border-color)] space-y-2">
                    <span className="text-[10px] text-[var(--color-accent)] font-bold uppercase tracking-widest block font-mono">
                      Key Highlights & Scope:
                    </span>
                    <div className="space-y-1.5 font-mono text-[10px] text-[var(--text-muted)] uppercase tracking-wider">
                      {project.details.map((detail, idx) => (
                        <div key={idx} className="flex items-start gap-2">
                          <Check className="w-3 h-3 text-[var(--color-accent)] mt-0.5 shrink-0" />
                          <span>{detail}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Sidebar Metadata */}
              <div className="lg:col-span-4 p-5 bg-[var(--bg-card)] border border-[var(--border-color)] space-y-4 text-[10px] font-mono">
                <div>
                  <span className="text-[var(--text-faint)] font-bold uppercase block tracking-widest">Tools / Workflow:</span>
                  <div className="flex flex-wrap gap-1 mt-2">
                    {project.tools?.map((tool) => (
                      <span
                        key={tool}
                        className="px-2 py-0.5 bg-[var(--btn-primary-bg)] text-[var(--btn-primary-text)] uppercase text-[9px] font-bold tracking-widest"
                      >
                        {tool}
                      </span>
                    ))}
                  </div>
                </div>

                {videoUrl && (
                  <div className="pt-3 border-t border-[var(--border-color)]">
                    <span className="text-[var(--text-faint)] font-bold uppercase block tracking-widest mb-1">Direct Link:</span>
                    <a
                      href={videoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-[var(--color-accent)] hover:underline uppercase tracking-wider"
                    >
                      <ExternalLink className="w-3.5 h-3.5" /> Watch on YouTube / Source
                    </a>
                  </div>
                )}

                <div className="pt-3 border-t border-[var(--border-color)]">
                  <span className="text-[var(--text-faint)] font-bold uppercase block tracking-widest">Status:</span>
                  {isInProduction ? (
                    <span className="inline-flex items-center gap-1.5 text-[var(--color-accent)] font-bold uppercase tracking-wider mt-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-accent)] animate-pulse" />
                      In Post-Production / Reserved Slot
                    </span>
                  ) : (
                    <span className="text-[var(--text-primary)] font-bold uppercase tracking-wider mt-1 block">
                      Completed Deliverable
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}

