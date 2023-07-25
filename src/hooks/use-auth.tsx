import { useContext } from "react";
import { AuthContext, AuthContextType } from "../context/auth";

export function useAuth() {
  return useContext(AuthContext) as AuthContextType;
}
