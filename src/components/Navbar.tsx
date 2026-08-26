import { useEffect, useState } from 'react';
import { MagneticButton } from './MagneticButton';
import { Menu, X, ArrowUpRight, Check } from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData';
import { useTheme, ThemeMode } from '../context/ThemeContext';

interface NavbarProps {
  onCursorChange: (mode: 'default' | 'view' | 'play' | 'open', text?: string) => void;
}

export function Navbar({ onCursorChange }: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [themeDropdownOpen, setThemeDropdownOpen] = useState(false);

  const { theme, setTheme, cycleTheme } = useTheme();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);

      const sections = ['hero', 'selected-work', 'motion-video', 'graphic-design', 'about', 'skills', 'experience', 'thesis', 'contact'];
      const scrollPosition = window.scrollY + 180;

      for (const sectionId of sections) {
        const el = document.getElementById(sectionId);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Lock body scroll when mobile drawer is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);

  const navItems = [
    { label: 'WORK', href: '#selected-work', activeIds: ['selected-work', 'motion-video', 'graphic-design', 'thesis'] },
    { label: 'ABOUT', href: '#about', activeIds: ['about', 'skills'] },
    { label: 'EXPERIENCE', href: '#experience', activeIds: ['experience'] },
    { label: 'CONTACT', href: '#contact', activeIds: ['contact'] },
  ];

  const isNavActive = (activeIds: string[]) => activeIds.includes(activeSection);

  const themeOptions: { id: ThemeMode; label: string; sub: string; colorDot: string }[] = [
    { id: 'black-blue', label: 'BLACK + BLUE', sub: 'Cobalt Noir', colorDot: '#3b82f6' },
    { id: 'black-red', label: 'BLACK + RED', sub: 'Crimson Noir', colorDot: '#ef4444' },
    { id: 'black-teal', label: 'BLACK + TEAL', sub: 'Cyber Aqua', colorDot: '#14b8a6' },
    { id: 'black-white', label: 'BLACK + WHITE', sub: 'Monochrome Obsidian', colorDot: '#ffffff' },
    { id: 'editorial', label: 'EDITORIAL', sub: 'Warm Monochrome', colorDot: '#a8a29e' },
  ];

  const currentThemeLabel =
    theme === 'black-blue'
      ? 'BLACK + BLUE'
      : theme === 'black-red'
      ? 'BLACK + RED'
      : theme === 'black-teal'
      ? 'BLACK + TEAL'
      : theme === 'black-white'
      ? 'BLACK + WHITE'
      : 'EDITORIAL';

  return (
    <header
      id="main-navigation-bar"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'py-2.5 sm:py-3.5 bg-[var(--nav-bg)] backdrop-blur-md border-b border-[var(--border-color)] shadow-lg'
          : 'py-3.5 sm:py-5 md:py-6 bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 lg:px-12 flex items-center justify-between">
        {/* Left Side Branding */}
        <MagneticButton
          as="a"
          href="#hero"
          id="nav-logo-link"
          onClick={() => setMobileMenuOpen(false)}
          onMouseEnter={() => onCursorChange('open', 'TOP')}
          onMouseLeave={() => onCursorChange('default')}
          className="group flex flex-col items-start select-none py-1"
        >
          <span className="font-bold text-[11px] sm:text-xs tracking-[0.18em] text-[var(--text-primary)] uppercase group-hover:text-[var(--color-accent)] transition-colors">
            {PERSONAL_INFO.name}
          </span>
          <span className="font-mono text-[8px] sm:text-[9px] tracking-[0.2em] text-[var(--text-muted)] uppercase">
            Multimedia Designer
          </span>
        </MagneticButton>

        {/* Right Side Desktop / Tablet Navigation */}
        <nav id="desktop-nav" className="hidden md:flex items-center space-x-3.5 lg:space-x-6 text-[9.5px] lg:text-[10px] font-bold tracking-[0.2em] uppercase">
          {navItems.map((item) => {
            const active = isNavActive(item.activeIds);
            return (
              <MagneticButton
                key={item.label}
                as="a"
                href={item.href}
                id={`nav-link-${item.label.toLowerCase()}`}
                onMouseEnter={() => onCursorChange('open', item.label)}
                onMouseLeave={() => onCursorChange('default')}
                className={`relative py-1 transition-all ${
                  active ? 'text-[var(--text-primary)] font-black' : 'text-[var(--text-muted)] hover:text-[var(--text-primary)]'
                }`}
              >
                <span>{item.label}</span>
                {active && (
                  <span className="absolute -bottom-1 left-0 right-0 h-[2px] bg-[var(--color-accent)] shadow-[0_0_8px_var(--color-accent)]" />
                )}
              </MagneticButton>
            );
          })}

          {/* Interactive Theme Switcher Button */}
          <div className="relative">
            <button
              onClick={() => setThemeDropdownOpen(!themeDropdownOpen)}
              onMouseEnter={() => onCursorChange('open', 'THEME')}
              onMouseLeave={() => onCursorChange('default')}
              title="Switch Color Theme"
              className="flex items-center gap-1.5 lg:gap-2 px-2 lg:px-2.5 py-1 rounded-sm border border-[var(--border-color)] bg-[var(--bg-subtle)] text-[var(--text-primary)] hover:border-[var(--color-accent)] transition-all text-[8.5px] lg:text-[9px] font-mono font-bold tracking-wider cursor-pointer"
            >
              <span
                className="w-2 h-2 lg:w-2.5 lg:h-2.5 rounded-full shadow-[0_0_6px_var(--color-accent)] shrink-0"
                style={{ backgroundColor: 'var(--color-accent)' }}
              />
              <span>{currentThemeLabel}</span>
            </button>

            {/* Dropdown Menu */}
            {themeDropdownOpen && (
              <div
                className="absolute right-0 mt-2 w-52 bg-[var(--bg-card)] border border-[var(--border-color)] shadow-2xl p-1.5 space-y-1 z-50 rounded-sm"
                onMouseLeave={() => setThemeDropdownOpen(false)}
              >
                <div className="px-2 py-1 text-[8px] font-mono text-[var(--text-faint)] uppercase tracking-widest border-b border-[var(--border-color)]">
                  Select Theme
                </div>
                {themeOptions.map((opt) => {
                  const isSelected = theme === opt.id;
                  return (
                    <button
                      key={opt.id}
                      onClick={() => {
                        setTheme(opt.id);
                        setThemeDropdownOpen(false);
                      }}
                      className={`w-full flex items-center justify-between px-2.5 py-2 text-left text-[9px] tracking-wider transition-all rounded-xs cursor-pointer ${
                        isSelected
                          ? 'bg-[var(--pill-tag-bg)] text-[var(--color-accent)] font-bold'
                          : 'text-[var(--text-muted)] hover:bg-[var(--bg-subtle)] hover:text-[var(--text-primary)]'
                      }`}
                    >
                      <div className="flex items-center gap-2.5">
                        <span
                          className="w-2.5 h-2.5 rounded-full shrink-0 border border-white/20"
                          style={{ backgroundColor: opt.colorDot }}
                        />
                        <div>
                          <div className="font-bold">{opt.label}</div>
                          <div className="text-[7.5px] opacity-70 font-mono">{opt.sub}</div>
                        </div>
                      </div>
                      {isSelected && <Check className="w-3.5 h-3.5 text-[var(--color-accent)]" />}
                    </button>
                  );
                })}
              </div>
            )}
          </div>

          {/* Direct Email quick action */}
          <div className="pl-0.5">
            <MagneticButton
              as="a"
              href={`mailto:${PERSONAL_INFO.email}`}
              id="nav-contact-button"
              onMouseEnter={() => onCursorChange('open', 'EMAIL')}
              onMouseLeave={() => onCursorChange('default')}
              className="inline-flex items-center gap-1.5 px-2.5 lg:px-3 py-1.5 bg-[var(--btn-primary-bg)] text-[var(--btn-primary-text)] hover:opacity-90 transition-all text-[8.5px] lg:text-[9px] font-bold tracking-[0.18em] uppercase shadow-sm shrink-0"
            >
              <span>CONNECT</span>
              <ArrowUpRight className="w-3 h-3" />
            </MagneticButton>
          </div>
        </nav>

        {/* Mobile Hamburger Toggle & Quick Theme Cycle */}
        <div className="flex md:hidden items-center gap-2">
          <button
            onClick={cycleTheme}
            aria-label="Cycle theme"
            className="flex items-center gap-1.5 px-2.5 py-1.5 text-[var(--text-primary)] border border-[var(--border-color)] bg-[var(--bg-subtle)] rounded-sm text-[9px] font-mono font-bold active:scale-95 transition-transform"
          >
            <span
              className="w-2 h-2 rounded-full shrink-0"
              style={{ backgroundColor: 'var(--color-accent)' }}
            />
            <span className="text-[8px] uppercase tracking-wider">{theme.replace('black-', '')}</span>
          </button>

          <button
            id="mobile-menu-toggle-btn"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle navigation menu"
            className="p-2 text-[var(--text-primary)] hover:opacity-70 transition-opacity focus:outline-none rounded-sm border border-[var(--border-color)] bg-[var(--bg-subtle)]"
          >
            {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Mobile Full Drawer Menu */}
      {mobileMenuOpen && (
        <div
          id="mobile-nav-drawer"
          className="md:hidden fixed inset-x-0 top-[52px] bottom-0 bg-[var(--bg-canvas)]/98 backdrop-blur-xl border-b border-[var(--border-color)] px-5 py-6 overflow-y-auto flex flex-col justify-between z-40 shadow-2xl animate-in fade-in slide-in-from-top-4 duration-200"
        >
          <div className="flex flex-col space-y-2">
            <div className="text-[8px] font-mono text-[var(--text-faint)] tracking-[0.25em] uppercase pb-1 border-b border-[var(--border-color)]">
              Navigation
            </div>
            
            {navItems.map((item) => {
              const active = isNavActive(item.activeIds);
              return (
                <a
                  key={item.label}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`text-sm font-bold tracking-[0.2em] uppercase py-3 border-b border-[var(--border-color)] flex items-center justify-between min-h-[44px] transition-colors ${
                    active ? 'text-[var(--color-accent)] pl-1 font-black' : 'text-[var(--text-primary)] hover:text-[var(--color-accent)]'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    {active && <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-accent)]" />}
                    <span>{item.label}</span>
                  </div>
                  <span className="font-mono text-xs opacity-60">→</span>
                </a>
              );
            })}

            {/* Quick Section Shortcuts */}
            <div className="pt-2 pb-1">
              <div className="text-[8px] font-mono text-[var(--text-faint)] tracking-[0.25em] uppercase mb-2">
                Direct Archives
              </div>
              <div className="grid grid-cols-2 gap-2 text-[9px] font-mono font-bold uppercase tracking-wider">
                <a
                  href="#motion-video"
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-2 bg-[var(--bg-subtle)] border border-[var(--border-color)] text-[var(--text-muted)] hover:text-[var(--text-primary)] hover:border-[var(--color-accent)]"
                >
                  Motion / Video ↗
                </a>
                <a
                  href="#graphic-design"
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-2 bg-[var(--bg-subtle)] border border-[var(--border-color)] text-[var(--text-muted)] hover:text-[var(--text-primary)] hover:border-[var(--color-accent)]"
                >
                  Graphic Design ↗
                </a>
                <a
                  href="#thesis"
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-2 bg-[var(--bg-subtle)] border border-[var(--border-color)] text-[var(--text-muted)] hover:text-[var(--text-primary)] hover:border-[var(--color-accent)]"
                >
                  Thesis Research ↗
                </a>
                <a
                  href="#skills"
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-2 bg-[var(--bg-subtle)] border border-[var(--border-color)] text-[var(--text-muted)] hover:text-[var(--text-primary)] hover:border-[var(--color-accent)]"
                >
                  Skills Matrix ↗
                </a>
              </div>
            </div>

            {/* Mobile Theme Selector */}
            <div className="py-3 border-t border-[var(--border-color)]">
              <span className="text-[8px] font-mono text-[var(--text-faint)] tracking-widest uppercase block mb-2">
                Color Theme:
              </span>
              <div className="grid grid-cols-2 gap-2">
                {themeOptions.map((opt) => {
                  const isSelected = theme === opt.id;
                  return (
                    <button
                      key={opt.id}
                      onClick={() => {
                        setTheme(opt.id);
                      }}
                      className={`flex items-center gap-2 py-2 px-2.5 text-[8.5px] font-mono uppercase font-bold tracking-wider rounded-xs border text-left min-h-[40px] transition-all ${
                        isSelected
                          ? 'bg-[var(--pill-tag-bg)] border-[var(--color-accent)] text-[var(--color-accent)] shadow-xs'
                          : 'border-[var(--border-color)] text-[var(--text-muted)] bg-[var(--bg-subtle)]'
                      }`}
                    >
                      <span
                        className="w-2.5 h-2.5 rounded-full shrink-0 border border-white/20"
                        style={{ backgroundColor: opt.colorDot }}
                      />
                      <span className="truncate flex-1">{opt.label}</span>
                      {isSelected && <Check className="w-3 h-3 text-[var(--color-accent)] shrink-0" />}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          <div className="pt-4 border-t border-[var(--border-color)] space-y-2">
            <a
              href={`mailto:${PERSONAL_INFO.email}`}
              className="w-full flex items-center justify-center gap-2 py-3 bg-[var(--btn-primary-bg)] text-[var(--btn-primary-text)] font-bold text-[10px] tracking-[0.2em] uppercase min-h-[44px] shadow-md"
              onClick={() => setMobileMenuOpen(false)}
            >
              <span>EMAIL DIRECTLY</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </a>
            <div className="text-center font-mono text-[8px] text-[var(--text-faint)] tracking-widest uppercase pt-1">
              NEGROS OCCIDENTAL, PH • EST. 2026
            </div>
          </div>
        </div>
      )}
    </header>
  );
}


