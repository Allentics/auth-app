import { createClient } from "@supabase/supabase-js";

const unwrap = (v?: string) => {
    if (!v) return undefined;
    // remove surrounding double-quotes if present (some .env editors add them)
    return v.startsWith('"') && v.endsWith('"') ? v.slice(1, -1) : v;
};

const supabaseUrl = unwrap(process.env.NEXT_PUBLIC_SUPABASE_URL);
const supabaseAnonKey = unwrap(process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);

if (!supabaseUrl || !supabaseAnonKey) {
    throw new Error(
        "Missing NEXT_PUBLIC_SUPABASE_URL or NEXT_PUBLIC_SUPABASE_ANON_KEY.\n" +
        "Ensure your .env (or environment) provides these variables without surrounding quotes."
    );
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
