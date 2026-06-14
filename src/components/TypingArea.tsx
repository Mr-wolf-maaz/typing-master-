import React, { useEffect, useRef, useMemo } from 'react';

interface TypingAreaProps {
  text: string;
  currentIndex: number;
  typed: string[];
  isFinished: boolean;
}

const TypingArea: React.FC<TypingAreaProps> = ({ text, currentIndex, typed, isFinished }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const activeLineRef = useRef<HTMLDivElement>(null);

  // Split text into words and figure out which line each word belongs to
  // We show a "window" of lines around the current cursor position
  const words = useMemo(() => {
    const result: { word: string; startIdx: number }[] = [];
    let i = 0;
    let currentWord = '';
    let wordStart = 0;
    while (i < text.length) {
      if (text[i] === ' ') {
        if (currentWord.length > 0) {
          result.push({ word: currentWord + ' ', startIdx: wordStart });
        } else {
          // leading or multiple spaces
          result.push({ word: ' ', startIdx: i });
        }
        currentWord = '';
        wordStart = i + 1;
        i++;
      } else {
        if (currentWord.length === 0) wordStart = i;
        currentWord += text[i];
        i++;
      }
    }
    if (currentWord.length > 0) {
      result.push({ word: currentWord, startIdx: wordStart });
    }
    return result;
  }, [text]);

  // Scroll the active line into view smoothly
  useEffect(() => {
    if (activeLineRef.current && containerRef.current) {
      const container = containerRef.current;
      const activeLine = activeLineRef.current;
      const containerRect = container.getBoundingClientRect();
      const activeRect = activeLine.getBoundingClientRect();

      // If the active element is below the visible area or above it, scroll
      const relativeTop = activeRect.top - containerRect.top;
      const relativeBottom = activeRect.bottom - containerRect.top;

      if (relativeBottom > containerRect.height - 10) {
        // Scroll so active line is in the middle-top area
        container.scrollTo({
          top: container.scrollTop + relativeTop - 40,
          behavior: 'smooth',
        });
      } else if (relativeTop < 0) {
        container.scrollTo({
          top: container.scrollTop + relativeTop - 20,
          behavior: 'smooth',
        });
      }
    }
  }, [currentIndex]);

  // Find which word contains the current index
  const currentWordIdx = useMemo(() => {
    for (let i = 0; i < words.length; i++) {
      const w = words[i];
      if (currentIndex >= w.startIdx && currentIndex < w.startIdx + w.word.length) {
        return i;
      }
    }
    return words.length - 1;
  }, [words, currentIndex]);

  return (
    <div
      ref={containerRef}
      className="bg-gray-900/60 rounded-xl p-6 border border-gray-700/30 h-44 overflow-y-auto scrollbar-hide relative"
    >
      {/* Fade top overlay */}
      <div className="sticky top-0 left-0 right-0 h-4 bg-gradient-to-b from-gray-900/90 to-transparent z-10 pointer-events-none -mt-6 -mx-6 px-6" />

      <div className="typing-text text-lg leading-loose flex flex-wrap">
        {words.map((wordObj, wIdx) => {
          const isActiveWord = wIdx === currentWordIdx && !isFinished;
          return (
            <span
              key={wIdx}
              ref={isActiveWord ? activeLineRef : undefined}
              className="inline-block"
            >
              {wordObj.word.split('').map((char, cIdx) => {
                const globalIdx = wordObj.startIdx + cIdx;
                let className = 'text-gray-500';
                const isCursor = globalIdx === currentIndex && !isFinished;

                if (globalIdx < typed.length) {
                  if (typed[globalIdx] === char) {
                    className = 'text-green-400';
                  } else {
                    className = 'text-red-400 bg-red-400/20 rounded-sm';
                  }
                }

                return (
                  <span key={cIdx} className="relative inline-block">
                    {isCursor && (
                      <span className="absolute left-0 top-0 w-0.5 h-full bg-blue-400 cursor-blink rounded-full z-20" />
                    )}
                    <span
                      className={`${className} ${isCursor ? 'bg-blue-500/20 rounded-sm' : ''} transition-colors duration-75`}
                    >
                      {char === ' ' ? '\u00A0' : char}
                    </span>
                  </span>
                );
              })}
            </span>
          );
        })}
      </div>

      {/* Fade bottom overlay */}
      <div className="sticky bottom-0 left-0 right-0 h-4 bg-gradient-to-t from-gray-900/90 to-transparent pointer-events-none -mb-6 -mx-6 px-6" />
    </div>
  );
};

export default TypingArea;
