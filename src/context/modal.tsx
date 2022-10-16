import { createContext, ReactNode, useState } from "react";

export type ModalType = {
  open: boolean;
  openCategory: boolean;
  openStreet: boolean;
  openNeighborhoods: boolean;
  openCity: boolean;
};

export type ModalContextType = {
  open: boolean;
  openCategory: boolean;
  openStreet: boolean;
  openNeighborhoods: boolean;
  openCity: boolean;
  openPhoto: boolean;

  closeModal: (open: boolean) => void;
  closePhoto: (open: boolean) => void;
  closeCategory: (open: boolean) => void;
  closeStreet: (open: boolean) => void;
  closeNeighborhoods: (open: boolean) => void;
  closeCity: (open: boolean) => void;
};

export const ModalContext = createContext<ModalContextType>(
  {} as ModalContextType,
);

export function ModalProvider({ children }: { children: ReactNode }) {
  const [open, setClose] = useState(false);
  const [openPhoto, setPhoto] = useState(false);
  const [openCategory, setCloseCategory] = useState(false);
  const [openStreet, setCloseStreet] = useState(false);
  const [openNeighborhoods, setCloseNeighborhoods] = useState(false);
  const [openCity, setCloseCity] = useState(false);

  return (
    <ModalContext.Provider
      value={{
        open: open,
        openCategory: openCategory,
        openPhoto: openPhoto,
        openStreet: openStreet,
        openNeighborhoods: openNeighborhoods,
        openCity: openCity,
        closeModal: setClose,
        closePhoto: setPhoto,
        closeCategory: setCloseCategory,
        closeStreet: setCloseStreet,
        closeNeighborhoods: setCloseNeighborhoods,
        closeCity: setCloseCity,
      }}
    >
      {children}
    </ModalContext.Provider>
  );
}
