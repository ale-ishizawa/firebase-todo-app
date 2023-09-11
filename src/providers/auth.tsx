import { ReactNode, createContext, useState } from 'react';
import { User } from 'firebase/auth';

type AuthContextType = {
  user: User | null;
  setUser: ((user: User) => void) | null;
  signOut: (() => void) | null;
};

export const AuthContext = createContext<AuthContextType>({
  user: null,
  setUser: null,
  signOut: null,
});

type AuthProviderProps = {
  children: ReactNode;
};

export const AuthProvider = ({ children }: AuthProviderProps): JSX.Element => {
  const getFromStorage = () => {
    const userFromStorage = sessionStorage.getItem('user');
    if (userFromStorage) {
      return JSON.parse(userFromStorage);
    }
    return null;
  };

  const [user, setUser] = useState<User | null>(getFromStorage());

  const setToStorage = (user: User) => {
    setUser(user);
    sessionStorage.setItem('user', JSON.stringify(user));
  };

  const removeFromStorage = () => {
    sessionStorage.removeItem('user');
    setUser(null);
  };

  const value = {
    user,
    setUser,
    signOut: removeFromStorage,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
