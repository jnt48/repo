// lib/auth.ts
import { supabase } from './supabase';

// Sign in with Google
export const signInWithGoogle = async () => {
    const redirectUrl = `http://localhost:3000/auth/callback`;
  const { error } = await supabase.auth.signInWithOAuth({
    provider: 'google',
    options: {
    redirectTo: redirectUrl,
  },
  });
  if (error) {
    console.error('Google Sign-in error:', error.message);
  }
};

// Get the current session
export const getSession = async () => {
  const { data } = await supabase.auth.getSession();
  return data.session;
};
