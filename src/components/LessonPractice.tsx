import React, { useEffect, useState, useCallback } from 'react';
import { ArrowLeft, RotateCcw } from 'lucide-react';
import { lessons } from '../data/lessons';
import { useTypingEngine } from '../hooks/useTypingEngine';
import TypingArea from './TypingArea';
import Keyboard from './Keyboard';
import StatsDisplay, { Results } from './StatsDisplay';

interface LessonPracticeProps {
  lessonId: string;
  onBack: () => void;
  onComplete: (lessonId: string, wpm: number, accuracy: number) => void;
  onHome: () => void;
}

const LessonPractice: React.FC<LessonPracticeProps> = ({ lessonId, onBack, onComplete, onHome }) => {
  const lesson = lessons.find(l => l.id === lessonId);
  const [textIndex, setTextIndex] = useState(0);
  const [showResults, setShowResults] = useState(false);

  const currentText = lesson ? lesson.texts[textIndex % lesson.texts.length] : '';
  const { state, handleKeyPress, reset } = useTypingEngine(currentText);

  const handleKey = useCallback((e: KeyboardEvent) => {
    e.preventDefault();
    if (e.key === 'Escape') {
      onBack();
      return;
    }
    if (showResults) return;
    handleKeyPress(e.key);
  }, [handleKeyPress, onBack, showResults]);

  useEffect(() => {
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [handleKey]);

  useEffect(() => {
    if (state.isFinished && !showResults) {
      setShowResults(true);
      if (lesson) {
        onComplete(lesson.id, state.wpm, state.accuracy);
      }
    }
  }, [state.isFinished, showResults, lesson, onComplete, state.wpm, state.accuracy]);

  if (!lesson) {
    return <div className="text-center text-gray-400">Lesson not found</div>;
  }

  const handleRetry = () => {
    setShowResults(false);
    reset();
  };

  const handleNext = () => {
    setShowResults(false);
    setTextIndex(prev => prev + 1);
  };

  // When textIndex changes, we need to trigger a reset through useEffect
  useEffect(() => {
    reset();
    setShowResults(false);
  }, [textIndex]);

  if (showResults) {
    return (
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center gap-4 mb-8">
          <button onClick={onBack} className="p-2 hover:bg-gray-800 rounded-lg transition-colors">
            <ArrowLeft className="w-6 h-6" />
          </button>
          <div>
            <h2 className="text-2xl font-bold">{lesson.icon} {lesson.title}</h2>
            <p className="text-gray-400 text-sm">Lesson Complete!</p>
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
          onNext={handleNext}
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
            <h2 className="text-xl font-bold">{lesson.icon} {lesson.title}</h2>
            <p className="text-gray-400 text-sm">{lesson.description}</p>
          </div>
        </div>
        <button
          onClick={handleRetry}
          className="p-2 hover:bg-gray-800 rounded-lg transition-colors"
          title="Restart"
        >
          <RotateCcw className="w-5 h-5" />
        </button>
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

      {/* Progress bar */}
      <div className="mb-4">
        <div className="flex justify-between text-xs text-gray-400 mb-1">
          <span>Progress</span>
          <span>{state.currentIndex}/{state.text.length} chars</span>
        </div>
        <div className="w-full bg-gray-700 rounded-full h-2">
          <div
            className="bg-gradient-to-r from-blue-500 to-green-500 h-2 rounded-full transition-all duration-200"
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

      {/* Hint */}
      {!state.isStarted && (
        <div className="text-center text-gray-400 mb-6 fade-in">
          <p className="text-sm">Start typing to begin the lesson...</p>
        </div>
      )}

      {/* Hands + Keyboard (like Typing Master) */}
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

export default LessonPractice;
