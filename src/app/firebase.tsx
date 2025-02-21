/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';
import { initializeApp } from "firebase/app";
import {
  onAuthStateChanged,
  GoogleAuthProvider,
  GithubAuthProvider,
  signInWithPopup,
  signInWithEmailAndPassword,
  getAuth,
  signOut,
  User,
  UserCredential,
  createUserWithEmailAndPassword
} from "firebase/auth";
import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { getFirestore, doc, setDoc, getDoc, Firestore } from "firebase/firestore";
import { getStorage, ref as storageRef, uploadBytes, getDownloadURL, FirebaseStorage } from "firebase/storage";
import { getDatabase, ref as dbRef, update, Database } from "firebase/database";

interface FirebaseContextType {
  user: User | null;
  signUp: (email: string, password: string) => Promise<UserCredential>;
  signIn: (email: string, password: string) => Promise<void>;
  signInWithGoogle: () => Promise<void>;
  signInWithGithub: () => Promise<void>;
  signOut: () => Promise<void>;
  firestore: Firestore;
  storage: FirebaseStorage;
  database: Database;
  uploadFile: (file: File, path: string) => Promise<string>;
  addTeam: (uid: string, data: any) => Promise<void>;
  getTeamByUID: (uid: string) => Promise<any>;
  updateQuestionStatus: (id: string, isActive: boolean) => Promise<string>;
}

const FirebaseContext = createContext<FirebaseContextType | null>(null);

export const useFirebase = () => {
  const context = useContext(FirebaseContext);
  if (!context) {
    throw new Error("useFirebase must be used within a FirebaseProvider");
  }
  return context;
};


const firebaseConfig = {
  apiKey: "AIzaSyCWdekgRRTQTjD65RMVY8ae53DorZVcmGE",
  authDomain: "friday-f460c.firebaseapp.com",
  projectId: "friday-f460c",
  storageBucket: "friday-f460c.firebasestorage.app",
  messagingSenderId: "613742547596",
  appId: "1:613742547596:web:c98c5a4171f7664406a1a9",
  measurementId: "G-YVD94TLSGJ"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

interface FirebaseProviderProps {
  children: ReactNode;
}

export function FirebaseProvider({ children }: FirebaseProviderProps) {
  const [user, setUser ] = useState<User | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser (user);
    });
    return () => unsubscribe(); // Cleanup subscription on unmount
  }, []);

  const firestore = getFirestore(app);
  const storage = getStorage(app);
  const database = getDatabase(app);

  const signUp = async (email: string, password: string) => {
    try {
      const userCredentials = await createUserWithEmailAndPassword(auth, email, password);
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
      const googleProvider = new GoogleAuthProvider();
      await signInWithPopup(auth, googleProvider);
    } catch (error) {
      console.error("Error signing in with Google:", error);
      throw error;
    }
  };

  const signInWithGithub = async () => {
    try {
      const githubProvider = new GithubAuthProvider();
      await signInWithPopup(auth, githubProvider);
    } catch (error) {
      console.error("Error signing in with GitHub:", error);
      throw error;
    }
  };

  const signOutUser  = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error("Error signing out:", error);
      throw error;
    }
  };

  const uploadFile = async (file: File, path: string) => {
    const fileRef = storageRef(storage, path);
    await uploadBytes(fileRef, file);
    return getDownloadURL(fileRef);
  };

  const addTeam = async (uid: string, data: unknown) => {
    const docRef = doc(firestore, "Teams", uid);
    return setDoc(docRef, data);
  };

  const getTeamByUID = async (uid: string) => {
    const docRef = doc(firestore, "Teams", uid);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      return docSnap.data();
    } else {
      throw new Error("No such team exists!");
    }
  };

  const updateQuestionStatus = async (id: string, isActive: boolean) => {
    try {
      const questionRef = dbRef(database, `Question4/${id}`);
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
        signOut: signOutUser ,
        firestore,
        storage,
        database,
        uploadFile,
        addTeam,
        getTeamByUID,
        updateQuestionStatus,
      }}
    >
      {children}
    </FirebaseContext.Provider>
  );
}