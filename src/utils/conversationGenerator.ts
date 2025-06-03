import { Character } from '../data/characters';

interface ConversationTurn {
  character: Character;
  text: string;
}

// Templates for different characters based on their personalities
const generateResponse = (character: Character, topic: string): string => {
  switch (character.id) {
    case 'dr-jones':
      return generateDrJonesResponse(topic);
    case 'brenda-fitzburger':
      return generateBrendaResponse(topic);
    case 'uncle-baril':
      return generateBarilResponse(topic);
    case 'denise-sexologue':
      return generateDeniseResponse(topic);
    case 'harry-tiktoker':
      return generateHarryResponse(topic);
    case 'delaquarius-montavius':
       return generateDelaquariusResponse(topic);
    default:
      return `I have some thoughts about ${topic}.`;
  }
};

const generateDrJonesResponse = (topic: string): string => {
  const conspiracyTargets = [
    'boy scouts', 'the postal service', 'librarians', 
    'dog walkers', 'crossing guards', 'baristas'
  ];
  const randomTarget = conspiracyTargets[Math.floor(Math.random() * conspiracyTargets.length)];
  
  const responses = [
    `Of course they want you to believe that about ${topic}! But I've uncovered the TRUTH! It's all connected to the alien landing in Roswell, and ${randomTarget} are the ones covering it up!`,
    `${topic}? HAH! That's just a distraction from what's REALLY going on! Have you noticed how ${randomTarget} are always around when these things happen? COINCIDENCE? I THINK NOT!`,
    `I've been researching ${topic} for YEARS, and it all leads back to one thing: ${randomTarget}. They're the puppets of the shadow government, and I have PROOF! *rustles papers frantically*`,
    `You know who's REALLY behind ${topic}? THE BOY SCOUTS! They've been infiltrating our institutions since 1910! Wake up, people!`,
  ];
  
  return responses[Math.floor(Math.random() * responses.length)];
};

const generateBrendaResponse = (topic: string): string => {
  const jargon = [
    'synergize', 'leverage', 'paradigm shift', 'circle back',
    'deep dive', 'value-add', 'blue sky thinking', 'holistic approach'
  ];
  const randomJargon1 = jargon[Math.floor(Math.random() * jargon.length)];
  const randomJargon2 = jargon[Math.floor(Math.random() * jargon.length)];
  
  const tourettes = [
    'F*CK!', 'SH*T!', 'DAMN IT!', 'BALLS!', 
    'MOTHER OF GOD!', 'SWEET JESUS!'
  ];
  const randomTourette = tourettes[Math.floor(Math.random() * tourettes.length)];
  
  const responses = [
    `We need to ${randomJargon1} our approach to ${topic} to ${randomJargon2} our—${randomTourette}—inclusivity metrics. Though actually, that's problematic because... wait, I'm supporting the very system I critique! ${randomTourette} Sorry, not sorry.`,
    `From a diversity and inclusion perspective, ${topic} represents an opportunity to ${randomJargon1}—${randomTourette}—our cultural competency. But then again, who am I to speak on this? ${randomTourette} Actually, I'm EXACTLY the person to speak on this!`,
    `Let's ideate on how to ${randomJargon1} ${topic} through a ${randomJargon2}—${randomTourette}—lens of equitability. Actually, using "lens" is appropriative of camera culture. ${randomTourette} But cameras don't have culture, so I take that back.`,
  ];
  
  return responses[Math.floor(Math.random() * responses.length)];
};

const generateBarilResponse = (topic: string): string => {
  const bugFacts = [
    'cockroaches can live for weeks without their heads',
    'ants can lift 20 times their body weight',
    'some cicadas live underground for 17 years',
    'a dung beetle can pull 1,141 times its weight',
    'monarch butterflies migrate over 3,000 miles'
  ];
  const randomBugFact = bugFacts[Math.floor(Math.random() * bugFacts.length)];
  
  const responses = [
    `*slurring* ${topic}? I've been sober for... *hiccup* What day is it? Anyway, did you know that ${randomBugFact}? That's just like... *falls asleep* ... *snores* ... *suddenly wakes up* WHO TOOK MY DRINK?!`,
    `I'm totally not drunk while discussing ${topic}! *stumbles* But lemme tell you 'bout bugs... *hiccup* ${randomBugFact}... *eyes close slowly* ... *snores* ... *jerks awake* I WAS LISTENING! WHAT WERE YOU SAYING?`,
    `${topic} reminds me of... *sways in chair* this bug I saw once... *hiccup* ${randomBugFact}... *starts to slump over* ... *mumbles incoherently* ... *sits up straight* AND THAT'S WHY THE GOVERNMENT IS AFTER ME!`,
  ];
  
  return responses[Math.floor(Math.random() * responses.length)];
};

