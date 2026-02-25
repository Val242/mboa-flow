// lib/supabase/client.ts  (for Client Components)
'use client'

import { createBrowserClient } from '@supabase/ssr'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonkey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

const supabaseClient = createBrowserClient(supabaseUrl,supabaseAnonkey);

export default supabaseClient;