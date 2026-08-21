import { useState } from 'react';
import { motion } from 'motion/react';
import { THESIS_DATA } from '../data/portfolioData';
import { ThesisStage } from '../types';
import { CheckCircle2, Layers, Compass, Layout, Sliders } from 'lucide-react';
import { SmartImage } from './SmartImage';

interface ThesisSectionProps {
  onCursorChange: (mode: 'default' | 'view' | 'play' | 'open', text?: string) => void;
  onOpenStageModal?: (stage: ThesisStage) => void;
}

export function ThesisSection({ onCursorChange, onOpenStageModal }: ThesisSectionProps) {
  const [activeStageIdx, setActiveStageIdx] = useState(0);
  const activeStage = THESIS_DATA.stages[activeStageIdx];

  const getStageIcon = (idx: number) => {
    switch (idx) {
      case 0:
        return <Compass className="w-3.5 h-3.5" />;
      case 1:
        return <Layout className="w-3.5 h-3.5" />;
      case 2:
        return <Sliders className="w-3.5 h-3.5" />;
      case 3:
        return <CheckCircle2 className="w-3.5 h-3.5" />;
      default:
        return <Layers className="w-3.5 h-3.5" />;
    }
  };

  return (
    <section
      id="thesis"
      className="py-16 sm:py-24 lg:py-28 px-6 sm:px-8 lg:px-12 max-w-7xl mx-auto border-b border-[var(--border-color)]"
    >
      {/* Header with Project Status Stamp */}
      <div className="flex flex-col lg:flex-row lg:items-start justify-between mb-12 sm:mb-16 gap-8 border-b border-[var(--border-color)] pb-8">
        <div className="max-w-4xl">
          <div className="flex flex-wrap items-center gap-3 mb-3">
            <span className="px-2.5 py-1 bg-[var(--color-accent-badge)] text-[var(--color-accent-badge-text)] font-black text-[10px] tracking-[0.2em] uppercase font-mono">
              {THESIS_DATA.systemName}
            </span>
            <span className="px-2.5 py-0.5 bg-[var(--btn-primary-bg)] text-[var(--btn-primary-text)] font-bold text-[9px] tracking-[0.2em] uppercase">
              {THESIS_DATA.statusBadge}
            </span>
            <span className="text-[10px] font-bold tracking-[0.2em] uppercase text-[var(--text-faint)]">
              BS Computer Engineering
            </span>
          </div>
          <h3 className="text-2xl sm:text-3xl lg:text-4xl font-black tracking-tight text-[var(--text-primary)] uppercase leading-[1.15]">
            {THESIS_DATA.title}
          </h3>
          
          <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-[11px] sm:text-xs font-bold text-[var(--text-muted)] tracking-widest uppercase mt-4">
            <span className="text-[var(--text-primary)] bg-[var(--bg-subtle)] px-2 py-0.5 border border-[var(--border-color)]">{THESIS_DATA.role}</span>
            <span>•</span>
            <span>{THESIS_DATA.period}</span>
          </div>

          {/* Research Authors & Advisers */}
          <div className="mt-4 pt-3 border-t border-[var(--border-color)] text-[10px] sm:text-[11px] font-mono uppercase tracking-wider text-[var(--text-muted)] space-y-1">
            <p>
              <strong className="text-[var(--text-primary)]">Research Team:</strong> {THESIS_DATA.authors.join(' • ')}
            </p>
            <p className="text-[var(--text-faint)]">
              <strong>Advisers:</strong> {THESIS_DATA.advisers}
            </p>
          </div>
        </div>

        <div className="font-mono text-[11px] text-[var(--text-muted)] lg:text-right uppercase tracking-wider space-y-1 shrink-0 lg:border-l lg:border-[var(--border-color)] lg:pl-8">
          <p className="font-bold text-[var(--text-primary)]">{THESIS_DATA.institution}</p>
          <p className="text-[10px]">{THESIS_DATA.department}</p>
          <div className="pt-2">
            <span className="inline-block text-[9px] bg-[var(--bg-subtle)] px-2.5 py-1 font-bold text-[var(--text-primary)] border border-[var(--border-color)]">
              DUAL-ENVIRONMENT FIELD TESTED
            </span>
          </div>
        </div>
      </div>

      {/* Key Tested Performance Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
        {THESIS_DATA.keyMetrics.map((metric, i) => (
          <div key={i} className="bg-[var(--bg-card)] border border-[var(--border-color)] p-5 flex flex-col justify-between shadow-xs">
            <div className="text-[10px] font-mono font-bold tracking-[0.2em] text-[var(--text-muted)] uppercase mb-2">
              {metric.label}
            </div>
            <div>
              <div className="text-3xl sm:text-4xl font-black text-[var(--text-primary)] tracking-tight mb-1">
                {metric.value}
              </div>
              <p className="text-[10px] sm:text-[11px] font-medium text-[var(--text-muted)] uppercase tracking-wider">
                {metric.detail}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Hardware & System Architecture Stack */}
      <div className="mb-10 p-4 bg-[var(--bg-subtle)] border border-[var(--border-color)] flex flex-wrap items-center gap-2">
        <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-[var(--text-muted)] mr-2">
          System Stack:
        </span>
        {THESIS_DATA.techStack.map((tech, i) => (
          <span
            key={i}
            className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 bg-[var(--pill-tag-bg)] text-[var(--pill-tag-text)] border border-[var(--border-color)] font-mono"
          >
            {tech}
          </span>
        ))}
      </div>

      {/* Thesis Focus Summary */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12 p-6 sm:p-8 bg-[var(--bg-card)] border border-[var(--border-color)] shadow-xs">
        {THESIS_DATA.summary.map((text, i) => (
          <div key={i} className="flex gap-4 items-start">
            <span className="font-mono text-xs font-black text-[var(--color-accent)] pt-0.5">
              0{i + 1}.
            </span>
            <p className="text-xs sm:text-sm text-[var(--text-muted)] leading-relaxed font-medium uppercase tracking-wider">
              {text}
            </p>
          </div>
        ))}
      </div>

      {/* 4-Stage Interactive Case Study System */}
      <div className="space-y-6">
        {/* Stage Selector Tabs */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
          {THESIS_DATA.stages.map((stage, idx) => {
            const isSelected = activeStageIdx === idx;
            return (
              <button
                key={stage.step}
                id={`thesis-stage-tab-${idx}`}
                onClick={() => setActiveStageIdx(idx)}
                onMouseEnter={() => onCursorChange('open', `STAGE ${idx + 1}`)}
                onMouseLeave={() => onCursorChange('default')}
                className={`text-left p-4 transition-all duration-200 border cursor-pointer ${
                  isSelected
                    ? 'bg-[var(--btn-primary-bg)] text-[var(--btn-primary-text)] border-[var(--btn-primary-bg)] shadow-sm'
                    : 'bg-[var(--bg-card)] text-[var(--text-primary)] border-[var(--border-color)] hover:border-[var(--color-accent)]'
                }`}
              >
                <div className="flex items-center justify-between font-mono text-[10px] mb-2 font-bold uppercase tracking-widest">
                  <span className={isSelected ? 'text-[var(--btn-primary-text)]' : 'text-[var(--text-muted)]'}>
                    {stage.step}
                  </span>
                  <span>{getStageIcon(idx)}</span>
                </div>
                <h4 className="font-black text-sm uppercase tracking-tight line-clamp-1">
                  {stage.title.split('&')[0]}
                </h4>
                <p className={`text-[10px] font-bold mt-1 uppercase tracking-wider ${isSelected ? 'opacity-80' : 'text-[var(--text-muted)]'}`}>
                  {stage.focus}
                </p>
              </button>
            );
          })}
        </div>

        {/* Active Stage Display Panel */}
        <motion.div
          key={activeStage.step}
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="bg-[var(--bg-card)] text-[var(--text-primary)] p-8 sm:p-12 lg:p-14 border border-[var(--border-color)] shadow-xl"
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            {/* Stage Visual Placeholder */}
            <div className="lg:col-span-7">
              <div
                onClick={() => onOpenStageModal?.(activeStage)}
                onMouseEnter={() => onCursorChange('view', 'VIEW')}
                onMouseLeave={() => onCursorChange('default')}
                className="aspect-[16/10] bg-[var(--bg-subtle)] border border-[var(--border-color)] hover:border-[var(--color-accent)] overflow-hidden group cursor-pointer relative transition-colors"
              >
                <SmartImage
                  src={activeStage.thumbnail}
                  fallbackSrc={activeStage.fallbackPoster}
                  alt={activeStage.title}
                  className="editorial-img w-full h-full object-cover group-hover:scale-103 transition-transform duration-300"
                />
                <div className="absolute top-3 right-3 bg-[var(--bg-canvas)] text-[var(--text-primary)] border border-[var(--border-color)] px-2.5 py-0.5 font-bold text-[9px] tracking-[0.2em] uppercase font-mono backdrop-blur-xs">
                  CLICK TO EXPAND
                </div>
              </div>
            </div>

            {/* Stage Description Content */}
            <div className="lg:col-span-5 space-y-5">
              <div>
                <span className="font-mono text-[10px] text-[var(--color-accent)] tracking-[0.2em] uppercase font-bold">
                  {activeStage.step}
                </span>
                <h4 className="text-2xl sm:text-3xl font-black uppercase tracking-tight mt-1 text-[var(--text-primary)]">
                  {activeStage.title}
                </h4>
              </div>

              <p className="text-xs sm:text-sm text-[var(--text-muted)] leading-relaxed font-medium uppercase tracking-wider">
                {activeStage.description}
              </p>

              <div className="pt-4 border-t border-[var(--border-color)] space-y-1">
                <div className="text-[var(--text-faint)] text-[9px] font-bold uppercase tracking-[0.2em]">
                  Deliverable Focus:
                </div>
                <div className="text-xs sm:text-sm text-[var(--text-primary)] font-bold uppercase tracking-wider">
                  {activeStage.focus}
                </div>
              </div>

              <div className="pt-4 flex items-center justify-between font-mono text-[10px] text-[var(--text-faint)] uppercase tracking-widest">
                <span>STAGE {activeStageIdx + 1} OF 4</span>
                <span className="text-[var(--color-accent)]">STATUS: FINALIZED</span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

