import React, { useState, useRef, useEffect } from 'react';
import { Play, Pause, RefreshCw, Volume2, Download } from 'lucide-react';
import Button from '../ui/Button';
import { Character } from '../../data/characters';

const elevenLabsKey = import.meta.env.VITE_ELEVENLABS_API_KEY;

interface ConversationTurn {
  character: Character;
  text: string;
}

interface ConversationDisplayProps {
  conversation: ConversationTurn[];
  topic: string;
  onTogglePlay: () => void;
  onRegenerate: () => void;
  elevenLabsKey?: string;
}

interface AudioSegment {
  speaker: string;
  audio: Blob;
  text: string;
  characterName: string;
}

interface TTSOptions {
  model?: string;
  stability?: number;
  similarity_boost?: number;
  style?: number;
  use_speaker_boost?: boolean;
}

type AudioStatus = 'idle' | 'generating' | 'ready' | 'playing' | 'paused' | 'error';

class ConversationTTS {
  private apiKey: string;
  private baseUrl: string = 'https://api.elevenlabs.io/v1';
  private voiceMapping: Map<string, string> = new Map();

  constructor(apiKey: string) {
    this.apiKey = elevenLabsKey;
    this.setDefaultVoices();
  }

  private setDefaultVoices() {
    this.voiceMapping.set('dr-jones', 'gsyHQ9kWCDIipR26RqQ1');
    this.voiceMapping.set('harry-tiktoker', 'yoZ06aMxZJJ28mfd3POQ');
    this.voiceMapping.set('denise-sexologue', 'FeJtVBW106P4mvgGebAg');
    this.voiceMapping.set('brenda-fitzburger', 'L4ndSW2PzthljqHuvso3');
    this.voiceMapping.set('uncle-baril', 'OYWwCdDHouzDwiZJWOOu');
    this.voiceMapping.set('delaquarius-montavius', '6OzrBCQf8cjERkYgzSg8');
  }

  setVoiceForCharacter(characterName: string, voiceId: string) {
    this.voiceMapping.set(characterName.toLowerCase(), voiceId);
  }

  private getVoiceForCharacter(character: Character): string {
    // Try to find voice by character name first
    const voiceId = this.voiceMapping.get(character.name.toLowerCase()) ||
                   this.voiceMapping.get(character.title.toLowerCase()) ||
                   this.voiceMapping.get('dr-jones'); // fallback to first voice
    
    return voiceId || 'nPczCjzI2devNBz1zQrb'; // ultimate fallback
  }

  async generateAudio(text: string, character: Character, options: TTSOptions = {}): Promise<Blob> {
    const voiceId = this.getVoiceForCharacter(character);

    const requestBody = {
      text: text,
      model_id: options.model || 'eleven_monolingual_v1',
      voice_settings: {
        stability: options.stability ?? 0.5,
        similarity_boost: options.similarity_boost ?? 0.5,
        style: options.style ?? 0.0,
        use_speaker_boost: options.use_speaker_boost ?? true
      }
    };

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
      throw new Error(`TTS API error: ${response.status}`);
    }
    return await response.blob();
  }

  async processConversation(
    conversation: ConversationTurn[],
    onProgress?: (completed: number, total: number) => void
  ): Promise<AudioSegment[]> {
    const audioSegments: AudioSegment[] = [];

    for (let i = 0; i < conversation.length; i++) {
      const turn = conversation[i];

      try {
        const audioBlob = await this.generateAudio(turn.text, turn.character);

        audioSegments.push({
          speaker: turn.character.name,
          audio: audioBlob,
          text: turn.text,
          characterName: turn.character.name
        });

        if (onProgress) {
          onProgress(i + 1, conversation.length);
        }

      } catch (error) {
        console.error(`Failed to generate audio for: ${turn.character.name}:`, error);
        throw error;
      }
    }

    return audioSegments;
  }
}

