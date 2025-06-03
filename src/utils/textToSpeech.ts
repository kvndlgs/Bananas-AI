
// ElevenLabs TTS Implementation - TypeScript
export interface Voice {
  voice_id: string;
  name: string;
  samples: any[];
  category: string;
  fine_tuning: {
    model_id: string;
    is_allowed_to_fine_tune: boolean;
    finetuning_state: string;
    verification_failures: string[];
    verification_attempts_count: number;
    manual_verification_requested: boolean;
  };
  labels: Record<string, string>;
  description: string;
  preview_url: string;
  available_for_tiers: string[];
  settings: {
    stability: number;
    similarity_boost: number;
    style?: number;
    use_speaker_boost?: boolean;
  };
  sharing: {
    status: string;
    history_item_sample_id: string;
    original_voice_id: string;
    public_owner_id: string;
    liked_by_count: number;
    cloned_by_count: number;
  };
  high_quality_base_model_ids: string[];
}

export interface VoicesResponse {
  voices: Voice[];
}

export interface ConversationSegment {
  speaker: 'host' | 'guest';
  text: string;
}

export interface AudioSegment {
  speaker: 'host' | 'guest';
  audio: Blob;
  text: string;
}

export interface TTSOptions {
  model?: string;
  stability?: number;
  similarity_boost?: number;
  style?: number;
  use_speaker_boost?: boolean;
}

export interface VoiceSettings {
  stability: number;
  similarity_boost: number;
  style?: number;
  use_speaker_boost?: boolean;
}

export interface TTSRequest {
  text: string;
  model_id: string;
  voice_settings: VoiceSettings;
}

export interface VoiceConfig {
  host: string;
  guest: string;
}

export class PodcastTTS {
  private apiKey: string;
  private baseUrl: string = 'https://api.elevenlabs.io/v1';
  private voices: VoiceConfig;

  constructor(apiKey: string, voices?: Partial<VoiceConfig>) {
    this.apiKey = apiKey;
    
    // Default voice IDs - replace with your chosen voices
    this.voices = {
      host: voices?.host || 'pNInz6obpgDQGcFmaJgB', // Adam (default male voice)
      guest: voices?.guest || 'EXAVITQu4vr4xnSDxMaL' // Bella (default female voice)
    };
  }

