import React, { createContext, useState, useEffect, useContext } from 'react';
import { useRouter } from 'next/router';
import nookies from 'nookies';
import { getUserProfile, login } from '@/services/api';

export interface UserContextProps {
  user: any;
  token: string | null;
  goLogin: (username: string, password: string) => Promise<boolean>;
  logout: () => void;
  fetchProfile: () => void;
}

export const UserContext = createContext<UserContextProps | undefined>(undefined);

export const UserProvider = ({ children }: {
  children: React.ReactNode;
}) => {
  const [user, setUser] = useState<any>(null);
  const [token, setToken] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const cookies = nookies.get();
    if (cookies.token) {
      setToken(cookies.token);
      fetchProfile();
    }
  }, []);

  const goLogin = async (username: string, password: string) => {
    try {
      const auth = await login(username, password);
      const { access_token } = auth;

      if (!access_token) {
        return false;
      }
    
      setToken(access_token);
      nookies.set(null, 'token', access_token, {
          maxAge: 30 * 24 * 60 * 60,
          path: '/',
      });
    
      fetchProfile();
      return true
    } catch (error) {
      return false
    }
  };

  const logout = () => {
    setToken(null);
    setUser(null);
    nookies.destroy(null, 'token');
    router.push('/login');
  };

  const fetchProfile = async () => {
    try {
      const profile = await getUserProfile();
      setUser(profile);
    } catch (error) {
      console.error('Failed to fetch user profile:', error);
    }
  };

  return (
    <UserContext.Provider value={{ user, token, goLogin, logout, fetchProfile }}>
      {children}
    </UserContext.Provider>
  );
};