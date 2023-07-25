import { useContext } from "react";
import { AlertContext, AlertContextType } from "../context/alert";

export function useAlert() {
  return useContext(AlertContext) as AlertContextType;
}
