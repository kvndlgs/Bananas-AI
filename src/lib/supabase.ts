import { createClient } from '@supabase/supabase-js';

<<<<<<< HEAD


// These environment variables would be set in a production environment
// For development, we're using placeholder values

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey =  import.meta.env.VITE_SUPABASE_ANON_KEY || '';
=======
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}
>>>>>>> 8dde1f7c81b1fb9df72cceb1a6e501e050d093c1

export const supabase = createClient(supabaseUrl, supabaseAnonKey);