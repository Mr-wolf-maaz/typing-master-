export interface Lesson {
  id: string;
  title: string;
  description: string;
  category: 'home-row' | 'top-row' | 'bottom-row' | 'numbers' | 'full' | 'words' | 'sentences' | 'paragraphs';
  difficulty: 'beginner' | 'intermediate' | 'advanced' | 'expert';
  keys: string[];
  texts: string[];
  icon: string;
}

export interface TypingTest {
  id: string;
  title: string;
  duration: number; // seconds
  text: string;
  difficulty: 'easy' | 'medium' | 'hard';
}

export const lessons: Lesson[] = [
  // HOME ROW
  {
    id: 'home-1',
    title: 'Home Row Basics',
    description: 'Learn the home row keys: A S D F J K L ;',
    category: 'home-row',
    difficulty: 'beginner',
    keys: ['a', 's', 'd', 'f', 'j', 'k', 'l', ';'],
    icon: '🏠',
    texts: [
      'asdf jkl; asdf jkl; asdf jkl;',
      'fjdk sla; fjdk sla; fjdk sla;',
      'asd fkj l;a sdf jkl ;asd fkjl',
      'fall lads ask dad fall lads ask',
      'sad flask salad adds fall lads',
      'all falls; add salads; ask dads',
    ]
  },
  {
    id: 'home-2',
    title: 'Home Row: G & H',
    description: 'Extend to G and H keys',
    category: 'home-row',
    difficulty: 'beginner',
    keys: ['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', ';'],
    icon: '🏡',
    texts: [
      'gf hj gf hj gf hj gf hj gf hj',
      'half glad hash gash lash flash',
      'shall dash flash half glad hash',
      'had hall gall shall slag shag',
      'glass flash halls shall dash glad',
      'a flash shall dash; half had glass',
    ]
  },
  // TOP ROW
  {
    id: 'top-1',
    title: 'Top Row: Q W E R T',
    description: 'Learn the left side of the top row',
    category: 'top-row',
    difficulty: 'beginner',
    keys: ['q', 'w', 'e', 'r', 't'],
    icon: '⬆️',
    texts: [
      'we wet were tree questrew',
      'wrest quest tweet treerew wet',
      'the rest were there the tree',
      'wet tree quest wrest tweet the',
      'water quest write three tower',
      'we were there where the tree grew',
    ]
  },
  {
    id: 'top-2',
    title: 'Top Row: Y U I O P',
    description: 'Learn the right side of the top row',
    category: 'top-row',
    difficulty: 'beginner',
    keys: ['y', 'u', 'i', 'o', 'p'],
    icon: '⬆️',
    texts: [
      'you your yup poi poi you your',
      'your youth pour point youthful',
      'up you pour your top out tip',
      'you pour up your top tip out',
      'popular youth opportunity point',
      'you pour your soup upon your trip',
    ]
  },
  {
    id: 'top-3',
    title: 'Full Top Row',
    description: 'Practice all top row keys together',
    category: 'top-row',
    difficulty: 'intermediate',
    keys: ['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p'],
    icon: '🔝',
    texts: [
      'quite power route tour equity trip',
      'write your poetry with proper tools',
      'quiet power tower wrote your type',
      'require output worker power equity',
      'prototype require your quite power',
      'the quick writer required your proper input',
    ]
  },
  // BOTTOM ROW
  {
    id: 'bottom-1',
    title: 'Bottom Row: Z X C V B',
    description: 'Learn the left side of the bottom row',
    category: 'bottom-row',
    difficulty: 'beginner',
    keys: ['z', 'x', 'c', 'v', 'b'],
    icon: '⬇️',
    texts: [
      'cab box vex cab box vex cab box',
      'back cave black vex cab exact',
      'victim back black cave exact box',
      'brave cave black exact victim back',
      'excavate vibrate brave black cave',
      'the brave cab backed exactly over the box',
    ]
  },
  {
    id: 'bottom-2',
    title: 'Bottom Row: N M , . /',
    description: 'Learn the right side of the bottom row',
    category: 'bottom-row',
    difficulty: 'beginner',
    keys: ['n', 'm', ',', '.', '/'],
    icon: '⬇️',
    texts: [
      'man men name mine moon man men',
      'moon name mine manner nominal',
      'man, moon. name, mine. manner,',
      'nine men in a mine, no moon.',
      'manner, nominal. name, mine.',
      'nine men named mann mined in the moon mine.',
    ]
  },
  // FULL KEYBOARD
  {
    id: 'full-1',
    title: 'All Letters',
    description: 'Practice all letter keys',
    category: 'full',
    difficulty: 'intermediate',
    keys: [],
    icon: '⌨️',
    texts: [
      'the quick brown fox jumps over the lazy dog',
      'pack my box with five dozen liquor jugs',
      'how vexingly quick daft zebras jump',
      'the five boxing wizards jump quickly',
      'sphinx of black quartz judge my vow',
      'two driven jocks help fax my big quiz',
    ]
  },
  {
    id: 'full-2',
    title: 'Common Words',
    description: 'Type the most common English words',
    category: 'words',
    difficulty: 'intermediate',
    keys: [],
    icon: '📝',
    texts: [
      'the and for are but not you all any can had her was one our out day get has him his how its may new now old see way who did',
      'about after again begin being below could every found going great house large later learn never other place plant point right small sound spell still study their there these think those three under water where which world would write young',
      'people should through before change every follow great house know large light might never place right small still their think three under water where which world would write',
      'always around because before begin between change country differ does even found great help here house just know large last later learn letter light might move must name need never next often only other people picture place plant point right same seem should show small something sound',
    ]
  },
  // SENTENCES
  {
    id: 'sent-1',
    title: 'Simple Sentences',
    description: 'Practice with complete sentences',
    category: 'sentences',
    difficulty: 'intermediate',
    keys: [],
    icon: '💬',
    texts: [
      'The sun rises in the east and sets in the west. Birds sing beautiful songs in the morning. The flowers bloom in the garden every spring.',
      'Learning to type fast is a valuable skill. Practice makes perfect. The more you type, the better you get.',
      'She walked down the quiet street. The autumn leaves were falling gently. A cool breeze brushed against her face.',
      'Technology has changed the way we live. Computers are now part of our daily lives. We use them for work, education, and entertainment.',
    ]
  },
  {
    id: 'sent-2',
    title: 'Complex Sentences',
    description: 'Challenge yourself with longer sentences',
    category: 'sentences',
    difficulty: 'advanced',
    keys: [],
    icon: '📖',
    texts: [
      'Although the weather forecast predicted rain, the morning sky was clear and blue, giving everyone hope for a beautiful day ahead. The children rushed outside to play in the garden, their laughter echoing through the neighborhood.',
      'The scientist carefully examined the specimen under the microscope, noting every detail with meticulous precision. Her years of research had led to this moment, and she could feel the excitement building within her.',
      'In the bustling city center, people hurried along the crowded sidewalks, each absorbed in their own thoughts and destinations. Street vendors called out their wares, adding to the symphony of urban sounds that defined the metropolis.',
    ]
  },
  // PARAGRAPHS
  {
    id: 'para-1',
    title: 'Short Paragraphs',
    description: 'Type complete paragraphs for endurance',
    category: 'paragraphs',
    difficulty: 'advanced',
    keys: [],
    icon: '📄',
    texts: [
      'Programming is the art of telling a computer what to do. It requires logical thinking, creativity, and patience. Good programmers write clean, readable code that others can understand. They also test their code thoroughly to make sure it works correctly in all situations.',
      'The internet has revolutionized communication around the world. People can now connect with others across the globe in an instant. Social media platforms allow us to share our thoughts, photos, and experiences with friends and family. Email has replaced traditional letters for most business correspondence.',
      'Reading is one of the most important skills a person can develop. It opens doors to new worlds, ideas, and perspectives. Through books, we can learn about history, science, philosophy, and countless other subjects. Regular reading also improves vocabulary, comprehension, and critical thinking skills.',
    ]
  },
  {
    id: 'para-2',
    title: 'Advanced Paragraphs',
    description: 'Master level typing practice',
    category: 'paragraphs',
    difficulty: 'expert',
    keys: [],
    icon: '🏆',
    texts: [
      'Artificial intelligence represents one of the most transformative technologies of our era. Machine learning algorithms can now recognize patterns in data, understand natural language, and even generate creative content. As these systems become more sophisticated, they raise important questions about ethics, privacy, and the future of work. Researchers and policymakers must work together to ensure that AI benefits humanity while minimizing potential risks.',
      'The exploration of space has captivated human imagination for centuries. From the first telescopes to modern space stations, our understanding of the universe continues to expand. Recent discoveries of exoplanets in habitable zones have reignited discussions about the possibility of extraterrestrial life. Private companies are now joining government agencies in the quest to explore beyond our planet, making space more accessible than ever before.',
    ]
  },
  // NUMBERS
  {
    id: 'num-1',
    title: 'Number Row',
    description: 'Practice typing numbers',
    category: 'numbers',
    difficulty: 'intermediate',
    keys: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0'],
    icon: '🔢',
    texts: [
      '123 456 789 012 345 678 901 234',
      '111 222 333 444 555 666 777 888 999 000',
      '192 837 465 019 283 746 501 928',
      'Order 123 has 456 items at $789.',
      'Call 555-0123 or 555-4567 today.',
      'The year 2024 marks 100 years since 1924.',
    ]
  },
];

