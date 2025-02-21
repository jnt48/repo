'use client'; // This makes the component a Client Component

import { signInWithGoogle } from '@/lib/auth';

const Auth = () => {
  const handleGoogleLogin = async () => {
    await signInWithGoogle();
  };

  return (
    <div>
      <h1>Sign In</h1>
      <button onClick={handleGoogleLogin}>
        Sign in with Google
      </button>
    </div>
  );
};

export default Auth;
