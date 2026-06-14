import { useState, useCallback, useRef, useEffect } from 'react';

export interface TypingState {
  text: string;
  currentIndex: number;
  typed: string[];
  errors: number;
  correctChars: number;
  startTime: number | null;
  endTime: number | null;
  isStarted: boolean;
  isFinished: boolean;
  wpm: number;
  accuracy: number;
  elapsedTime: number;
  lastKeyCorrect: boolean | null;
  currentChar: string;
}

export function useTypingEngine(text: string, timeLimit?: number) {
  const [state, setState] = useState<TypingState>({
    text,
    currentIndex: 0,
    typed: [],
    errors: 0,
    correctChars: 0,
    startTime: null,
    endTime: null,
    isStarted: false,
    isFinished: false,
    wpm: 0,
    accuracy: 100,
    elapsedTime: 0,
    lastKeyCorrect: null,
    currentChar: text[0] || '',
  });

  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const stateRef = useRef(state);
  stateRef.current = state;

  // Reset when text changes
  useEffect(() => {
    setState({
      text,
      currentIndex: 0,
      typed: [],
      errors: 0,
      correctChars: 0,
      startTime: null,
      endTime: null,
      isStarted: false,
      isFinished: false,
      wpm: 0,
      accuracy: 100,
      elapsedTime: 0,
      lastKeyCorrect: null,
      currentChar: text[0] || '',
    });
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
  }, [text]);

  // Timer
  useEffect(() => {
    if (state.isStarted && !state.isFinished) {
      timerRef.current = setInterval(() => {
        const s = stateRef.current;
        if (s.startTime) {
          const elapsed = Math.floor((Date.now() - s.startTime) / 1000);

          // Check time limit
          if (timeLimit && elapsed >= timeLimit) {
            if (timerRef.current) clearInterval(timerRef.current);
            setState(prev => ({
              ...prev,
              elapsedTime: timeLimit,
              isFinished: true,
              endTime: Date.now(),
            }));
            return;
          }

          const minutes = elapsed / 60;
          const wpm = minutes > 0 ? Math.round((s.correctChars / 5) / minutes) : 0;

          setState(prev => ({
            ...prev,
            elapsedTime: elapsed,
            wpm,
          }));
        }
      }, 200);
    }

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
    };
  }, [state.isStarted, state.isFinished, timeLimit]);

  const handleKeyPress = useCallback((key: string) => {
    setState(prev => {
      if (prev.isFinished) return prev;

      const now = Date.now();
      const startTime = prev.startTime || now;
      const isStarted = true;

      // Handle backspace
      if (key === 'Backspace') {
        if (prev.currentIndex === 0) return prev;
        const newIndex = prev.currentIndex - 1;
        const newTyped = [...prev.typed];
        const wasCorrect = newTyped[newIndex] === prev.text[newIndex];
        newTyped.pop();

        return {
          ...prev,
          currentIndex: newIndex,
          typed: newTyped,
          correctChars: wasCorrect ? prev.correctChars - 1 : prev.correctChars,
          currentChar: prev.text[newIndex] || '',
          lastKeyCorrect: null,
          startTime,
          isStarted,
        };
      }

      // Only process single characters
      if (key.length !== 1) return prev;

      const expectedChar = prev.text[prev.currentIndex];
      const isCorrect = key === expectedChar;
      const newIndex = prev.currentIndex + 1;
      const newTyped = [...prev.typed, key];
      const newErrors = isCorrect ? prev.errors : prev.errors + 1;
      const newCorrectChars = isCorrect ? prev.correctChars + 1 : prev.correctChars;

      const totalTyped = newTyped.length;
      const accuracy = totalTyped > 0 ? Math.round((newCorrectChars / totalTyped) * 100) : 100;

      const elapsed = (now - startTime) / 1000;
      const minutes = elapsed / 60;
      const wpm = minutes > 0 ? Math.round((newCorrectChars / 5) / minutes) : 0;

      const isFinished = newIndex >= prev.text.length;

      if (isFinished && timerRef.current) {
        clearInterval(timerRef.current);
      }

      return {
        ...prev,
        currentIndex: newIndex,
        typed: newTyped,
        errors: newErrors,
        correctChars: newCorrectChars,
        accuracy,
        wpm,
        startTime,
        endTime: isFinished ? now : null,
        isStarted,
        isFinished,
        lastKeyCorrect: isCorrect,
        currentChar: isFinished ? '' : prev.text[newIndex],
        elapsedTime: Math.floor(elapsed),
      };
    });
  }, []);

  const reset = useCallback(() => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
    setState({
      text,
      currentIndex: 0,
      typed: [],
      errors: 0,
      correctChars: 0,
      startTime: null,
      endTime: null,
      isStarted: false,
      isFinished: false,
      wpm: 0,
      accuracy: 100,
      elapsedTime: 0,
      lastKeyCorrect: null,
      currentChar: text[0] || '',
    });
  }, [text]);

  return { state, handleKeyPress, reset };
}
