import { createContext } from 'react';

type DialogReferenceContextType = {
  setReference?: (node: HTMLElement | null) => void;
};

export const DialogReferenceContext = createContext<DialogReferenceContextType>({});

