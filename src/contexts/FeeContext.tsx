// FeeContext.tsx
import React, { createContext, useState } from 'react';

interface FeeContextType {
  selectedFee: number | null;
  setSelectedFee: React.Dispatch<React.SetStateAction<number | null>>;
}

export const FeeContext = createContext<FeeContextType>({
  selectedFee: null,
  setSelectedFee: () => {},
});

interface FeeProviderProps {
  children: React.ReactNode;
}

export const FeeProvider: React.FunctionComponent<FeeProviderProps> = ({ children }) => {
  const [selectedFee, setSelectedFee] = useState<number | null>(null);

  return (
    <FeeContext.Provider value={{ selectedFee, setSelectedFee }}>
      {children}
    </FeeContext.Provider>
  );
};
