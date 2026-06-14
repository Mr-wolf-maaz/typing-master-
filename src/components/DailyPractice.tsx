import React, { useState, useEffect, useCallback } from 'react';
import { ArrowLeft, RotateCcw, ChevronRight, ChevronLeft, CheckCircle, Lightbulb, BookOpen } from 'lucide-react';
import { dailyPlans, getCurrentDay, setCurrentDay } from '../data/dailyPractice';
import { useTypingEngine } from '../hooks/useTypingEngine';
import TypingArea from './TypingArea';
import Keyboard from './Keyboard';
import StatsDisplay, { Results } from './StatsDisplay';

interface DailyPracticeProps {
  onBack: () => void;
  onComplete: (wpm: number, accuracy: number) => void;
  onHome: () => void;
}

type Phase = 'overview' | 'warmup' | 'drill' | 'words' | 'sentences' | 'results';

const DailyPractice: React.FC<DailyPracticeProps> = ({ onBack, onComplete, onHome }) => {
  const [currentDay, setDay] = useState(getCurrentDay);
  const [phase, setPhase] = useState<Phase>('overview');
  const [drillIndex, setDrillIndex] = useState(0);
  const [completedPhases, setCompletedPhases] = useState<Set<string>>(new Set());
  const [showResults, setShowResults] = useState(false);

  const plan = dailyPlans[(currentDay - 1) % dailyPlans.length];

  // Get the current text based on phase
  const getCurrentText = (): string => {
    switch (phase) {
      case 'warmup': return plan.warmup;
      case 'drill': return plan.drills[drillIndex] || plan.drills[0];
      case 'words': return plan.words.join(' ');
      case 'sentences': return plan.sentences.join(' ');
      default: return '';
    }
  };

  const [activeText, setActiveText] = useState(getCurrentText());
  const { state, handleKeyPress, reset } = useTypingEngine(activeText);

  useEffect(() => {
    const newText = getCurrentText();
    setActiveText(newText);
    setShowResults(false);
  }, [phase, drillIndex, currentDay]);

  const handleKey = useCallback((e: KeyboardEvent) => {
    if (e.key === 'Escape') {
      if (phase !== 'overview') {
        setPhase('overview');
      } else {
        onBack();
      }
      return;
    }
    if (showResults || phase === 'overview') return;
    e.preventDefault();
    handleKeyPress(e.key);
  }, [handleKeyPress, onBack, showResults, phase]);

  useEffect(() => {
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [handleKey]);

  useEffect(() => {
    if (state.isFinished && !showResults && phase !== 'overview') {
      setShowResults(true);
      setCompletedPhases(prev => new Set(prev).add(phase));
      onComplete(state.wpm, state.accuracy);
    }
  }, [state.isFinished, showResults, phase, onComplete, state.wpm, state.accuracy]);

  const handleRetry = () => {
    setShowResults(false);
    reset();
  };

  const handleNextPhase = () => {
    setShowResults(false);
    if (phase === 'warmup') {
      setPhase('drill');
      setDrillIndex(0);
    } else if (phase === 'drill') {
      if (drillIndex < plan.drills.length - 1) {
        setDrillIndex(prev => prev + 1);
      } else {
        setPhase('words');
      }
    } else if (phase === 'words') {
      setPhase('sentences');
    } else if (phase === 'sentences') {
      setPhase('overview');
    }
  };

  const goToDay = (day: number) => {
    if (day >= 1 && day <= dailyPlans.length) {
      setDay(day);
      setCurrentDay(day);
      setPhase('overview');
      setCompletedPhases(new Set());
      setDrillIndex(0);
    }
  };

  // Results screen
  if (showResults && phase !== 'overview') {
    return (
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center gap-4 mb-8">
          <button onClick={() => setPhase('overview')} className="p-2 hover:bg-gray-800 rounded-lg transition-colors">
            <ArrowLeft className="w-6 h-6" />
          </button>
          <h2 className="text-2xl font-bold">Day {currentDay} — {phase.charAt(0).toUpperCase() + phase.slice(1)} Complete!</h2>
        </div>
        <Results
          wpm={state.wpm}
          accuracy={state.accuracy}
          time={state.elapsedTime}
          errors={state.errors}
          totalChars={state.typed.length}
          correctChars={state.correctChars}
          onRetry={handleRetry}
          onNext={handleNextPhase}
          onHome={onHome}
        />
      </div>
    );
  }

  // Overview screen
  if (phase === 'overview') {
    return (
      <div className="max-w-4xl mx-auto slide-up">
        <div className="flex items-center gap-4 mb-6">
          <button onClick={onBack} className="p-2 hover:bg-gray-800 rounded-lg transition-colors">
            <ArrowLeft className="w-6 h-6" />
          </button>
          <div className="flex-1">
            <h2 className="text-2xl font-bold">📅 Daily Practice</h2>
            <p className="text-gray-400 text-sm">Structured learning, one day at a time</p>
          </div>
        </div>

        {/* Day Navigator */}
        <div className="glass rounded-xl p-4 mb-6 flex items-center justify-between">
          <button
            onClick={() => goToDay(currentDay - 1)}
            disabled={currentDay <= 1}
            className="p-2 hover:bg-gray-700 rounded-lg transition-colors disabled:opacity-30"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <div className="text-center">
            <div className="text-sm text-gray-400">Current Day</div>
            <div className="text-3xl font-black text-white">{currentDay} <span className="text-sm text-gray-500">/ {dailyPlans.length}</span></div>
          </div>
          <button
            onClick={() => goToDay(currentDay + 1)}
            disabled={currentDay >= dailyPlans.length}
            className="p-2 hover:bg-gray-700 rounded-lg transition-colors disabled:opacity-30"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>

        {/* Day Info */}
        <div className="glass rounded-xl p-6 mb-6">
          <h3 className="text-xl font-bold text-white mb-2">{plan.title}</h3>
          <p className="text-gray-400 mb-4">{plan.description}</p>

          {/* Focus Keys */}
          {plan.focusKeys.length > 0 && (
            <div className="mb-4">
              <div className="text-sm text-gray-400 mb-2">Today's Focus Keys:</div>
              <div className="flex gap-2 flex-wrap">
                {plan.focusKeys.map(k => (
                  <span key={k} className="bg-blue-600/30 border border-blue-500/40 text-blue-300 text-lg px-3 py-1.5 rounded-lg font-mono font-bold">
                    {k.toUpperCase()}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Technique */}
          <div className="bg-purple-500/10 border border-purple-500/20 rounded-xl p-4 mb-4">
            <div className="flex items-center gap-2 mb-2">
              <BookOpen className="w-4 h-4 text-purple-400" />
              <span className="text-sm font-semibold text-purple-300">Today's Technique</span>
            </div>
            <p className="text-gray-300 text-sm">{plan.technique}</p>
          </div>

          {/* Tip */}
          <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-xl p-4">
            <div className="flex items-center gap-2 mb-2">
              <Lightbulb className="w-4 h-4 text-yellow-400" />
              <span className="text-sm font-semibold text-yellow-300">Tip</span>
            </div>
            <p className="text-gray-300 text-sm">{plan.tip}</p>
          </div>
        </div>

        {/* Practice Phases */}
        <div className="space-y-3">
          {[
            { id: 'warmup' as Phase, label: '🔥 Warm-up', desc: 'Get your fingers moving', icon: '1' },
            { id: 'drill' as Phase, label: '🎯 Drills', desc: `${plan.drills.length} pattern exercises`, icon: '2' },
            { id: 'words' as Phase, label: '📝 Word Practice', desc: `${plan.words.length} focus words`, icon: '3' },
            { id: 'sentences' as Phase, label: '💬 Sentences', desc: 'Put it all together', icon: '4' },
          ].map((item) => {
            const done = completedPhases.has(item.id);
            return (
              <button
                key={item.id}
                onClick={() => { setPhase(item.id); setDrillIndex(0); }}
                className={`w-full glass rounded-xl p-4 text-left transition-all hover:bg-gray-700/50 flex items-center gap-4 group ${
                  done ? 'border-green-500/30' : ''
                }`}
              >
                <div className={`w-10 h-10 rounded-full flex items-center justify-center text-lg font-bold ${
                  done ? 'bg-green-600 text-white' : 'bg-gray-700 text-gray-300'
                }`}>
                  {done ? <CheckCircle className="w-5 h-5" /> : item.icon}
                </div>
                <div className="flex-1">
                  <div className="font-semibold text-white">{item.label}</div>
                  <div className="text-sm text-gray-400">{item.desc}</div>
                </div>
                <ChevronRight className="w-5 h-5 text-gray-500 group-hover:text-white transition-colors" />
              </button>
            );
          })}
        </div>

        {/* Day progress bar */}
        <div className="mt-6 glass rounded-xl p-4">
          <div className="flex justify-between text-sm mb-2">
            <span className="text-gray-400">Day Progress</span>
            <span className="text-blue-400">{completedPhases.size}/4 phases</span>
          </div>
          <div className="w-full bg-gray-700 rounded-full h-2">
            <div
              className="bg-gradient-to-r from-blue-500 to-green-500 h-2 rounded-full transition-all"
              style={{ width: `${(completedPhases.size / 4) * 100}%` }}
            />
          </div>
        </div>

        {/* All Days mini map */}
        <div className="mt-6 glass rounded-xl p-4">
          <div className="text-sm text-gray-400 mb-3">All Days</div>
          <div className="flex gap-1.5 flex-wrap">
            {dailyPlans.map((_, idx) => (
              <button
                key={idx}
                onClick={() => goToDay(idx + 1)}
                className={`w-8 h-8 rounded-lg text-xs font-bold flex items-center justify-center transition-all ${
                  idx + 1 === currentDay
                    ? 'bg-blue-600 text-white ring-2 ring-blue-400'
                    : idx + 1 < currentDay
                    ? 'bg-green-600/30 text-green-400 hover:bg-green-600/50'
                    : 'bg-gray-700 text-gray-400 hover:bg-gray-600'
                }`}
              >
                {idx + 1}
              </button>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // Practice phase (warmup / drill / words / sentences)
  const phaseLabel = {
    warmup: '🔥 Warm-up',
    drill: `🎯 Drill ${drillIndex + 1}/${plan.drills.length}`,
    words: '📝 Word Practice',
    sentences: '💬 Sentences',
    overview: '',
    results: '',
  };

  return (
    <div className="max-w-4xl mx-auto slide-up">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-4">
          <button onClick={() => setPhase('overview')} className="p-2 hover:bg-gray-800 rounded-lg transition-colors">
            <ArrowLeft className="w-6 h-6" />
          </button>
          <div>
            <h2 className="text-lg font-bold">Day {currentDay}: {phaseLabel[phase]}</h2>
            <p className="text-gray-400 text-sm">{plan.title}</p>
          </div>
        </div>
        <button onClick={handleRetry} className="p-2 hover:bg-gray-800 rounded-lg transition-colors">
          <RotateCcw className="w-5 h-5" />
        </button>
      </div>

      {/* Focus Keys reminder */}
      {plan.focusKeys.length > 0 && (
        <div className="flex gap-1.5 mb-4 items-center">
          <span className="text-xs text-gray-500 mr-2">Focus:</span>
          {plan.focusKeys.map(k => (
            <span key={k} className="bg-blue-600/20 text-blue-300 text-xs px-2 py-0.5 rounded font-mono font-bold">
              {k.toUpperCase()}
            </span>
          ))}
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
        <div className="w-full bg-gray-700 rounded-full h-1.5">
          <div
            className="bg-gradient-to-r from-blue-500 to-green-500 h-1.5 rounded-full transition-all"
            style={{ width: `${(state.currentIndex / Math.max(state.text.length, 1)) * 100}%` }}
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

      {!state.isStarted && (
        <div className="text-center text-gray-400 mb-6">
          <p className="text-sm">Start typing to begin...</p>
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

export default DailyPractice;
