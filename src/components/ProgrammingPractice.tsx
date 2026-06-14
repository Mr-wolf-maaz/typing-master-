import React, { useState, useEffect, useCallback } from 'react';
import { ArrowLeft, RotateCcw, ChevronRight, Shuffle } from 'lucide-react';
import { programmingLessons } from '../data/programmingData';
import { useTypingEngine } from '../hooks/useTypingEngine';
import TypingArea from './TypingArea';
import Keyboard from './Keyboard';
import StatsDisplay, { Results } from './StatsDisplay';

interface ProgrammingPracticeProps {
  onBack: () => void;
  onComplete: (wpm: number, accuracy: number) => void;
  onHome: () => void;
}

type ProgrammingScreen = 'list' | 'practice';

const langColors: Record<string, string> = {
  'Symbols': 'from-gray-600 to-gray-800',
  'General': 'from-slate-600 to-slate-800',
  'JavaScript': 'from-yellow-600 to-yellow-800',
  'Python': 'from-green-600 to-green-800',
  'HTML': 'from-orange-600 to-orange-800',
  'CSS': 'from-blue-600 to-blue-800',
  'TypeScript': 'from-blue-700 to-blue-900',
  'SQL': 'from-cyan-600 to-cyan-800',
  'React': 'from-sky-600 to-sky-800',
  'JSON': 'from-gray-600 to-gray-800',
  'Git': 'from-red-600 to-red-800',
  'Terminal': 'from-emerald-600 to-emerald-800',
  'C': 'from-blue-600 to-blue-800',
  'C++': 'from-blue-700 to-indigo-900',
  'Java': 'from-amber-600 to-amber-800',
  'Rust': 'from-orange-700 to-red-900',
  'Go': 'from-cyan-600 to-teal-800',
};

const diffColors: Record<string, string> = {
  beginner: 'bg-green-500/20 text-green-400',
  intermediate: 'bg-blue-500/20 text-blue-400',
  advanced: 'bg-red-500/20 text-red-400',
};

