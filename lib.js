import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://jvsuxfhqtmxszkfocjhq.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imp2c3V4ZmhxdG14c3prZm9jamhrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDk5MjgxODUsImV4cCI6MjA2NTUwNDE4NX0._50ylRjWMIVlMU7e2v7VRODAl9NspgaEgBncThg9UZ4';

export const supabase = createClient(supabaseUrl, supabaseKey);
