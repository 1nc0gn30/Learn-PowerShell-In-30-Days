import { useEffect, useMemo, useState } from 'react';

const STORAGE_KEY = 'ps30-completed-days';

function sanitize(values) {
  if (!Array.isArray(values)) return [];
  const unique = new Set(values.filter((item) => Number.isInteger(item) && item >= 1 && item <= 30));
  return [...unique].sort((a, b) => a - b);
}

export default function useCourseProgress() {
  const [completedDays, setCompletedDays] = useState(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return [];
      return sanitize(JSON.parse(raw));
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(completedDays));
  }, [completedDays]);

  const toggleDay = (day) => {
    setCompletedDays((current) => {
      if (current.includes(day)) return current.filter((entry) => entry !== day);
      return [...current, day].sort((a, b) => a - b);
    });
  };

  const resetProgress = () => setCompletedDays([]);

  const percent = useMemo(() => Math.round((completedDays.length / 30) * 100), [completedDays.length]);

  return { completedDays, toggleDay, resetProgress, percent };
}