const generateDeniseResponse = (topic: string): string => {
  const randomTopics = [
    'my ex-boyfriend', 'my skin care routine', 'reality TV shows',
    'my neighbor\'s dog', 'that weird dream I had', 'my new shoes'
  ];
  const randomTopic = randomTopics[Math.floor(Math.random() * randomTopics.length)];
  
  const responses = [
    `${topic}? Oh, that sounds SO stimulating... *winks inappropriately* When two people really connect over ${topic}, it's almost like... Wait, did I tell you about ${randomTopic}? *suddenly tears up* I'm sorry, I just get so emotional! *sobs*`,
    `The way you pronounced "${topic}" was very... provocative. *adjusts clothing unnecessarily* It reminds me of... Actually, speaking of ${randomTopic}— *voice cracks* I'M NOT CRYING, YOU'RE CRYING! *wipes tears dramatically*`,
    `${topic} is all about satisfaction, if you know what I mean... *eyebrow wiggle* But enough about that. Did you see ${randomTopic}? *changes completely to sad voice* It just makes me think about the fragility of life! *burst into tears* I NEED A MINUTE!`,
  ];
  
  return responses[Math.floor(Math.random() * responses.length)];
};

const generateHarryResponse = (topic: string): string => {
  const trendyPhrases = [
    'no cap', 'fr fr', 'it\'s giving', 'slay', 
    'main character energy', 'lives rent-free in my head',
    'understood the assignment', 'lowkey'
  ];
  const randomPhrase1 = trendyPhrases[Math.floor(Math.random() * trendyPhrases.length)];
  const randomPhrase2 = trendyPhrases[Math.floor(Math.random() * trendyPhrases.length)];
  
  const responses = [
    `*does dance move* Bro, ${topic} is literally ${randomPhrase1}! *does another dance move* Wait, what were you saying? *interrupts* Actually, I—*does third dance move*—have a FIRE TikTok about this! ${randomPhrase2}!`,
    `*vogues dramatically* Omg wait—*transitions to another dance*—I was JUST about to post about ${topic}! *cuts off others* This is LITERALLY ${randomPhrase1}! *does trending dance* ${randomPhrase2}!`,
    `*does robot dance* I can't even with ${topic}! *transitions to floss dance* Like, ${randomPhrase1}! *interrupts someone* Sorry, I have to make a TikTok about this convo real quick! *does peace sign* ${randomPhrase2}!`,
  ];
  
  return responses[Math.floor(Math.random() * responses.length)];
};

const generateDelaquariusResponse = (topic: string): string => {
  const vernacular = [
    'ni*ga', 'homeboy', 'yousahoe', 'ima beat yo ass',
    'on foe nem', 'on bro grave', 'you white people', 'daayumm'
  ];
  const randomVernacular1 = vernacular[Math.floor(Math.random() * vernacular.length)];
  const randomVernacular2 = vernacular[Math.floor(Math.random() * vernacular.length)];
  
  const gotowords = [
    'Racist!', 'IMA GANG MEMBER', 'NO CAP', 'WHERE THE HOES AT?', 
    'IM RIGHT THO', 'BECAUSE IM BLACK?'
  ];
  const randomWords = gotowords[Math.floor(Math.random() * gotowords.length)];
  
  const responses = [
    `We need to ${randomVernacular1} our approach to ${topic} to ${randomVernacular2} our—${randomWords}—inclusivity metrics. Though actually, that's problematic because... wait, I'm supporting the very system I critique! ${randomWords} Sorry, not sorry.`,
    `From a diversity and inclusion perspective, ${topic} represents an opportunity to ${randomVernacular1}—${randomWords}—our cultural competency. But then again, who am I to speak on this? ${randomWords} Actually, I'm EXACTLY the person to speak on this!`,
    `Let's ideate on how to ${randomVernacular2} ${topic} through a ${randomVernacular1}—${randomWords}—lens of equitability. Actually, using "lens" is appropriative of camera culture. ${randomWords} But cameras don't have culture, so I take that back.`,
  ];
  
  return responses[Math.floor(Math.random() * responses.length)];
}

export const generateConversation = (
  host: Character,
  guest: Character,
  topic: string,
  turns: number = 5
): ConversationTurn[] => {
  const conversation: ConversationTurn[] = [];
  
  // Introduction by host
  conversation.push({
    character: host,
    text: `Welcome to the podcast! Today we're discussing ${topic} with our special guest, ${guest.name}.`
  });
  
  // First response from guest
  conversation.push({
    character: guest,
    text: `Thanks for having me, ${host.name}. Let's talk about ${topic}.`
  });
  
  // Generate conversation turns
  for (let i = 0; i < turns; i++) {
    const isHostTurn = i % 2 === 0;
    const speaker = isHostTurn ? host : guest;
    
    conversation.push({
      character: speaker,
      text: generateResponse(speaker, topic)
    });
  }
  
  return conversation;
};