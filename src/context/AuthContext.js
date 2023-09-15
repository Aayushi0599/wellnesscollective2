'use client'
import { createContext, useContext, useEffect, useState } from 'react';
import {
  onAuthStateChanged,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
   
} from 'firebase/auth';
import { getFirestore, doc, setDoc, getDoc } from 'firebase/firestore';
import { auth } from '../lib/firebase';

const AuthContext = createContext({});

export const useAuth = () => useContext(AuthContext);

export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth,   async(user) => {
      if (user) {
        const userDoc = await getDoc(doc(getFirestore(), 'users', user.uid));
        const userData = userDoc.data();
        console.log(userData)
       
        setUser({
          uid: user.uid,
          email: user.email,
         displayName: userData.displayName,
         role: userData.role,
        });
      } else {
        setUser(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const signup = async (email, password, displayName, role) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;
      await setDoc(doc(getFirestore(), 'users', user.uid), {
        email,
        displayName,
        role,
      });
      setUser({
        uid: user.uid,
        email: user.email,
        displayName: user.displayName,
        role,
      });
    } catch (error) {
      console.error(error);
      throw error;
    }
  };


  const login = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
  };

  const logout = async () => {
    //setUser(null);
    await signOut(auth);
  };

  return (
    <AuthContext.Provider value={{ user, login, signup, logout }}>
      {loading ? null : children}
    </AuthContext.Provider>
  );
};