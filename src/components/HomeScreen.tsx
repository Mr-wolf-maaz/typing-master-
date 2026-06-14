import React from 'react';
import {
  Keyboard, BookOpen, Timer, Trophy, BarChart3, Zap,
  ChevronRight, Star, Target, Calendar, Gamepad2, Code2, Lightbulb
} from 'lucide-react';

interface HomeScreenProps {
  onNavigate: (screen: string, data?: any) => void;
  stats: UserStats;
}

export interface UserStats {
  totalTests: number;
  bestWpm: number;
  avgWpm: number;
  avgAccuracy: number;
  totalTime: number;
  lessonsCompleted: string[];
  recentScores: Array<{ wpm: number; accuracy: number; date: string }>;
}

const HomeScreen: React.FC<HomeScreenProps> = ({ onNavigate, stats }) => {
  const menuItems = [
    {
      icon: <Calendar className="w-8 h-8" />,
      title: 'Daily Practice',
      description: '14-day structured plan with daily key focus',
      color: 'from-indigo-600 to-indigo-800',
      hoverColor: 'hover:from-indigo-500 hover:to-indigo-700',
      screen: 'dailyPractice',
      badge: '📅 Day-by-day',
    },
    {
      icon: <BookOpen className="w-8 h-8" />,
      title: 'Typing Lessons',
      description: 'Learn typing step by step',
      color: 'from-blue-600 to-blue-800',
      hoverColor: 'hover:from-blue-500 hover:to-blue-700',
      screen: 'lessons',
      badge: `${stats.lessonsCompleted.length} completed`,
    },
    {
      icon: <Timer className="w-8 h-8" />,
      title: 'Typing Test',
      description: 'Test your typing speed',
      color: 'from-purple-600 to-purple-800',
      hoverColor: 'hover:from-purple-500 hover:to-purple-700',
      screen: 'tests',
      badge: `Best: ${stats.bestWpm} WPM`,
    },
    {
      icon: <Gamepad2 className="w-8 h-8" />,
      title: 'Typing Games',
      description: 'Fun games to boost speed',
      color: 'from-pink-600 to-pink-800',
      hoverColor: 'hover:from-pink-500 hover:to-pink-700',
      screen: 'games',
      badge: '🎮 3 Games',
    },
    {
      icon: <Code2 className="w-8 h-8" />,
      title: 'Programming Typing',
      description: 'C, C++, JS, Python, Rust & more',
      color: 'from-emerald-600 to-emerald-800',
      hoverColor: 'hover:from-emerald-500 hover:to-emerald-700',
      screen: 'programming',
      badge: '👨‍💻 20+ Languages',
    },
    {
      icon: <Zap className="w-8 h-8" />,
      title: 'Speed Practice',
      description: 'Quick word practice drills',
      color: 'from-orange-600 to-orange-800',
      hoverColor: 'hover:from-orange-500 hover:to-orange-700',
      screen: 'practice',
      badge: 'Custom words',
    },
    {
      icon: <Lightbulb className="w-8 h-8" />,
      title: 'Techniques & Tips',
      description: 'Proven methods to type faster',
      color: 'from-yellow-600 to-yellow-800',
      hoverColor: 'hover:from-yellow-500 hover:to-yellow-700',
      screen: 'techniques',
      badge: '💡 13 Tips',
    },
    {
      icon: <Keyboard className="w-8 h-8" />,
      title: 'Free Typing',
      description: 'Practice typing freely',
      color: 'from-green-600 to-green-800',
      hoverColor: 'hover:from-green-500 hover:to-green-700',
      screen: 'freeType',
      badge: 'No limits',
    },
    {
      icon: <Trophy className="w-8 h-8" />,
      title: 'Achievements',
      description: 'View your achievements',
      color: 'from-amber-600 to-amber-800',
      hoverColor: 'hover:from-amber-500 hover:to-amber-700',
      screen: 'achievements',
      badge: `${stats.totalTests} tests`,
    },
    {
      icon: <BarChart3 className="w-8 h-8" />,
      title: 'Statistics',
      description: 'Track your progress',
      color: 'from-cyan-600 to-cyan-800',
      hoverColor: 'hover:from-cyan-500 hover:to-cyan-700',
      screen: 'statistics',
      badge: 'Detailed stats',
    },
  ];

  return (
    <div className="slide-up">
      {/* Hero Section */}
      <div className="text-center mb-10">
        <div className="inline-flex items-center gap-3 mb-4">
          <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg shadow-blue-500/25">
            <Keyboard className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-4xl md:text-5xl font-black gradient-text">
            Typing Master
          </h1>
        </div>
        <p className="text-gray-400 text-lg max-w-xl mx-auto">
          Master your keyboard skills with lessons, games, programming practice, and daily drills.
        </p>
      </div>

      {/* Quick Stats Bar */}
      <div className="glass rounded-2xl p-4 mb-8 grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="text-center">
          <div className="flex items-center justify-center gap-1 mb-1">
            <Zap className="w-4 h-4 text-yellow-400" />
            <span className="text-2xl font-bold text-white">{stats.bestWpm}</span>
          </div>
          <span className="text-xs text-gray-400">Best WPM</span>
        </div>
        <div className="text-center">
          <div className="flex items-center justify-center gap-1 mb-1">
            <Target className="w-4 h-4 text-green-400" />
            <span className="text-2xl font-bold text-white">{stats.avgAccuracy}%</span>
          </div>
          <span className="text-xs text-gray-400">Avg Accuracy</span>
        </div>
        <div className="text-center">
          <div className="flex items-center justify-center gap-1 mb-1">
            <Star className="w-4 h-4 text-purple-400" />
            <span className="text-2xl font-bold text-white">{stats.lessonsCompleted.length}</span>
          </div>
          <span className="text-xs text-gray-400">Lessons Done</span>
        </div>
        <div className="text-center">
          <div className="flex items-center justify-center gap-1 mb-1">
            <Trophy className="w-4 h-4 text-orange-400" />
            <span className="text-2xl font-bold text-white">{stats.totalTests}</span>
          </div>
          <span className="text-xs text-gray-400">Tests Taken</span>
        </div>
      </div>

      {/* Menu Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {menuItems.map((item) => (
          <button
            key={item.screen}
            onClick={() => onNavigate(item.screen)}
            className={`group bg-gradient-to-br ${item.color} ${item.hoverColor} rounded-2xl p-6 text-left transition-all duration-300 hover:scale-[1.02] hover:shadow-lg border border-white/5`}
          >
            <div className="flex items-start justify-between mb-4">
              <div className="bg-white/10 rounded-xl p-3">
                {item.icon}
              </div>
              <ChevronRight className="w-5 h-5 text-white/50 group-hover:text-white/80 group-hover:translate-x-1 transition-all" />
            </div>
            <h3 className="text-xl font-bold text-white mb-1">{item.title}</h3>
            <p className="text-white/60 text-sm mb-3">{item.description}</p>
            <span className="inline-block bg-white/10 rounded-full px-3 py-1 text-xs text-white/80">
              {item.badge}
            </span>
          </button>
        ))}
      </div>

      {/* Footer tip */}
      <div className="mt-8 text-center text-gray-500 text-sm">
        💡 New here? Start with <strong className="text-blue-400">Daily Practice</strong> for a structured 14-day learning plan!
      </div>
    </div>
  );
};

export default HomeScreen;
