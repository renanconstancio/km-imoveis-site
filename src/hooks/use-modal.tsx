import { useContext } from "react";
import { ModalContext, ModalContextType } from "../context/modal";

export function useModal() {
  return useContext(ModalContext) as ModalContextType;
}
