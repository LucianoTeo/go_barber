import React, {
  createContext,
  useCallback,
  useState,
  useContext,
  useEffect,
} from 'react';

import AsyncStorage from '@react-native-community/async-storage';

import api from '../services/api';

interface AuthContextData {
  user: object;
  signIn(credentials: Credential): Promise<void>;
  signOut(): void;
  loading: boolean;
  B;
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
  const [data, setData] = useState<AuthState>({} as AuthState);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadStoragedData() {
      const [user, token] = await AsyncStorage.multiGet([
        '@goBarber:user',
        '@goBarber:token',
      ]);

      if (user[1] && token[1]) {
        setData({ user: JSON.parse(user[1]), token: token[1] });
      }

      setLoading(false);
    }

    loadStoragedData();
  }, []);

  const signIn = useCallback(async ({ email, password }: Credential) => {
    const response = await api.post('/sessions', {
      email,
      password,
    });

    const { user, token } = response.data;

    await AsyncStorage.multiSet([
      ['@goBarber:user', JSON.stringify(user)],
      ['@goBarber:token', token],
    ]);

    setData({ token, user });
  }, []);

  const signOut = useCallback(async () => {
    await AsyncStorage.multiRemove(['@goBarber:user', '@goBarber:token']);

    setData({} as AuthState);
  }, []);

  return (
    <AuthContext.Provider value={{ user: data.user, loading, signIn, signOut }}>
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
