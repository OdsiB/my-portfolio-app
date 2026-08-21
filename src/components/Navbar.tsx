import { useEffect, useState } from 'react';
import { MagneticButton } from './MagneticButton';
import { Menu, X, ArrowUpRight, Moon, Sun, Palette, Sparkles, Check } from 'lucide-react';
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
      setIsScrolled(window.scrollY > 40);

      const sections = ['hero', 'selected-work', 'motion-video', 'graphic-design', 'about', 'skills', 'experience', 'thesis', 'contact'];
      const scrollPosition = window.scrollY + 200;

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

  const navItems = [
    { label: 'WORK', href: '#selected-work', activeIds: ['selected-work', 'motion-video', 'graphic-design', 'thesis'] },
    { label: 'ABOUT', href: '#about', activeIds: ['about', 'skills'] },
    { label: 'EXPERIENCE', href: '#experience', activeIds: ['experience'] },
    { label: 'CONTACT', href: '#contact', activeIds: ['contact'] },
  ];

  const isNavActive = (activeIds: string[]) => activeIds.includes(activeSection);

  const themeOptions: { id: ThemeMode; label: string; sub: string; icon: any }[] = [
    { id: 'black-blue', label: 'BLACK + BLUE', sub: 'Cobalt Noir Dark', icon: Moon },
    { id: 'white-blue', label: 'WHITE + BLUE', sub: 'Cobalt Light', icon: Sun },
    { id: 'editorial', label: 'EDITORIAL', sub: 'Warm Monochrome', icon: Palette },
  ];

  return (
    <header
      id="main-navigation-bar"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'py-3.5 bg-[var(--nav-bg)] backdrop-blur-md border-b border-[var(--border-color)] shadow-lg'
          : 'py-5 sm:py-7 bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 flex items-center justify-between border-b border-[var(--border-color)] pb-3">
        {/* Left Side Branding */}
        <MagneticButton
          as="a"
          href="#hero"
          id="nav-logo-link"
          onMouseEnter={() => onCursorChange('open', 'TOP')}
          onMouseLeave={() => onCursorChange('default')}
          className="group flex flex-col items-start"
        >
          <span className="font-bold text-xs tracking-[0.2em] text-[var(--text-primary)] uppercase group-hover:text-[var(--color-accent)] transition-colors">
            {PERSONAL_INFO.name}
          </span>
          <span className="font-mono text-[9px] tracking-[0.2em] text-[var(--text-muted)] uppercase mt-0.5">
            Multimedia Designer
          </span>
        </MagneticButton>

        {/* Right Side Desktop Navigation */}
        <nav id="desktop-nav" className="hidden md:flex items-center space-x-7 text-[10px] font-bold tracking-[0.2em] uppercase">
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
              className="flex items-center gap-1.5 px-2.5 py-1 rounded-sm border border-[var(--border-color)] bg-[var(--bg-subtle)] text-[var(--text-primary)] hover:border-[var(--color-accent)] transition-all text-[9px] font-mono font-bold tracking-wider"
            >
              {theme === 'black-blue' && <Moon className="w-3 h-3 text-[var(--color-accent)]" />}
              {theme === 'white-blue' && <Sun className="w-3 h-3 text-[var(--color-accent)]" />}
              {theme === 'editorial' && <Palette className="w-3 h-3 text-[var(--color-accent)]" />}
              <span>
                {theme === 'black-blue' ? 'BLACK + BLUE' : theme === 'white-blue' ? 'WHITE + BLUE' : 'EDITORIAL'}
              </span>
            </button>

            {/* Dropdown Menu */}
            {themeDropdownOpen && (
              <div
                className="absolute right-0 mt-2 w-48 bg-[var(--bg-card)] border border-[var(--border-color)] shadow-2xl p-1.5 space-y-1 z-50 rounded-sm"
                onMouseLeave={() => setThemeDropdownOpen(false)}
              >
                <div className="px-2 py-1 text-[8px] font-mono text-[var(--text-faint)] uppercase tracking-widest border-b border-[var(--border-color)]">
                  Select Theme
                </div>
                {themeOptions.map((opt) => {
                  const Icon = opt.icon;
                  const isSelected = theme === opt.id;
                  return (
                    <button
                      key={opt.id}
                      onClick={() => {
                        setTheme(opt.id);
                        setThemeDropdownOpen(false);
                      }}
                      className={`w-full flex items-center justify-between px-2.5 py-2 text-left text-[9px] tracking-wider transition-all rounded-xs ${
                        isSelected
                          ? 'bg-[var(--pill-tag-bg)] text-[var(--color-accent)] font-bold'
                          : 'text-[var(--text-muted)] hover:bg-[var(--bg-subtle)] hover:text-[var(--text-primary)]'
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <Icon className="w-3.5 h-3.5" />
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
          <div className="pl-1">
            <MagneticButton
              as="a"
              href={`mailto:${PERSONAL_INFO.email}`}
              id="nav-contact-button"
              onMouseEnter={() => onCursorChange('open', 'EMAIL')}
              onMouseLeave={() => onCursorChange('default')}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[var(--btn-primary-bg)] text-[var(--btn-primary-text)] hover:opacity-90 transition-all text-[9px] font-bold tracking-[0.2em] uppercase shadow-sm"
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
            className="p-2 text-[var(--text-primary)] border border-[var(--border-color)] bg-[var(--bg-subtle)] rounded-sm"
          >
            {theme === 'black-blue' && <Moon className="w-4 h-4 text-[var(--color-accent)]" />}
            {theme === 'white-blue' && <Sun className="w-4 h-4 text-[var(--color-accent)]" />}
            {theme === 'editorial' && <Palette className="w-4 h-4 text-[var(--color-accent)]" />}
          </button>

          <button
            id="mobile-menu-toggle-btn"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle navigation menu"
            className="p-2 text-[var(--text-primary)] hover:opacity-70 transition-opacity focus:outline-none"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div
          id="mobile-nav-drawer"
          className="md:hidden border-b border-[var(--border-color)] bg-[var(--bg-canvas)] px-6 py-6 transition-all duration-300 shadow-2xl"
        >
          <div className="flex flex-col space-y-3">
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                onClick={() => setMobileMenuOpen(false)}
                className="text-xs font-bold tracking-[0.2em] uppercase text-[var(--text-primary)] hover:text-[var(--color-accent)] py-2 border-b border-[var(--border-color)] flex items-center justify-between"
              >
                <span>{item.label}</span>
                <span className="font-mono text-xs opacity-50">→</span>
              </a>
            ))}

            {/* Mobile Theme Selector */}
            <div className="py-2 border-b border-[var(--border-color)]">
              <span className="text-[9px] font-mono text-[var(--text-faint)] tracking-widest uppercase block mb-2">
                Color Theme:
              </span>
              <div className="grid grid-cols-3 gap-2">
                {themeOptions.map((opt) => (
                  <button
                    key={opt.id}
                    onClick={() => {
                      setTheme(opt.id);
                    }}
                    className={`py-1.5 px-2 text-[8px] font-mono uppercase font-bold tracking-wider rounded-xs border text-center ${
                      theme === opt.id
                        ? 'bg-[var(--pill-tag-bg)] border-[var(--color-accent)] text-[var(--color-accent)]'
                        : 'border-[var(--border-color)] text-[var(--text-muted)] bg-[var(--bg-subtle)]'
                    }`}
                  >
                    {opt.id === 'black-blue' ? 'Black+Blue' : opt.id === 'white-blue' ? 'White+Blue' : 'Editorial'}
                  </button>
                ))}
              </div>
            </div>

            <a
              href={`mailto:${PERSONAL_INFO.email}`}
              className="mt-2 flex items-center justify-center gap-2 py-3 bg-[var(--btn-primary-bg)] text-[var(--btn-primary-text)] font-bold text-[10px] tracking-[0.2em] uppercase"
              onClick={() => setMobileMenuOpen(false)}
            >
              <span>EMAIL DIRECTLY</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>
      )}
    </header>
  );
}