export const typingTests: TypingTest[] = [
  {
    id: 'test-1min-easy',
    title: '1 Minute Test',
    duration: 60,
    difficulty: 'easy',
    text: 'The quick brown fox jumps over the lazy dog. The sun was shining brightly in the clear blue sky. She walked along the sandy beach, listening to the waves. The garden was full of colorful flowers and buzzing bees. He picked up the old book and began to read quietly. The children played happily in the park all afternoon. A gentle breeze blew through the open window. The cat sat on the warm windowsill, watching birds outside. They enjoyed a delicious dinner together as a family. The stars twinkled in the dark night sky above them.',
  },
  {
    id: 'test-1min-med',
    title: '1 Minute Test',
    duration: 60,
    difficulty: 'medium',
    text: 'Technology continues to reshape our daily lives in profound ways. From smartphones to artificial intelligence, digital tools have become essential companions. The global economy relies heavily on interconnected computer networks that span continents. Cybersecurity experts work tirelessly to protect sensitive information from malicious actors. Cloud computing has democratized access to powerful computational resources for businesses of all sizes. The development of quantum computers promises to revolutionize fields ranging from cryptography to drug discovery.',
  },
  {
    id: 'test-1min-hard',
    title: '1 Minute Test',
    duration: 60,
    difficulty: 'hard',
    text: 'The juxtaposition of quantum mechanics & classical physics creates fascinating paradoxes; Schr\u00f6dinger\'s hypothetical experiment (1935) exemplifies this beautifully. Consider: if P(x) = 3x^2 + 7x - 12, then P\'(x) = 6x + 7. The CEO\'s quarterly report indicated a 23.7% year-over-year growth rate, surpassing analysts\' expectations of ~18%. "Extraordinary!" exclaimed Dr. Johnson-Williams, reviewing the fluorescence microscopy data at 40x magnification.',
  },
  {
    id: 'test-2min-easy',
    title: '2 Minute Test',
    duration: 120,
    difficulty: 'easy',
    text: 'The morning sun cast long shadows across the quiet village. Birds sang their cheerful songs from the treetops. An old man sat on a wooden bench, feeding breadcrumbs to the pigeons. Children ran through the narrow streets, laughing and playing games. The smell of fresh bread drifted from the small bakery on the corner. A woman watered her flowers in the front garden, humming a tune. The postman made his daily rounds, delivering letters and packages. Dogs barked playfully in the distance. The church bell rang, marking the hour. Life in the village moved at its own gentle pace, unhurried and peaceful. Everyone knew their neighbors and looked out for each other. The local market sold fresh fruits and vegetables from nearby farms. Farmers brought their produce early each morning, setting up colorful displays. People gathered to chat, share news, and enjoy the simple pleasures of community life.',
  },
  {
    id: 'test-2min-med',
    title: '2 Minute Test',
    duration: 120,
    difficulty: 'medium',
    text: 'Environmental conservation has become one of the most pressing issues of our time. Rising global temperatures threaten ecosystems across the planet, from tropical rainforests to arctic ice caps. Scientists warn that without significant changes in human behavior, many species face extinction within the coming decades. Governments worldwide are implementing policies to reduce carbon emissions and promote sustainable energy sources. Solar and wind power installations have grown exponentially, offering hope for a cleaner future. Electric vehicles are becoming mainstream, with major manufacturers committing to fully electric lineups. Recycling programs and waste reduction initiatives are helping communities minimize their environmental footprint. Ocean cleanup projects aim to address the massive accumulation of plastic waste in our seas. Each individual can contribute by making conscious choices about consumption, transportation, and energy use. Together, these efforts can help preserve our planet for future generations.',
  },
  {
    id: 'test-3min',
    title: '3 Minute Test',
    duration: 180,
    difficulty: 'medium',
    text: 'The history of computing spans centuries of innovation and discovery. From Charles Babbage\'s Analytical Engine in the 1830s to modern supercomputers, the evolution of computing technology has been remarkable. The invention of the transistor in 1947 marked a turning point, replacing bulky vacuum tubes with smaller, more reliable components. This breakthrough led to the development of integrated circuits, which packed thousands of transistors onto a single chip. The personal computer revolution of the 1980s brought computing power to homes and offices around the world. Companies like Apple, IBM, and Microsoft transformed the industry, making computers accessible to everyday users. The invention of the World Wide Web by Tim Berners-Lee in 1989 connected millions of computers into a global network of information. Email, search engines, and social media platforms have fundamentally changed how we communicate, learn, and do business. Mobile computing took another leap forward with the introduction of smartphones, putting powerful computers in everyone\'s pocket. Today, artificial intelligence and machine learning are pushing the boundaries of what computers can achieve. From self-driving cars to medical diagnosis, AI applications are transforming industries across the globe. Cloud computing has shifted the paradigm from local storage to distributed networks, enabling unprecedented collaboration and scalability. As we look to the future, quantum computing promises to solve problems that are currently impossible for classical computers.',
  },
  {
    id: 'test-5min',
    title: '5 Minute Test',
    duration: 300,
    difficulty: 'hard',
    text: 'The art of writing has evolved dramatically throughout human history. From ancient cave paintings to digital text messages, our methods of recording and sharing information have undergone countless transformations. The invention of the printing press by Johannes Gutenberg around 1440 was perhaps the most significant milestone, democratizing access to knowledge and sparking the Renaissance. Books became affordable, literacy rates soared, and ideas could spread faster than ever before. The typewriter, invented in the 1860s, brought mechanical precision to the act of writing. For the first time, anyone could produce documents that looked professionally typeset. The QWERTY keyboard layout, designed by Christopher Latham Sholes in 1873, remains the standard even today, more than 150 years later. This layout was originally created to prevent mechanical jams in early typewriters by separating commonly used letter pairs. With the advent of personal computers in the 1980s, word processing software replaced typewriters in most offices and homes. Programs like WordPerfect and later Microsoft Word offered features that typewriters never could: spell checking, formatting options, copy and paste functionality, and the ability to save and edit documents indefinitely. The internet and email further transformed written communication, making it possible to send messages across the globe in seconds. Social media platforms introduced new forms of writing, from the brevity of tweets to the visual storytelling of blogs and vlogs. Today, voice recognition technology and artificial intelligence are beginning to change our relationship with writing once again. Dictation software can transcribe speech with remarkable accuracy, and AI writing assistants can suggest improvements, generate content, and even translate between languages in real time. Despite these technological advances, the fundamental importance of clear, effective writing remains unchanged. Whether composing a business email, writing a research paper, or crafting a novel, the ability to communicate ideas through written language is one of the most valuable skills anyone can possess. Good writing requires practice, attention to detail, and a deep understanding of your audience. The best writers read voraciously, write regularly, and are never satisfied with their first draft. They understand that writing is not just about putting words on a page but about connecting with readers, conveying meaning, and inspiring action.',
  },
];

