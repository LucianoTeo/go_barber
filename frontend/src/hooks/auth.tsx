import React, { createContext, useCallback, useState, useContext } from 'react';

import api from '../services/api';

interface AuthContextData {
  user: object;
  signIn(credentials: Credential): Promise<void>;
  signOut(): void;
}

interface Credential {
  email: string;
  password: string;
}

interface AuthState {
  user: object;
  token: string;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

const AuthProvider: React.FC = ({ children }) => {
  const [data, setData] = useState<AuthState>(() => {
    const user = localStorage.getItem('@goBarber:user');
    const token = localStorage.getItem('@goBarber:token');

    if (user && token) {
      return { token, user: JSON.parse(user) };
    }

    return {} as AuthState;
  });

  const signIn = useCallback(async ({ email, password }: Credential) => {
    const response = await api.post('/sessions', {
      email,
      password,
    });

    const { user, token } = response.data;

    localStorage.setItem('@goBarber:user', JSON.stringify(user));
    localStorage.setItem('@goBarber:token', token);

    setData({ token, user });
  }, []);

  const signOut = useCallback(() => {
    localStorage.removeItem('@goBarber:user');
    localStorage.removeItem('@goBarber:token');

    setData({} as AuthState);
  }, []);

  return (
    <AuthContext.Provider value={{ user: data.user, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};

function useAuth(): AuthContextData {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }

  return context;
}

export { AuthProvider, useAuth };
