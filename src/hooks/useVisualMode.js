import { useState } from 'react';

export default function useVisualMode(initial) {
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);

  function transition(newMode, replace = false) {
    let newHistory = [...history];
    if (replace) {
      newHistory.pop();
      newHistory = [...newHistory, newMode];
      setMode(newMode);
      setHistory(newHistory);
    } else {
      newHistory = [...history, newMode];
      setMode(newMode);
      setHistory(newHistory);
    }
  }

  function back() {
    const newHistory = [...history];
    if (history.length > 1) {
      newHistory.pop();
      setHistory(newHistory);
      setMode(history[newHistory.length - 1]);
    }
  }
  return { mode, transition, back };
}
