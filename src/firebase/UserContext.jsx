import { createContext, useContext, useEffect, useState } from 'react';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { db } from './firebase';
import { collection, addDoc, doc, setDoc, increment } from 'firebase/firestore';

const UserContext = createContext();
export const useUser = () => useContext(UserContext);

// Sync any pending challenge history saved in localStorage
const flushPendingHistory = async (user) => {
  const pending = JSON.parse(localStorage.getItem('pendingHistory'));
  if (!pending || !user) return;

  const historyRef = collection(db, 'users', user.uid, 'history');
  for (const entry of pending) {
    try {
      await addDoc(historyRef, entry);
    } catch (err) {
      console.error('Failed to sync pending history:', err);
    }
  }

  localStorage.removeItem('pendingHistory');
};

// Sync any pending XP saved in localStorage
const flushPendingXP = async (user) => {
  const data = JSON.parse(localStorage.getItem('pendingXP'));
  if (!data || !user) return;

  const { xp, language } = data;
  const profileRef = doc(db, 'users', user.uid, 'profile', 'data');

  try {
    await setDoc(profileRef, {
      xp: increment(xp),
      [`xpByLanguage.${language}`]: increment(xp),
    }, { merge: true });

    localStorage.removeItem('pendingXP');
  } catch (err) {
    console.error('Failed to sync pending XP:', err);
  }
};

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);
      setIsLoading(false);

      if (currentUser) {
        await flushPendingHistory(currentUser);
        await flushPendingXP(currentUser);
      }
    });

    return () => unsubscribe();
  }, []);

  return (
    <UserContext.Provider value={{ user, isLoading }}>
      {children}
    </UserContext.Provider>
  );
};
