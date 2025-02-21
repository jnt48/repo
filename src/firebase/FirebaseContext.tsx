/* eslint-disable @typescript-eslint/no-explicit-any */
// src/shared/firebase/FirebaseContext.tsx
"use client";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  GoogleAuthProvider,
  GithubAuthProvider,
  signInWithPopup,
  signInWithEmailAndPassword,
  signOut,
  User,
  UserCredential,
} from "firebase/auth";
import { doc, setDoc, getDoc, getFirestore } from "firebase/firestore";
import { ref as storageRef, uploadBytes, getDownloadURL } from "firebase/storage";
import { ref as dbRef, update } from "firebase/database";
import { createContext, useContext, useEffect, useState, ReactNode } from "react";

import { auth, storage, database } from "@/firebase/firebase";

interface FirebaseContextType {
  user: User | null;
  signUp: (email: string, password: string) => Promise<UserCredential>;
  signIn: (email: string, password: string) => Promise<void>;
  signInWithGoogle: () => Promise<void>;
  signInWithGithub: () => Promise<void>;
  signOut: () => Promise<void>;
  uploadFile: (file: File, path: string) => Promise<string>;
  addTeam: (uid: string, data: any) => Promise<void>; // Replace 'any' with a specific type for team data if desired
  getTeamByUID: (uid: string) => Promise<any>; // Replace 'any' with a specific type for team data if desired
  updateQuestionStatus: (id: string, isActive: boolean) => Promise<string>;
}

const FirebaseContext = createContext<FirebaseContextType | null>(null);

export const FirebaseProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const firestore=getFirestore();
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => setUser(user));
    return () => unsubscribe();
  }, []);

  const signUp = async (email: string, password: string) => {
    try {
      const userCredentials = await createUserWithEmailAndPassword(auth, email, password);
      // Optionally, here you could also create a document for the new user in Firestore
      return userCredentials;
    } catch (error) {
      console.error("Error signing up:", error);
      throw error;
    }
  };

  const signIn = async (email: string, password: string) => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
      console.error("Error signing in:", error);
      throw error;
    }
  };

  const signInWithGoogle = async () => {
    try {
      const provider = new GoogleAuthProvider();
      await signInWithPopup(auth, provider);
    } catch (error) {
      console.error("Error signing in with Google:", error);
      throw error;
    }
  };

  const signInWithGithub = async () => {
    try {
      const provider = new GithubAuthProvider();
      await signInWithPopup(auth, provider);
    } catch (error) {
      console.error("Error signing in with GitHub:", error);
      throw error;
    }
  };

  const signOutUser = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error("Error signing out:", error);
      throw error;
    }
  };

  const uploadFile = async (file: File, path: string) => {
    const fileReference = storageRef(storage, path);
    await uploadBytes(fileReference, file);
    return getDownloadURL(fileReference);
  };

  const addTeam = async (uid: string, data: any) => {
    const teamRef = doc(firestore, "Teams", uid);
    await setDoc(teamRef, data);
  };

  const getTeamByUID = async (uid: string) => {
    const teamRef = doc(firestore, "Teams", uid);
    const docSnap = await getDoc(teamRef);
    if (docSnap.exists()) {
      return docSnap.data();
    } else {
      throw new Error("No such team exists!");
    }
  };

  const updateQuestionStatus = async (id: string, isActive: boolean) => {
    try {
      const questionRef = dbRef(database, 'Question4/${id}');
      await update(questionRef, { isActive });
      return "Update successful!";
    } catch (error) {
      console.error("Error updating question:", error);
      throw new Error("Failed to update question");
    }
  };

  return (
    <FirebaseContext.Provider
      value={{
        user,
        signUp,
        signIn,
        signInWithGoogle,
        signInWithGithub,
        signOut: signOutUser,
        uploadFile,
        addTeam,
        getTeamByUID,
        updateQuestionStatus,
      }}
    >
      {children}
    </FirebaseContext.Provider>
  );
};

export const useFirebase = () => {
  const context = useContext(FirebaseContext);
  if (!context) {
    throw new Error("useFirebase must be used within a FirebaseProvider");
  }
  return context;
};
