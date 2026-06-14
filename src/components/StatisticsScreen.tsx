import React from 'react';
import { ArrowLeft, TrendingUp, Gauge, Target, Clock, Zap, Award } from 'lucide-react';
import type { UserStats } from './HomeScreen';

interface StatisticsScreenProps {
  onBack: () => void;
  stats: UserStats;
}

const StatisticsScreen: React.FC<StatisticsScreenProps> = ({ onBack, stats }) => {
  const formatTime = (seconds: number) => {
    if (seconds < 60) return `${seconds}s`;
    if (seconds < 3600) return `${Math.floor(seconds / 60)}m ${seconds % 60}s`;
    const hours = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    return `${hours}h ${mins}m`;
  };

  const maxWpm = stats.recentScores.length > 0
    ? Math.max(...stats.recentScores.map(s => s.wpm))
    : 0;

  return (
    <div className="slide-up max-w-4xl mx-auto">
      <div className="flex items-center gap-4 mb-8">
        <button onClick={onBack} className="p-2 hover:bg-gray-800 rounded-lg transition-colors">
          <ArrowLeft className="w-6 h-6" />
        </button>
        <div>
          <h2 className="text-3xl font-bold">📊 Statistics</h2>
          <p className="text-gray-400">Track your typing progress</p>
        </div>
      </div>

      {/* Main Stats */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-8">
        <div className="glass rounded-2xl p-6 text-center">
          <Gauge className="w-8 h-8 text-blue-400 mx-auto mb-3" />
          <div className="text-3xl font-black text-white">{stats.bestWpm}</div>
          <div className="text-sm text-gray-400 mt-1">Best WPM</div>
        </div>
        <div className="glass rounded-2xl p-6 text-center">
          <TrendingUp className="w-8 h-8 text-green-400 mx-auto mb-3" />
          <div className="text-3xl font-black text-white">{stats.avgWpm}</div>
          <div className="text-sm text-gray-400 mt-1">Average WPM</div>
        </div>
        <div className="glass rounded-2xl p-6 text-center">
          <Target className="w-8 h-8 text-purple-400 mx-auto mb-3" />
          <div className="text-3xl font-black text-white">{stats.avgAccuracy}%</div>
          <div className="text-sm text-gray-400 mt-1">Avg Accuracy</div>
        </div>
        <div className="glass rounded-2xl p-6 text-center">
          <Zap className="w-8 h-8 text-yellow-400 mx-auto mb-3" />
          <div className="text-3xl font-black text-white">{stats.totalTests}</div>
          <div className="text-sm text-gray-400 mt-1">Tests Taken</div>
        </div>
        <div className="glass rounded-2xl p-6 text-center">
          <Clock className="w-8 h-8 text-cyan-400 mx-auto mb-3" />
          <div className="text-3xl font-black text-white">{formatTime(stats.totalTime)}</div>
          <div className="text-sm text-gray-400 mt-1">Total Time</div>
        </div>
        <div className="glass rounded-2xl p-6 text-center">
          <Award className="w-8 h-8 text-orange-400 mx-auto mb-3" />
          <div className="text-3xl font-black text-white">{stats.lessonsCompleted.length}</div>
          <div className="text-sm text-gray-400 mt-1">Lessons Done</div>
        </div>
      </div>

      {/* Recent Scores Chart */}
      <div className="glass rounded-2xl p-6 mb-8">
        <h3 className="text-lg font-bold mb-4">📈 Recent Performance</h3>
        {stats.recentScores.length === 0 ? (
          <div className="text-center text-gray-500 py-8">
            <p>No tests completed yet. Start typing to see your progress!</p>
          </div>
        ) : (
          <div>
            {/* Bar Chart */}
            <div className="flex items-end gap-2 h-48 mb-4">
              {stats.recentScores.slice(-15).map((score, idx) => {
                const height = maxWpm > 0 ? (score.wpm / maxWpm) * 100 : 0;
                const isGood = score.accuracy >= 90;
                return (
                  <div key={idx} className="flex-1 flex flex-col items-center gap-1 group relative">
                    {/* Tooltip */}
                    <div className="absolute bottom-full mb-2 bg-gray-800 px-2 py-1 rounded text-xs opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-10 pointer-events-none">
                      {score.wpm} WPM | {score.accuracy}%
                    </div>
                    <div
                      className={`w-full rounded-t-md transition-all duration-500 ${
                        isGood ? 'bg-gradient-to-t from-green-600 to-green-400' : 'bg-gradient-to-t from-orange-600 to-orange-400'
                      }`}
                      style={{ height: `${Math.max(height, 5)}%` }}
                    />
                  </div>
                );
              })}
            </div>
            <div className="flex justify-between text-xs text-gray-500">
              <span>Older</span>
              <span>Recent</span>
            </div>
          </div>
        )}
      </div>

      {/* Recent Scores Table */}
      <div className="glass rounded-2xl p-6">
        <h3 className="text-lg font-bold mb-4">🕐 Recent Test History</h3>
        {stats.recentScores.length === 0 ? (
          <div className="text-center text-gray-500 py-4">No history yet</div>
        ) : (
          <div className="space-y-2">
            <div className="grid grid-cols-4 text-xs text-gray-500 font-medium pb-2 border-b border-gray-700/50">
              <span>#</span>
              <span>WPM</span>
              <span>Accuracy</span>
              <span>Date</span>
            </div>
            {stats.recentScores.slice().reverse().slice(0, 20).map((score, idx) => (
              <div key={idx} className="grid grid-cols-4 text-sm py-2 border-b border-gray-800/50">
                <span className="text-gray-500">{stats.recentScores.length - idx}</span>
                <span className={`font-mono font-bold ${
                  score.wpm >= 60 ? 'text-green-400' : score.wpm >= 30 ? 'text-yellow-400' : 'text-red-400'
                }`}>
                  {score.wpm}
                </span>
                <span className={`font-mono ${
                  score.accuracy >= 95 ? 'text-green-400' : score.accuracy >= 85 ? 'text-yellow-400' : 'text-red-400'
                }`}>
                  {score.accuracy}%
                </span>
                <span className="text-gray-400">{score.date}</span>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* WPM Level Guide */}
      <div className="glass rounded-2xl p-6 mt-8">
        <h3 className="text-lg font-bold mb-4">🏅 WPM Speed Guide</h3>
        <div className="space-y-2">
          {[
            { range: '0-20 WPM', label: 'Beginner', color: 'bg-red-500', desc: 'Just starting out' },
            { range: '20-40 WPM', label: 'Below Average', color: 'bg-orange-500', desc: 'Keep practicing!' },
            { range: '40-60 WPM', label: 'Average', color: 'bg-yellow-500', desc: 'Good for casual typing' },
            { range: '60-80 WPM', label: 'Above Average', color: 'bg-green-500', desc: 'Professional level' },
            { range: '80-100 WPM', label: 'Fast', color: 'bg-blue-500', desc: 'Very impressive!' },
            { range: '100+ WPM', label: 'Expert', color: 'bg-purple-500', desc: 'Top typist!' },
          ].map((level) => (
            <div key={level.range} className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-800/30">
              <div className={`w-3 h-3 rounded-full ${level.color}`} />
              <span className="font-mono text-sm text-white w-28">{level.range}</span>
              <span className="font-semibold text-sm w-32">{level.label}</span>
              <span className="text-sm text-gray-400">{level.desc}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default StatisticsScreen;
