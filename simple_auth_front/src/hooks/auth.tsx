import React, { createContext, useCallback, useContext, useState } from 'react';
import {verify} from 'jsonwebtoken';
import api from '../services/api';

interface IAuthContextData {
  user: IUser;
  signIn: (data: ISignInCredentials) => Promise<IUser>;
  signUp: (data: ISignUpCredentials) => Promise<void>;
  signOut: () => void;
}

interface IUser {
  name: string;
  email: string;
}

interface ISignInCredentials {
  email: string;
  password: string;
}

interface ISignUpCredentials {
  name: string;
  email: string;
  password: string;
}

interface IAuthState {
  user: IUser;
  token: string;
}

const AuthContext = createContext<IAuthContextData>({} as IAuthContextData);

const useAuth = () => useContext(AuthContext);

const AuthProvider: React.FC = ({children}) => {
  const [data, setData] = useState<IAuthState>(() => {
    const user = localStorage.getItem("auth:user");
    const token = localStorage.getItem("auth:token");

    if (!user || !token) return ({} as IAuthState);

    verify(token, process.env.APP_SECRET || 'default', (err, decode) => {
      if(err) {
        localStorage.removeItem('auth:user');
        localStorage.removeItem('auth:token');

        return {};
      }
    });

    api.defaults.headers.authorization = `Bearer ${token}`;


    return {user: JSON.parse(user) as IUser, token };
  });

  const signUp = useCallback(async (credentials: ISignUpCredentials) => {
    try {
      await api.post('/sign-up', credentials);
    } catch (err) {
      console.log('Erro no cadastro')
    }
  }, []);

  const signIn = useCallback(async (credentials: ISignInCredentials) => {
    try {
      const response = await api.post('/sign-in', credentials);

      const userData = response.data as IAuthState;

      setData(userData);

      localStorage.setItem('auth:user', JSON.stringify(userData.user));
      localStorage.setItem('auth:token', userData.token);

      api.defaults.headers.authorization = `Bearer ${userData.token}`;

      return userData.user;
    } catch (err) {
      return {} as IUser;
    }
  }, []);

  const signOut = useCallback(() => {
    localStorage.removeItem('auth:user');
    localStorage.removeItem('auth:token');

    setData({} as IAuthState);
  }, []);

  return (
    <AuthContext.Provider value={{ user: data.user, signUp, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}

export { AuthProvider, useAuth };
