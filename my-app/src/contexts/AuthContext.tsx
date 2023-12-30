import { ReactNode, createContext, useEffect, useState } from "react";
import { api } from "../services/api";
import AsyncStorage from "@react-native-async-storage/async-storage";

export type User = {
  id: number;
  token: string;
};

export type AuthContextDataProps = {
  user: User | null;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
  isLoadingUserStorageData: boolean;
  setIsLoadingUserStorageData: React.Dispatch<React.SetStateAction<boolean>>;
  signIn(email: string, senha: string): Promise<void>
  SignUp(nome: string, email: string, senha: string): Promise<void>
  signOut(): Promise<void>
}

export const AuthContext = createContext<AuthContextDataProps>({} as AuthContextDataProps);

type AuthContextProviderProps = {
  children: ReactNode;
}

export function AuthContextProvider({ children }: AuthContextProviderProps) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoadingUserStorageData, setIsLoadingUserStorageData] = useState(true);

  useEffect(() => {
    const recoverUser = async () => {
      try {
        const recoveredUser = await AsyncStorage.getItem('user');
        if (recoveredUser) {
          setUser(JSON.parse(recoveredUser));
        }
      } catch (error) {
        console.error('Error recovering user data:', error);
      }
      setIsLoadingUserStorageData(false);
    };

    recoverUser();
  }, []);

  // async function userAndTokenUpdate(userData: User) {
  //   api.defaults.headers.common['Authorization'] = `Bearer ${userData.token}`;
  //   await AsyncStorage.setItem('userData', JSON.stringify(userData))
  //   setUser(userData);
  // }

  async function signIn(email: string, senha: string) {
    try {
      setIsLoadingUserStorageData(true);
      const response = await api.post('/auth', {email, senha})
      const { id, token } = response.data;
      const idString = id.toString();
      AsyncStorage.setItem("id", idString)
      AsyncStorage.setItem("token", token)
      setUser({id, token})
      const userObj ={id: idString, token}
      AsyncStorage.setItem("user", JSON.stringify(userObj))
      // const user = response.data.user;
      // userAndTokenUpdate(data.user);
      // if (!user) {
      //   // Se o usuário não for válido, lança um erro ou faz outra tratativa
      //   throw new Error('Usuário inválido');
      // }
      // setUser(user);
      
      
    } catch (error) {
      throw error
    } finally {
      setIsLoadingUserStorageData(false)
    }
  }

  async function SignUp(nome: string, email: string, senha: string) {
    try {
      setIsLoadingUserStorageData(true);
      await api.post('/administradores', {nome, email, senha})
    } catch (error) {
      throw error
    } finally {
      setIsLoadingUserStorageData(false)
    }
  }

  async function signOut() {
    try {
      setIsLoadingUserStorageData(true);
      await AsyncStorage.removeItem('user')
      await AsyncStorage.removeItem('id')
      await AsyncStorage.removeItem('token')
      setUser(null);
    } catch (error) {
      throw error;
    } finally {
      setIsLoadingUserStorageData(false);
    }
  }

  const contextValue: AuthContextDataProps = {
    user,
    setUser,
    isLoadingUserStorageData,
    setIsLoadingUserStorageData,
    signIn,
    SignUp,
    signOut
  }

  return (
      <AuthContext.Provider value={contextValue}>
        {children}
      </AuthContext.Provider>
    )
}