import { verify } from '@noble/ed25519';
import { useWallet } from '@solana/wallet-adapter-react';
import bs58 from 'bs58';
import { FC, useCallback, useContext } from 'react';
import { notify } from "../utils/notifications";

import { useState } from 'react';
import { validate } from 'bitcoin-address-validation';

import { FeeContext } from '../contexts/FeeContext';
import FeesDropdown from './FeesDropdown';
import { wordlists } from 'bip39';


export const SignMessage: FC = () => {
    const { publicKey, signMessage } = useWallet();

    const [msg, setMessage] = useState('');  const handleChange = (event) => {
        setMessage(event.target.value);
      };
    // Access the selected fee from the FeeContext
    const { selectedFee } = useContext(FeeContext);
    const { setFeeConfirmed } = useContext(FeeContext);
    const { feeConfirmed } = useContext(FeeContext);
    // SIGN MESSAGE LOGIC 
    const onClick = useCallback(async () => {
        try {
            // `publicKey` will be null if the wallet isn't connected
            if (!publicKey) throw new Error('Wallet not connected!');
            // `signMessage` will be undefined if the wallet doesn't support it
            if (!signMessage) throw new Error('Wallet does not support message signing!');
            
            const isValidBTCAddr = validate(msg)
            if (!isValidBTCAddr) {
                throw new Error('Please submit a valid BTC address')
            }
            console.log(selectedFee)
            // Encode message and selected fee as bytes
            const message = new TextEncoder().encode(msg + "\n" + selectedFee.toString());
            
            // Sign the bytes using the wallet
            const signature = await signMessage(message);
            // Verify that the bytes were signed using the private key that matches the known public key
            if (!verify(signature, message, publicKey.toBytes())) throw new Error('Invalid signature!');
            notify({ type: 'success', message: 'Sign message successful!', txid: bs58.encode(signature) });
            console.log("selected fee saved to state:", selectedFee)

            setFeeConfirmed(true); // Use the selectFee function instead of setSelectedFee
        } catch (error: any) {
            notify({ type: 'error', message: `Sign Message failed!`, description: error?.message });
            console.log('error', `Sign Message failed! ${error?.message}`);
        }
    }, [publicKey, msg, notify, signMessage]);

    return (

        <div>
        {publicKey &&
        <div>

            {selectedFee &&
            <div>
            <span className="block group-disabled:hidden messageBox" >
                    Enter your BTC address and select your fee rate
            </span>
                <div className="flex flex-row justify-center messageBox">
                    <div className="relative group items-center">
                        <input
                            type="text"
                            id="message"
                            name="message"
                            placeholder=" Address"
                            onChange={handleChange}
                        />
                    </div>
                </div></div>}
            {!selectedFee &&
                <div className="flex flex-row justify-center messageBox">
                    <div className="relative group items-center">
                    <div>
                        <FeesDropdown />
                    </div>
                </div>
            </div>
}
        </div>
        }

            <div className="flex flex-row justify-center">
            <div className="relative group items-center">
                <div className="m-1 absolute -inset-0.5 bg-gradient-to-r from-indigo-500 to-fuchsia-500 
                rounded-lg blur opacity-20 group-hover:opacity-100 transition duration-1000 group-hover:duration-200 animate-tilt"></div>
                <button
                    className="group w-60 m-2 btn animate-pulse bg-gradient-to-br from-indigo-500 to-fuchsia-500 hover:from-white hover:to-purple-300 text-black"
                    onClick={onClick} disabled={!publicKey}
                >
                    <div className="hidden group-disabled:block">
                        Wallet not connected
                    </div>
                    <span className="block group-disabled:hidden" > 
                        Sign Message 
                    </span>
                </button>
            </div>
        </div>
        </div>
    );
};