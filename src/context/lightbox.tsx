import { ReactNode, createContext, useState } from "react";

export type LightBoxType = {
  isOpen: boolean;
  openLightBox: () => void;
  closeLightBox: () => void;
};

export const LightBoxeContext = createContext<LightBoxType>({} as LightBoxType);

export function LightBoxProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  function resolveOpenClose() {
    setIsOpen((isOpen) => !isOpen);
  }

  return (
    <LightBoxeContext.Provider
      value={{
        isOpen,
        closeLightBox: resolveOpenClose,
        openLightBox: resolveOpenClose,
      }}
    >
      {children}
    </LightBoxeContext.Provider>
  );
}
