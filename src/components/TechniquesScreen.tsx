import React, { useState } from 'react';
import { ArrowLeft, ChevronDown, ChevronUp } from 'lucide-react';

interface TechniquesScreenProps {
  onBack: () => void;
}

interface Technique {
  id: string;
  icon: string;
  title: string;
  category: string;
  content: string[];
}

const techniques: Technique[] = [
  {
    id: 'posture',
    icon: '🪑',
    title: 'Correct Posture',
    category: 'Foundation',
    content: [
      '✅ Sit up straight with your back supported by the chair',
      '✅ Keep your feet flat on the floor',
      '✅ Your elbows should be at a 90-degree angle',
      '✅ Wrists should float slightly above the keyboard, not resting on the desk',
      '✅ Screen should be at eye level, about arm\'s length away',
      '✅ Shoulders should be relaxed, not hunched up',
      '❌ Don\'t slouch or lean too far forward',
      '❌ Don\'t rest your wrists on the desk edge — this causes strain',
      '💡 Good posture prevents carpal tunnel syndrome and back pain during long typing sessions',
    ],
  },
  {
    id: 'home-position',
    icon: '🏠',
    title: 'Home Row Position',
    category: 'Foundation',
    content: [
      '✅ Left hand fingers rest on: A (pinky) S (ring) D (middle) F (index)',
      '✅ Right hand fingers rest on: J (index) K (middle) L (ring) ; (pinky)',
      '✅ Both thumbs rest on the Space bar',
      '✅ Feel the small bumps on F and J keys — they help you find home position without looking',
      '✅ After pressing ANY key, your finger should immediately return to its home position',
      '💡 The home position is your "base camp" — you always return here between keystrokes',
      '💡 Think of it like a guitar player\'s hand always returning to the correct fret position',
    ],
  },
  {
    id: 'touch-typing',
    icon: '👆',
    title: 'Touch Typing Method',
    category: 'Core Technique',
    content: [
      '✅ NEVER look at the keyboard while typing',
      '✅ Each finger is responsible for specific keys — don\'t use the wrong finger!',
      '✅ Left pinky: Q, A, Z, 1, Tab, Caps, Shift',
      '✅ Left ring: W, S, X, 2',
      '✅ Left middle: E, D, C, 3',
      '✅ Left index: R, F, V, T, G, B, 4, 5',
      '✅ Right index: Y, H, N, U, J, M, 6, 7',
      '✅ Right middle: I, K, comma, 8',
      '✅ Right ring: O, L, period, 9',
      '✅ Right pinky: P, semicolon, slash, 0, brackets, Enter, Shift',
      '💡 It feels slow at first — that\'s normal! You\'re building muscle memory that will pay off hugely',
    ],
  },
  {
    id: 'accuracy-first',
    icon: '🎯',
    title: 'Accuracy Over Speed',
    category: 'Core Technique',
    content: [
      '✅ Always prioritize accuracy over speed',
      '✅ Going back to fix errors wastes more time than typing slowly and correctly',
      '✅ Aim for 95%+ accuracy before trying to increase speed',
      '✅ Slow down when you notice errors increasing',
      '✅ Practice difficult combinations at 50% of your max speed',
      '💡 Formula: Effective WPM = Raw WPM × (Accuracy/100). 40 WPM at 98% > 60 WPM at 80%!',
      '💡 Build the habit of typing correctly first. Speed follows naturally with practice.',
    ],
  },
  {
    id: 'rhythm',
    icon: '🎵',
    title: 'Rhythm Typing',
    category: 'Speed Technique',
    content: [
      '✅ Try to type at a consistent, even rhythm — like a metronome',
      '✅ Don\'t burst-type (fast-slow-fast). Steady tempo is faster overall',
      '✅ Listen to the sound of your keystrokes — they should be evenly spaced',
      '✅ Start with a comfortable slow rhythm and gradually increase',
      '✅ The gap between keystrokes should be roughly the same',
      '💡 Some typists listen to a metronome app while practicing to build rhythm',
      '💡 Consistent rhythm reduces errors because your brain can predict the timing',
    ],
  },
  {
    id: 'look-ahead',
    icon: '👀',
    title: 'Look-Ahead Reading',
    category: 'Speed Technique',
    content: [
      '✅ While typing the current word, your eyes should be reading the NEXT word',
      '✅ This "buffer" allows your brain to prepare finger movements in advance',
      '✅ Try to read 1-2 words ahead of what you\'re currently typing',
      '✅ Practice by consciously forcing your eyes forward while typing',
      '✅ This eliminates the pause between words that slows you down',
      '💡 Think of it like driving — you look ahead on the road, not at the hood of your car',
      '💡 Expert typists read entire phrases ahead, processing them as muscle memory patterns',
    ],
  },
  {
    id: 'chunking',
    icon: '🧩',
    title: 'Word Chunking',
    category: 'Speed Technique',
    content: [
      '✅ Stop reading letter-by-letter. See common words as single "chunks"',
      '✅ Words like "the", "and", "for", "with" should be typed as single motor patterns',
      '✅ Common letter combinations: "tion", "ing", "ment", "ness" become one movement',
      '✅ Practice common word patterns until they\'re automatic',
      '✅ Think of it like reading — you don\'t read letter-by-letter, you recognize words as shapes',
      '💡 Your brain can learn to output "the" as a single keystroke pattern instead of t-h-e',
      '💡 The more you practice, the more words become automatic chunks',
    ],
  },
  {
    id: 'opposite-shift',
    icon: '⇧',
    title: 'Opposite Shift Rule',
    category: 'Essential Rules',
    content: [
      '✅ When typing a capital letter with your LEFT hand, use RIGHT Shift',
      '✅ When typing a capital letter with your RIGHT hand, use LEFT Shift',
      '✅ This keeps your hands balanced and reduces strain',
      '✅ Example: "A" = Right Shift + A, "J" = Left Shift + J',
      '✅ Same rule applies for symbols: ! @ # (left Shift), & * ( (right Shift)',
      '❌ Never use the same hand for both the letter and Shift',
      '💡 This feels awkward at first but becomes second nature with practice',
    ],
  },
  {
    id: 'minimize-movement',
    icon: '🎯',
    title: 'Minimize Finger Movement',
    category: 'Advanced Technique',
    content: [
      '✅ Keep your fingers close to the keys — don\'t lift them high',
      '✅ Use the minimum force needed to press a key',
      '✅ Keep fingers slightly curved, like holding a ball',
      '✅ Only move the finger that needs to press a key — keep others still',
      '✅ Practice "quiet hands" — minimize unnecessary movement',
      '💡 Watch professional typists — their hands barely move. It\'s all about efficiency',
      '💡 Heavy keystrokes slow you down and cause fatigue. Light touch = fast typing',
    ],
  },
  {
    id: 'practice-weak',
    icon: '💪',
    title: 'Practice Weak Points',
    category: 'Training Strategy',
    content: [
      '✅ Identify which keys you make the most mistakes on',
      '✅ Dedicate extra practice time to those specific keys',
      '✅ The pinky fingers are usually weakest — give them extra attention',
      '✅ Common trouble spots: Z, X, Q, P, numbers, and symbols',
      '✅ Create custom drills focusing on your problem keys',
      '✅ Practice transitions between difficult key combinations',
      '💡 A chain is only as strong as its weakest link. Strengthen your weak keys!',
    ],
  },
  {
    id: 'daily-routine',
    icon: '📅',
    title: 'Daily Practice Routine',
    category: 'Training Strategy',
    content: [
      '✅ Practice 15-30 minutes every day — consistency beats intensity',
      '✅ Warm up with home row drills for 2-3 minutes',
      '✅ Practice weak keys/fingers for 5 minutes',
      '✅ Do a typing test to measure progress (2-3 minutes)',
      '✅ Practice with real text (articles, code) for 5-10 minutes',
      '✅ Play a typing game for fun and engagement (5 minutes)',
      '✅ Track your WPM and accuracy daily to see improvement',
      '💡 It takes about 2-4 weeks of daily practice to see significant improvement',
      '💡 Most people can reach 60 WPM within 1-2 months of consistent practice',
    ],
  },
  {
    id: 'ergonomics',
    icon: '⌨️',
    title: 'Keyboard & Ergonomics',
    category: 'Equipment',
    content: [
      '✅ Use a keyboard with good key travel and feedback (mechanical keyboards are great)',
      '✅ Consider a split or ergonomic keyboard for long sessions',
      '✅ Keep your keyboard flat or slightly tilted (not too steep)',
      '✅ Take breaks every 30-45 minutes — stretch your hands and wrists',
      '✅ Do hand stretches: spread fingers wide, make fists, rotate wrists',
      '✅ The keyboard should be at the same height as your relaxed elbows',
      '💡 Hand exercises: Place hand flat on desk, lift each finger individually 10 times',
      '💡 Wrist stretch: Extend arm, pull fingers back gently with other hand, hold 15 seconds',
    ],
  },
  {
    id: 'programming-tips',
    icon: '💻',
    title: 'Tips for Programmers',
    category: 'Programming',
    content: [
      '✅ Practice special characters daily: ; { } ( ) [ ] < > = ! & | " \' ` ~',
      '✅ Learn your IDE keyboard shortcuts — they save massive time',
      '✅ Use snippet expansion tools to type common patterns with shortcuts',
      '✅ Practice typing code syntax specifically (different from prose)',
      '✅ Common programming patterns to drill: if() {}, for() {}, function() {}, =>',
      '✅ Practice typing file paths and URLs: /src/components/App.tsx',
      '✅ Get comfortable with numbers — they appear often in code',
      '✅ Practice camelCase and snake_case typing patterns',
      '💡 Programmer typing is 50% letters, 50% symbols. Most people only practice letters!',
      '💡 Use our Programming Practice section to specifically train coding muscle memory',
    ],
  },
];

