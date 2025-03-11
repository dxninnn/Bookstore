import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://jdrzsjiyhwwwjqmfokrf.supabase.co';
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Impkcnpzaml5aHd3d2pxbWZva3JmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDE2NzcxMDYsImV4cCI6MjA1NzI1MzEwNn0.wFc3rQlKrz4VTey5hzgEFihA7qAudZlAgOja0_fy6So';

export const supabase = createClient(supabaseUrl, supabaseKey);
