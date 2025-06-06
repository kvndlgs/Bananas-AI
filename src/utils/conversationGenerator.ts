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
    const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
    const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

    if (!supabaseUrl || !supabaseAnonKey) {
      throw new Error('Missing required Supabase configuration');
    }

    // Add error handling for the URL construction
    const functionUrl = new URL('/functions/v1/generate-conversation', supabaseUrl).toString();

    const response = await fetch(functionUrl, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${supabaseAnonKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ 
        host: {
          name: host.name,
          title: host.title,
          personality: host.personality
        }, 
        guest: {
          name: guest.name,
          title: guest.title,
          personality: guest.personality
        }, 
        topic 
      }),
    });

    if (!response.ok) {
      const errorData = await response.text();
      console.error('Edge function error:', errorData);
      throw new Error(`Edge function error: ${response.status} - ${errorData}`);
    }

    const data = await response.json();
    
    if (!data.conversation) {
      throw new Error('Invalid response format from edge function');
    }

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
    throw error; // Re-throw the error to be handled by the component
  }
};