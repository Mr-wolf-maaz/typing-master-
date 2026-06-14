import React from 'react';
import { getFingerForKey, getFingerColor } from '../data/lessons';
import HandsDisplay from './HandsDisplay';

interface KeyboardProps {
  activeKey?: string;
  pressedKey?: string;
  correctKey?: boolean;
  showFingers?: boolean;
  showHands?: boolean;
}

const keyboardRows = [
  [
    { key: '`', width: 'w-10' }, { key: '1', width: 'w-10' }, { key: '2', width: 'w-10' },
    { key: '3', width: 'w-10' }, { key: '4', width: 'w-10' }, { key: '5', width: 'w-10' },
    { key: '6', width: 'w-10' }, { key: '7', width: 'w-10' }, { key: '8', width: 'w-10' },
    { key: '9', width: 'w-10' }, { key: '0', width: 'w-10' }, { key: '-', width: 'w-10' },
    { key: '=', width: 'w-10' }, { key: 'Backspace', label: '⌫', width: 'w-20' },
  ],
  [
    { key: 'Tab', label: 'Tab', width: 'w-16' }, { key: 'q', width: 'w-10' },
    { key: 'w', width: 'w-10' }, { key: 'e', width: 'w-10' }, { key: 'r', width: 'w-10' },
    { key: 't', width: 'w-10' }, { key: 'y', width: 'w-10' }, { key: 'u', width: 'w-10' },
    { key: 'i', width: 'w-10' }, { key: 'o', width: 'w-10' }, { key: 'p', width: 'w-10' },
    { key: '[', width: 'w-10' }, { key: ']', width: 'w-10' }, { key: '\\', width: 'w-14' },
  ],
  [
    { key: 'CapsLock', label: 'Caps', width: 'w-[4.5rem]' }, { key: 'a', width: 'w-10' },
    { key: 's', width: 'w-10' }, { key: 'd', width: 'w-10' }, { key: 'f', width: 'w-10', bump: true },
    { key: 'g', width: 'w-10' }, { key: 'h', width: 'w-10' }, { key: 'j', width: 'w-10', bump: true },
    { key: 'k', width: 'w-10' }, { key: 'l', width: 'w-10' }, { key: ';', width: 'w-10' },
    { key: "'", width: 'w-10' }, { key: 'Enter', label: 'Enter', width: 'w-[4.5rem]' },
  ],
  [
    { key: 'Shift', label: 'Shift', width: 'w-[5.5rem]' }, { key: 'z', width: 'w-10' },
    { key: 'x', width: 'w-10' }, { key: 'c', width: 'w-10' }, { key: 'v', width: 'w-10' },
    { key: 'b', width: 'w-10' }, { key: 'n', width: 'w-10' }, { key: 'm', width: 'w-10' },
    { key: ',', width: 'w-10' }, { key: '.', width: 'w-10' }, { key: '/', width: 'w-10' },
    { key: 'ShiftR', label: 'Shift', width: 'w-[5.5rem]' },
  ],
  [
    { key: 'Ctrl', label: 'Ctrl', width: 'w-14' }, { key: 'Win', label: '⊞', width: 'w-12' },
    { key: 'Alt', label: 'Alt', width: 'w-12' },
    { key: ' ', label: 'Space', width: 'flex-1' },
    { key: 'AltR', label: 'Alt', width: 'w-12' }, { key: 'WinR', label: '⊞', width: 'w-12' },
    { key: 'Menu', label: '☰', width: 'w-12' }, { key: 'CtrlR', label: 'Ctrl', width: 'w-14' },
  ],
];

const Keyboard: React.FC<KeyboardProps> = ({ activeKey, pressedKey, correctKey, showFingers = true, showHands = true }) => {
  const normalizeKey = (k: string) => k.toLowerCase();

  const isActive = (key: string) => {
    if (!activeKey) return false;
    return normalizeKey(key) === normalizeKey(activeKey);
  };

  const isPressed = (key: string) => {
    if (!pressedKey) return false;
    return normalizeKey(key) === normalizeKey(pressedKey);
  };

  return (
    <div className="w-full max-w-4xl mx-auto select-none">
      {/* Hands Display - sits directly above keyboard like Typing Master */}
      {showHands && (
        <HandsDisplay activeKey={activeKey || ''} />
      )}

      {/* Keyboard */}
      <div className="bg-gray-900/80 rounded-2xl p-4 border border-gray-700/50 shadow-2xl">
        {keyboardRows.map((row, rowIdx) => (
          <div key={rowIdx} className="flex gap-1 mb-1 justify-center">
            {row.map((keyObj) => {
              const active = isActive(keyObj.key);
              const pressed = isPressed(keyObj.key);
              const finger = getFingerForKey(keyObj.key);
              const fingerColor = getFingerColor(finger);
              const isLetter = keyObj.key.length === 1 && keyObj.key.match(/[a-z]/);

              let bgClass = 'bg-gray-700/80';
              let borderClass = 'border-gray-600/50';
              let textColor = 'text-gray-300';
              let extraStyles = '';

              if (active) {
                bgClass = 'bg-blue-600';
                borderClass = 'border-blue-400';
                textColor = 'text-white';
                extraStyles = 'key-highlight shadow-lg shadow-blue-500/30';
              } else if (pressed && correctKey === true) {
                bgClass = 'bg-green-600';
                borderClass = 'border-green-400';
                textColor = 'text-white';
              } else if (pressed && correctKey === false) {
                bgClass = 'bg-red-600';
                borderClass = 'border-red-400';
                textColor = 'text-white';
              }

              return (
                <div
                  key={keyObj.key}
                  className={`keyboard-key ${keyObj.width} h-10 ${bgClass} ${textColor} border ${borderClass} 
                    rounded-lg flex items-center justify-center text-xs font-medium relative
                    hover:brightness-110 transition-all duration-100 ${extraStyles}`}
                >
                  <span className="relative z-10">
                    {keyObj.label || (isLetter ? keyObj.key.toUpperCase() : keyObj.key)}
                  </span>
                  {'bump' in keyObj && keyObj.bump && (
                    <div className="absolute bottom-1 left-1/2 -translate-x-1/2 w-3 h-0.5 bg-gray-400/60 rounded-full" />
                  )}
                  {showFingers && isLetter && (
                    <div
                      className="absolute bottom-0.5 right-0.5 w-1.5 h-1.5 rounded-full opacity-60"
                      style={{ backgroundColor: fingerColor }}
                    />
                  )}
                </div>
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Keyboard;
