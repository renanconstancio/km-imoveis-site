import { createContext, ReactNode, useState } from "react";

export type AlertType = {
  title?: string;
  message: string;
};

export type AlertContextType = {
  alert: AlertType;
  changeAlert: (alert: AlertType) => void;
};

export const AlertContext = createContext<AlertContextType>(
  {} as AlertContextType,
);

export function AlertProvider({ children }: { children: ReactNode }) {
  const [mode, setMode] = useState<AlertType>({} as AlertType);

  return (
    <AlertContext.Provider value={{ alert: mode, changeAlert: setMode }}>
      {children}
    </AlertContext.Provider>
  );
}
