import React from 'react';
import { getFingerForKey, getFingerColor } from '../data/lessons';

interface HandsDisplayProps {
  activeKey: string;
  className?: string;
}

const fingerNames: Record<string, string> = {
  'pinky-left': 'Left Pinky',
  'ring-left': 'Left Ring',
  'middle-left': 'Left Middle',
  'index-left': 'Left Index',
  'thumb': 'Thumb',
  'index-right': 'Right Index',
  'middle-right': 'Right Middle',
  'ring-right': 'Right Ring',
  'pinky-right': 'Right Pinky',
};

// SVG path data for realistic hand shapes
// Left hand fingers (from pinky to index, left to right)
const leftHandFingers = [
  { id: 'pinky-left', 
    path: 'M22,70 L22,32 Q22,24 26,22 Q30,20 32,22 L34,32 L34,70',
    tip: { x: 28, y: 20 },
    base: { x: 28, y: 70 },
    nail: 'M24,28 Q28,18 32,28',
  },
  { id: 'ring-left',
    path: 'M40,70 L40,22 Q40,12 44,10 Q48,8 50,10 L52,22 L52,70',
    tip: { x: 46, y: 8 },
    base: { x: 46, y: 70 },
    nail: 'M42,18 Q46,6 50,18',
  },
  { id: 'middle-left',
    path: 'M58,70 L58,18 Q58,8 62,6 Q66,4 68,6 L70,18 L70,70',
    tip: { x: 64, y: 4 },
    base: { x: 64, y: 70 },
    nail: 'M60,14 Q64,2 68,14',
  },
  { id: 'index-left',
    path: 'M76,70 L76,22 Q76,14 80,12 Q84,10 86,12 L88,22 L88,70',
    tip: { x: 82, y: 10 },
    base: { x: 82, y: 70 },
    nail: 'M78,18 Q82,8 86,18',
  },
];

// Left thumb
const leftThumb = {
  id: 'thumb',
  path: 'M92,70 L96,52 Q98,44 102,42 Q106,40 108,44 L106,58 L100,70',
  tip: { x: 102, y: 40 },
};

// Right hand fingers (from index to pinky, left to right)
const rightHandFingers = [
  { id: 'index-right',
    path: 'M22,70 L22,22 Q22,14 26,12 Q30,10 32,12 L34,22 L34,70',
    tip: { x: 28, y: 10 },
    base: { x: 28, y: 70 },
    nail: 'M24,18 Q28,8 32,18',
  },
  { id: 'middle-right',
    path: 'M40,70 L40,18 Q40,8 44,6 Q48,4 50,6 L52,18 L52,70',
    tip: { x: 46, y: 4 },
    base: { x: 46, y: 70 },
    nail: 'M42,14 Q46,2 50,14',
  },
  { id: 'ring-right',
    path: 'M58,70 L58,22 Q58,12 62,10 Q66,8 68,10 L70,22 L70,70',
    tip: { x: 64, y: 8 },
    base: { x: 64, y: 70 },
    nail: 'M60,18 Q64,6 68,18',
  },
  { id: 'pinky-right',
    path: 'M76,70 L76,32 Q76,24 80,22 Q84,20 86,22 L88,32 L88,70',
    tip: { x: 82, y: 20 },
    base: { x: 82, y: 70 },
    nail: 'M78,28 Q82,18 86,28',
  },
];

// Right thumb
const rightThumb = {
  id: 'thumb',
  path: 'M10,70 L6,58 Q2,44 6,42 Q10,40 14,44 L18,52 L18,70',
  tip: { x: 10, y: 40 },
};

const HandSVG: React.FC<{
  fingers: typeof leftHandFingers;
  thumb: typeof leftThumb;
  activeFinger: string;
  activeColor: string;
  isLeft: boolean;
  palmPath: string;
}> = ({ fingers, thumb, activeFinger, activeColor, isLeft, palmPath }) => {
  return (
    <svg viewBox="0 0 120 100" className="w-full h-full" style={{ maxHeight: '100px' }}>
      {/* Palm */}
      <path
        d={palmPath}
        fill="#1e293b"
        stroke="#475569"
        strokeWidth="1.5"
      />

      {/* Fingers */}
      {fingers.map(finger => {
        const isActive = finger.id === activeFinger;
        const color = getFingerColor(finger.id);
        
        return (
          <g key={finger.id}>
            {/* Finger body */}
            <path
              d={finger.path}
              fill={isActive ? activeColor : '#1e293b'}
              stroke={isActive ? activeColor : color}
              strokeWidth={isActive ? 2.5 : 1.5}
              opacity={isActive ? 1 : 0.5}
              className={isActive ? 'drop-shadow-lg' : ''}
            />
            {/* Fingernail */}
            <path
              d={finger.nail}
              fill={isActive ? '#fff' : color}
              opacity={isActive ? 0.9 : 0.3}
              strokeWidth="0"
            />
            {/* Active glow */}
            {isActive && (
              <>
                <circle
                  cx={finger.tip.x}
                  cy={finger.tip.y + 12}
                  r="8"
                  fill={activeColor}
                  opacity="0.25"
                  className="animate-pulse"
                />
                <circle
                  cx={finger.tip.x}
                  cy={finger.tip.y + 12}
                  r="4"
                  fill={activeColor}
                  opacity="0.4"
                />
              </>
            )}
          </g>
        );
      })}

      {/* Thumb */}
      <path
        d={thumb.path}
        fill={activeFinger === 'thumb' ? activeColor : '#1e293b'}
        stroke={activeFinger === 'thumb' ? activeColor : getFingerColor('thumb')}
        strokeWidth={activeFinger === 'thumb' ? 2.5 : 1.5}
        opacity={activeFinger === 'thumb' ? 1 : 0.5}
      />
      {activeFinger === 'thumb' && (
        <circle
          cx={thumb.tip.x}
          cy={thumb.tip.y + 6}
          r="6"
          fill={activeColor}
          opacity="0.3"
          className="animate-pulse"
        />
      )}

      {/* Hand label */}
      <text
        x={isLeft ? 55 : 55}
        y="95"
        textAnchor="middle"
        fill="#64748b"
        fontSize="8"
        fontFamily="sans-serif"
      >
        {isLeft ? 'LEFT' : 'RIGHT'}
      </text>
    </svg>
  );
};