const ProgrammingPractice: React.FC<ProgrammingPracticeProps> = ({ onBack, onComplete, onHome }) => {
  const [screen, setScreen] = useState<ProgrammingScreen>('list');
  const [selectedLesson, setSelectedLesson] = useState<string | null>(null);
  const [snippetIndex, setSnippetIndex] = useState(0);
  const [showResults, setShowResults] = useState(false);
  const [filter, setFilter] = useState<string>('all');

  const lesson = programmingLessons.find(l => l.id === selectedLesson);
  const currentText = lesson ? lesson.snippets[snippetIndex % lesson.snippets.length] : '';
  const { state, handleKeyPress, reset } = useTypingEngine(currentText);

  const handleKey = useCallback((e: KeyboardEvent) => {
    if (e.key === 'Escape') {
      if (screen === 'practice') {
        setScreen('list');
      } else {
        onBack();
      }
      return;
    }
    if (showResults || screen !== 'practice') return;
    // Allow Tab key for indentation in code
    if (e.key === 'Tab') {
      e.preventDefault();
      handleKeyPress(' ');
      handleKeyPress(' ');
      return;
    }
    e.preventDefault();
    handleKeyPress(e.key);
  }, [handleKeyPress, onBack, showResults, screen]);

  useEffect(() => {
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [handleKey]);

  useEffect(() => {
    if (state.isFinished && !showResults && screen === 'practice') {
      setShowResults(true);
      onComplete(state.wpm, state.accuracy);
    }
  }, [state.isFinished, showResults, screen, onComplete, state.wpm, state.accuracy]);

  const handleRetry = () => {
    setShowResults(false);
    reset();
  };

  const handleNext = () => {
    setShowResults(false);
    setSnippetIndex(prev => prev + 1);
  };

  const handleShuffle = () => {
    if (!lesson) return;
    setShowResults(false);
    setSnippetIndex(Math.floor(Math.random() * lesson.snippets.length));
  };

  const selectLesson = (id: string) => {
    setSelectedLesson(id);
    setSnippetIndex(0);
    setShowResults(false);
    setScreen('practice');
  };

  // Get unique languages for filter
  const languages = Array.from(new Set(programmingLessons.map(l => l.language)));
  const filteredLessons = filter === 'all'
    ? programmingLessons
    : programmingLessons.filter(l => l.language === filter);

  // Results
  if (showResults && screen === 'practice') {
    return (
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center gap-4 mb-8">
          <button onClick={() => setScreen('list')} className="p-2 hover:bg-gray-800 rounded-lg transition-colors">
            <ArrowLeft className="w-6 h-6" />
          </button>
          <h2 className="text-2xl font-bold">{lesson?.icon} {lesson?.title} — Done!</h2>
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

  // Lesson list
  if (screen === 'list') {
    return (
      <div className="max-w-4xl mx-auto slide-up">
        <div className="flex items-center gap-4 mb-6">
          <button onClick={onBack} className="p-2 hover:bg-gray-800 rounded-lg transition-colors">
            <ArrowLeft className="w-6 h-6" />
          </button>
          <div>
            <h2 className="text-2xl font-bold">👨‍💻 Programming Typing</h2>
            <p className="text-gray-400 text-sm">Master semicolons, brackets, and code syntax</p>
          </div>
        </div>

        {/* Info box */}
        <div className="glass rounded-xl p-4 mb-6 border-l-4 border-blue-500">
          <p className="text-sm text-gray-300">
            💡 Programming requires typing special characters like <code className="bg-gray-700 px-1 rounded">{`; { } ( ) [ ] < > = ! & |`}</code> much more than regular text.
            Practice here to build muscle memory for coding!
          </p>
        </div>

        {/* Language Filters */}
        <div className="flex gap-2 mb-6 flex-wrap">
          <button
            onClick={() => setFilter('all')}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
              filter === 'all' ? 'bg-blue-600 text-white' : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
            }`}
          >
            All
          </button>
          {languages.map(lang => (
            <button
              key={lang}
              onClick={() => setFilter(lang)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                filter === lang ? 'bg-blue-600 text-white' : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
              }`}
            >
              {lang}
            </button>
          ))}
        </div>

        {/* Lesson Cards */}
        <div className="grid gap-3">
          {filteredLessons.map(l => (
            <button
              key={l.id}
              onClick={() => selectLesson(l.id)}
              className="group glass rounded-xl p-4 text-left hover:bg-gray-700/50 transition-all hover:scale-[1.01]"
            >
              <div className="flex items-center gap-4">
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${langColors[l.language] || 'from-gray-600 to-gray-800'} flex items-center justify-center text-2xl`}>
                  {l.icon}
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-bold text-white">{l.title}</h3>
                    <span className={`text-xs px-2 py-0.5 rounded-full ${diffColors[l.difficulty]}`}>
                      {l.difficulty}
                    </span>
                    <span className="text-xs bg-gray-700 text-gray-300 px-2 py-0.5 rounded-full">
                      {l.language}
                    </span>
                  </div>
                  <p className="text-sm text-gray-400">{l.description}</p>
                  <p className="text-xs text-gray-500 mt-1">{l.snippets.length} code snippets</p>
                </div>
                <ChevronRight className="w-5 h-5 text-gray-500 group-hover:text-white transition-colors" />
              </div>
            </button>
          ))}
        </div>
      </div>
    );
  }

  // Practice screen
  return (
    <div className="max-w-4xl mx-auto slide-up">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-4">
          <button onClick={() => setScreen('list')} className="p-2 hover:bg-gray-800 rounded-lg transition-colors">
            <ArrowLeft className="w-6 h-6" />
          </button>
          <div>
            <h2 className="text-lg font-bold">{lesson?.icon} {lesson?.title}</h2>
            <p className="text-gray-400 text-sm">
              Snippet {(snippetIndex % (lesson?.snippets.length || 1)) + 1}/{lesson?.snippets.length} • {lesson?.language}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button onClick={handleShuffle} className="p-2 hover:bg-gray-800 rounded-lg transition-colors" title="Random Snippet">
            <Shuffle className="w-5 h-5" />
          </button>
          <button onClick={handleRetry} className="p-2 hover:bg-gray-800 rounded-lg transition-colors" title="Restart">
            <RotateCcw className="w-5 h-5" />
          </button>
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

      {/* Progress */}
      <div className="mb-4">
        <div className="w-full bg-gray-700 rounded-full h-1.5">
          <div
            className="bg-gradient-to-r from-purple-500 to-pink-500 h-1.5 rounded-full transition-all"
            style={{ width: `${(state.currentIndex / Math.max(state.text.length, 1)) * 100}%` }}
          />
        </div>
      </div>

      {/* Typing Area with code styling */}
      <div className="mb-6">
        <TypingArea
          text={state.text}
          currentIndex={state.currentIndex}
          typed={state.typed}
          isFinished={state.isFinished}
        />
      </div>

      {!state.isStarted && (
        <div className="text-center text-gray-400 mb-6">
          <p className="text-sm">Start typing the code snippet...</p>
        </div>
      )}

      {/* Hands + Keyboard */}
      <Keyboard
        activeKey={state.currentChar}
        pressedKey={state.typed.length > 0 ? state.typed[state.typed.length - 1] : undefined}
        correctKey={state.lastKeyCorrect ?? undefined}
        showFingers
        showHands
      />
    </div>
  );
};

export default ProgrammingPractice;