const TechniquesScreen: React.FC<TechniquesScreenProps> = ({ onBack }) => {
  const [expandedId, setExpandedId] = useState<string | null>('posture');

  const categories = Array.from(new Set(techniques.map(t => t.category)));

  const toggle = (id: string) => {
    setExpandedId(prev => prev === id ? null : id);
  };

  return (
    <div className="max-w-4xl mx-auto slide-up">
      <div className="flex items-center gap-4 mb-8">
        <button onClick={onBack} className="p-2 hover:bg-gray-800 rounded-lg transition-colors">
          <ArrowLeft className="w-6 h-6" />
        </button>
        <div>
          <h2 className="text-3xl font-bold">💡 Typing Techniques</h2>
          <p className="text-gray-400">Proven methods to type faster and more accurately</p>
        </div>
      </div>

      {/* Quick reference */}
      <div className="glass rounded-xl p-5 mb-6 border-l-4 border-yellow-500">
        <h3 className="font-bold text-yellow-300 mb-2">🚀 Quick Speed Formula</h3>
        <p className="text-gray-300 text-sm mb-2">
          <strong>Accuracy First</strong> → <strong>Correct Finger Placement</strong> → <strong>Rhythm</strong> → <strong>Look-Ahead</strong> → <strong>Chunking</strong> → <strong>Speed!</strong>
        </p>
        <p className="text-gray-400 text-xs">Follow this progression. Don't skip steps — each builds on the previous one.</p>
      </div>

      {/* Technique Categories */}
      <div className="space-y-6">
        {categories.map(category => (
          <div key={category}>
            <h3 className="text-lg font-semibold text-gray-300 mb-3 flex items-center gap-2">
              <span className="w-2 h-2 bg-blue-500 rounded-full" />
              {category}
            </h3>
            <div className="space-y-2">
              {techniques.filter(t => t.category === category).map(tech => {
                const isExpanded = expandedId === tech.id;
                return (
                  <div key={tech.id} className="glass rounded-xl overflow-hidden">
                    <button
                      onClick={() => toggle(tech.id)}
                      className="w-full p-4 text-left flex items-center gap-3 hover:bg-gray-700/30 transition-colors"
                    >
                      <span className="text-2xl">{tech.icon}</span>
                      <span className="flex-1 font-semibold text-white">{tech.title}</span>
                      {isExpanded ? (
                        <ChevronUp className="w-5 h-5 text-gray-400" />
                      ) : (
                        <ChevronDown className="w-5 h-5 text-gray-400" />
                      )}
                    </button>
                    {isExpanded && (
                      <div className="px-4 pb-4 fade-in">
                        <div className="border-t border-gray-700/50 pt-3 space-y-2">
                          {tech.content.map((line, i) => (
                            <p key={i} className={`text-sm ${
                              line.startsWith('✅') ? 'text-gray-300' :
                              line.startsWith('❌') ? 'text-red-400/80' :
                              line.startsWith('💡') ? 'text-yellow-400/80 italic' :
                              'text-gray-400'
                            }`}>
                              {line}
                            </p>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      {/* Hand position diagram */}
      <div className="glass rounded-xl p-6 mt-8">
        <h3 className="text-lg font-bold mb-4">🤲 Finger-to-Key Map</h3>
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <h4 className="font-semibold text-blue-400 mb-2">Left Hand</h4>
            <div className="space-y-1.5">
              <div className="flex items-center gap-2"><span className="w-3 h-3 rounded-full bg-red-500" /> <span className="text-gray-300">Pinky: Q A Z 1</span></div>
              <div className="flex items-center gap-2"><span className="w-3 h-3 rounded-full bg-orange-500" /> <span className="text-gray-300">Ring: W S X 2</span></div>
              <div className="flex items-center gap-2"><span className="w-3 h-3 rounded-full bg-yellow-500" /> <span className="text-gray-300">Middle: E D C 3</span></div>
              <div className="flex items-center gap-2"><span className="w-3 h-3 rounded-full bg-green-500" /> <span className="text-gray-300">Index: R F V T G B 4 5</span></div>
            </div>
          </div>
          <div>
            <h4 className="font-semibold text-blue-400 mb-2">Right Hand</h4>
            <div className="space-y-1.5">
              <div className="flex items-center gap-2"><span className="w-3 h-3 rounded-full bg-green-500" /> <span className="text-gray-300">Index: Y H N U J M 6 7</span></div>
              <div className="flex items-center gap-2"><span className="w-3 h-3 rounded-full bg-yellow-500" /> <span className="text-gray-300">Middle: I K , 8</span></div>
              <div className="flex items-center gap-2"><span className="w-3 h-3 rounded-full bg-orange-500" /> <span className="text-gray-300">Ring: O L . 9</span></div>
              <div className="flex items-center gap-2"><span className="w-3 h-3 rounded-full bg-red-500" /> <span className="text-gray-300">Pinky: P ; / 0 [ ] Enter</span></div>
            </div>
          </div>
          <div className="col-span-2 text-center">
            <div className="flex items-center gap-2 justify-center"><span className="w-3 h-3 rounded-full bg-purple-500" /> <span className="text-gray-300">Thumbs: Space Bar</span></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TechniquesScreen;