const HandsDisplay: React.FC<HandsDisplayProps> = ({ activeKey, className = '' }) => {
  const activeFinger = activeKey ? getFingerForKey(activeKey) : '';
  const activeColor = activeFinger ? getFingerColor(activeFinger) : '#6b7280';
  const isLeftHand = activeFinger.includes('left') || (activeFinger === 'thumb');
  const isRightHand = activeFinger.includes('right') || (activeFinger === 'thumb');
  const activeFingerName = activeFinger ? (fingerNames[activeFinger] || '') : '';

  const leftPalm = 'M18,70 Q16,74 20,80 Q40,90 92,82 Q108,76 108,70 L88,70 L34,70 Z';
  const rightPalm = 'M18,70 Q2,76 2,82 Q20,90 90,80 Q94,74 92,70 L34,70 L22,70 Z';

  return (
    <div className={`w-full max-w-4xl mx-auto ${className}`}>
      <div className="flex items-stretch justify-center gap-3 mb-2">
        {/* Left Hand */}
        <div className={`relative flex-1 max-w-[180px] transition-all duration-200 ${
          isLeftHand && activeFinger !== '' ? 'scale-105 z-10' : 'opacity-60'
        }`}>
          <div className={`rounded-xl p-1 transition-all duration-200 ${
            isLeftHand && activeFinger !== '' 
              ? 'bg-gradient-to-b from-gray-800/80 to-gray-900/60 ring-1 ring-blue-500/30' 
              : 'bg-gray-900/30'
          }`}>
            <HandSVG
              fingers={leftHandFingers}
              thumb={leftThumb}
              activeFinger={isLeftHand ? activeFinger : ''}
              activeColor={activeColor}
              isLeft={true}
              palmPath={leftPalm}
            />
          </div>
        </div>

        {/* Center - Active finger info */}
        <div className="flex flex-col items-center justify-center min-w-[140px]">
          {activeKey && activeFinger ? (
            <>
              {/* Key being pressed */}
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center text-white font-mono font-black text-xl mb-1.5 border-2 shadow-lg transition-all"
                style={{ 
                  backgroundColor: activeColor + '30',
                  borderColor: activeColor,
                  boxShadow: `0 0 15px ${activeColor}40`,
                }}
              >
                {activeKey === ' ' ? '␣' : activeKey.toUpperCase()}
              </div>
              {/* Finger name */}
              <div
                className="px-3 py-1 rounded-full text-xs font-bold text-white"
                style={{ backgroundColor: activeColor }}
              >
                {activeFingerName}
              </div>
              {/* Use text */}
              <div className="text-[10px] text-gray-500 mt-1">
                {activeFinger === 'thumb' ? 'Use either thumb' 
                  : activeFinger.includes('left') ? '← Left hand' 
                  : 'Right hand →'}
              </div>
            </>
          ) : (
            <div className="text-gray-600 text-xs text-center">
              <div className="text-2xl mb-1">⌨️</div>
              <span>Start typing</span>
            </div>
          )}
        </div>

        {/* Right Hand */}
        <div className={`relative flex-1 max-w-[180px] transition-all duration-200 ${
          isRightHand && activeFinger !== '' ? 'scale-105 z-10' : 'opacity-60'
        }`}>
          <div className={`rounded-xl p-1 transition-all duration-200 ${
            isRightHand && activeFinger !== ''
              ? 'bg-gradient-to-b from-gray-800/80 to-gray-900/60 ring-1 ring-blue-500/30'
              : 'bg-gray-900/30'
          }`}>
            <HandSVG
              fingers={rightHandFingers}
              thumb={rightThumb}
              activeFinger={isRightHand ? activeFinger : ''}
              activeColor={activeColor}
              isLeft={false}
              palmPath={rightPalm}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default HandsDisplay;
