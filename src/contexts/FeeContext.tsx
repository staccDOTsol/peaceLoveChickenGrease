import { useLocalStorage } from '@solana/wallet-adapter-react';
import React, { createContext, useState, useMemo } from 'react';

interface FeeContextType {
  selectedFee: any | null;
  feeConfirmed: boolean;
  selectFee: (fee: any) => void;
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
  const [selectedFee, setSelectedFee] = useState<any | null>(null);
  const [feeConfirmed, setFeeConfirmed] =useState(false)


  const selectFee = (fee: any) => {
    setSelectedFee(fee);
  };

  const updateFeeConfirmed = (confirmed: boolean) => {
    setFeeConfirmed(confirmed);
  };

  const value = useMemo(() => ({
    selectedFee,
    feeConfirmed,
    selectFee,
    setFeeConfirmed: updateFeeConfirmed
  }), [selectedFee, feeConfirmed]);

  return (
    <FeeContext.Provider value={value}>
      {children}
    </FeeContext.Provider>
  );
};
