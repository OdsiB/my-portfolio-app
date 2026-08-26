import { useState } from 'react';
import { ThemeProvider } from './context/ThemeContext';
import { CustomCursor } from './components/CustomCursor';
import { LiveBackground } from './components/LiveBackground';
import { StartupIntro } from './components/StartupIntro';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { Statement } from './components/Statement';
import { SelectedWork } from './components/SelectedWork';
import { MotionVideoSection } from './components/MotionVideoSection';
import { GraphicDesignSection } from './components/GraphicDesignSection';
import { ThesisSection } from './components/ThesisSection';
import { SkillsSection } from './components/SkillsSection';
import { AboutSection } from './components/AboutSection';
import { ExperienceEducation } from './components/ExperienceEducation';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { ProjectModal } from './components/ProjectModal';
import { CVModal } from './components/CVModal';
import { Toast } from './components/Toast';
import { BaseProject, VideoProject, GraphicProject, SelectedProject, ThesisStage } from './types';

export default function App() {
  const [hasIntroCompleted, setHasIntroCompleted] = useState<boolean>(false);
  const [cursorMode, setCursorMode] = useState<'default' | 'view' | 'play' | 'open' | 'drag'>('default');
  const [cursorText, setCursorText] = useState<string>('');
  const [selectedProject, setSelectedProject] = useState<BaseProject | VideoProject | GraphicProject | SelectedProject | null>(null);
  const [isCVModalOpen, setIsCVModalOpen] = useState<boolean>(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const handleCursorChange = (mode: 'default' | 'view' | 'play' | 'open' | 'drag', text: string = '') => {
    setCursorMode(mode);
    setCursorText(text);
  };

  const handleShowToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage((current) => (current === msg ? null : current));
    }, 3500);
  };

  const handleOpenThesisStage = (stage: ThesisStage) => {
    setSelectedProject({
      id: `thesis-${stage.step}`,
      number: stage.step.split('/')[0].trim(),
      title: `THESIS // ${stage.title}`,
      year: '2025–2026',
      category: 'Prototype Design',
      description: stage.description,
      details: [
        `Deliverable Focus: ${stage.focus}`,
        'Interface layout designed for high clarity and visual consistency',
        'Completed and successfully presented in April 2026',
      ],
      tools: ['Prototype Design', 'UI Layout', 'System Architecture'],
      thumbnail: stage.thumbnail,
    });
  };

  return (
    <ThemeProvider>
      <div className="min-h-screen bg-transparent text-[var(--text-primary)] selection:bg-[var(--selection-bg)] selection:text-[var(--selection-text)] relative transition-colors duration-300">
        {/* Startup Handwriting Cursive Intro Animation */}
        {!hasIntroCompleted && (
          <StartupIntro
            onComplete={() => setHasIntroCompleted(true)}
            onCursorChange={handleCursorChange}
          />
        )}

        {/* Custom Desktop Mouse Cursor */}
        <CustomCursor cursorMode={cursorMode} cursorText={cursorText} />

        {/* Live Ambient Fluid Gradient Background */}
        <LiveBackground />

        {/* Sticky Minimal Navigation */}
        <Navbar onCursorChange={handleCursorChange} />

        {/* Main Page Sections */}
        <main id="main-content" className="relative z-10">
          <Hero onCursorChange={handleCursorChange} />
          
          <Statement onCursorChange={handleCursorChange} />

          <SelectedWork
            onSelectProject={(project) => setSelectedProject(project)}
            onCursorChange={handleCursorChange}
          />

          <MotionVideoSection
            onSelectVideo={(video) => setSelectedProject(video)}
            onCursorChange={handleCursorChange}
          />

          <GraphicDesignSection
            onSelectGraphic={(graphic) => setSelectedProject(graphic)}
            onCursorChange={handleCursorChange}
          />

          <ThesisSection
            onCursorChange={handleCursorChange}
            onOpenStageModal={handleOpenThesisStage}
          />

          <SkillsSection onCursorChange={handleCursorChange} />

          <AboutSection
            onCursorChange={handleCursorChange}
            onOpenCVModal={() => setIsCVModalOpen(true)}
          />

          <ExperienceEducation onCursorChange={handleCursorChange} />

          <ContactSection
            onCursorChange={handleCursorChange}
            onShowToast={handleShowToast}
          />
        </main>

        {/* Minimal Footer */}
        <Footer onCursorChange={handleCursorChange} />

        {/* Interactive Lightbox / Video Player Modal */}
        <ProjectModal
          project={selectedProject}
          onClose={() => setSelectedProject(null)}
          onCursorChange={handleCursorChange}
        />

        {/* Complete CV Summary Modal */}
        <CVModal
          isOpen={isCVModalOpen}
          onClose={() => setIsCVModalOpen(false)}
          onCursorChange={handleCursorChange}
          onShowToast={handleShowToast}
        />

        {/* Notification Toast */}
        <Toast message={toastMessage} onClose={() => setToastMessage(null)} />
      </div>
    </ThemeProvider>
  );
}

