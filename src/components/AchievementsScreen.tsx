import React from 'react';
import { ArrowLeft } from 'lucide-react';
import type { UserStats } from './HomeScreen';

interface AchievementsScreenProps {
  onBack: () => void;
  stats: UserStats;
}

interface Achievement {
  id: string;
  icon: string;
  title: string;
  description: string;
  condition: (stats: UserStats) => boolean;
  color: string;
}

const achievements: Achievement[] = [
  {
    id: 'first-test',
    icon: '🎯',
    title: 'First Steps',
    description: 'Complete your first typing test',
    condition: (s) => s.totalTests >= 1,
    color: 'from-blue-600 to-blue-800',
  },
  {
    id: 'five-tests',
    icon: '✋',
    title: 'High Five',
    description: 'Complete 5 typing tests',
    condition: (s) => s.totalTests >= 5,
    color: 'from-green-600 to-green-800',
  },
  {
    id: 'ten-tests',
    icon: '🔟',
    title: 'Dedicated',
    description: 'Complete 10 typing tests',
    condition: (s) => s.totalTests >= 10,
    color: 'from-purple-600 to-purple-800',
  },
  {
    id: 'speed-20',
    icon: '🐌',
    title: 'Getting Started',
    description: 'Reach 20 WPM',
    condition: (s) => s.bestWpm >= 20,
    color: 'from-gray-600 to-gray-800',
  },
  {
    id: 'speed-40',
    icon: '🚶',
    title: 'Steady Pace',
    description: 'Reach 40 WPM',
    condition: (s) => s.bestWpm >= 40,
    color: 'from-yellow-600 to-yellow-800',
  },
  {
    id: 'speed-60',
    icon: '🏃',
    title: 'Speed Runner',
    description: 'Reach 60 WPM',
    condition: (s) => s.bestWpm >= 60,
    color: 'from-orange-600 to-orange-800',
  },
  {
    id: 'speed-80',
    icon: '🚀',
    title: 'Rocket Fingers',
    description: 'Reach 80 WPM',
    condition: (s) => s.bestWpm >= 80,
    color: 'from-red-600 to-red-800',
  },
  {
    id: 'speed-100',
    icon: '⚡',
    title: 'Lightning Fast',
    description: 'Reach 100 WPM',
    condition: (s) => s.bestWpm >= 100,
    color: 'from-cyan-600 to-cyan-800',
  },
  {
    id: 'accuracy-90',
    icon: '🎯',
    title: 'Accurate',
    description: 'Achieve 90% accuracy',
    condition: (s) => s.avgAccuracy >= 90,
    color: 'from-teal-600 to-teal-800',
  },
  {
    id: 'accuracy-95',
    icon: '💎',
    title: 'Precision',
    description: 'Achieve 95% accuracy',
    condition: (s) => s.avgAccuracy >= 95,
    color: 'from-indigo-600 to-indigo-800',
  },
  {
    id: 'accuracy-99',
    icon: '👑',
    title: 'Perfection',
    description: 'Achieve 99% accuracy',
    condition: (s) => s.avgAccuracy >= 99,
    color: 'from-pink-600 to-pink-800',
  },
  {
    id: 'lessons-3',
    icon: '📚',
    title: 'Student',
    description: 'Complete 3 lessons',
    condition: (s) => s.lessonsCompleted.length >= 3,
    color: 'from-emerald-600 to-emerald-800',
  },
  {
    id: 'lessons-all',
    icon: '🎓',
    title: 'Graduate',
    description: 'Complete all lessons',
    condition: (s) => s.lessonsCompleted.length >= 14,
    color: 'from-amber-600 to-amber-800',
  },
  {
    id: 'time-30',
    icon: '⏰',
    title: 'Committed',
    description: 'Spend 30 minutes typing',
    condition: (s) => s.totalTime >= 1800,
    color: 'from-rose-600 to-rose-800',
  },
  {
    id: 'time-60',
    icon: '🕐',
    title: 'Hour Power',
    description: 'Spend 1 hour typing',
    condition: (s) => s.totalTime >= 3600,
    color: 'from-violet-600 to-violet-800',
  },
];

const AchievementsScreen: React.FC<AchievementsScreenProps> = ({ onBack, stats }) => {
  const unlockedCount = achievements.filter(a => a.condition(stats)).length;

  return (
    <div className="slide-up max-w-4xl mx-auto">
      <div className="flex items-center gap-4 mb-8">
        <button onClick={onBack} className="p-2 hover:bg-gray-800 rounded-lg transition-colors">
          <ArrowLeft className="w-6 h-6" />
        </button>
        <div>
          <h2 className="text-3xl font-bold">🏆 Achievements</h2>
          <p className="text-gray-400">
            {unlockedCount}/{achievements.length} unlocked
          </p>
        </div>
      </div>

      {/* Progress */}
      <div className="glass rounded-xl p-4 mb-6">
        <div className="flex justify-between mb-2">
          <span className="text-sm text-gray-400">Achievement Progress</span>
          <span className="text-sm text-yellow-400 font-medium">
            {Math.round((unlockedCount / achievements.length) * 100)}%
          </span>
        </div>
        <div className="w-full bg-gray-700 rounded-full h-3">
          <div
            className="bg-gradient-to-r from-yellow-500 to-orange-500 h-3 rounded-full transition-all"
            style={{ width: `${(unlockedCount / achievements.length) * 100}%` }}
          />
        </div>
      </div>

      {/* Achievements Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {achievements.map(achievement => {
          const unlocked = achievement.condition(stats);

          return (
            <div
              key={achievement.id}
              className={`rounded-xl p-4 border transition-all ${
                unlocked
                  ? `bg-gradient-to-br ${achievement.color} border-white/10 shadow-lg`
                  : 'bg-gray-800/30 border-gray-700/30 opacity-50 grayscale'
              }`}
            >
              <div className="text-4xl mb-3">{achievement.icon}</div>
              <h3 className="font-bold text-white text-lg">{achievement.title}</h3>
              <p className={`text-sm ${unlocked ? 'text-white/70' : 'text-gray-500'}`}>
                {achievement.description}
              </p>
              {unlocked && (
                <div className="mt-2 inline-block bg-white/10 rounded-full px-2 py-0.5 text-xs text-white/80">
                  ✅ Unlocked
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default AchievementsScreen;
