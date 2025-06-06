import { Character } from '../data/characters';

interface ConversationTurn {
  character: Character;
  text: string;
}

export const generateConversation = async (
  host: Character,
  guest: Character,
  topic: string,
  turns: number = 5
): Promise<ConversationTurn[]> => {
  try {
    const response = await fetch(
      `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/generate-conversation`,
      {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ host, guest, topic }),
      }
    );

    if (!response.ok) {
      throw new Error('Failed to generate conversation');
    }

    const data = await response.json();
    const conversation = data.conversation;

    // Parse and format the conversation into turns
    const formattedConversation: ConversationTurn[] = [
      {
        character: host,
        text: `Welcome to the show! Today we're discussing ${topic} with our special guest, ${guest.name}.`,
      },
      ...conversation
        .split('\n')
        .filter((line: string) => line.trim())
        .map((line: string) => {
          const isHostLine = line.toLowerCase().includes(host.name.toLowerCase());
          return {
            character: isHostLine ? host : guest,
            text: line.replace(`${host.name}:`, '').replace(`${guest.name}:`, '').trim(),
          };
        })
        .slice(0, turns),
    ];

    return formattedConversation;
  } catch (error) {
    console.error('Error generating conversation:', error);
    // Fallback to static responses if the API fails
    return [
      {
        character: host,
        text: `Welcome to the show! Today we're discussing ${topic} with our special guest, ${guest.name}.`,
      },
      {
        character: guest,
        text: 'Thanks for having me! I'm excited to share my thoughts on this topic.',
      },
      {
        character: host,
        text: 'Let's dive right in. What are your initial thoughts?',
      },
      {
        character: guest,
        text: 'Well, this is certainly an interesting topic to explore.',
      },
    ];
  }
};