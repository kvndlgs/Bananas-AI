import { Groq } from 'npm:@groq/groq';
import { corsHeaders } from '../_shared/cors.ts';

const groqApiKey = Deno.env.get('GROQ_API_KEY');
if (!groqApiKey) {
  throw new Error('GROQ_API_KEY is required');
}

const groq = new Groq({
  apiKey: groqApiKey,
});

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, {
      status: 204,
      headers: corsHeaders,
    });
  }

  try {
    const { host, guest, topic } = await req.json();

    if (!host || !guest || !topic) {
      return new Response(
        JSON.stringify({ error: 'Missing required parameters' }),
        {
          status: 400,
          headers: {
            ...corsHeaders,
            'Content-Type': 'application/json',
          },
        }
      );
    }

    const prompt = `Generate a podcast conversation between two characters:
      Host: ${JSON.stringify(host)}
      Guest: ${JSON.stringify(guest)}
      Topic: ${topic}
      
      Generate a natural, engaging conversation that reflects each character's unique personality traits and quirks.
      The conversation should be entertaining and stay true to each character's description.`;

    const completion = await groq.chat.completions.create({
      messages: [
        {
          role: 'system',
          content: 'You are a creative writer specializing in character-driven dialogue.',
        },
        {
          role: 'user',
          content: prompt,
        },
      ],
      model: 'mixtral-8x7b-32768',
      temperature: 0.9,
      max_tokens: 2048,
    });

    const conversation = completion.choices[0]?.message?.content;

    return new Response(
      JSON.stringify({ conversation }),
      {
        headers: {
          ...corsHeaders,
          'Content-Type': 'application/json',
        },
      }
    );
  } catch (error) {
    console.error('Error:', error);
    return new Response(
      JSON.stringify({ error: 'Failed to generate conversation' }),
      {
        status: 500,
        headers: {
          ...corsHeaders,
          'Content-Type': 'application/json',
        },
      }
    );
  }
});