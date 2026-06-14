import React, { useState, useEffect, useCallback, useRef } from 'react';
import { ArrowLeft, Play, Heart, Zap, Star, Trophy } from 'lucide-react';
import { getFingerForKey, getFingerColor } from '../data/lessons';

interface TypingGamesProps {
  onBack: () => void;
  onComplete: (wpm: number, accuracy: number) => void;
}

type GameType = 'menu' | 'falling-words' | 'speed-burst' | 'word-chain';

// ===== WORD LISTS =====
const easyWords = ['the', 'and', 'for', 'are', 'but', 'not', 'you', 'all', 'can', 'her', 'was', 'one', 'our', 'out', 'day', 'get', 'has', 'him', 'how', 'its', 'may', 'new', 'old', 'see', 'way', 'did', 'let', 'say', 'she', 'too', 'use', 'big', 'end', 'got', 'put', 'ran', 'ask', 'run', 'set', 'try', 'top', 'red', 'hot', 'sit', 'oil', 'had'];
const medWords = ['help', 'good', 'just', 'long', 'make', 'much', 'name', 'over', 'take', 'come', 'give', 'look', 'only', 'also', 'back', 'been', 'call', 'down', 'find', 'hand', 'high', 'keep', 'last', 'move', 'must', 'need', 'part', 'play', 'show', 'side', 'tell', 'turn', 'very', 'want', 'well', 'went', 'what', 'when', 'will', 'with', 'work', 'year', 'your', 'each', 'even', 'form', 'grow', 'head'];
const hardWords = ['about', 'after', 'again', 'begin', 'being', 'could', 'every', 'found', 'going', 'great', 'house', 'large', 'learn', 'never', 'other', 'place', 'plant', 'point', 'right', 'small', 'sound', 'spell', 'still', 'study', 'their', 'there', 'think', 'those', 'under', 'water', 'where', 'which', 'world', 'would', 'write', 'young', 'always', 'change', 'differ', 'follow'];

function randomWord(level: number): string {
  if (level < 3) return easyWords[Math.floor(Math.random() * easyWords.length)];
  if (level < 6) return medWords[Math.floor(Math.random() * medWords.length)];
  return hardWords[Math.floor(Math.random() * hardWords.length)];
}

// Compact game finger indicator with mini hand visual
const FingerIndicator: React.FC<{ char: string }> = ({ char }) => {
  if (!char) return null;
  const finger = getFingerForKey(char);
  const color = getFingerColor(finger);

  const fingerNames: Record<string, string> = {
    'pinky-left': 'L.Pinky', 'ring-left': 'L.Ring', 'middle-left': 'L.Middle', 'index-left': 'L.Index',
    'thumb': 'Thumb',
    'index-right': 'R.Index', 'middle-right': 'R.Middle', 'ring-right': 'R.Ring', 'pinky-right': 'R.Pinky',
  };

  const leftFingers = ['pinky-left', 'ring-left', 'middle-left', 'index-left'];
  const rightFingers = ['index-right', 'middle-right', 'ring-right', 'pinky-right'];
  const isLeft = finger.includes('left');

  return (
    <div className="flex items-center justify-center gap-3 text-sm">
      {/* Mini hand dots */}
      <div className="flex items-end gap-0.5">
        {(isLeft || finger === 'thumb' ? leftFingers : rightFingers).map((f, i) => {
          const isActive = f === finger;
          const heights = isLeft ? [14, 18, 20, 17] : [17, 20, 18, 14];
          return (
            <div
              key={f}
              className={`rounded-full transition-all ${isActive ? 'ring-1 ring-white scale-110' : 'opacity-30'}`}
              style={{
                width: 6,
                height: heights[i],
                backgroundColor: isActive ? color : getFingerColor(f),
              }}
            />
          );
        })}
        {/* thumb */}
        <div
          className={`rounded-full ml-0.5 transition-all ${finger === 'thumb' ? 'ring-1 ring-white scale-110' : 'opacity-30'}`}
          style={{ width: 8, height: 6, backgroundColor: finger === 'thumb' ? color : getFingerColor('thumb') }}
        />
      </div>

      {/* Finger label */}
      <div className="px-2.5 py-0.5 rounded-full text-white font-semibold text-xs" style={{ backgroundColor: color }}>
        {fingerNames[finger] || finger}
      </div>

      {/* Key */}
      <div className="bg-gray-800 border border-gray-600 text-white px-2 py-0.5 rounded font-mono font-bold text-sm"
           style={{ borderBottomColor: color, borderBottomWidth: '2px' }}>
        {char === ' ' ? '␣' : char.toUpperCase()}
      </div>
    </div>
  );
};

