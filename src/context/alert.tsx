import { createContext, ReactNode, useState } from "react";

export type TAlert = {
  title?: string;
  message: string;
  variant?: "success" | "danger";
};

export type AlertContextType = {
  alert: TAlert;
  changeAlert: (alert: TAlert) => void;
};

export const AlertContext = createContext<AlertContextType>(
  {} as AlertContextType,
);

export function AlertProvider({ children }: { children: ReactNode }) {
  const [mode, setMode] = useState<TAlert>({} as TAlert);

  return (
    <AlertContext.Provider value={{ alert: mode, changeAlert: setMode }}>
      {children}
    </AlertContext.Provider>
  );
}
