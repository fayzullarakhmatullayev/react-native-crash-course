import { getCurrentUser } from '@/lib/appwrite';
import { IUser } from '@/types';
import React, { createContext, useContext, useEffect, useState } from 'react';

const GlobalContext = createContext<{
  user: IUser | null;
  isLoggedIn: boolean;
  isLoading: boolean;
  setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
  setUser: React.Dispatch<React.SetStateAction<IUser | null>>;
}>({
  user: null,
  isLoggedIn: false,
  isLoading: true,
  setIsLoggedIn: () => {},
  setUser: () => {}
});

export const useGlobalContext = () => useContext(GlobalContext);

export const GlobalProvider = ({ children }: React.PropsWithChildren) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState<IUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getCurrentUser()
      .then((user: any) => {
        if (user) {
          setIsLoggedIn(true);
          setUser(user as IUser | null);
        } else {
          setIsLoading(false);
          setIsLoggedIn(false);
          setUser(null);
        }
      })
      .catch((error) => {
        console.log('Failed to get user', error);
        setIsLoading(false);
      })
      .finally(() => setIsLoading(false));
  }, []);

  return (
    <GlobalContext.Provider value={{ user, isLoggedIn, isLoading, setIsLoggedIn, setUser }}>
      {children}
    </GlobalContext.Provider>
  );
};
