"use client";

import React, { useState, useEffect } from "react";
import { FaGoogle, FaGithub } from "react-icons/fa";
import { useFirebase } from "@/app/firebase"; // adjust the path as needed
import { useRouter, useSearchParams } from "next/navigation";
import { doc, getDoc, setDoc } from "firebase/firestore";

// Helper: Creates default progress for a subject with 10 modules.
const createDefaultSubjectProgress = () => {
  const modules = [];
  for (let i = 1; i <= 10; i++) {
    modules.push({
      moduleId: i,
      completed: 0,
      total: 10,
    });
  }
  return modules;
};

// Function to initialize user progress in the "Users" collection.
// It creates the document if it doesn't exist.
const initializeUserProgress = async (
  firestore: any,
  uid: string,
  username: string
) => {
  const userDocRef = doc(firestore, "Users", uid);
  const docSnap = await getDoc(userDocRef);
  if (!docSnap.exists()) {
    const userDoc = {
      uid,
      username,
      python: createDefaultSubjectProgress(),
      javascript: createDefaultSubjectProgress(),
      c: createDefaultSubjectProgress(),
      java: createDefaultSubjectProgress(),
    };
    await setDoc(userDocRef, userDoc);
  }
};

const SignUp: React.FC = () => {
  const { signInWithGoogle, signInWithGithub, user, firestore } = useFirebase();
  const router = useRouter();
  const searchParams = useSearchParams();
  // Retrieve custom username from query parameters if available.
  const queryUsername = searchParams.get("username") || "";
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [initialized, setInitialized] = useState<boolean>(false);

  useEffect(() => {
    if (user && firestore && !initialized) {
      const initUser = async () => {
        try {
          // Use the query username if provided, otherwise fall back.
          const finalUsername =
            queryUsername || user.displayName || user.email || "User";
          await initializeUserProgress(firestore, user.uid, finalUsername);
          setInitialized(true);
          router.push("/dashboard");
        } catch (err: any) {
          setError(err.message);
        }
      };
      initUser();
    }
  }, [user, firestore, initialized, router, queryUsername]);

  const handleGoogleSignIn = async () => {
    setError(null);
    setLoading(true);
    try {
      await signInWithGoogle();
      // onAuthStateChanged in your FirebaseProvider will update the user.
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
      // onAuthStateChanged in your FirebaseProvider will update the user.
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-[#ccddea]">
      <div className="bg-white rounded-lg shadow-lg p-8 max-w-md w-full">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
          Sign Up
        </h2>
        {error && (
          <div className="mb-4 p-3 bg-red-100 text-red-700 rounded">
            {error}
          </div>
        )}
        <div className="flex flex-col space-y-4">
          <button
            onClick={handleGoogleSignIn}
            disabled={loading}
            className="flex items-center justify-center bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 px-4 rounded focus:outline-none focus:shadow-outline transition duration-200"
          >
            <FaGoogle className="mr-2" size={20} />
            Sign in with Google
          </button>
          <button
            onClick={handleGithubSignIn}
            disabled={loading}
            className="flex items-center justify-center bg-gray-800 hover:bg-gray-700 text-white font-semibold py-3 px-4 rounded focus:outline-none focus:shadow-outline transition duration-200"
          >
            <FaGithub className="mr-2" size={20} />
            Sign in with GitHub
          </button>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
