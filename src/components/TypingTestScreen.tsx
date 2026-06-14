import React, { useState } from 'react';
import { ArrowLeft, Clock, Gauge, Zap } from 'lucide-react';
import { typingTests } from '../data/lessons';

interface TypingTestScreenProps {
  onBack: () => void;
  onSelectTest: (testId: string) => void;
}

const difficultyConfig = {
  easy: { color: 'bg-green-500/20 text-green-400 border-green-500/30', icon: '🟢' },
  medium: { color: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30', icon: '🟡' },
  hard: { color: 'bg-red-500/20 text-red-400 border-red-500/30', icon: '🔴' },
};

const TypingTestScreen: React.FC<TypingTestScreenProps> = ({ onBack, onSelectTest }) => {
  const [filter, setFilter] = useState<'all' | 'easy' | 'medium' | 'hard'>('all');

  const filteredTests = filter === 'all' ? typingTests : typingTests.filter(t => t.difficulty === filter);

  return (
    <div className="slide-up max-w-4xl mx-auto">
      <div className="flex items-center gap-4 mb-8">
        <button onClick={onBack} className="p-2 hover:bg-gray-800 rounded-lg transition-colors">
          <ArrowLeft className="w-6 h-6" />
        </button>
        <div>
          <h2 className="text-3xl font-bold">Typing Tests</h2>
          <p className="text-gray-400">Test your typing speed and accuracy</p>
        </div>
      </div>

      {/* Filters */}
      <div className="flex gap-2 mb-6">
        {(['all', 'easy', 'medium', 'hard'] as const).map(f => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              filter === f
                ? 'bg-blue-600 text-white'
                : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
            }`}
          >
            {f.charAt(0).toUpperCase() + f.slice(1)}
          </button>
        ))}
      </div>

      {/* Test Cards */}
      <div className="grid gap-4">
        {filteredTests.map(test => {
          const config = difficultyConfig[test.difficulty];
          const wordCount = test.text.split(' ').length;

          return (
            <button
              key={test.id}
              onClick={() => onSelectTest(test.id)}
              className="group glass rounded-xl p-5 text-left hover:bg-gray-700/50 transition-all hover:scale-[1.01]"
            >
              <div className="flex items-center gap-4">
                <div className="text-4xl">{config.icon}</div>
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-1">
                    <h3 className="text-lg font-bold text-white">{test.title}</h3>
                    <span className={`text-xs px-2 py-0.5 rounded-full border ${config.color}`}>
                      {test.difficulty}
                    </span>
                  </div>
                  <div className="flex items-center gap-4 text-sm text-gray-400">
                    <span className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      {test.duration >= 60 ? `${test.duration / 60} min` : `${test.duration}s`}
                    </span>
                    <span className="flex items-center gap-1">
                      <Gauge className="w-4 h-4" />
                      {wordCount} words
                    </span>
                    <span className="flex items-center gap-1">
                      <Zap className="w-4 h-4" />
                      {test.text.length} chars
                    </span>
                  </div>
                </div>
                <div className="text-gray-500 group-hover:text-white transition-colors">
                  ▶
                </div>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default TypingTestScreen;
