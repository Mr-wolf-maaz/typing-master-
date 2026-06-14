import React, { useEffect, useState, useCallback } from 'react';
import { ArrowLeft, RotateCcw, Clock } from 'lucide-react';
import { typingTests } from '../data/lessons';
import { useTypingEngine } from '../hooks/useTypingEngine';
import TypingArea from './TypingArea';
import Keyboard from './Keyboard';
import StatsDisplay, { Results } from './StatsDisplay';

interface TestPracticeProps {
  testId: string;
  onBack: () => void;
  onComplete: (wpm: number, accuracy: number) => void;
  onHome: () => void;
}

const TestPractice: React.FC<TestPracticeProps> = ({ testId, onBack, onComplete, onHome }) => {
  const test = typingTests.find(t => t.id === testId);
  const [showResults, setShowResults] = useState(false);

  const { state, handleKeyPress, reset } = useTypingEngine(
    test?.text || '',
    test?.duration
  );

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

  if (!test) {
    return <div className="text-center text-gray-400">Test not found</div>;
  }

  const handleRetry = () => {
    setShowResults(false);
    reset();
  };

  const remainingTime = test.duration - state.elapsedTime;
  const timePercent = (remainingTime / test.duration) * 100;

  if (showResults) {
    return (
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center gap-4 mb-8">
          <button onClick={onBack} className="p-2 hover:bg-gray-800 rounded-lg transition-colors">
            <ArrowLeft className="w-6 h-6" />
          </button>
          <div>
            <h2 className="text-2xl font-bold">{test.title} - Results</h2>
            <p className="text-gray-400 text-sm">Test Complete!</p>
          </div>
        </div>
        <Results
          wpm={state.wpm}
          accuracy={state.accuracy}
          time={state.elapsedTime}
          errors={state.errors}
          totalChars={state.typed.length}
          correctChars={state.correctChars}
          onRetry={handleRetry}
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
            <h2 className="text-xl font-bold">{test.title}</h2>
            <p className="text-gray-400 text-sm capitalize">{test.difficulty} difficulty</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          {/* Timer */}
          <div className={`flex items-center gap-2 px-4 py-2 rounded-xl font-mono text-lg font-bold ${
            remainingTime <= 10 ? 'bg-red-500/20 text-red-400' : 'bg-gray-800 text-white'
          }`}>
            <Clock className="w-5 h-5" />
            <span>{Math.floor(remainingTime / 60)}:{(remainingTime % 60).toString().padStart(2, '0')}</span>
          </div>
          <button
            onClick={handleRetry}
            className="p-2 hover:bg-gray-800 rounded-lg transition-colors"
            title="Restart"
          >
            <RotateCcw className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Time Progress */}
      <div className="mb-4">
        <div className="w-full bg-gray-700 rounded-full h-1.5">
          <div
            className={`h-1.5 rounded-full transition-all duration-200 ${
              remainingTime <= 10 ? 'bg-red-500' : 'bg-blue-500'
            }`}
            style={{ width: `${timePercent}%` }}
          />
        </div>
      </div>

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

      {/* Typing Area */}
      <div className="mb-6">
        <TypingArea
          text={state.text}
          currentIndex={state.currentIndex}
          typed={state.typed}
          isFinished={state.isFinished}
        />
      </div>

      {/* Hint */}
      {!state.isStarted && (
        <div className="text-center text-gray-400 mb-6 fade-in">
          <p className="text-sm">Start typing to begin the test. Timer: {test.duration}s</p>
        </div>
      )}

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

export default TestPractice;
