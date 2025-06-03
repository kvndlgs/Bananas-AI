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
    description: "", 
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
        description: 'Speaks very fast, Scratches his legs all t he time. Prompt to panic attack from time to time.',
      },
    ],
    sampleQuote: 'Boy scouts are selling cookies to fund terrorism!', 
    avatarUrl: 'https://i.imgur.com/iOUfuBY.jpeg',
    backgroundColor: '#F59E0B',
    textColor: '#7C2D12',
  },
  {
    id: 'brenda-fitzburger',
    name: 'Brenda Fitzburger',
    title: 'Hardened Democrat',
    description: "", 
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
    sampleQuote: 'You people are worse than nazis!', 
    avatarUrl: 'https://i.imgur.com/FxBOPXe.jpeg',
    backgroundColor: '#8B5CF6',
    textColor: '#312E81',
  },
  {
    id: 'uncle-baril',
    name: 'Uncle Baril',
    title: 'Recovering Alcoholic',
    description: "", 
    personality: [
      { trait: 'Drunk', description: 'Slurs words and has trouble focusing' },
      {
        trait: 'Bug enthusiast',
        description: 'Relates everything to insect trivia',
      },
      { trait: 'Narcoleptic', description: 'Falls asleep mid-sentence' },
      {
        trait: 'Heartbroken',
        description:'His wife left him for an handsome indian with a wooden leg',
      },
    ],
    sampleQuote: 'Not that drunk...', 
    avatarUrl: 'https://i.imgur.com/lY4yD5q.jpeg',
    backgroundColor: '#10B981',
    textColor: '#064E3B',
  },
  {
    id: 'denise-sexologue',
    name: 'Denise Douglas',
    title: 'Self-Proclaimed Sexologist',
    description:"", 
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
        description: 'Experience frequent intense negative emotions and slaps herself in the face when it happens.',
      },
    ],
    sampleQuote: 'I WILL SIT ON YOUR FACE UNTIL YOU DIE!', 
    avatarUrl: 'https://i.imgur.com/AlxjMVC.jpeg',
    backgroundColor: '#535157',
    textColor: '#FFFFFF',
  },
  {
    id: 'harry-tiktoker',
    name: 'Harry Solomon',
    title: 'Generic TikToker',
    description: "",
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
    personality: [
      {
        trait: 'Wanna-Be-Gansta',
        description: 'Emulate gang members behaviors, Play tough',
      },
      {
        trait: 'Speaks Vernacular English',
        description: 'Uses ghetto english, always Swearing on Bros graves and ending his sentences saying; on foe nem',
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
    sampleQuote: 'Whachu mean, gang?',
    avatarUrl: 'https://i.imgur.com/WRbDtb0.jpeg',
    backgroundColor: '#FFF70F',
    textColor: '#A8A300',
  } 
];
