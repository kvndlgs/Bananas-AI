export function getElevenLabsKey(key: string): string | undefined  {
    if (typeof import.meta !== 'undefined' && import.meta.env) {
        return import.meta.env[key];
    };

    if (typeof process.env !== 'undefined' && process.env) {
        return process.env[key]
    }

    console.warn(`Required environment variable ${key} is not set.`)
}

/**
 * Utility function to get environment variables across different environments
 * Uses import.meta.env in Vite/browser environments and process.env in Node.js
 */
export function getEnvVar(key: string): string | undefined {
  // Check if we're in a Vite environment (has import.meta.env)
  if (typeof import.meta !== 'undefined' && import.meta.env) {
    return import.meta.env[key];
  }
  
  // Check if we're in a Node.js environment (has process.env)
  if (typeof process !== 'undefined' && process.env) {
    return process.env[key];
  }
  
  // Fallback - neither available
  console.warn(`Environment variable ${key} not accessible in this environment`);
  return undefined;
}

/**
 * Alternative version that's more explicit about environment detection
 */
export function getEnvVarExplicit(key: string): string | undefined {
  // Browser/Vite environment
  if (typeof window !== 'undefined' && typeof import.meta !== 'undefined') {
    return import.meta.env?.[key];
  }
  
  // Node.js environment (development or server-side)
  if (typeof process !== 'undefined') {
    return process.env[key];
  }
  
  return undefined;
}

/**
 * Version with required parameter - throws error if not found
 */
export function getRequiredEnvVar(key: string): string {
  const value = getEnvVar(key);
  
  if (!value) {
    throw new Error(`Required environment variable ${key} is not set`);
  }
  
  return value;
}

/**
 * Version with default fallback
 */
export function getEnvVarWithDefault(key: string, defaultValue: string): string {
  return getEnvVar(key) || defaultValue;
}

// Usage examples:

// Basic usage
/*
const apiKey = getEnvVar('VITE_ELEVENLABS_API_KEY') || getEnvVar('ELEVENLABS_API_KEY');

// With required check
const requiredApiKey = getRequiredEnvVar('VITE_ELEVENLABS_API_KEY');

// With default fallback
const apiUrl = getEnvVarWithDefault('VITE_API_URL', 'http://localhost:3000');

// For your specific use case:
export function getElevenLabsKey(): string | undefined {
  return getEnvVar('VITE_ELEVENLABS_API_KEY') || getEnvVar('ELEVENLABS_API_KEY');
}
*/