  // Get available voices
  async getVoices(): Promise<Voice[]> {
    try {
      const response = await fetch(`${this.baseUrl}/voices`, {
        headers: {
          'xi-api-key': this.apiKey
        }
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data: VoicesResponse = await response.json();
      return data.voices;
    } catch (error) {
      console.error('Error fetching voices:', error);
      throw error;
    }
  }

  // Update voice configuration
  setVoices(voices: Partial<VoiceConfig>): void {
    this.voices = { ...this.voices, ...voices };
  }

  // Convert text to speech
  async textToSpeech(
    text: string, 
    speaker: 'host' | 'guest' = 'host', 
    options: TTSOptions = {}
  ): Promise<Blob> {
    const voiceId = this.voices[speaker] || this.voices.host;
    
    const requestBody: TTSRequest = {
      text: text,
      model_id: options.model || 'eleven_monolingual_v1',
      voice_settings: {
        stability: options.stability ?? 0.5,
        similarity_boost: options.similarity_boost ?? 0.5,
        style: options.style ?? 0.0,
        use_speaker_boost: options.use_speaker_boost ?? true
      }
    };

    try {
      const response = await fetch(`${this.baseUrl}/text-to-speech/${voiceId}`, {
        method: 'POST',
        headers: {
          'Accept': 'audio/mpeg',
          'Content-Type': 'application/json',
          'xi-api-key': this.apiKey
        },
        body: JSON.stringify(requestBody)
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`HTTP error! status: ${response.status}, message: ${errorText}`);
      }

      // Return audio blob
      const audioBlob = await response.blob();
      return audioBlob;
    } catch (error) {
      console.error('Error generating speech:', error);
      throw error;
    }
  }

  // Process full conversation
  async processConversation(conversation: ConversationSegment[]): Promise<AudioSegment[]> {
    const audioSegments: AudioSegment[] = [];
    
    for (const segment of conversation) {
      console.log(`Generating audio for ${segment.speaker}: ${segment.text.substring(0, 50)}...`);
      
      try {
        const audioBlob = await this.textToSpeech(segment.text, segment.speaker);
        audioSegments.push({
          speaker: segment.speaker,
          audio: audioBlob,
          text: segment.text
        });
        
      } catch (error) {
        console.error(`Failed to generate audio for segment: ${segment.text}`, error);
        // Continue with other segments instead of failing completely
      }
    }
    
    return audioSegments;
  }

  // Combine audio segments (returns URLs for basic playback)
  combineAudioSegments(audioSegments: AudioSegment[]): string[] {
    // Note: This is a simplified approach for web playback
    // For production, consider using Web Audio API or server-side processing
    
    const audioUrls = audioSegments.map(segment => {
      return URL.createObjectURL(segment.audio);
    });
    
    return audioUrls;
  }

  // Play audio segments sequentially
  async playConversation(audioSegments: AudioSegment[]): Promise<void> {
    for (const segment of audioSegments) {
      const audioUrl = URL.createObjectURL(segment.audio);
      const audio = new Audio(audioUrl);
      
      await new Promise<void>((resolve, reject) => {
        audio.onended = () => resolve();
        audio.onerror = () => reject(new Error('Audio playback failed'));
        audio.play().catch(reject);
      });
      
      // Clean up
      URL.revokeObjectURL(audioUrl);
    }
  }

  // Download conversation as audio file
  downloadConversationAudio(audioSegments: AudioSegment[], filename: string = 'podcast.mp3'): void {
    // This is a basic implementation - for production you'd want to properly merge audio
    if (audioSegments.length === 0) return;
    
    // For now, just download the first segment as an example
    // In production, you'd merge all segments into one file
    const firstSegment = audioSegments[0];
    const url = URL.createObjectURL(firstSegment.audio);
    
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    
    URL.revokeObjectURL(url);
  }
}

// Streaming version for better UX
export class StreamingPodcastTTS extends PodcastTTS {
  async processConversationStreaming(
    conversation: ConversationSegment[], 
    onSegmentReady: (segment: AudioSegment) => void,
    onProgress?: (completed: number, total: number) => void
  ): Promise<void> {
    for (let i = 0; i < conversation.length; i++) {
      const segment = conversation[i];
      
      try {
        const audioBlob = await this.textToSpeech(segment.text, segment.speaker);
        
        const audioSegment: AudioSegment = {
          speaker: segment.speaker,
          audio: audioBlob,
          text: segment.text
        };
        
        // Call callback as soon as each segment is ready
        onSegmentReady(audioSegment);
        
        // Report progress if callback provided
        if (onProgress) {
          onProgress(i + 1, conversation.length);
        }
        
      } catch (error) {
        console.error(`Failed to generate audio for segment: ${segment.text}`, error);
      }
    }
  }
}


/* Streaming usage example
async function streamingExample(): Promise<void> {
  const streamingTTS = new StreamingPodcastTTS(`${process.env.VITE_ELEVENLABS_API_KEY}`);
  
  const conversation: ConversationSegment[] = [
    { speaker: 'host', text: 'Welcome to our podcast!' },
    { speaker: 'guest', text: 'Thanks for having me!' }
  ];
  
  const audioQueue: AudioSegment[] = [];
  
  await streamingTTS.processConversationStreaming(
    conversation,
    (segment) => {
      console.log(`Audio ready for: ${segment.speaker}`);
      audioQueue.push(segment);
      
      // You could start playing immediately here
      // playSegmentImmediately(segment);
    },
    (completed, total) => {
      console.log(`Progress: ${completed}/${total} segments completed`);
    }
  );
}
  */