// ===== FALLING WORDS GAME =====
interface FallingWord {
  id: number;
  text: string;
  x: number;
  y: number;
  speed: number;
}

const FallingWordsGame: React.FC<{ onBack: () => void; onComplete: (wpm: number, accuracy: number) => void }> = ({ onBack, onComplete }) => {
  const [words, setWords] = useState<FallingWord[]>([]);
  const [input, setInput] = useState('');
  const [score, setScore] = useState(0);
  const [lives, setLives] = useState(5);
  const [level, setLevel] = useState(1);
  const [isPlaying, setIsPlaying] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [wordsTyped, setWordsTyped] = useState(0);
  const [totalChars, setTotalChars] = useState(0);
  const [correctChars, setCorrectChars] = useState(0);
  const [startTime, setStartTime] = useState(0);
  const [currentTargetChar, setCurrentTargetChar] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);
  const gameAreaRef = useRef<HTMLDivElement>(null);
  const animationRef = useRef<number>(0);
  const lastTimeRef = useRef<number>(0);
  const lastSpawnRef = useRef<number>(0);
  const wordsRef = useRef<FallingWord[]>([]);
  const wordIdRef = useRef(0);
  const livesRef = useRef(5);

  // Keep refs in sync
  useEffect(() => {
    wordsRef.current = words;
  }, [words]);

  useEffect(() => {
    livesRef.current = lives;
  }, [lives]);

  const startGame = useCallback(() => {
    setWords([]);
    wordsRef.current = [];
    setInput('');
    setScore(0);
    setLives(5);
    livesRef.current = 5;
    setLevel(1);
    setWordsTyped(0);
    setTotalChars(0);
    setCorrectChars(0);
    setIsPlaying(true);
    setGameOver(false);
    setStartTime(Date.now());
    setCurrentTargetChar('');
    lastSpawnRef.current = 0;
    lastTimeRef.current = 0;
    wordIdRef.current = 0;
    inputRef.current?.focus();
  }, []);

  // Game loop using requestAnimationFrame with delta time
  useEffect(() => {
    if (!isPlaying || gameOver) return;

    const gameLoop = (timestamp: number) => {
      if (!lastTimeRef.current) lastTimeRef.current = timestamp;
      const deltaTime = timestamp - lastTimeRef.current;
      lastTimeRef.current = timestamp;

      // Spawn interval based on level (ms)
      const spawnInterval = Math.max(2000 - level * 150, 800);

      // Spawn new word
      if (timestamp - lastSpawnRef.current > spawnInterval) {
        const newWord: FallingWord = {
          id: wordIdRef.current++,
          text: randomWord(level),
          x: 10 + Math.random() * 80,
          y: 0,
          speed: 0.02 + level * 0.005 + Math.random() * 0.01,
        };
        setWords(prev => [...prev, newWord]);
        lastSpawnRef.current = timestamp;
      }

      // Move words down
      setWords(prev => {
        const updated = prev.map(w => ({
          ...w,
          y: w.y + w.speed * deltaTime
        }));
        
        const stillAlive: FallingWord[] = [];
        let missedCount = 0;
        
        for (const w of updated) {
          if (w.y >= 100) {
            missedCount++;
          } else {
            stillAlive.push(w);
          }
        }

        if (missedCount > 0) {
          setLives(l => {
            const newLives = Math.max(0, l - missedCount);
            if (newLives <= 0) {
              setGameOver(true);
              setIsPlaying(false);
            }
            return newLives;
          });
        }

        return stillAlive;
      });

      animationRef.current = requestAnimationFrame(gameLoop);
    };

    animationRef.current = requestAnimationFrame(gameLoop);
    
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [isPlaying, gameOver, level]);

  // Level up
  useEffect(() => {
    const newLevel = Math.floor(wordsTyped / 5) + 1;
    if (newLevel > level && newLevel <= 10) setLevel(newLevel);
  }, [wordsTyped, level]);

  // Update target char for finger indicator
  useEffect(() => {
    // Find the word closest to bottom that starts with current input
    const matching = words
      .filter(w => w.text.startsWith(input))
      .sort((a, b) => b.y - a.y);
    
    if (matching.length > 0 && input.length < matching[0].text.length) {
      setCurrentTargetChar(matching[0].text[input.length]);
    } else if (words.length > 0) {
      // Show the first char of the lowest word
      const lowest = [...words].sort((a, b) => b.y - a.y)[0];
      setCurrentTargetChar(lowest.text[0]);
    } else {
      setCurrentTargetChar('');
    }
  }, [words, input]);

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value.toLowerCase();
    setInput(val);
    
    if (val.length > 0) {
      setTotalChars(prev => prev + 1);
    }

    // Check if any word matches
    const matched = words.find(w => w.text === val.trim());
    if (matched) {
      setWords(prev => prev.filter(w => w.id !== matched.id));
      setScore(prev => prev + matched.text.length * 10 + Math.floor((100 - matched.y) * 2));
      setWordsTyped(prev => prev + 1);
      setCorrectChars(prev => prev + matched.text.length);
      setInput('');
    }
  };

  // Handle game over stats
  useEffect(() => {
    if (gameOver && startTime > 0) {
      const elapsed = (Date.now() - startTime) / 1000 / 60;
      const wpm = elapsed > 0 ? Math.round((correctChars / 5) / elapsed) : 0;
      const accuracy = totalChars > 0 ? Math.round((correctChars / totalChars) * 100) : 0;
      onComplete(wpm, Math.min(accuracy, 100));
    }
  }, [gameOver, startTime, correctChars, totalChars, onComplete]);

  if (gameOver) {
    const elapsed = (Date.now() - startTime) / 1000 / 60;
    const wpm = elapsed > 0 ? Math.round((correctChars / 5) / elapsed) : 0;
    return (
      <div className="max-w-2xl mx-auto text-center slide-up">
        <h2 className="text-4xl font-black text-red-400 mb-4">Game Over!</h2>
        <div className="glass rounded-2xl p-8 mb-6">
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="bg-gray-800/50 rounded-xl p-4">
              <Trophy className="w-6 h-6 text-yellow-400 mx-auto mb-2" />
              <div className="text-3xl font-bold text-white">{score}</div>
              <div className="text-sm text-gray-400">Score</div>
            </div>
            <div className="bg-gray-800/50 rounded-xl p-4">
              <Zap className="w-6 h-6 text-blue-400 mx-auto mb-2" />
              <div className="text-3xl font-bold text-white">{wpm}</div>
              <div className="text-sm text-gray-400">WPM</div>
            </div>
            <div className="bg-gray-800/50 rounded-xl p-4">
              <Star className="w-6 h-6 text-purple-400 mx-auto mb-2" />
              <div className="text-3xl font-bold text-white">Level {level}</div>
              <div className="text-sm text-gray-400">Reached</div>
            </div>
            <div className="bg-gray-800/50 rounded-xl p-4">
              <Star className="w-6 h-6 text-green-400 mx-auto mb-2" />
              <div className="text-3xl font-bold text-white">{wordsTyped}</div>
              <div className="text-sm text-gray-400">Words</div>
            </div>
          </div>
          <div className="flex gap-3 justify-center">
            <button onClick={startGame} className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-bold transition-colors">
              🔄 Play Again
            </button>
            <button onClick={onBack} className="px-6 py-3 bg-gray-700 hover:bg-gray-600 text-white rounded-xl font-bold transition-colors">
              ← Back
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (!isPlaying) {
    return (
      <div className="max-w-2xl mx-auto text-center slide-up">
        <div className="text-6xl mb-4">🌧️</div>
        <h2 className="text-3xl font-black text-white mb-2">Falling Words</h2>
        <p className="text-gray-400 mb-6">Words fall from the sky! Type them before they reach the bottom. Speed increases as you level up!</p>
        <div className="glass rounded-xl p-4 mb-6 text-left text-sm text-gray-300">
          <h4 className="font-bold text-white mb-2">How to play:</h4>
          <ul className="space-y-1">
            <li>• Type the falling words before they hit the bottom</li>
            <li>• Press Enter or complete the word to clear it</li>
            <li>• Higher words = more points</li>
            <li>• Every 5 words = next level (faster!)</li>
            <li>• 5 lives - lose one for each missed word</li>
          </ul>
        </div>
        <button onClick={startGame} className="px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-bold text-lg transition-colors flex items-center gap-2 mx-auto">
          <Play className="w-5 h-5" /> Start Game
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      {/* HUD */}
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-4">
          <button onClick={onBack} className="p-1.5 hover:bg-gray-800 rounded-lg transition-colors">
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div className="flex items-center gap-1">
            {Array.from({ length: 5 }).map((_, i) => (
              <Heart key={i} className={`w-5 h-5 transition-all ${i < lives ? 'text-red-500 fill-red-500' : 'text-gray-700'}`} />
            ))}
          </div>
        </div>
        <div className="flex items-center gap-4 text-sm">
          <span className="text-yellow-400 font-bold">⭐ {score}</span>
          <span className="text-purple-400 font-bold">Lv.{level}</span>
          <span className="text-green-400 font-bold">{wordsTyped} words</span>
        </div>
      </div>

      {/* Finger indicator */}
      <div className="mb-3 h-8">
        {currentTargetChar && <FingerIndicator char={currentTargetChar} />}
      </div>

      {/* Game Area */}
      <div 
        ref={gameAreaRef}
        className="relative bg-gradient-to-b from-gray-900 to-gray-800 rounded-xl border border-gray-700/30 h-72 overflow-hidden mb-4"
      >
        {/* Sky effect */}
        <div className="absolute inset-0 bg-gradient-to-b from-indigo-900/20 to-transparent" />
        
        {/* Danger zone */}
        <div className="absolute bottom-0 left-0 right-0 h-2 bg-red-500/80 z-10" />
        <div className="absolute bottom-0 left-0 right-0 h-12 bg-gradient-to-t from-red-900/30 to-transparent" />

        {/* Words */}
        {words.map(word => {
          const isPartialMatch = input.length > 0 && word.text.startsWith(input);
          const dangerZone = word.y > 70;
          
          return (
            <div
              key={word.id}
              className={`absolute px-3 py-1 rounded-lg font-mono font-bold text-lg transition-colors
                ${isPartialMatch 
                  ? 'bg-yellow-500/30 border-2 border-yellow-400 text-yellow-200 scale-110 z-20' 
                  : dangerZone 
                    ? 'bg-red-600/40 border border-red-500 text-red-200' 
                    : 'bg-blue-600/30 border border-blue-500/50 text-white'
                }`}
              style={{
                left: `${word.x}%`,
                top: `${word.y}%`,
                transform: 'translateX(-50%)',
              }}
            >
              {isPartialMatch ? (
                <>
                  <span className="text-green-400">{word.text.slice(0, input.length)}</span>
                  <span>{word.text.slice(input.length)}</span>
                </>
              ) : word.text}
            </div>
          );
        })}

        {/* Empty state */}
        {words.length === 0 && (
          <div className="absolute inset-0 flex items-center justify-center text-gray-500">
            Words incoming...
          </div>
        )}
      </div>

      {/* Input */}
      <input
        ref={inputRef}
        type="text"
        value={input}
        onChange={handleInput}
        className="w-full bg-gray-800 border-2 border-gray-600 rounded-xl px-6 py-4 text-xl text-white font-mono text-center focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/30"
        placeholder="Type the falling words..."
        autoFocus
        autoComplete="off"
        autoCorrect="off"
        autoCapitalize="off"
        spellCheck={false}
      />
    </div>
  );
};

// ===== SPEED BURST GAME =====
const SpeedBurstGame: React.FC<{ onBack: () => void; onComplete: (wpm: number, accuracy: number) => void }> = ({ onBack, onComplete }) => {
  const [currentWord, setCurrentWord] = useState('');
  const [input, setInput] = useState('');
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [bestStreak, setBestStreak] = useState(0);
  const [timeLeft, setTimeLeft] = useState(30);
  const [isPlaying, setIsPlaying] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [totalTyped, setTotalTyped] = useState(0);
  const [correctTyped, setCorrectTyped] = useState(0);
  const [lastResult, setLastResult] = useState<'correct' | 'wrong' | null>(null);
  const [currentTargetChar, setCurrentTargetChar] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  const nextWord = useCallback(() => {
    const level = Math.floor(score / 50);
    const word = randomWord(level);
    setCurrentWord(word);
    setInput('');
    setCurrentTargetChar(word[0]);
  }, [score]);

  const startGame = () => {
    setScore(0);
    setStreak(0);
    setBestStreak(0);
    setTimeLeft(30);
    setIsPlaying(true);
    setGameOver(false);
    setTotalTyped(0);
    setCorrectTyped(0);
    setLastResult(null);
    const word = randomWord(0);
    setCurrentWord(word);
    setCurrentTargetChar(word[0]);
    setInput('');
    inputRef.current?.focus();
  };

  // Timer
  useEffect(() => {
    if (!isPlaying || gameOver) return;
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          setGameOver(true);
          setIsPlaying(false);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [isPlaying, gameOver]);

  useEffect(() => {
    if (gameOver) {
      const wpm = Math.round((correctTyped / 5) / 0.5);
      const accuracy = totalTyped > 0 ? Math.round((correctTyped / totalTyped) * 100) : 0;
      onComplete(wpm, Math.min(accuracy, 100));
    }
  }, [gameOver, correctTyped, totalTyped, onComplete]);

  // Update target char
  useEffect(() => {
    if (currentWord && input.length < currentWord.length) {
      setCurrentTargetChar(currentWord[input.length]);
    }
  }, [currentWord, input]);

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setInput(val);
    setTotalTyped(prev => prev + 1);
    setLastResult(null);

    if (val.trim() === currentWord) {
      setScore(prev => prev + currentWord.length * 10 + streak * 5);
      setStreak(prev => {
        const ns = prev + 1;
        setBestStreak(b => Math.max(b, ns));
        return ns;
      });
      setCorrectTyped(prev => prev + currentWord.length);
      setLastResult('correct');
      // Bonus time for streaks
      if ((streak + 1) % 5 === 0) {
        setTimeLeft(prev => Math.min(prev + 3, 60));
      }
      nextWord();
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === ' ' || e.key === 'Enter') {
      e.preventDefault();
      if (input.trim() !== currentWord && input.length > 0) {
        setStreak(0);
        setLastResult('wrong');
        setInput('');
      }
    }
  };

  if (gameOver) {
    const wpm = Math.round((correctTyped / 5) / 0.5);
    return (
      <div className="max-w-2xl mx-auto text-center slide-up">
        <h2 className="text-4xl font-black text-yellow-400 mb-4">⚡ Time's Up!</h2>
        <div className="glass rounded-2xl p-8 mb-6">
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="bg-gray-800/50 rounded-xl p-4">
              <div className="text-3xl font-bold text-yellow-400">{score}</div>
              <div className="text-sm text-gray-400">Score</div>
            </div>
            <div className="bg-gray-800/50 rounded-xl p-4">
              <div className="text-3xl font-bold text-blue-400">{wpm}</div>
              <div className="text-sm text-gray-400">WPM</div>
            </div>
            <div className="bg-gray-800/50 rounded-xl p-4">
              <div className="text-3xl font-bold text-orange-400">{bestStreak}🔥</div>
              <div className="text-sm text-gray-400">Best Streak</div>
            </div>
            <div className="bg-gray-800/50 rounded-xl p-4">
              <div className="text-3xl font-bold text-green-400">{Math.min(Math.round((correctTyped / Math.max(totalTyped, 1)) * 100), 100)}%</div>
              <div className="text-sm text-gray-400">Accuracy</div>
            </div>
          </div>
          <div className="flex gap-3 justify-center">
            <button onClick={startGame} className="px-6 py-3 bg-yellow-600 hover:bg-yellow-700 text-white rounded-xl font-bold transition-colors">
              🔄 Play Again
            </button>
            <button onClick={onBack} className="px-6 py-3 bg-gray-700 hover:bg-gray-600 text-white rounded-xl font-bold transition-colors">
              ← Back
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (!isPlaying) {
    return (
      <div className="max-w-2xl mx-auto text-center slide-up">
        <div className="text-6xl mb-4">⚡</div>
        <h2 className="text-3xl font-black text-white mb-2">Speed Burst</h2>
        <p className="text-gray-400 mb-6">Type as many words as you can in 30 seconds! Build streaks for bonus points. Every 5-word streak gives +3 seconds!</p>
        <button onClick={startGame} className="px-8 py-4 bg-yellow-600 hover:bg-yellow-700 text-white rounded-xl font-bold text-lg transition-colors flex items-center gap-2 mx-auto">
          <Play className="w-5 h-5" /> Start Game
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto">
      {/* HUD */}
      <div className="flex items-center justify-between mb-4">
        <button onClick={onBack} className="p-1.5 hover:bg-gray-800 rounded-lg transition-colors">
          <ArrowLeft className="w-5 h-5" />
        </button>
        <div className="flex items-center gap-6 text-sm">
          <span className={`font-bold text-3xl font-mono ${timeLeft <= 5 ? 'text-red-400 animate-pulse' : 'text-white'}`}>
            {timeLeft}s
          </span>
          <span className="text-yellow-400 font-bold">⭐ {score}</span>
          {streak > 0 && <span className="text-orange-400 font-bold animate-pulse">🔥 {streak}</span>}
        </div>
      </div>

      {/* Timer bar */}
      <div className="w-full bg-gray-700 rounded-full h-2 mb-6">
        <div
          className={`h-2 rounded-full transition-all duration-1000 ${timeLeft <= 5 ? 'bg-red-500' : 'bg-yellow-500'}`}
          style={{ width: `${(timeLeft / 30) * 100}%` }}
        />
      </div>

      {/* Finger indicator */}
      <div className="mb-4 h-8">
        {currentTargetChar && <FingerIndicator char={currentTargetChar} />}
      </div>

      {/* Word Display */}
      <div className={`text-center mb-8 transition-all duration-200 ${
        lastResult === 'correct' ? 'scale-105' : lastResult === 'wrong' ? 'scale-95' : ''
      }`}>
        <div className={`text-5xl md:text-7xl font-black font-mono tracking-wider mb-4 ${
          lastResult === 'correct' ? 'text-green-400' : lastResult === 'wrong' ? 'text-red-400' : 'text-white'
        }`}>
          {currentWord.split('').map((char, i) => (
            <span key={i} className={
              i < input.length
                ? input[i] === char ? 'text-green-400' : 'text-red-400'
                : 'text-gray-300'
            }>
              {char}
            </span>
          ))}
        </div>
        {streak >= 3 && (
          <div className="text-orange-400 text-sm font-bold fade-in">
            🔥 {streak} streak! {(streak + 1) % 5 === 0 ? '+3 seconds!' : ''}
          </div>
        )}
      </div>

      {/* Input */}
      <input
        ref={inputRef}
        type="text"
        value={input}
        onChange={handleInput}
        onKeyDown={handleKeyDown}
        className="w-full bg-gray-800 border-2 border-gray-600 rounded-xl px-6 py-4 text-2xl text-white font-mono text-center focus:outline-none focus:border-yellow-500 focus:ring-2 focus:ring-yellow-500/30"
        placeholder="Type here..."
        autoFocus
        autoComplete="off"
        autoCorrect="off"
        autoCapitalize="off"
        spellCheck={false}
      />
    </div>
  );
};

// ===== WORD CHAIN GAME =====
const WordChainGame: React.FC<{ onBack: () => void; onComplete: (wpm: number, accuracy: number) => void }> = ({ onBack, onComplete }) => {
  const allWords = [...easyWords, ...medWords, ...hardWords];
  const [chain, setChain] = useState<string[]>([]);
  const [currentWord, setCurrentWord] = useState('');
  const [input, setInput] = useState('');
  const [score, setScore] = useState(0);
  const [mistakes, setMistakes] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [totalChars, setTotalChars] = useState(0);
  const [correctChars, setCorrectChars] = useState(0);
  const [startTime, setStartTime] = useState(0);
  const [maxChain, setMaxChain] = useState(0);
  const [currentTargetChar, setCurrentTargetChar] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  const getWordStartingWith = useCallback((letter: string): string => {
    const matches = allWords.filter(w => w.startsWith(letter.toLowerCase()));
    if (matches.length > 0) return matches[Math.floor(Math.random() * matches.length)];
    return allWords[Math.floor(Math.random() * allWords.length)];
  }, [allWords]);

  const startGame = () => {
    const first = allWords[Math.floor(Math.random() * allWords.length)];
    setCurrentWord(first);
    setCurrentTargetChar(first[0]);
    setChain([]);
    setInput('');
    setScore(0);
    setMistakes(0);
    setIsPlaying(true);
    setGameOver(false);
    setTotalChars(0);
    setCorrectChars(0);
    setStartTime(Date.now());
    setMaxChain(0);
    inputRef.current?.focus();
  };

  useEffect(() => {
    if (gameOver) {
      const elapsed = (Date.now() - startTime) / 1000 / 60;
      const wpm = elapsed > 0 ? Math.round((correctChars / 5) / elapsed) : 0;
      const accuracy = totalChars > 0 ? Math.round((correctChars / totalChars) * 100) : 0;
      onComplete(wpm, Math.min(accuracy, 100));
    }
  }, [gameOver, startTime, correctChars, totalChars, onComplete]);

  // Update target char
  useEffect(() => {
    if (currentWord && input.length < currentWord.length) {
      setCurrentTargetChar(currentWord[input.length]);
    }
  }, [currentWord, input]);

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setInput(val);
    setTotalChars(prev => prev + 1);

    if (val.trim() === currentWord) {
      setCorrectChars(prev => prev + currentWord.length);
      setScore(prev => prev + currentWord.length * 10);
      const newChain = [...chain, currentWord];
      setChain(newChain);
      setMaxChain(m => Math.max(m, newChain.length));
      // Next word starts with last letter of current word
      const lastLetter = currentWord[currentWord.length - 1];
      const next = getWordStartingWith(lastLetter);
      setCurrentWord(next);
      setCurrentTargetChar(next[0]);
      setInput('');
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      if (input.trim() !== currentWord && input.length > 0) {
        setMistakes(prev => {
          const nm = prev + 1;
          if (nm >= 3) {
            setGameOver(true);
            setIsPlaying(false);
          }
          return nm;
        });
        setInput('');
      }
    }
  };

  if (gameOver) {
    const elapsed = (Date.now() - startTime) / 1000 / 60;
    const wpm = elapsed > 0 ? Math.round((correctChars / 5) / elapsed) : 0;
    return (
      <div className="max-w-2xl mx-auto text-center slide-up">
        <h2 className="text-4xl font-black text-purple-400 mb-4">🔗 Chain Broken!</h2>
        <div className="glass rounded-2xl p-8 mb-6">
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="bg-gray-800/50 rounded-xl p-4">
              <div className="text-3xl font-bold text-yellow-400">{score}</div>
              <div className="text-sm text-gray-400">Score</div>
            </div>
            <div className="bg-gray-800/50 rounded-xl p-4">
              <div className="text-3xl font-bold text-blue-400">{wpm}</div>
              <div className="text-sm text-gray-400">WPM</div>
            </div>
            <div className="bg-gray-800/50 rounded-xl p-4">
              <div className="text-3xl font-bold text-purple-400">{maxChain}</div>
              <div className="text-sm text-gray-400">Longest Chain</div>
            </div>
            <div className="bg-gray-800/50 rounded-xl p-4">
              <div className="text-3xl font-bold text-green-400">{chain.length}</div>
              <div className="text-sm text-gray-400">Words Chained</div>
            </div>
          </div>
          <div className="flex gap-3 justify-center">
            <button onClick={startGame} className="px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white rounded-xl font-bold transition-colors">🔄 Play Again</button>
            <button onClick={onBack} className="px-6 py-3 bg-gray-700 hover:bg-gray-600 text-white rounded-xl font-bold transition-colors">← Back</button>
          </div>
        </div>
      </div>
    );
  }

  if (!isPlaying) {
    return (
      <div className="max-w-2xl mx-auto text-center slide-up">
        <div className="text-6xl mb-4">🔗</div>
        <h2 className="text-3xl font-black text-white mb-2">Word Chain</h2>
        <p className="text-gray-400 mb-6">Type the word shown. The next word starts with the last letter of the previous word! Build the longest chain. 3 mistakes and you're out!</p>
        <button onClick={startGame} className="px-8 py-4 bg-purple-600 hover:bg-purple-700 text-white rounded-xl font-bold text-lg transition-colors flex items-center gap-2 mx-auto">
          <Play className="w-5 h-5" /> Start Game
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto">
      <div className="flex items-center justify-between mb-4">
        <button onClick={onBack} className="p-1.5 hover:bg-gray-800 rounded-lg transition-colors">
          <ArrowLeft className="w-5 h-5" />
        </button>
        <div className="flex items-center gap-4 text-sm">
          <span className="text-yellow-400 font-bold">⭐ {score}</span>
          <span className="text-purple-400 font-bold">🔗 {chain.length}</span>
          <div className="flex gap-1">
            {Array.from({ length: 3 }).map((_, i) => (
              <Heart key={i} className={`w-4 h-4 ${i < 3 - mistakes ? 'text-red-500 fill-red-500' : 'text-gray-700'}`} />
            ))}
          </div>
        </div>
      </div>

      {/* Chain visualization */}
      <div className="glass rounded-xl p-3 mb-4 flex gap-1.5 flex-wrap max-h-20 overflow-y-auto scrollbar-hide">
        {chain.slice(-10).map((w, i) => (
          <span key={i} className="bg-purple-600/30 text-purple-300 text-xs px-2 py-1 rounded font-mono">
            {w}
          </span>
        ))}
        {chain.length > 0 && <span className="text-gray-500 text-xs self-center">→</span>}
        <span className="bg-blue-600/30 text-blue-300 text-xs px-2 py-1 rounded font-mono font-bold animate-pulse">
          {currentWord}
        </span>
      </div>

      {/* Finger indicator */}
      <div className="mb-4 h-8">
        {currentTargetChar && <FingerIndicator char={currentTargetChar} />}
      </div>

      {/* Current Word */}
      <div className="text-center mb-8">
        {chain.length > 0 && (
          <div className="text-sm text-gray-500 mb-2">
            Last letter: <span className="text-purple-400 font-bold text-lg">{chain[chain.length - 1]?.slice(-1).toUpperCase()}</span> →
          </div>
        )}
        <div className="text-5xl md:text-7xl font-black font-mono tracking-wider">
          {currentWord.split('').map((char, i) => (
            <span key={i} className={
              i < input.length ? (input[i] === char ? 'text-green-400' : 'text-red-400') : 'text-white'
            }>{char}</span>
          ))}
        </div>
      </div>

      <input
        ref={inputRef}
        type="text"
        value={input}
        onChange={handleInput}
        onKeyDown={handleKeyDown}
        className="w-full bg-gray-800 border-2 border-gray-600 rounded-xl px-6 py-4 text-2xl text-white font-mono text-center focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/30"
        placeholder="Type here..."
        autoFocus
        autoComplete="off"
        autoCorrect="off"
        autoCapitalize="off"
        spellCheck={false}
      />
    </div>
  );
};

// ===== MAIN TYPING GAMES COMPONENT =====
const TypingGames: React.FC<TypingGamesProps> = ({ onBack, onComplete }) => {
  const [game, setGame] = useState<GameType>('menu');

  const games = [
    {
      id: 'falling-words' as GameType,
      icon: '🌧️',
      title: 'Falling Words',
      description: 'Words fall from the sky! Type them before they hit the ground. Speed increases with each level.',
      color: 'from-blue-600 to-indigo-800',
      tag: 'Arcade',
    },
    {
      id: 'speed-burst' as GameType,
      icon: '⚡',
      title: 'Speed Burst',
      description: 'Type as many words as possible in 30 seconds. Build streaks for bonus time!',
      color: 'from-yellow-600 to-orange-800',
      tag: 'Timed',
    },
    {
      id: 'word-chain' as GameType,
      icon: '🔗',
      title: 'Word Chain',
      description: 'Each word starts with the last letter of the previous. Build the longest chain possible!',
      color: 'from-purple-600 to-pink-800',
      tag: 'Puzzle',
    },
  ];

  if (game === 'menu') {
    return (
      <div className="max-w-4xl mx-auto slide-up">
        <div className="flex items-center gap-4 mb-8">
          <button onClick={onBack} className="p-2 hover:bg-gray-800 rounded-lg transition-colors">
            <ArrowLeft className="w-6 h-6" />
          </button>
          <div>
            <h2 className="text-3xl font-bold">🎮 Typing Games</h2>
            <p className="text-gray-400">Learn typing through fun games!</p>
          </div>
        </div>

        <div className="grid gap-4">
          {games.map(g => (
            <button
              key={g.id}
              onClick={() => setGame(g.id)}
              className={`group bg-gradient-to-br ${g.color} rounded-2xl p-6 text-left transition-all hover:scale-[1.02] hover:shadow-lg border border-white/5`}
            >
              <div className="flex items-center gap-4">
                <div className="text-5xl">{g.icon}</div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="text-xl font-bold text-white">{g.title}</h3>
                    <span className="bg-white/15 text-white/80 text-xs px-2 py-0.5 rounded-full">{g.tag}</span>
                  </div>
                  <p className="text-white/60 text-sm">{g.description}</p>
                </div>
                <Play className="w-8 h-8 text-white/40 group-hover:text-white/80 transition-colors" />
              </div>
            </button>
          ))}
        </div>
      </div>
    );
  }

  const goBackToMenu = () => setGame('menu');

  switch (game) {
    case 'falling-words':
      return <FallingWordsGame onBack={goBackToMenu} onComplete={onComplete} />;
    case 'speed-burst':
      return <SpeedBurstGame onBack={goBackToMenu} onComplete={onComplete} />;
    case 'word-chain':
      return <WordChainGame onBack={goBackToMenu} onComplete={onComplete} />;
    default:
      return null;
  }
};

export default TypingGames;
