import { Character } from '../data/characters';

interface ConversationTurn {
  character: Character;
  text: string;
}

const getFallbackResponse = (character: Character, topic: string): string => {
  const fallbacks: Record<string, string[]> = {
    'dr-jones': [
      `Of course they want you to believe that about ${topic}! But I've uncovered the TRUTH! The boy scouts are behind everything!`,
      `${topic}? HAH! That's just a distraction from what's REALLY going on! Wake up, people!`,
    ],
    'brenda-buzzword': [
      `We need to synergize our approach to ${topic}—F*CK!—to leverage our inclusivity metrics. Sorry, not sorry.`,
      `From a diversity perspective, ${topic} represents an opportunity to—SH*T!—optimize our cultural competency.`,
    ],
    'uncle-baril': [
      `*slurring* ${topic}? I've been sober for... *hiccup* What day is it? *falls asleep* ... *snores* ... WHO TOOK MY DRINK?!`,
      `I'm totally not drunk while discussing ${topic}! *stumbles* But lemme tell you 'bout bugs... *hiccup* *falls asleep*`,
    ],
    'denise-sexologue': [
      `${topic}? Oh, that sounds SO stimulating... *winks inappropriately* Wait, did I tell you about my ex? *suddenly tears up*`,
      `The way you said "${topic}" was very... provocative. *adjusts clothing unnecessarily* *voice cracks* I'M NOT CRYING!`,
    ],
    'harry-tiktoker': [
      `*does dance move* Bro, ${topic} is literally no cap! *does another dance move* Wait, what were you saying? fr fr!`,
      `*vogues dramatically* Omg wait—*transitions to another dance*—I was JUST about to post about ${topic}! This is LITERALLY slay!`,
    ],
  };

  const characterFallbacks = fallbacks[character.id] || [
    `I have some interesting thoughts about ${topic} that I'd like to share.`,
  ];
  return characterFallbacks[Math.floor(Math.random() * characterFallbacks.length)];
};

const generateResponse = async (character: Character, topic: string): Promise<string> => {
  try {
    const response = await fetch(`${import.meta.env.VITE_SUPABASE_URL}/functions/v1/generate-conversation`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}`,
      },
      body: JSON.stringify({ character, topic }),
    });

    if (!response.ok) {
      throw new Error('Failed to generate response');
    }

    const data = await response.json();
    return data.response;
  } catch (error) {
    console.error('Error generating response:', error);
    return getFallbackResponse(character, topic);
  }
};

export const generateConversation = async (
  host: Character,
  guest: Character,
  topic: string,
  turns: number = 5
): Promise<ConversationTurn[]> => {
  const conversation: ConversationTurn[] = [];
  
  // Introduction by host
  conversation.push({
    character: host,
    text: `Welcome to the show! Today we're discussing ${topic} with our special guest, ${guest.name}.`
  });
  
  // First response from guest
  conversation.push({
    character: guest,
    text: await generateResponse(guest, topic)
  });
  
  // Generate conversation turns
  for (let i = 0; i < turns; i++) {
    const isHostTurn = i % 2 === 0;
    const speaker = isHostTurn ? host : guest;
    
    const response = await generateResponse(speaker, topic);
    conversation.push({
      character: speaker,
      text: response
    });
  }
  
  return conversation;
};