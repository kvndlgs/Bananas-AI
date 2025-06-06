import { createClient } from '@supabase/supabase-js';



// These environment variables would be set in a production environment
// For development, we're using placeholder values

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey =  import.meta.env.VITE_SUPABASE_ANON_KEY || '';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);