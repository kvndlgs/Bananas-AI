import { Groq } from 'npm:groq-sdk@1.0.1';
import { corsHeaders } from '../_shared/cors.ts';

interface Character {
  id: string;
  name: string;
  title: string;
  personality: Array<{ trait: string; description: string }>;
  sampleQuote: string;
}

interface RequestBody {
  character: Character;
  topic: string;
}

const generateCharacterPrompt = (character: Character, topic: string): string => {
  return `You are ${character.name}, ${character.title}. Your personality traits are:
${character.personality.map(trait => `- ${trait.trait}: ${trait.description}`).join('\n')}

Your sample quote is: "${character.sampleQuote}"

Generate a response about ${topic} that matches your character's unique personality and quirks. Keep the response concise (1-2 sentences) and stay true to your character's speech patterns and obsessions.`;
};

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    const { character, topic } = await req.json() as RequestBody;

    const groq = new Groq({
      apiKey: Deno.env.get('GROQ_API_KEY'),
    });

    const completion = await groq.chat.completions.create({
      messages: [
        {
          role: 'system',
          content: generateCharacterPrompt(character, topic),
        },
        {
          role: 'user',
          content: `What are your thoughts about ${topic}?`,
        },
      ],
      model: 'mixtral-8x7b-32768',
      temperature: 0.9,
      max_tokens: 150,
      top_p: 1,
      stop: null,
    });

    const response = completion.choices[0]?.message?.content || 
      `I have some interesting thoughts about ${topic} that I'd like to share.`;

    return new Response(
      JSON.stringify({ response }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      },
    );
  } catch (error) {
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      },
    );
  }
});