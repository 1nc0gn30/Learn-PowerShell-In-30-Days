import { useEffect, useState } from 'react';

const THEME_KEY = 'ps30-theme';
const EMPHASIS_KEY = 'ps30-emphasis';

const THEMES = {
  light: 'light',
  dark: 'dark',
};

const EMPHASIS = {
  standard: 'standard',
  high: 'high',
};

function readLocalStorage(key, fallback, allowed) {
  try {
    const value = localStorage.getItem(key);
    return allowed.includes(value) ? value : fallback;
  } catch {
    return fallback;
  }
}

export default function useUiPreferences() {
  const [theme, setTheme] = useState(() => readLocalStorage(THEME_KEY, THEMES.light, Object.values(THEMES)));
  const [emphasis, setEmphasis] = useState(() =>
    readLocalStorage(EMPHASIS_KEY, EMPHASIS.standard, Object.values(EMPHASIS))
  );

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    localStorage.setItem(THEME_KEY, theme);
  }, [theme]);

  useEffect(() => {
    document.documentElement.dataset.emphasis = emphasis;
    localStorage.setItem(EMPHASIS_KEY, emphasis);
  }, [emphasis]);

  const toggleTheme = () => {
    setTheme((current) => (current === THEMES.light ? THEMES.dark : THEMES.light));
  };

  const toggleEmphasis = () => {
    setEmphasis((current) => (current === EMPHASIS.standard ? EMPHASIS.high : EMPHASIS.standard));
  };

  return {
    theme,
    emphasis,
    toggleTheme,
    toggleEmphasis,
  };
}
