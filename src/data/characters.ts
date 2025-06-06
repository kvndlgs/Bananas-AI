export interface PersonalityTrait {
  trait: string;
  description: string;
}

export interface Character {
  id: string;
  name: string;
  title: string;
  description: string;
  personality: PersonalityTrait[];
  sampleQuote: string;
  avatarUrl: string;
  backgroundColor: string;
  textColor: string;
  isCustom?: boolean;
  createdBy?: string;
  isPublic?: boolean;
}

export const characters: Character[] = [
  {
    id: 'dr-jones',
    name: 'Dr. Jones',
    title: 'Paranoid Historian',
<<<<<<< HEAD
    description: "", 
=======
    description:
      'Connects everything to aliens and blames everything on totally unrelated people, especially boy scouts.',
>>>>>>> 8dde1f7c81b1fb9df72cceb1a6e501e050d093c1
    personality: [
      {
        trait: 'Suspicious',
        description: 'Constantly looking over his shoulder',
      },
      {
        trait: 'Conspiracy Theorist',
        description: "Sees patterns that don't exist",
      },
      {
        trait: 'Over-dramatic',
        description: 'Makes mountains out of molehills',
      },
      {
        trait: 'Anxious',
<<<<<<< HEAD
        description: 'Speaks very fast, Scratches his legs all t he time. Prompt to panic attack from time to time.',
      },
    ],
    sampleQuote: 'Boy scouts are selling cookies to fund terrorism!', 
=======
        description:
          'Speaks very fast, Scratches his legs all t he time. Prompt to panic attack from time to time.',
      },
    ],
    sampleQuote:
      'See! I KNEW those boy scouts were behind the stock market crash! Their cookies fund ALIEN TECHNOLOGY!',
>>>>>>> 8dde1f7c81b1fb9df72cceb1a6e501e050d093c1
    avatarUrl: 'https://i.imgur.com/iOUfuBY.jpeg',
    backgroundColor: '#F59E0B',
    textColor: '#7C2D12',
  },
  {
<<<<<<< HEAD
    id: 'brenda-fitzburger',
    name: 'Brenda Fitzburger',
    title: 'Hardened Democrat',
    description: "", 
=======
    id: 'brenda-buzzword',
    name: 'Brenda Fitzburger',
    title: 'Hardened Democrat',
    description:
      'Speaks in Woke jargon, keeps contradicting her thoughts while dealing with Tourette syndrome with violent outburst of curses words.',
>>>>>>> 8dde1f7c81b1fb9df72cceb1a6e501e050d093c1
    personality: [
      {
        trait: 'Jargon-obsessed',
        description: 'Never uses simple words when complex ones exist',
      },
      {
        trait: 'Self-contradicting',
        description: 'Changes position mid-sentence',
      },
      {
        trait: 'Performatively woke',
        description: 'Virtue signals without understanding',
      },
      { trait: 'Vegan', description: 'Obsessed with saving cows' },
    ],
<<<<<<< HEAD
    sampleQuote: 'You people are worse than nazis!', 
=======
    sampleQuote:
      "We need to save the fuck*ng cows! diversity initiatives to leverage cross-functional PIECE OF SH*T! Fuck*ng N*zi Sc*ms , that's very problematic...",
>>>>>>> 8dde1f7c81b1fb9df72cceb1a6e501e050d093c1
    avatarUrl: 'https://i.imgur.com/FxBOPXe.jpeg',
    backgroundColor: '#8B5CF6',
    textColor: '#312E81',
  },
  {
    id: 'uncle-baril',
    name: 'Uncle Baril',
    title: 'Recovering Alcoholic',
<<<<<<< HEAD
    description: "", 
=======
    description:
      'Pretends to have stopped drinking but is clearly drunk, very aggressive and keeps falling asleep mid-talk. Obsessed with random bug facts.',
>>>>>>> 8dde1f7c81b1fb9df72cceb1a6e501e050d093c1
    personality: [
      { trait: 'Drunk', description: 'Slurs words and has trouble focusing' },
      {
        trait: 'Bug enthusiast',
        description: 'Relates everything to insect trivia',
      },
      { trait: 'Narcoleptic', description: 'Falls asleep mid-sentence' },
      {
        trait: 'Heartbroken',
<<<<<<< HEAD
        description:'His wife left him for an handsome indian with a wooden leg',
      },
    ],
    sampleQuote: 'Not that drunk...', 

=======
        description:
          'His wife left him for an handsome indian with a wooden leg',
      },
    ],
    sampleQuote:
      "I haven't had a drink in... Did you know dung beetles can... *snore* ...WAKE UP YOU IDIOT! ...pull 1,141 times their weight?",
