import { 
  signInWithPopup, 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword,
  updateProfile,
  UserCredential,
} from "firebase/auth";
import { auth, googleProvider } from "@/lib/firebase";

const getErrorMessage = (code: string): string => {
  const errorMessages: Record<string, string> = {
    // Login Errors
    "auth/user-not-found": "No account found with this email address.",
    "auth/wrong-password": "Incorrect password. Please try again.",
    
    // Register Errors
    "auth/email-already-in-use": "This email is already registered. Try signing in instead.",
    "auth/weak-password": "Password is too weak. Use at least 6 characters.",

    // Common Errors
    "auth/invalid-email": "Please enter a valid email address.",
    "auth/too-many-requests": "Too many failed attempts. Please try again later.",
    "auth/popup-closed-by-user": "Sign-in cancelled. Please try again.",
    "auth/network-request-failed": "Network error. Check your connection.",
  };
  return errorMessages[code] || "Something went wrong. Please try again.";
};

export const authService = {
  
  // Email/Password Login
  signInWithEmail: async (email: string, password: string): Promise<UserCredential> => {
    try {
      return await signInWithEmailAndPassword(auth, email, password);
    } catch (err: any) {
      throw new Error(getErrorMessage(err.code || "unknown"));
    }
  },

  // Google Login
  signInWithGoogle: async (): Promise<UserCredential> => {
    try {
      return await signInWithPopup(auth, googleProvider);
    } catch (err: any) {
      if (err.code === 'auth/popup-closed-by-user') {
          throw new Error(getErrorMessage(err.code));
      }
      throw new Error(getErrorMessage(err.code || "unknown"));
    }
  },

  // Register Email/Password (With Full Name)
  registerWithEmail: async (email: string, password: string, fullName: string): Promise<UserCredential> => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      
      if (userCredential.user && fullName.trim()) {
        await updateProfile(userCredential.user, {
          displayName: fullName.trim(),
        });
      }
      return userCredential;
    } catch (err: any) {
      throw new Error(getErrorMessage(err.code || "unknown"));
    }
  },

  // Register with Google
  registerWithGoogle: async (): Promise<UserCredential> => {
    try {
      const userCredential = await signInWithPopup(auth, googleProvider);
      return userCredential;
    } catch (err: any) {
      throw new Error(getErrorMessage(err.code || "unknown"));
    }
  }
};