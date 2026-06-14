import React, { useEffect, useState, useCallback } from 'react';
import { ArrowLeft, RotateCcw, Shuffle } from 'lucide-react';
import { generateWordList } from '../data/lessons';
import { useTypingEngine } from '../hooks/useTypingEngine';
import TypingArea from './TypingArea';
import Keyboard from './Keyboard';
import StatsDisplay, { Results } from './StatsDisplay';

interface SpeedPracticeProps {
  onBack: () => void;
  onComplete: (wpm: number, accuracy: number) => void;
  onHome: () => void;
}

const SpeedPractice: React.FC<SpeedPracticeProps> = ({ onBack, onComplete, onHome }) => {
  const [difficulty, setDifficulty] = useState<'easy' | 'medium' | 'hard'>('easy');
  const [wordCount, setWordCount] = useState(25);
  const [text, setText] = useState(() => generateWordList('easy', 25));
  const [showResults, setShowResults] = useState(false);

  const { state, handleKeyPress, reset } = useTypingEngine(text);

  const handleKey = useCallback((e: KeyboardEvent) => {
    if (e.key === 'Escape') {
      onBack();
      return;
    }
    if (showResults) return;
    e.preventDefault();
    handleKeyPress(e.key);
  }, [handleKeyPress, onBack, showResults]);

  useEffect(() => {
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [handleKey]);

  useEffect(() => {
    if (state.isFinished && !showResults) {
      setShowResults(true);
      onComplete(state.wpm, state.accuracy);
    }
  }, [state.isFinished, showResults, onComplete, state.wpm, state.accuracy]);

  const handleRetry = () => {
    setShowResults(false);
    reset();
  };

  const regenerate = () => {
    const newText = generateWordList(difficulty, wordCount);
    setText(newText);
    setShowResults(false);
  };

  // eslint-disable-next-line
  useEffect(() => {
    const newText = generateWordList(difficulty, wordCount);
    setText(newText);
    setShowResults(false);
  }, [difficulty, wordCount]);

  if (showResults) {
    return (
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center gap-4 mb-8">
          <button onClick={onBack} className="p-2 hover:bg-gray-800 rounded-lg transition-colors">
            <ArrowLeft className="w-6 h-6" />
          </button>
          <h2 className="text-2xl font-bold">Speed Practice - Results</h2>
        </div>
        <Results
          wpm={state.wpm}
          accuracy={state.accuracy}
          time={state.elapsedTime}
          errors={state.errors}
          totalChars={state.typed.length}
          correctChars={state.correctChars}
          onRetry={handleRetry}
          onNext={regenerate}
          onHome={onHome}
        />
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-4">
          <button onClick={onBack} className="p-2 hover:bg-gray-800 rounded-lg transition-colors">
            <ArrowLeft className="w-6 h-6" />
          </button>
          <div>
            <h2 className="text-xl font-bold">⚡ Speed Practice</h2>
            <p className="text-gray-400 text-sm">Quick word practice drills</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={regenerate}
            className="p-2 hover:bg-gray-800 rounded-lg transition-colors"
            title="New Words"
          >
            <Shuffle className="w-5 h-5" />
          </button>
          <button
            onClick={handleRetry}
            className="p-2 hover:bg-gray-800 rounded-lg transition-colors"
            title="Restart"
          >
            <RotateCcw className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Settings */}
      {!state.isStarted && (
        <div className="glass rounded-xl p-4 mb-6 flex flex-wrap items-center gap-4 fade-in">
          <div>
            <label className="text-xs text-gray-400 block mb-1">Difficulty</label>
            <div className="flex gap-1">
              {(['easy', 'medium', 'hard'] as const).map(d => (
                <button
                  key={d}
                  onClick={() => setDifficulty(d)}
                  className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                    difficulty === d
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-700 text-gray-400 hover:bg-gray-600'
                  }`}
                >
                  {d}
                </button>
              ))}
            </div>
          </div>
          <div>
            <label className="text-xs text-gray-400 block mb-1">Word Count</label>
            <div className="flex gap-1">
              {[10, 25, 50, 100].map(c => (
                <button
                  key={c}
                  onClick={() => setWordCount(c)}
                  className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                    wordCount === c
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-700 text-gray-400 hover:bg-gray-600'
                  }`}
                >
                  {c}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Stats */}
      {state.isStarted && (
        <div className="mb-4 fade-in">
          <StatsDisplay
            wpm={state.wpm}
            accuracy={state.accuracy}
            time={state.elapsedTime}
            errors={state.errors}
            totalChars={state.typed.length}
            correctChars={state.correctChars}
            isLive
          />
        </div>
      )}

      {/* Progress */}
      <div className="mb-4">
        <div className="flex justify-between text-xs text-gray-400 mb-1">
          <span>Progress</span>
          <span>{Math.round((state.currentIndex / state.text.length) * 100)}%</span>
        </div>
        <div className="w-full bg-gray-700 rounded-full h-2">
          <div
            className="bg-gradient-to-r from-orange-500 to-yellow-500 h-2 rounded-full transition-all"
            style={{ width: `${(state.currentIndex / state.text.length) * 100}%` }}
          />
        </div>
      </div>

      {/* Typing Area */}
      <div className="mb-6">
        <TypingArea
          text={state.text}
          currentIndex={state.currentIndex}
          typed={state.typed}
          isFinished={state.isFinished}
        />
      </div>

      {/* Hands + Keyboard */}
      <Keyboard
        activeKey={state.currentChar}
        pressedKey={state.typed.length > 0 ? state.typed[state.typed.length - 1] : undefined}
        correctKey={state.lastKeyCorrect ?? undefined}
        showFingers={true}
        showHands={true}
      />
    </div>
  );
};

export default SpeedPractice;
