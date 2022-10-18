import { createContext, ReactNode } from "react";
import { useLocalStorage } from "../hooks/use-local-storage";

export type AuthType = {
  id: string;
  name: string;
  token: string;
  avatar?: string;
  roles: [];
};

export type AuthContextType = {
  auth: AuthType;
  login: (user: AuthType) => void;
  logout: () => void;
};

export const AuthContext = createContext<AuthContextType>(
  {} as AuthContextType,
);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [auth, setUser] = useLocalStorage("user", null);

  const login = ({ ...obj }: AuthType) => {
    setUser(obj);
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ auth, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
