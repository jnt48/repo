// src/shared/firebase/useUser.ts
import { useFirebase } from "./FirebaseContext";

export const useUser = () => {
  const { user } = useFirebase();
  return user;
};