export const practiceWords = {
  easy: [
    'the', 'and', 'for', 'are', 'but', 'not', 'you', 'all', 'can', 'her',
    'was', 'one', 'our', 'out', 'day', 'get', 'has', 'him', 'his', 'how',
    'its', 'may', 'new', 'now', 'old', 'see', 'way', 'who', 'did', 'let',
    'say', 'she', 'too', 'use', 'had', 'hot', 'oil', 'sit', 'top', 'red',
    'run', 'set', 'try', 'ask', 'big', 'end', 'far', 'got', 'put', 'ran',
    'help', 'good', 'just', 'long', 'make', 'much', 'name', 'over', 'such',
    'take', 'come', 'give', 'look', 'only', 'also', 'back', 'been', 'call',
    'down', 'find', 'hand', 'high', 'keep', 'last', 'long', 'move', 'must',
    'need', 'part', 'play', 'show', 'side', 'tell', 'that', 'them', 'then',
    'this', 'turn', 'very', 'want', 'well', 'went', 'what', 'when', 'will',
    'with', 'work', 'year', 'your',
  ],
  medium: [
    'about', 'after', 'again', 'begin', 'being', 'below', 'could', 'every',
    'found', 'going', 'great', 'house', 'large', 'later', 'learn', 'never',
    'other', 'place', 'plant', 'point', 'right', 'small', 'sound', 'spell',
    'still', 'study', 'their', 'there', 'these', 'think', 'those', 'three',
    'under', 'water', 'where', 'which', 'world', 'would', 'write', 'young',
    'always', 'around', 'before', 'change', 'differ', 'follow', 'letter',
    'mother', 'number', 'people', 'should', 'simple', 'system', 'through',
    'between', 'because', 'country', 'example', 'nothing', 'picture',
    'program', 'question', 'without', 'children', 'together',
  ],
  hard: [
    'accomplish', 'acknowledge', 'comfortable', 'communication', 'consequence',
    'development', 'environment', 'extraordinary', 'fundamental', 'government',
    'immediately', 'independent', 'international', 'knowledge', 'manufacturer',
    'nevertheless', 'opportunity', 'organization', 'particularly', 'performance',
    'professional', 'questionnaire', 'recommendation', 'responsibility',
    'sophisticated', 'technological', 'understanding', 'unfortunately',
    'vulnerability', 'approximately', 'characteristic', 'comprehensive',
    'determination', 'entrepreneurial', 'infrastructure', 'psychological',
  ],
};