const ConversationDisplay: React.FC<ConversationDisplayProps> = ({
  conversation,
  topic,
  onTogglePlay,
  onRegenerate,
}) => {
  const [audioStatus, setAudioStatus] = useState<AudioStatus>('idle');
  const [audioSegments, setAudioSegments] = useState<AudioSegment[]>([]);
  const [currentSegmentIndex, setCurrentSegmentIndex] = useState(0);
  const [audioProgress, setAudioProgress] = useState({ current: 0, total: 0 });
  const [generationProgress, setGenerationProgress] = useState({ completed: 0, total: 0 });

  const currentAudioRef = useRef<HTMLAudioElement | null>(null);
  const ttsRef = useRef<ConversationTTS | null>(null);

  useEffect(() => {
    if (elevenLabsKey) {
      ttsRef.current = new ConversationTTS(elevenLabsKey);
    }
  }, [elevenLabsKey]);

  const generateAudio = async () => {
    if (!ttsRef.current || !elevenLabsKey) {
      alert('ElevenLabs API KEY is required for audio generation');
      return;
    }

    if (!conversation.length) return;

    setAudioStatus('generating');
    setGenerationProgress({ completed: 0, total: conversation.length });

    try {
      const segments = await ttsRef.current.processConversation(
        conversation,
        (completed, total) => {
          setGenerationProgress({ completed, total });
        }
      );

      setAudioSegments(segments);
      setAudioStatus('ready');
      setCurrentSegmentIndex(0);

    } catch (error) {
      console.error('Audio generation failed:', error);
      setAudioStatus('error');
    }
  };

  const playAudio = async () => {
    if (audioSegments.length === 0) return;

    setAudioStatus('playing');

    for (let i = currentSegmentIndex; i < audioSegments.length; i++) {
      setCurrentSegmentIndex(i);
      const segment = audioSegments[i];
      const audioUrl = URL.createObjectURL(segment.audio);

      const audio = new Audio(audioUrl);
      currentAudioRef.current = audio;

      try {
        await new Promise<void>((resolve, reject) => {
          audio.onended = () => {
            URL.revokeObjectURL(audioUrl);
            resolve();
          };
          audio.onerror = () => {
            URL.revokeObjectURL(audioUrl);
            reject(new Error('Audio playback failed'));
          };

          audio.ontimeupdate = () => {
            setAudioProgress({
              current: audio.currentTime,
              total: audio.duration || 0
            });
          };

          audio.play().catch(reject);
        });
      } catch (error) {
        console.error('Audio playback error', error);
        setAudioStatus('error');
        return;
      }
    }

    setAudioStatus('ready');
    setCurrentSegmentIndex(0);
  };

  const stopAudio = () => {
    if (currentAudioRef.current) {
      currentAudioRef.current.pause();
      currentAudioRef.current = null;
    }
    setAudioStatus('ready');
  };

  const handleTogglePlay = () => {
    if (audioStatus === 'idle' || audioSegments.length === 0) {
      generateAudio();
    } else if (audioStatus === 'ready') {
      playAudio();
    } else if (audioStatus === 'playing') {
      stopAudio();
    }

    onTogglePlay();
  };

  const downloadAudio = () => {
    if (audioSegments.length === 0) return;

    const firstSegment = audioSegments[0];
    const url = URL.createObjectURL(firstSegment.audio);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${topic.replace(/\s+/g, '_')}_conversation.mp3`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  if (!conversation.length) return null;

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden mb-8">
      <div className="bg-gradient-to-r from-primary to-secondary p-4">
        <h2 className="text-xl font-display font-bold text-white">
          Interview Topic: {topic}
        </h2>
      </div>

      {/* Audio Player */}
      <div className="bg-neutral-100 p-4 border-b border-neutral-200">
        <div className="flex items-center justify-between">
          <div className="flex items-center flex-1">
            <Button
              variant="primary"
              size="sm"
              onClick={handleTogglePlay}
              leftIcon={
                audioStatus === 'playing' ? <Pause size={16} /> :
                audioStatus === 'generating' ? <Volume2 size={16} /> :
                <Play size={16} />
              }
              disabled={audioStatus === 'generating'}
            >
              {audioStatus === 'generating' ? 'Generating...' :
               audioStatus === 'playing' ? 'Pause' : 
               'Play'}
            </Button>
            <div className="ml-4 flex-1">
              <div className="h-2 bg-neutral-300 rounded-full w-full max-w-xs">
                <div 
                  className="h-2 bg-primary rounded-full transition-all duration-300" 
                  style={{ 
                    width: audioStatus === 'generating' 
                      ? `${(generationProgress.completed / Math.max(generationProgress.total, 1)) * 100}%`
                      : audioProgress.total > 0 
                        ? `${(audioProgress.current / audioProgress.total) * 100}%`
                        : '0%'
                  }}
                ></div>
              </div>
              <p className="text-xs text-neutral-500 mt-1">
                {audioStatus === 'generating' ?
                  `Generating ${generationProgress.completed}/${generationProgress.total}` :
                  audioProgress.total > 0 ?
                    `${formatTime(audioProgress.current)} / ${formatTime(audioProgress.total)}` : 
                    '0:00 / 0:00'
                }
              </p>
            </div>
            {audioSegments.length > 0 && (
              <Button
                variant="outline"
                size="sm"
                onClick={downloadAudio}
                leftIcon={<Download size={16} />}
                className="ml-2"
              >
                Download
              </Button>
            )}
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={onRegenerate}
            leftIcon={<RefreshCw size={16} />}
          >
            Regenerate
          </Button>
        </div>

        {/* Status messages */}
        <div className="mt-2">
          {audioStatus === 'idle' && elevenLabsKey && (
            <p className="text-sm text-neutral-600">
              Click play to generate and play audio 
            </p> 
          )}
          {audioStatus === 'generating' && (
            <p className="text-sm text-secondary-600">
              Generating audio... This may take a moment.
            </p>
          )}
          {audioStatus === 'error' && (
            <p className="text-sm text-red-600">
              Error generating audio, please try again.
            </p>
          )}
          {!elevenLabsKey && (
            <p className="text-sm text-neutral-600 italic">
              Add ElevenLabs API key to enable audio functions
            </p>
          )}
          {audioStatus === 'playing' && currentSegmentIndex < conversation.length && (
            <p className="text-sm text-green-600">
              Now playing: {conversation[currentSegmentIndex]?.character.name}
            </p>
          )}
        </div>
      </div>

      {/* Conversation Transcript */}
      <div className="p-6">
        <h3 className="text-lg font-semibold text-neutral-800 mb-4">Transcript</h3>
        <div className="space-y-6">
          {conversation.map((turn, index) => (
            <div 
              key={index} 
              className={`flex ${
                audioStatus === 'playing' && index === currentSegmentIndex 
                  ? 'bg-blue-50 -mx-2 px-2 py-2 rounded-lg' 
                  : ''
              }`}
            >
              <div 
                className="flex-shrink-0 w-12 h-12 rounded-full overflow-hidden border-2"
                style={{ borderColor: turn.character.backgroundColor }}
              >
                <img 
                  src={turn.character.avatarUrl} 
                  alt={turn.character.name} 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="ml-4 flex-1">
                <div className="flex items-center mb-1">
                  <h4 
                    className="font-medium"
                    style={{ color: turn.character.backgroundColor }}
                  >
                    {turn.character.name}
                  </h4>
                  <span className="ml-2 text-xs text-neutral-500">
                    {turn.character.title}
                  </span>
                  {audioStatus === 'playing' && index === currentSegmentIndex && (
                    <span className="ml-2 text-xs text-secondary-600 font-medium">
                      ● Playing
                    </span>
                  )}
                </div>
                <div 
                  className="p-3 rounded-lg" 
                  style={{ 
                    backgroundColor: `${turn.character.backgroundColor}15`,
                    borderLeft: `3px solid ${turn.character.backgroundColor}`
                  }}
                >
                  <p className="text-neutral-800">{turn.text}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ConversationDisplay;
