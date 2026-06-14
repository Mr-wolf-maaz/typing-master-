export interface DailyPlan {
  day: number;
  title: string;
  focusKeys: string[];
  description: string;
  warmup: string;
  drills: string[];
  words: string[];
  sentences: string[];
  tip: string;
  technique: string;
}

export const dailyPlans: DailyPlan[] = [
  {
    day: 1,
    title: 'Home Row Left: A S D F',
    focusKeys: ['a', 's', 'd', 'f'],
    description: 'Start with the left hand home row position. Place your fingers on A S D F.',
    warmup: 'asdf asdf asdf asdf asdf asdf asdf asdf asdf asdf',
    drills: [
      'fff ddd sss aaa fff ddd sss aaa',
      'fd fd fd fd sa sa sa sa fd sa fd sa',
      'fad sad dad add fad sad dad add',
      'ads fas das afs ads fas das afs',
      'asdf fdsa asdf fdsa asdf fdsa asdf fdsa',
    ],
    words: ['add', 'sad', 'dad', 'fad', 'ads', 'ass', 'aff'],
    sentences: [
      'a sad dad adds a fad',
      'dad adds sass',
      'a sad fad adds dads',
    ],
    tip: 'Keep your left hand fingers resting on A S D F at all times. Your index finger covers F.',
    technique: 'Home Position: Your fingers should always return to A S D F after pressing any key. This is called the "home position" for your left hand.',
  },
  {
    day: 2,
    title: 'Home Row Right: J K L ;',
    focusKeys: ['j', 'k', 'l', ';'],
    description: 'Now learn the right hand home row. Place your fingers on J K L ;',
    warmup: 'jkl; jkl; jkl; jkl; jkl; jkl; jkl; jkl;',
    drills: [
      'jjj kkk lll ;;; jjj kkk lll ;;;',
      'jk jk jk jk l; l; l; l; jk l; jk l;',
      'jkl; ;lkj jkl; ;lkj jkl; ;lkj',
      'lk lk kj kj ;l ;l j; j; lk kj ;l',
    ],
    words: ['all', 'ask', 'fall', 'lads', 'flask', 'salad'],
    sentences: [
      'all lads fall; ask all lads',
      'a flask; a salad; all fall',
      'lads ask; all fall; sad lads',
    ],
    tip: 'The J key has a small bump/ridge — use it to find your position without looking! Your right index finger rests on J.',
    technique: 'Touch Typing: Never look at the keyboard! Feel the bumps on F and J keys to center your hands. Trust your muscle memory.',
  },
  {
    day: 3,
    title: 'Home Row Complete: G H',
    focusKeys: ['g', 'h'],
    description: 'Add G (left index stretch) and H (right index stretch) to complete the home row.',
    warmup: 'fg fgf hj hjh fg fgf hj hjh fg hj fgf hjh',
    drills: [
      'ggg hhh ggg hhh ghgh hghg ghgh hghg',
      'gash hash gash hash lash gash flash',
      'half hall ghash shag flag glad',
      'hag had has gag gal gas jag lag',
    ],
    words: ['glad', 'half', 'hash', 'gash', 'lash', 'flash', 'shag', 'shall'],
    sentences: [
      'half a flash; glad lads shall dash',
      'a glad gash shall flash half',
      'halls flash; lads dash; flags shall fall',
    ],
    tip: 'G is reached by stretching your left index finger right. H is reached by stretching your right index finger left.',
    technique: 'Finger Stretching: Keep all other fingers on home position when reaching for G or H. Only move the index finger!',
  },
  {
    day: 4,
    title: 'Top Row Left: Q W E R',
    focusKeys: ['q', 'w', 'e', 'r'],
    description: 'Reach up with your left hand to learn Q W E R.',
    warmup: 'qa ws ed rf qa ws ed rf qa ws ed rf',
    drills: [
      'qqq www eee rrr qqq www eee rrr',
      'qwer rewq qwer rewq qwer rewq',
      'were were were reef reef reef',
      'we we we re re re ew ew ew er er',
    ],
    words: ['were', 'we', 'red', 'read', 'wear', 'rear', 'era', 'err', 'raw', 'war'],
    sentences: [
      'we were ready for the reward',
      'red reeds were rare here',
      'we read rewards were real',
    ],
    tip: 'Reach up from A→Q, S→W, D→E, F→R. Always return to home position after each keystroke.',
    technique: 'Reach and Return: When typing top row keys, your finger "reaches" up and immediately "returns" to home position. Never let your hand drift.',
  },
  {
    day: 5,
    title: 'Top Row Right: U I O P',
    focusKeys: ['u', 'i', 'o', 'p'],
    description: 'Reach up with your right hand to learn U I O P.',
    warmup: 'ju ki lo ;p ju ki lo ;p ju ki lo ;p',
    drills: [
      'uuu iii ooo ppp uuu iii ooo ppp',
      'uiop poiu uiop poiu uiop poiu',
      'poi poi poi oil oil oil lip lip',
      'up up up ok ok ok pi pi pi io io',
    ],
    words: ['pull', 'loop', 'pool', 'pour', 'pop', 'pip', 'oil', 'lip', 'pill', 'look'],
    sentences: [
      'pull a loop of rope for our pool',
      'pour oil up; a popular pool is up',
      'look up our popular pool posters',
    ],
    tip: 'J→U, K→I, L→O, ;→P. The right pinky handles P, same as it handles ;',
    technique: 'Rhythm Typing: Try to maintain an even rhythm while typing. Like a metronome — consistent timing between keystrokes helps build speed.',
  },
  {
    day: 6,
    title: 'Top Row: T Y',
    focusKeys: ['t', 'y'],
    description: 'T and Y are typed by stretching index fingers up to the top row center.',
    warmup: 'ft ft fy fy tf tf yj yj ft jy tf yj',
    drills: [
      'ttt yyy ttt yyy tyty ytyt tyty ytyt',
      'try try try yet yet yet they they',
      'type your story today truly',
      'try to stay happy today yet ready',
    ],
    words: ['try', 'yet', 'type', 'your', 'they', 'truly', 'today', 'stay', 'story', 'typed'],
    sentences: [
      'they try to type your story today',
      'yet truly they stay ready today',
      'try your typed story yet today',
    ],
    tip: 'F→T (left index stretches up-right), J→Y (right index stretches up-left). These are longer stretches!',
    technique: 'Posture Check: Sit straight, feet flat on floor, wrists slightly elevated above keyboard. Good posture prevents fatigue and injury.',
  },
  {
    day: 7,
    title: 'Bottom Row Left: Z X C V',
    focusKeys: ['z', 'x', 'c', 'v'],
    description: 'Reach down with your left hand. A→Z, S→X, D→C, F→V.',
    warmup: 'az sx dc fv az sx dc fv az sx dc fv',
    drills: [
      'zzz xxx ccc vvv zzz xxx ccc vvv',
      'zxcv vcxz zxcv vcxz zxcv vcxz',
      'cave vex hex cave civic exact',
      'zap cozy lazy crazy vc vc xc xc',
    ],
    words: ['cave', 'vex', 'exact', 'cozy', 'crazy', 'civic', 'lazy', 'zap', 'zero', 'vice'],
    sentences: [
      'a crazy cave had exact civic value',
      'the cozy cave was exactly visible',
      'zap the lazy fox in the cave',
    ],
    tip: 'A→Z, S→X, D→C, F→V. Bottom row requires a downward reach. Keep wrists steady!',
    technique: 'Accuracy First: Speed will come with time. Focus on hitting the right key every single time. Slow and correct beats fast and sloppy.',
  },
  {
    day: 8,
    title: 'Bottom Row Right: N M , .',
    focusKeys: ['n', 'm', ',', '.'],
    description: 'Right hand reaches down. J→N→M, K→comma, L→period.',
    warmup: 'jn jm k, l. jn jm k, l. jn jm k, l.',
    drills: [
      'nnn mmm ,,, ... nnn mmm ,,, ...',
      'nm,. .,mn nm,. .,mn nm,. .,mn',
      'name, mine. man, moon. name, moon.',
      'nine men, no moon. many names.',
    ],
    words: ['name', 'mine', 'moon', 'man', 'nine', 'noon', 'many', 'mom', 'main', 'mean'],
    sentences: [
      'nine men named mann, no moon.',
      'many names, many men. noon, moon.',
      'the main man, the mean moon.',
    ],
    tip: 'J→N (index), J→M (index stretch), K→comma, L→period. Practice commas and periods too!',
    technique: 'Punctuation Flow: Don\'t pause before commas and periods. They should flow naturally as part of the word, followed by a space.',
  },
  {
    day: 9,
    title: 'Bottom Row: B & Slash',
    focusKeys: ['b', '/'],
    description: 'B is typed by left index reaching down-right. / is typed by right pinky reaching down.',
    warmup: 'fb fb fb ;/ ;/ ;/ fb ;/ fb ;/ fb ;/',
    drills: [
      'bbb /// bbb /// b/ b/ /b /b b/ b/',
      'able bold both buy big bad been',
      'be/ by/ able/ bold/ bad/ big/',
      'build the best base; begin/build',
    ],
    words: ['bold', 'both', 'been', 'able', 'build', 'begin', 'best', 'base', 'born', 'bend'],
    sentences: [
      'build the best base for bold beginners.',
      'both been able, bold and born ready.',
      'begin to build better; born to be bold.',
    ],
    tip: 'B is one of the trickiest keys — left index finger stretches down and right. Practice it slowly!',
    technique: 'Chunking: Start reading words in chunks rather than letter by letter. See "the" as one unit, not t-h-e. This boosts speed dramatically.',
  },
  {
    day: 10,
    title: 'Numbers: 1 2 3 4 5',
    focusKeys: ['1', '2', '3', '4', '5'],
    description: 'Left hand number row. Reach up from home row to the number row.',
    warmup: 'a1 s2 d3 f4 f5 a1 s2 d3 f4 f5',
    drills: [
      '111 222 333 444 555 111 222 333',
      '12 23 34 45 51 12 23 34 45 51',
      '123 234 345 451 512 123 234 345',
      '1st 2nd 3rd 4th 5th place',
    ],
    words: ['12', '23', '34', '45', '51', '123', '234', '345', '15', '25'],
    sentences: [
      'there are 12 cats and 34 dogs here.',
      'add 15 and 23 to get 38 items.',
      'buy 5 pens, 3 books, 2 rulers.',
    ],
    tip: 'A→1, S→2, D→3, F→4, F→5. The index finger covers both 4 and 5.',
    technique: 'Number Drill: Numbers are hard because you rarely type them. Dedicate 5 minutes daily just to number practice to build comfort.',
  },
  {
    day: 11,
    title: 'Numbers: 6 7 8 9 0',
    focusKeys: ['6', '7', '8', '9', '0'],
    description: 'Right hand number row plus 6 (left index long stretch).',
    warmup: 'j6 j7 k8 l9 ;0 j6 j7 k8 l9 ;0',
    drills: [
      '666 777 888 999 000 666 777 888',
      '67 78 89 90 06 67 78 89 90 06',
      '678 789 890 906 067 678 789 890',
      '6pm 7am 8oz 90s 100 points',
    ],
    words: ['67', '78', '89', '90', '100', '678', '789', '890', '60', '70'],
    sentences: [
      'call at 7am, meet at 6pm today.',
      'the score was 89 out of 100.',
      'year 2000 had 90 new records.',
    ],
    tip: 'J→6 (index stretch left), J→7, K→8, L→9, ;→0. The pinky handles 0.',
    technique: 'Look Ahead: While typing the current word, your eyes should already be reading the next word. This "lookahead" is key to speed.',
  },
  {
    day: 12,
    title: 'Special Characters: Shift + Keys',
    focusKeys: ['!', '@', '#', '$', '%'],
    description: 'Hold Shift with opposite hand while pressing number keys for symbols.',
    warmup: '!!! @@@ ### $$$ %%% !@# $%! @#$',
    drills: [
      '! @ # $ % ! @ # $ % ! @ # $ %',
      'Hello! What? Yes! No! Why? How!',
      'email@test.com user@site.org',
      '$100 $250 $500 #1 #2 #3 #100',
    ],
    words: ['$10', '$99', '#1', '#tag', '50%', '100%', '!done', '@user'],
    sentences: [
      'The price is $99! That is 50% off!',
      'Email me at user@mail.com today!',
      'Task #1 is 100% complete! Great!',
    ],
    tip: 'Use the OPPOSITE hand\'s Shift key! Left Shift for right-side keys, Right Shift for left-side keys.',
    technique: 'Opposite Shift Rule: This is crucial for speed. If you press a key with your right hand, hold Shift with your left hand, and vice versa.',
  },
  {
    day: 13,
    title: 'Brackets & Quotes',
    focusKeys: ['[', ']', '(', ')', '"', "'"],
    description: 'Practice brackets, parentheses, and quotation marks — essential for writing and coding.',
    warmup: '[] [] {} {} () () "" "" \'\' \'\' [] () ""',
    drills: [
      '(one) (two) (three) (four) (five)',
      '[a] [b] [c] [d] [e] [1] [2] [3]',
      '"hello" "world" "test" "done"',
      "it's don't won't can't I'll they're",
    ],
    words: ['(test)', '[item]', '"word"', "it's", "don't", '(done)', '[ok]'],
    sentences: [
      'She said "hello" and he replied "hi there!"',
      'The list includes: (a) cats, (b) dogs, (c) birds.',
      "It's important that we don't forget [this] task.",
    ],
    tip: 'Brackets [ ] are near the pinky. Parentheses ( ) need Shift+9 and Shift+0.',
    technique: 'Paired Characters: When you type an opening bracket or quote, your brain should automatically prepare to close it. Think in pairs!',
  },
  {
    day: 14,
    title: 'Full Keyboard Mastery',
    focusKeys: [],
    description: 'Combine everything! All letters, numbers, and symbols in flowing text.',
    warmup: 'The quick brown fox jumps over the lazy dog. 1234567890',
    drills: [
      'Pack my box with 5 dozen liquor jugs! $125 total.',
      'How vexingly quick daft zebras jump! (Score: 98%)',
      '"The 7 wizards" cost $50 each [limited edition].',
      "Don't forget: Task #3 is 100% done! Email user@co.com",
    ],
    words: ['quickly', 'jumped', 'wizard', 'boxing', 'trophy', 'plaza', 'oxygen'],
    sentences: [
      'The quick brown fox jumped over 5 lazy dogs at 3pm!',
      '"Excellent!" she said, scoring 97% on test #14.',
      "Today's goal: type at 60+ WPM with 95% accuracy!",
    ],
    tip: 'You\'ve learned all the keys! Now it\'s about building speed through consistent daily practice.',
    technique: 'Consistency Over Intensity: 15 minutes every day beats 2 hours once a week. Daily practice builds the neural pathways for automatic typing.',
  },
];

export function getDayPlan(day: number): DailyPlan {
  const idx = ((day - 1) % dailyPlans.length);
  return dailyPlans[idx];
}

export function getCurrentDay(): number {
  const stored = localStorage.getItem('typing-master-daily-day');
  if (stored) {
    const data = JSON.parse(stored);
    const lastDate = new Date(data.lastDate);
    const today = new Date();
    // Check if a new day
    if (today.toDateString() !== lastDate.toDateString()) {
      // Advance day
      const newDay = Math.min(data.day + 1, dailyPlans.length);
      localStorage.setItem('typing-master-daily-day', JSON.stringify({
        day: newDay,
        lastDate: today.toISOString(),
      }));
      return newDay;
    }
    return data.day;
  }
  // First time
  localStorage.setItem('typing-master-daily-day', JSON.stringify({
    day: 1,
    lastDate: new Date().toISOString(),
  }));
  return 1;
}

export function setCurrentDay(day: number) {
  localStorage.setItem('typing-master-daily-day', JSON.stringify({
    day,
    lastDate: new Date().toISOString(),
  }));
}
