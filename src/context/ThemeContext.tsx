import React, { createContext, useContext, useEffect, useState } from 'react';

export type ThemeMode = 'black-blue' | 'black-red' | 'black-teal' | 'black-white' | 'editorial';

interface ThemeContextType {
  theme: ThemeMode;
  setTheme: (theme: ThemeMode) => void;
  cycleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

const STORAGE_KEY = 'odsey_portfolio_theme';

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [theme, setThemeState] = useState<ThemeMode>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY) as ThemeMode | null;
      if (
        saved === 'black-blue' ||
        saved === 'black-red' ||
        saved === 'black-teal' ||
        saved === 'black-white' ||
        saved === 'editorial'
      ) {
        return saved;
      }
    } catch {
      // Fallback
    }
    // Default to the Black + Blue theme
    return 'black-blue';
  });

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    try {
      localStorage.setItem(STORAGE_KEY, theme);
    } catch {
      // Ignore localStorage error
    }
  }, [theme]);

  const setTheme = (newTheme: ThemeMode) => {
    setThemeState(newTheme);
  };

  const cycleTheme = () => {
    setThemeState((prev) => {
      if (prev === 'black-blue') return 'black-red';
      if (prev === 'black-red') return 'black-teal';
      if (prev === 'black-teal') return 'black-white';
      if (prev === 'black-white') return 'editorial';
      return 'black-blue';
    });
  };

  return (
    <ThemeContext.Provider value={{ theme, setTheme, cycleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}
