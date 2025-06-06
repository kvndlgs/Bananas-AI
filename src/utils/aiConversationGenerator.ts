import { Character } from '../data/characters';

interface ConversationTurn {
    character: Character;
    text: string;
}

interface ConversationGeneratorOptions {
    topic: string;
    characters: Character[];
    turnsPerCharacter?: number;
    style?: 'debate' | 'interview' | 'casual' | 'podcast';
}

class ConversationGenerator {
    private apiKey: string;
    private baseUrl: string;
    private model: string;

    constructor(provider: 'groq' | 'huggingface' | 'openai' | 'gemini' = 'groq') {
        switch (provider) {
            case 'groq':
                this.apiKey = import.meta.env.VITE_GROQ_API_KEY || '';
                this.baseUrl = 'https://api.groq.com/openai/v1';
                this.model = 'llama3-8b-8192'; // Fast and free
                break;
            case 'huggingface':
                this.apiKey = import.meta.env.VITE_HUGGINGFACE_API_KEY || '';
                this.baseUrl = 'https://api-inference.huggingface.co/models';
                this.model = 'microsoft/DialoGPT-large';
                break;
            case 'openai':
                this.apiKey = import.meta.env.VITE_OPENAI_API_KEY || '';
                this.baseUrl = 'https://api.openai.com/v1';
                this.model = 'gpt-3.5-turbo';
                break;
            case 'gemini':
                this.apiKey = import.meta.env.VITE_GEMINI_API_KEY || '';
                this.baseUrl = 'https://generativelanguage.googleapis.com/v1beta';
                this.model = 'gemini-pro';
                break;
        }
    }

    private buildCharacterPrompt(character: Character): string {
        const traits = character.personality.map(p => `${p.trait}: ${p.description}`).join(', ');
        return `You are ${character.name}, ${character.title}. 
Personality: ${traits}
Sample quote: "${character.sampleQuote}"
Respond in character, staying true to these traits. Keep responses conversational and under 100 words.`;
    }

    private buildConversationPrompt(
        topic: string,
        characters: Character[],
        conversationHistory: ConversationTurn[] = [],
        style: string = 'podcast'
    ): string {
        const characterDescriptions = characters.map(char =>
            `- ${char.name} (${char.title}): ${char.personality.map(p => p.trait).join(', ')}`
        ).join('\n');

        const historyText = conversationHistory.length > 0
            ? '\n\nConversation so far:\n' + conversationHistory.map(turn =>
                `${turn.character.name}: ${turn.text}`
            ).join('\n')
            : '';

        return `Generate a ${style} conversation about "${topic}" between these characters:

${characterDescriptions}

Rules:
- Each character should speak in their unique voice and personality
- Keep responses under 100 words each
- Make it engaging and true to each character's traits
- The conversation should flow naturally
- Include some conflict or disagreement to make it interesting

${historyText}

Generate the next response for each character in this exact JSON format:
{
  "conversations": [
    {
      "characterId": "character-id",
      "text": "What the character says..."
    },
    {
      "characterId": "character-id", 
      "text": "What the character says..."
    }
  ]
}`;
    }

    async generateConversation(options: ConversationGeneratorOptions): Promise<ConversationTurn[]> {
        const { topic, characters, turnsPerCharacter = 3, style = 'podcast' } = options;

        if (!this.apiKey) {
            throw new Error('API key not found. Please set your API key in environment variables.');
        }

        const conversation: ConversationTurn[] = [];
        const totalTurns = characters.length * turnsPerCharacter;

        for (let round = 0; round < turnsPerCharacter; round++) {
            const prompt = this.buildConversationPrompt(topic, characters, conversation, style);

            try {
                const response = await this.callAPI(prompt);
                const parsedResponse = this.parseResponse(response);

                // Add responses to conversation
                for (const turn of parsedResponse.conversations) {
                    const character = characters.find(c => c.id === turn.characterId);
                    if (character) {
                        conversation.push({
                            character,
                            text: turn.text
                        });
                    }
                }

                // Add some delay to respect rate limits
                await new Promise(resolve => setTimeout(resolve, 1000));

            } catch (error) {
                console.error('Error generating conversation:', error);
                // Add fallback responses
                for (const character of characters) {
                    conversation.push({
                        character,
                        text: `*${character.name} seems lost for words about ${topic}*`
                    });
                }
            }
        }

        return conversation;
    }

    private async callAPI(prompt: string): Promise<string> {
        const requestBody = {
            model: this.model,
            messages: [
                {
                    role: 'system',
                    content: 'You are a creative writer generating character dialogue. Always respond with valid JSON in the requested format.'
                },
                {
                    role: 'user',
                    content: prompt
                }
            ],
            max_tokens: 1000,
            temperature: 0.8,
            top_p: 0.9
        };

        const response = await fetch(`${this.baseUrl}/chat/completions`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${this.apiKey}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(requestBody)
        });

        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(`API Error: ${response.status} - ${errorText}`);
        }

        const data = await response.json();
        return data.choices[0]?.message?.content || '';
    }

    private parseResponse(response: string): { conversations: Array<{ characterId: string; text: string }> } {
        try {
            // Try to extract JSON from the response
            const jsonMatch = response.match(/\{[\s\S]*\}/);
            if (jsonMatch) {
                return JSON.parse(jsonMatch[0]);
            }

            // Fallback parsing if JSON is malformed
            throw new Error('No valid JSON found in response');
        } catch (error) {
            console.error('Failed to parse AI response:', error);
            // Return empty conversations array as fallback
            return { conversations: [] };
        }
    }

    // Method to generate a single character response
    async generateCharacterResponse(
        character: Character,
        topic: string,
        conversationHistory: ConversationTurn[] = []
    ): Promise<string> {
        const characterPrompt = this.buildCharacterPrompt(character);
        const historyText = conversationHistory.slice(-4).map(turn =>
            `${turn.character.name}: ${turn.text}`
        ).join('\n');

        const prompt = `${characterPrompt}

Topic: ${topic}
Recent conversation:
${historyText}

Respond to this topic in character:`;

        try {
            const response = await this.callAPI(prompt);
            // Extract just the character's response, not JSON
            return response.trim().replace(/"/g, '').substring(0, 200);
        } catch (error) {
            console.error('Error generating character response:', error);
            return `*${character.name} is thinking about ${topic}...*`;
        }
    }
}

export const useConversationGenerator = () => {
    const generator = new ConversationGenerator('groq');

    const generateConversation = async (
        topic: string,
        characters: Character[],
        options?: Partial<ConversationGeneratorOptions>
    ): Promise<ConversationTurn[]> => {
        return generator.generateConversation({
            topic,
            characters,
            ...options
        });
    };

    return { generateConversation };
};

export default ConversationGenerator;