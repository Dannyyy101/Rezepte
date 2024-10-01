"use client";
import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";
import { getAuth, onAuthStateChanged, User } from "firebase/auth";
import { auth } from "../api/firebase/connection";
import Loading from "../components/ui/Loading";
import { getUserByEmail } from "../api/firebase/firestore/getUserByEmail";
import { loadImage } from "../api/firebase/firestore/loadImage";
import { AppUser } from "../utils/types";

// Initialize Firebase auth instance

// Create the authentication context
export const AuthContext = createContext({});

// Custom hook to access the authentication context
export const useAuthContext = () => useContext(AuthContext);

interface AuthContextProviderProps {
  children: ReactNode;
}

export function AuthContextProvider({
  children,
}: AuthContextProviderProps): JSX.Element {
  // Set up state to track the authenticated user and loading status
  const [user, setUser] = useState<AppUser | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Subscribe to the authentication state changes
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user && user.email) {
        getUserByEmail(user.email).then((e) => {
          const result = e.result;
          if (result?.photoURL) {
            loadImage(result?.photoURL).then((i) => {
              if (result)
                setUser({
                  email: result?.email,
                  password: "",
                  firstName: result?.firstName,
                  lastName: result?.lastName,
                  photoURL: i.result,
                });
            });
          }
          if (result)
            setUser({
              email: result?.email,
              password: "",
              firstName: result?.firstName,
              lastName: result?.lastName,
              photoURL: "",
            });
        });
      } else {
        // User is signed out
        setUser(null);
      }

      // Set loading to false once authentication state is determined
      setLoading(false);
    });

    // Unsubscribe from the authentication state changes when the component is unmounted
    return () => unsubscribe();
  }, []);

  // Provide the authentication context to child components
  return (
    <AuthContext.Provider value={{ user }}>
      {loading ? (
        <div>
          <Loading />
        </div>
      ) : (
        children
      )}
    </AuthContext.Provider>
  );
}
