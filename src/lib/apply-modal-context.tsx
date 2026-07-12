"use client";

import { createContext, useContext, useState } from "react";

type ApplyModalContextType = {
  isOpen: boolean;
  selectedTier?: string;
  openModal: (tier?: string) => void;
  closeModal: () => void;
};

const ApplyModalContext = createContext<ApplyModalContextType>({
  isOpen: false,
  openModal: () => {},
  closeModal: () => {},
});

export function ApplyModalProvider({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedTier, setSelectedTier] = useState<string | undefined>();

  const openModal = (tier?: string) => {
    setSelectedTier(tier);
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
    setSelectedTier(undefined);
  };

  return (
    <ApplyModalContext.Provider value={{ isOpen, selectedTier, openModal, closeModal }}>
      {children}
    </ApplyModalContext.Provider>
  );
}

export const useApplyModal = () => useContext(ApplyModalContext);
