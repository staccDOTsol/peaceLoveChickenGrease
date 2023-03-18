// FeeContext.tsx
import React, { createContext, useState } from 'react';

interface FeeContextType {
  selectedFee: number | null;
  feeSelected: boolean;
  selectFee: (fee: number) => void;
}

export const FeeContext = createContext<FeeContextType>({
  selectedFee: null,
  feeSelected: false,
  selectFee: () => {},
});

interface FeeProviderProps {
  children: React.ReactNode;
}

export const FeeProvider: React.FunctionComponent<FeeProviderProps> = ({ children }) => {
  const [selectedFee, setSelectedFee] = useState<number | null>(null);
  const [feeSelected, setFeeSelected] = useState<boolean>(false);

  const selectFee = (fee: number) => {
    setSelectedFee(fee);
    setFeeSelected(true);
  };

  return (
    <FeeContext.Provider value={{ selectedFee, feeSelected, selectFee }}>
      {children}
    </FeeContext.Provider>
  );
};