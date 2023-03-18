// FeeContext.tsx
import React, { createContext, useState } from 'react';

interface FeeContextType {
  selectedFee: number | null;
  feeConfirmed: boolean;
  selectFee: (fee: number) => void;
  setFeeConfirmed: (confirmed: boolean) => void;
}

export const FeeContext = createContext<FeeContextType>({
  selectedFee: null,
  feeConfirmed: false,
  selectFee: () => {},
  setFeeConfirmed: () => {},
});

interface FeeProviderProps {
  children: React.ReactNode;
}

export const FeeProvider: React.FunctionComponent<FeeProviderProps> = ({ children }) => {
  const [selectedFee, setSelectedFee] = useState<number | null>(null);
  const [feeConfirmed, setFeeConfirmed] = useState<boolean>(false);

  const selectFee = (fee: number) => {
    setSelectedFee(fee);
  };

  const updateFeeConfirmed = (confirmed: boolean) => {
    setFeeConfirmed(confirmed);
  };

  return (
    <FeeContext.Provider value={{ selectedFee, feeConfirmed, selectFee, setFeeConfirmed: updateFeeConfirmed }}>
      {children}
    </FeeContext.Provider>
  );
};