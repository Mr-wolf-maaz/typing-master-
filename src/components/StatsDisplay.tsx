import React from 'react';
import { Gauge, Target, Clock, Zap, TrendingUp, Award } from 'lucide-react';

interface StatsDisplayProps {
  wpm: number;
  accuracy: number;
  time: number;
  errors: number;
  totalChars: number;
  correctChars: number;
  isLive?: boolean;
}

const StatsDisplay: React.FC<StatsDisplayProps> = ({
  wpm, accuracy, time, errors, totalChars: _totalChars, correctChars: _correctChars, isLive = false
}) => {
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const stats = [
    {
      icon: <Gauge className="w-5 h-5" />,
      label: 'WPM',
      value: wpm,
      color: wpm > 60 ? 'text-green-400' : wpm > 30 ? 'text-yellow-400' : 'text-red-400',
      bg: wpm > 60 ? 'bg-green-500/10' : wpm > 30 ? 'bg-yellow-500/10' : 'bg-red-500/10',
    },
    {
      icon: <Target className="w-5 h-5" />,
      label: 'Accuracy',
      value: `${accuracy}%`,
      color: accuracy > 95 ? 'text-green-400' : accuracy > 85 ? 'text-yellow-400' : 'text-red-400',
      bg: accuracy > 95 ? 'bg-green-500/10' : accuracy > 85 ? 'bg-yellow-500/10' : 'bg-red-500/10',
    },
    {
      icon: <Clock className="w-5 h-5" />,
      label: 'Time',
      value: formatTime(time),
      color: 'text-blue-400',
      bg: 'bg-blue-500/10',
    },
    {
      icon: <Zap className="w-5 h-5" />,
      label: 'Errors',
      value: errors,
      color: errors === 0 ? 'text-green-400' : 'text-red-400',
      bg: errors === 0 ? 'bg-green-500/10' : 'bg-red-500/10',
    },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
      {stats.map((stat, idx) => (
        <div
          key={idx}
          className={`${stat.bg} rounded-xl p-3 border border-gray-700/30 flex items-center gap-3 ${isLive ? 'fade-in' : ''}`}
        >
          <div className={`${stat.color}`}>
            {stat.icon}
          </div>
          <div>
            <div className={`text-xl font-bold ${stat.color}`}>{stat.value}</div>
            <div className="text-xs text-gray-400">{stat.label}</div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default StatsDisplay;

// Results screen after completing a test/lesson
interface ResultsProps {
  wpm: number;
  accuracy: number;
  time: number;
  errors: number;
  totalChars: number;
  correctChars: number;
  onRetry: () => void;
  onNext?: () => void;
  onHome: () => void;
}

export const Results: React.FC<ResultsProps> = ({
  wpm, accuracy, time, errors, totalChars, correctChars, onRetry, onNext, onHome
}) => {
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const getGrade = () => {
    if (wpm >= 80 && accuracy >= 98) return { grade: 'S', color: 'text-purple-400', label: 'Perfect!' };
    if (wpm >= 60 && accuracy >= 95) return { grade: 'A', color: 'text-green-400', label: 'Excellent!' };
    if (wpm >= 40 && accuracy >= 90) return { grade: 'B', color: 'text-blue-400', label: 'Good Job!' };
    if (wpm >= 25 && accuracy >= 80) return { grade: 'C', color: 'text-yellow-400', label: 'Keep Practicing' };
    return { grade: 'D', color: 'text-red-400', label: 'Needs Improvement' };
  };

  const grade = getGrade();

  const getStars = () => {
    if (accuracy >= 98 && wpm >= 60) return 3;
    if (accuracy >= 90 && wpm >= 40) return 2;
    if (accuracy >= 80) return 1;
    return 0;
  };

  const stars = getStars();

  return (
    <div className="slide-up max-w-2xl mx-auto">
      <div className="glass rounded-2xl p-8 text-center">
        {/* Grade */}
        <div className="mb-6">
          <div className={`text-8xl font-black ${grade.color} mb-2`}>{grade.grade}</div>
          <div className="text-xl text-gray-300">{grade.label}</div>
          {/* Stars */}
          <div className="flex justify-center gap-2 mt-3">
            {[1, 2, 3].map(i => (
              <span key={i} className={`text-3xl ${i <= stars ? 'text-yellow-400' : 'text-gray-600'}`}>
                ★
              </span>
            ))}
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-8">
          <div className="bg-gray-800/50 rounded-xl p-4">
            <Gauge className="w-6 h-6 text-blue-400 mx-auto mb-2" />
            <div className="text-2xl font-bold text-white">{wpm}</div>
            <div className="text-sm text-gray-400">Words/Min</div>
          </div>
          <div className="bg-gray-800/50 rounded-xl p-4">
            <Target className="w-6 h-6 text-green-400 mx-auto mb-2" />
            <div className="text-2xl font-bold text-white">{accuracy}%</div>
            <div className="text-sm text-gray-400">Accuracy</div>
          </div>
          <div className="bg-gray-800/50 rounded-xl p-4">
            <Clock className="w-6 h-6 text-purple-400 mx-auto mb-2" />
            <div className="text-2xl font-bold text-white">{formatTime(time)}</div>
            <div className="text-sm text-gray-400">Time</div>
          </div>
          <div className="bg-gray-800/50 rounded-xl p-4">
            <Zap className="w-6 h-6 text-red-400 mx-auto mb-2" />
            <div className="text-2xl font-bold text-white">{errors}</div>
            <div className="text-sm text-gray-400">Errors</div>
          </div>
          <div className="bg-gray-800/50 rounded-xl p-4">
            <TrendingUp className="w-6 h-6 text-cyan-400 mx-auto mb-2" />
            <div className="text-2xl font-bold text-white">{correctChars}</div>
            <div className="text-sm text-gray-400">Correct Chars</div>
          </div>
          <div className="bg-gray-800/50 rounded-xl p-4">
            <Award className="w-6 h-6 text-yellow-400 mx-auto mb-2" />
            <div className="text-2xl font-bold text-white">{totalChars}</div>
            <div className="text-sm text-gray-400">Total Chars</div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-3 justify-center flex-wrap">
          <button
            onClick={onRetry}
            className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-semibold transition-colors flex items-center gap-2"
          >
            🔄 Try Again
          </button>
          {onNext && (
            <button
              onClick={onNext}
              className="px-6 py-3 bg-green-600 hover:bg-green-700 text-white rounded-xl font-semibold transition-colors flex items-center gap-2"
            >
              ➡️ Next Lesson
            </button>
          )}
          <button
            onClick={onHome}
            className="px-6 py-3 bg-gray-700 hover:bg-gray-600 text-white rounded-xl font-semibold transition-colors flex items-center gap-2"
          >
            🏠 Home
          </button>
        </div>
      </div>
    </div>
  );
};
