// UserContext.tsx
import { useLocalStorage } from '@solana/wallet-adapter-react';
import { createContext, useContext, useState } from 'react';

interface UserContextValue {
  bitcoinAddress: string | null;
  setBitcoinAddress: (address: string | null) => void;
  isNFTOwner: boolean;
  setIsNFTOwner: (owner: boolean) => void;
}

const UserContext = createContext<UserContextValue>({
  bitcoinAddress: null,
  setBitcoinAddress: () => {},
  isNFTOwner: false,
  setIsNFTOwner: () => {},
});

export const useUserContext = () => useContext(UserContext);

export const UserProvider: React.FC = ({ children }: any) => {
  const [bitcoinAddress, setBitcoinAddress] = useLocalStorage('bitcoinAddress', "")
  const [isNFTOwner, setIsNFTOwner] = useLocalStorage('isNFTOwner', false)
  return (
    <UserContext.Provider value={{ bitcoinAddress, setBitcoinAddress, isNFTOwner, setIsNFTOwner }}>
      {children}
    </UserContext.Provider>
  );
};
