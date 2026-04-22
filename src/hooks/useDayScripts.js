import { useEffect, useState } from 'react';

const STORAGE_KEY = 'ps30-day-scripts-v1';

function parseStoredScripts() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return {};
    const parsed = JSON.parse(raw);
    return typeof parsed === 'object' && parsed !== null ? parsed : {};
  } catch {
    return {};
  }
}

export default function useDayScripts() {
  const [scripts, setScripts] = useState(parseStoredScripts);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(scripts));
  }, [scripts]);

  const getDayScript = (dayNumber, fallbackScript) => {
    const key = String(dayNumber);
    return scripts[key] ?? fallbackScript;
  };

  const setDayScript = (dayNumber, scriptText) => {
    const key = String(dayNumber);
    setScripts((current) => ({ ...current, [key]: scriptText }));
  };

  const resetDayScript = (dayNumber) => {
    const key = String(dayNumber);
    setScripts((current) => {
      const next = { ...current };
      delete next[key];
      return next;
    });
  };

  const hasSavedScript = (dayNumber) => {
    const key = String(dayNumber);
    return Object.prototype.hasOwnProperty.call(scripts, key);
  };

  return { getDayScript, setDayScript, resetDayScript, hasSavedScript };
}
