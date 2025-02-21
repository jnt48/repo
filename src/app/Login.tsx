"use client";
import React, { useState } from "react";
import { useFirebase } from "./firebase"; // adjust the import path as needed
import { useRouter } from "next/navigation"; // for Next.js 13; for Next.js 12, use `import { useRouter } from 'next/router'`

const Login: React.FC = () => {
  const { signInWithGoogle, signInWithGithub } = useFirebase();
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const handleGoogleSignIn = async () => {
    setError(null);
    setLoading(true);
    try {
      await signInWithGoogle();
      router.push("/dashboard"); // redirect after login
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleGithubSignIn = async () => {
    setError(null);
    setLoading(true);
    try {
      await signInWithGithub();
      router.push("/dashboard"); // redirect after login
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-md p-8 bg-white rounded-xl shadow-md">
        <h2 className="text-3xl font-bold mb-6 text-center">Login</h2>
        {error && (
          <div className="mb-4 p-3 bg-red-100 text-red-700 rounded">
            {error}
          </div>
        )}
        <button
          onClick={handleGoogleSignIn}
          disabled={loading}
          className="w-full py-3 mb-4 bg-blue-500 hover:bg-blue-600 text-white rounded transition-colors"
        >
          {loading ? "Signing in with Google..." : "Sign in with Google"}
        </button>
        <button
          onClick={handleGithubSignIn}
          disabled={loading}
          className="w-full py-3 bg-gray-800 hover:bg-gray-900 text-white rounded transition-colors"
        >
          {loading ? "Signing in with GitHub..." : "Sign in with GitHub"}
        </button>
      </div>
    </div>
  );
};

export default Login;
