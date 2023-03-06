import { useState } from 'react';

export const useVisualMode = (initial) => {
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);

  const transition = (newMode, replace = false) => {
    setMode((prev) => newMode);
    setHistory((prev) => [
      ...prev.slice(0, replace ? -1 : prev.length),
      newMode,
    ]);
  };

  const back = () => {
    if (history.length > 1) {
      const tempHistory = history.slice(0, -1);
      setMode(tempHistory[tempHistory.length - 1]);
      setHistory([...tempHistory]);
    }
  };

  return { mode, transition, back };
};