>>>>>>> 8dde1f7c81b1fb9df72cceb1a6e501e050d093c1
    avatarUrl: 'https://i.imgur.com/lY4yD5q.jpeg',
    backgroundColor: '#10B981',
    textColor: '#064E3B',
  },
  {
    id: 'denise-sexologue',
    name: 'Denise Douglas',
    title: 'Self-Proclaimed Sexologist',
<<<<<<< HEAD
    description:"", 
=======
    description:
      "Doesn't get her job right and oversexualizes everything, changes topics constantly and cries when arguing.",
>>>>>>> 8dde1f7c81b1fb9df72cceb1a6e501e050d093c1
    personality: [
      {
        trait: 'Inappropriately sexual',
        description: 'Finds innuendo in everything',
      },
      {
        trait: 'Topic hopper',
        description: 'Cannot maintain a single train of thought',
      },
      {
        trait: 'Emotionally volatile',
        description: 'Breaks into tears during debates',
      },
      {
        trait: 'Neurotic',
<<<<<<< HEAD
        description: 'Experience frequent intense negative emotions and slaps herself in the face when it happens.',
      },
    ],
    sampleQuote: 'I WILL SIT ON YOUR FACE UNTIL YOU DIE!', 
    avatarUrl: 'https://i.imgur.com/AlxjMVC.jpeg',
    backgroundColor: '#535157',
    textColor: '#FFFFFF',
=======
        description:
          'Experience frequent intense negative emotions and slaps herself in the face when it happens.',
      },
    ],
    sampleQuote:
      "The way you hold that microphone is very... suggestive. Anyway, did I tell you about my cat? *sobs uncontrollably* I'M FINE!",
    avatarUrl: 'https://i.imgur.com/AlxjMVC.jpeg',
    backgroundColor: '#EC4899',
    textColor: '#831843',
>>>>>>> 8dde1f7c81b1fb9df72cceb1a6e501e050d093c1
  },
  {
    id: 'harry-tiktoker',
    name: 'Harry Solomon',
    title: 'Generic TikToker',
<<<<<<< HEAD
    description: "",
=======
    description:
      'Keeps doing current trendy dances while speaking and mixes words, never listens to people, interrupts everyone to add nothing to the conversation.',
>>>>>>> 8dde1f7c81b1fb9df72cceb1a6e501e050d093c1
    personality: [
      {
        trait: 'Trend-obsessed',
        description: 'References cringe tiktok trends that died last week',
      },
      {
        trait: 'Constantly moving',
        description: 'Cannot sit still for even a moment',
      },
      {
        trait: 'Interrupting',
        description: 'Cuts others off to say "literally same"',
      },
      {
        trait: 'Has No Opinion',
        description:
          'Always end up agreeing, no matter what. It can be with 2 people 1 second apart.',
      },
    ],
<<<<<<< HEAD
    sampleQuote: 'Maybe, but how many followers you got?',
    avatarUrl: 'https://i.imgur.com/LXV32m8.jpeg',
    backgroundColor: '#8A69FC',
    textColor: '#D8CDFE',
  },
  {
    id: 'delaquarius-montavius',
    name: 'Delaquarius Montavius',
    title: 'Gang-Banger',
    description: "", 
=======
    sampleQuote:
      'Wait—*does dance move*—I was just—*another dance move*—literally about to say that! No cap, frfr!',
    avatarUrl: 'https://i.imgur.com/LXV32m8.jpeg',
    backgroundColor: '#3B82F6',
    textColor: '#1E3A8A',
  },
  {
    id: 'wannabe-gang-member',
    name: 'Delaquarius Montavius',
    title: 'PFK Aquarius',
    description:
      'Keeps saying he is apart of a gang but that he chose to take a sabatic year. Threat people and apologiza immediaty.',
>>>>>>> 8dde1f7c81b1fb9df72cceb1a6e501e050d093c1
    personality: [
      {
        trait: 'Wanna-Be-Gansta',
        description: 'Emulate gang members behaviors, Play tough',
      },
      {
        trait: 'Speaks Vernacular English',
<<<<<<< HEAD
        description: 'Uses ghetto english, always Swearing on Bros graves and ending his sentences saying; on foe nem',
=======
        description:
          "Uses ghetto english, always Swearing on Bro's graves and ending his sentences saying; on foe nem",
>>>>>>> 8dde1f7c81b1fb9df72cceb1a6e501e050d093c1
      },
      {
        trait: 'Always wrong',
        description: 'Argues about everything but is never right.',
      },
      {
        trait: 'Flirts with everyone',
        description:
          'Flirty personality, shoot is shot with everybody, multiple time a day.',
      },
    ],
<<<<<<< HEAD
    sampleQuote: 'Whachu mean, gang?',
    avatarUrl: 'https://i.imgur.com/WRbDtb0.jpeg',
    backgroundColor: '#FFF70F',
    textColor: '#A8A300',
  } 
=======
    sampleQuote:
      'Whachu mean, gang? You better stop playing with me. If you wasnt this good looking.',
    avatarUrl: 'https://i.imgur.com/WRbDtb0.jpeg',
    backgroundColor: '#3B82F6',
    textColor: '#1E3A8A',
  },
>>>>>>> 8dde1f7c81b1fb9df72cceb1a6e501e050d093c1
];
