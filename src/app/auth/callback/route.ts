import { NextResponse } from 'next/server';
import {supabase} from '@/lib/supabase';

export async function GET(request: Request) {
  try {
    // Get the request body
    const { access_token, expires_at, refresh_token } = await request.json();

    if (!access_token || !refresh_token) {
      return NextResponse.json({ error: 'Missing access token or refresh token' }, { status: 400 });
    }

    // You can now process the tokens (e.g., set session, validate tokens, etc.)
    // Example: saving tokens in the database or setting them in cookies

    // If using Supabase for session handling (or any other auth system)
    // Replace this section with your actual authentication/session handling logic
    const { error } = await supabase.auth.setSession({
      access_token,
      refresh_token
    });

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }

    // Optionally log token details
    console.log('Access Token:', access_token);
    console.log('Refresh Token:', refresh_token);
    console.log('Expires At:', expires_at);

    // Return a success response
    return NextResponse.json({ message: 'Tokens processed successfully' });
  } catch (error) {
    console.error('Error processing tokens:', error);
    return NextResponse.json({ error: 'Failed to process tokens' }, { status: 500 });
  }
}
