import React from 'react';
import { ArrowLeft, CheckCircle, Lock, ChevronRight } from 'lucide-react';
import { lessons } from '../data/lessons';

interface LessonsScreenProps {
  onBack: () => void;
  onSelectLesson: (lessonId: string) => void;
  completedLessons: string[];
}

const categoryInfo: Record<string, { label: string; color: string }> = {
  'home-row': { label: '🏠 Home Row', color: 'border-blue-500' },
  'top-row': { label: '⬆️ Top Row', color: 'border-green-500' },
  'bottom-row': { label: '⬇️ Bottom Row', color: 'border-yellow-500' },
  'numbers': { label: '🔢 Numbers', color: 'border-purple-500' },
  'full': { label: '⌨️ Full Keyboard', color: 'border-cyan-500' },
  'words': { label: '📝 Words', color: 'border-orange-500' },
  'sentences': { label: '💬 Sentences', color: 'border-pink-500' },
  'paragraphs': { label: '📄 Paragraphs', color: 'border-red-500' },
};

const difficultyColors: Record<string, string> = {
  beginner: 'bg-green-500/20 text-green-400',
  intermediate: 'bg-blue-500/20 text-blue-400',
  advanced: 'bg-orange-500/20 text-orange-400',
  expert: 'bg-red-500/20 text-red-400',
};

const LessonsScreen: React.FC<LessonsScreenProps> = ({ onBack, onSelectLesson, completedLessons }) => {
  // Group lessons by category
  const categories = Array.from(new Set(lessons.map(l => l.category)));

  return (
    <div className="slide-up">
      <div className="flex items-center gap-4 mb-8">
        <button
          onClick={onBack}
          className="p-2 hover:bg-gray-800 rounded-lg transition-colors"
        >
          <ArrowLeft className="w-6 h-6" />
        </button>
        <div>
          <h2 className="text-3xl font-bold">Typing Lessons</h2>
          <p className="text-gray-400">Master your typing skills step by step</p>
        </div>
      </div>

      {/* Progress */}
      <div className="glass rounded-xl p-4 mb-6 flex items-center gap-4">
        <div className="flex-1">
          <div className="flex justify-between mb-2">
            <span className="text-sm text-gray-400">Overall Progress</span>
            <span className="text-sm text-blue-400 font-medium">
              {completedLessons.length}/{lessons.length} lessons
            </span>
          </div>
          <div className="w-full bg-gray-700 rounded-full h-2">
            <div
              className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full transition-all duration-500 progress-animate"
              style={{ width: `${(completedLessons.length / lessons.length) * 100}%` }}
            />
          </div>
        </div>
      </div>

      {/* Lesson Categories */}
      <div className="space-y-6">
        {categories.map(category => {
          const catLessons = lessons.filter(l => l.category === category);
          const info = categoryInfo[category] || { label: category, color: 'border-gray-500' };
          const completedCount = catLessons.filter(l => completedLessons.includes(l.id)).length;

          return (
            <div key={category}>
              <div className="flex items-center gap-3 mb-3">
                <h3 className="text-lg font-semibold">{info.label}</h3>
                <span className="text-xs text-gray-400">
                  {completedCount}/{catLessons.length}
                </span>
              </div>
              <div className="grid gap-2">
                {catLessons.map((lesson) => {
                  const isCompleted = completedLessons.includes(lesson.id);
                  const isLocked = false; // Could add sequential unlocking

                  return (
                    <button
                      key={lesson.id}
                      onClick={() => !isLocked && onSelectLesson(lesson.id)}
                      disabled={isLocked}
                      className={`group glass rounded-xl p-4 text-left transition-all duration-200 
                        ${isLocked ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-700/50 hover:scale-[1.01]'}
                        border-l-4 ${info.color}`}
                    >
                      <div className="flex items-center gap-4">
                        <div className="text-3xl">{lesson.icon}</div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <h4 className="font-semibold text-white">{lesson.title}</h4>
                            <span className={`text-xs px-2 py-0.5 rounded-full ${difficultyColors[lesson.difficulty]}`}>
                              {lesson.difficulty}
                            </span>
                          </div>
                          <p className="text-sm text-gray-400">{lesson.description}</p>
                          {lesson.keys.length > 0 && (
                            <div className="flex gap-1 mt-2">
                              {lesson.keys.slice(0, 10).map(k => (
                                <span key={k} className="bg-gray-700 text-gray-300 text-xs px-1.5 py-0.5 rounded font-mono">
                                  {k.toUpperCase()}
                                </span>
                              ))}
                            </div>
                          )}
                        </div>
                        <div className="flex items-center gap-2">
                          {isCompleted && <CheckCircle className="w-6 h-6 text-green-400" />}
                          {isLocked && <Lock className="w-5 h-5 text-gray-500" />}
                          {!isLocked && !isCompleted && (
                            <ChevronRight className="w-5 h-5 text-gray-500 group-hover:text-white transition-colors" />
                          )}
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default LessonsScreen;
