import React, { useEffect, useState, useCallback, useRef } from 'react';
import { ArrowLeft, RotateCcw } from 'lucide-react';
import Keyboard from './Keyboard';

interface FreeTypingProps {
  onBack: () => void;
}

const FreeTyping: React.FC<FreeTypingProps> = ({ onBack }) => {
  const [text, setText] = useState('');
  const [lastKey, setLastKey] = useState('');
  const [charCount, setCharCount] = useState(0);
  const [wordCount, setWordCount] = useState(0);
  const [startTime, setStartTime] = useState<number | null>(null);
  const [wpm, setWpm] = useState(0);
  const [elapsed, setElapsed] = useState(0);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleInput = useCallback((e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const val = e.target.value;
    setText(val);
    setCharCount(val.length);
    setWordCount(val.trim() ? val.trim().split(/\s+/).length : 0);

    if (!startTime && val.length > 0) {
      setStartTime(Date.now());
    }

    if (startTime) {
      const elapsed = (Date.now() - startTime) / 1000 / 60;
      if (elapsed > 0) {
        const words = val.trim().split(/\s+/).length;
        setWpm(Math.round(words / elapsed));
      }
    }
  }, [startTime]);

  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    setLastKey(e.key);
    if (e.key === 'Escape') {
      onBack();
    }
  }, [onBack]);

  const handleReset = () => {
    setText('');
    setCharCount(0);
    setWordCount(0);
    setStartTime(null);
    setWpm(0);
    setElapsed(0);
    textareaRef.current?.focus();
  };

  // Timer to update elapsed time display
  useEffect(() => {
    if (!startTime) return;
    const timer = setInterval(() => {
      setElapsed(Math.floor((Date.now() - startTime) / 1000));
    }, 1000);
    return () => clearInterval(timer);
  }, [startTime]);

  useEffect(() => {
    textareaRef.current?.focus();
  }, []);

  return (
    <div className="max-w-4xl mx-auto slide-up">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-4">
          <button onClick={onBack} className="p-2 hover:bg-gray-800 rounded-lg transition-colors">
            <ArrowLeft className="w-6 h-6" />
          </button>
          <div>
            <h2 className="text-xl font-bold">⌨️ Free Typing</h2>
            <p className="text-gray-400 text-sm">Practice typing anything you want</p>
          </div>
        </div>
        <button
          onClick={handleReset}
          className="p-2 hover:bg-gray-800 rounded-lg transition-colors"
          title="Clear"
        >
          <RotateCcw className="w-5 h-5" />
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-4 gap-3 mb-6">
        <div className="glass rounded-xl p-3 text-center">
          <div className="text-xl font-bold text-blue-400">{wpm}</div>
          <div className="text-xs text-gray-400">WPM</div>
        </div>
        <div className="glass rounded-xl p-3 text-center">
          <div className="text-xl font-bold text-green-400">{wordCount}</div>
          <div className="text-xs text-gray-400">Words</div>
        </div>
        <div className="glass rounded-xl p-3 text-center">
          <div className="text-xl font-bold text-purple-400">{charCount}</div>
          <div className="text-xs text-gray-400">Characters</div>
        </div>
        <div className="glass rounded-xl p-3 text-center">
          <div className="text-xl font-bold text-yellow-400">
            {elapsed}s
          </div>
          <div className="text-xs text-gray-400">Time</div>
        </div>
      </div>

      {/* Textarea */}
      <textarea
        ref={textareaRef}
        value={text}
        onChange={handleInput}
        onKeyDown={handleKeyDown}
        className="w-full h-48 bg-gray-900/60 border border-gray-700/30 rounded-xl p-6 text-lg typing-text text-white focus:outline-none focus:border-blue-500/50 resize-none mb-6"
        placeholder="Start typing anything here..."
        autoFocus
      />

      {/* Hands + Keyboard */}
      <Keyboard
        activeKey=""
        pressedKey={lastKey.length === 1 ? lastKey : lastKey === ' ' ? ' ' : ''}
        showFingers={true}
        showHands={true}
      />
    </div>
  );
};

export default FreeTyping;