export function generateWordList(difficulty: 'easy' | 'medium' | 'hard', count: number): string {
  const words = practiceWords[difficulty];
  const result: string[] = [];
  for (let i = 0; i < count; i++) {
    result.push(words[Math.floor(Math.random() * words.length)]);
  }
  return result.join(' ');
}

export function getFingerForKey(key: string): string {
  const fingerMap: Record<string, string> = {
    '`': 'pinky-left', '1': 'pinky-left', 'q': 'pinky-left', 'a': 'pinky-left', 'z': 'pinky-left',
    '2': 'ring-left', 'w': 'ring-left', 's': 'ring-left', 'x': 'ring-left',
    '3': 'middle-left', 'e': 'middle-left', 'd': 'middle-left', 'c': 'middle-left',
    '4': 'index-left', 'r': 'index-left', 'f': 'index-left', 'v': 'index-left',
    '5': 'index-left', 't': 'index-left', 'g': 'index-left', 'b': 'index-left',
    '6': 'index-right', 'y': 'index-right', 'h': 'index-right', 'n': 'index-right',
    '7': 'index-right', 'u': 'index-right', 'j': 'index-right', 'm': 'index-right',
    '8': 'middle-right', 'i': 'middle-right', 'k': 'middle-right', ',': 'middle-right',
    '9': 'ring-right', 'o': 'ring-right', 'l': 'ring-right', '.': 'ring-right',
    '0': 'pinky-right', 'p': 'pinky-right', ';': 'pinky-right', '/': 'pinky-right',
    '-': 'pinky-right', '[': 'pinky-right', '\'': 'pinky-right',
    '=': 'pinky-right', ']': 'pinky-right',
    ' ': 'thumb',
  };
  return fingerMap[key.toLowerCase()] || 'index-right';
}

export function getFingerColor(finger: string): string {
  const colorMap: Record<string, string> = {
    'pinky-left': '#ef4444',
    'ring-left': '#f97316',
    'middle-left': '#eab308',
    'index-left': '#22c55e',
    'thumb': '#8b5cf6',
    'index-right': '#22c55e',
    'middle-right': '#eab308',
    'ring-right': '#f97316',
    'pinky-right': '#ef4444',
  };
  return colorMap[finger] || '#6b7280';
}
