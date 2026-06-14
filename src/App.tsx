import React, { useState, useCallback, useEffect } from 'react';
import HomeScreen, { type UserStats } from './components/HomeScreen';
import LessonsScreen from './components/LessonsScreen';
import LessonPractice from './components/LessonPractice';
import TypingTestScreen from './components/TypingTestScreen';
import TestPractice from './components/TestPractice';
import SpeedPractice from './components/SpeedPractice';
import FreeTyping from './components/FreeTyping';
import AchievementsScreen from './components/AchievementsScreen';
import StatisticsScreen from './components/StatisticsScreen';
import DailyPractice from './components/DailyPractice';
import TypingGames from './components/TypingGames';
import ProgrammingPractice from './components/ProgrammingPractice';
import TechniquesScreen from './components/TechniquesScreen';

type Screen =
  | 'home'
  | 'lessons'
  | 'lessonPractice'
  | 'tests'
  | 'testPractice'
  | 'practice'
  | 'freeType'
  | 'achievements'
  | 'statistics'
  | 'dailyPractice'
  | 'games'
  | 'programming'
  | 'techniques';

interface AppState {
  screen: Screen;
  selectedLessonId?: string;
  selectedTestId?: string;
}

const STORAGE_KEY = 'typing-master-stats';

function loadStats(): UserStats {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      return JSON.parse(saved);
    }
  } catch {
    // ignore
  }
  return {
    totalTests: 0,
    bestWpm: 0,
    avgWpm: 0,
    avgAccuracy: 0,
    totalTime: 0,
    lessonsCompleted: [],
    recentScores: [],
  };
}

function saveStats(stats: UserStats) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(stats));
  } catch {
    // ignore
  }
}

const App: React.FC = () => {
  const [appState, setAppState] = useState<AppState>({ screen: 'home' });
  const [stats, setStats] = useState<UserStats>(loadStats);

  // Save stats whenever they change
  useEffect(() => {
    saveStats(stats);
  }, [stats]);

  const navigate = useCallback((screen: string, data?: any) => {
    setAppState(prev => ({
      ...prev,
      screen: screen as Screen,
      ...data,
    }));
    // Scroll to top on navigation
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const goHome = useCallback(() => {
    setAppState({ screen: 'home' });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const handleLessonComplete = useCallback((lessonId: string, wpm: number, accuracy: number) => {
    setStats(prev => {
      const newScores = [...prev.recentScores, {
        wpm,
        accuracy,
        date: new Date().toLocaleDateString(),
      }].slice(-50);

      const allWpms = newScores.map(s => s.wpm);
      const allAccuracies = newScores.map(s => s.accuracy);

      const lessonsCompleted = prev.lessonsCompleted.includes(lessonId)
        ? prev.lessonsCompleted
        : [...prev.lessonsCompleted, lessonId];

      return {
        ...prev,
        totalTests: prev.totalTests + 1,
        bestWpm: Math.max(prev.bestWpm, wpm),
        avgWpm: Math.round(allWpms.reduce((a, b) => a + b, 0) / allWpms.length),
        avgAccuracy: Math.round(allAccuracies.reduce((a, b) => a + b, 0) / allAccuracies.length),
        lessonsCompleted,
        recentScores: newScores,
      };
    });
  }, []);

  const handleTestComplete = useCallback((wpm: number, accuracy: number) => {
    setStats(prev => {
      const newScores = [...prev.recentScores, {
        wpm,
        accuracy,
        date: new Date().toLocaleDateString(),
      }].slice(-50);

      const allWpms = newScores.map(s => s.wpm);
      const allAccuracies = newScores.map(s => s.accuracy);

      return {
        ...prev,
        totalTests: prev.totalTests + 1,
        bestWpm: Math.max(prev.bestWpm, wpm),
        avgWpm: Math.round(allWpms.reduce((a, b) => a + b, 0) / allWpms.length),
        avgAccuracy: Math.round(allAccuracies.reduce((a, b) => a + b, 0) / allAccuracies.length),
        recentScores: newScores,
      };
    });
  }, []);

  const renderScreen = () => {
    switch (appState.screen) {
      case 'home':
        return <HomeScreen onNavigate={navigate} stats={stats} />;

      case 'dailyPractice':
        return (
          <DailyPractice
            onBack={goHome}
            onComplete={handleTestComplete}
            onHome={goHome}
          />
        );

      case 'lessons':
        return (
          <LessonsScreen
            onBack={goHome}
            onSelectLesson={(id) => navigate('lessonPractice', { selectedLessonId: id })}
            completedLessons={stats.lessonsCompleted}
          />
        );

      case 'lessonPractice':
        return (
          <LessonPractice
            lessonId={appState.selectedLessonId || ''}
            onBack={() => navigate('lessons')}
            onComplete={handleLessonComplete}
            onHome={goHome}
          />
        );

      case 'tests':
        return (
          <TypingTestScreen
            onBack={goHome}
            onSelectTest={(id) => navigate('testPractice', { selectedTestId: id })}
          />
        );

      case 'testPractice':
        return (
          <TestPractice
            testId={appState.selectedTestId || ''}
            onBack={() => navigate('tests')}
            onComplete={handleTestComplete}
            onHome={goHome}
          />
        );

      case 'games':
        return (
          <TypingGames
            onBack={goHome}
            onComplete={handleTestComplete}
          />
        );

      case 'programming':
        return (
          <ProgrammingPractice
            onBack={goHome}
            onComplete={handleTestComplete}
            onHome={goHome}
          />
        );

      case 'practice':
        return (
          <SpeedPractice
            onBack={goHome}
            onComplete={handleTestComplete}
            onHome={goHome}
          />
        );

      case 'techniques':
        return <TechniquesScreen onBack={goHome} />;

      case 'freeType':
        return <FreeTyping onBack={goHome} />;

      case 'achievements':
        return <AchievementsScreen onBack={goHome} stats={stats} />;

      case 'statistics':
        return <StatisticsScreen onBack={goHome} stats={stats} />;

      default:
        return <HomeScreen onNavigate={navigate} stats={stats} />;
    }
  };

  return (
    <div className="min-h-screen bg-bg-dark">
      {/* Background decoration */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-600/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-600/5 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-cyan-600/3 rounded-full blur-3xl" />
      </div>

      {/* Header bar */}
      {appState.screen !== 'home' && (
        <div className="sticky top-0 z-50 glass border-b border-gray-700/30">
          <div className="max-w-6xl mx-auto px-4 py-2 flex items-center justify-between">
            <button
              onClick={goHome}
              className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors"
            >
              <span className="text-lg">⌨️</span>
              <span className="font-bold text-sm">Typing Master</span>
            </button>
            <div className="flex items-center gap-4 text-xs text-gray-500">
              <span className="hidden sm:inline">🏆 Best: {stats.bestWpm} WPM</span>
              <span>🎯 Acc: {stats.avgAccuracy}%</span>
              <span className="hidden sm:inline">📊 Tests: {stats.totalTests}</span>
            </div>
          </div>
        </div>
      )}

      {/* Main content */}
      <main className="max-w-6xl mx-auto px-4 py-8 relative z-10">
        {renderScreen()}
      </main>
    </div>
  );
};

export default App;
