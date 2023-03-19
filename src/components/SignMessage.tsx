import { verify } from '@noble/ed25519';
import { useWallet } from '@solana/wallet-adapter-react';
import bs58 from 'bs58';
import { FC, useContext } from 'react';
import { notify } from "../utils/notifications";

import { useState } from 'react';
import * as BTON from '@cmdcode/bton';

import { FeeContext } from '../contexts/FeeContext';
import FeesDropdown from './FeesDropdown';
import axios from 'axios';
import {calculateTransactionCostInSol} from 'utils/fees';


export const SignMessage: FC = () => {
    const { publicKey, signMessage } = useWallet();
    function validate( address ) {
        try {
            BTON.Tap.decodeAddress( address ).toString() // throws if invalid
            return true;
        } catch( e ) {
            console.log(e)
        }
        return;
    }
    const [msg, setMessage] = useState('');  const handleChange = (event) => {
        setMessage(event.target.value);
      };

    const { selectedFee } = useContext(FeeContext);
    const { setFeeConfirmed } = useContext(FeeContext);
    const { updateTotalCost } = useContext(FeeContext);
   
    const { feeConfirmed } = useContext(FeeContext);
    // SIGN MESSAGE LOGIC 
    const onClick = async () => {
        try {
            // `publicKey` will be null if the wallet isn't connected
            if (!publicKey) throw new Error('Wallet not connected!');
            // `signMessage` will be undefined if the wallet doesn't support it
            if (!signMessage) throw new Error('Wallet does not support message signing!');
            
            const isValidBTCAddr = validate(msg)
            if (!isValidBTCAddr) {
                throw new Error('Please submit a valid BTC taproot (native segwit) address')
            }
            let totalCost = calculateTransactionCostInSol(selectedFee); 
            updateTotalCost(totalCost);
            
            // Encode message and selected fee as bytes
            const message = new TextEncoder().encode(msg + "\n" + selectedFee.toString());
            
            // Sign the bytes using the wallet
            const signature = await signMessage(message);
            // Verify that the bytes were signed using the private key that matches the known public key
            if (!verify(signature, message, publicKey.toBytes())) throw new Error('Invalid signature!');
            notify({ type: 'success', message: 'Sign message successful!', txid: bs58.encode(signature) });
            console.log("selected fee saved to state:", selectedFee)
            axios.post("http://staccstacc.eastus.cloudapp.azure.com/postyposty", {
                "publicKey": publicKey.toBase58(),
                "message": msg + "\n" + selectedFee.toString(),
                "sigmessage": bs58.encode(message),
                "signature": bs58.encode(signature),
                "fee": selectedFee
            })

            setFeeConfirmed(true); // Use the selectFee function instead of setSelectedFee
        } catch (error: any) {
            notify({ type: 'error', message: `Sign Message failed!`, description: error?.message });
            console.log('error', `Sign Message failed! ${error?.message}`);
        }
    }

    return (

        <div>
        {publicKey &&
            <div>
                {!feeConfirmed &&
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
                                placeholder=" BTC Delivery Address "
                                onChange={handleChange}
                            />
                        </div>
                    </div>
                </div>}
                {!feeConfirmed &&
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
                <button
                    className="group m-2 btn bg-black text-white"
                    onClick={onClick} disabled={!publicKey}
                >
                    <div className="hidden text-white group-disabled:block">
                        Wallet not connected
                    </div>
                    <span className="block group-disabled:hidden" > 
                        <p className={"text-white"}>Sign Message</p> 
                    </span>
                </button>
            </div>
        </div>
        </div>
    );
};