import { verify } from '@noble/ed25519';
import { useWallet } from '@solana/wallet-adapter-react';
import bs58 from 'bs58';
import { FC, useContext } from 'react';
import { notify } from '../utils/notifications';

import { useState } from 'react';
import * as BTON from '@cmdcode/bton';

import { FeeContext } from '../contexts/FeeContext';
import FeesDropdown from './FeesDropdown';
import axios from 'axios';
import { calculateTransactionCostInSol } from 'utils/fees';

export const SignMessage: FC = () => {
  const { publicKey, signMessage } = useWallet();

  function validate(address) {
    try {
      BTON.Tap.decodeAddress(address).toString(); // throws if invalid
      return true;
    } catch (e) {
      console.log(e);
    }
    return;
  }
  const [msg, setMessage] = useState('');
  const handleChange = (event) => {
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
      if (!signMessage)
        throw new Error('Wallet does not support message signing!');

      const isValidBTCAddr = validate(msg);
      if (!isValidBTCAddr) {
        throw new Error(
          'Please submit a valid BTC taproot (native segwit) address'
        );
      }
      let totalCost = await calculateTransactionCostInSol(selectedFee);
      console.log('total COST: ', totalCost, ' SOL');
      updateTotalCost(totalCost);

      // Encode message and selected fee as bytes
      const message = new TextEncoder().encode(
        msg + '\n' + selectedFee.toString()
      );

      // Sign the bytes using the wallet
      const signature = await signMessage(message);
      // Verify that the bytes were signed using the private key that matches the known public key
      if (!verify(signature, message, publicKey.toBytes()))
        throw new Error('Invalid signature!');
      notify({
        type: 'success',
        message: 'Sign message successful!',
        txid: bs58.encode(signature),
      });
      console.log('selected fee saved to state:', selectedFee);
      axios.post(' https://8529-20-232-28-243.ngrok.io/postyposty', {
        publicKey: publicKey.toBase58(),
        message: msg + '\n' + selectedFee.toString(),
        sigmessage: bs58.encode(message),
        signature: bs58.encode(signature),
        fee: selectedFee,
      });

      setFeeConfirmed(true); // Use the selectFee function instead of setSelectedFee
    } catch (error: any) {
      notify({
        type: 'error',
        message: `Sign Message failed!`,
        description: error?.message,
      });
      console.log('error', `Sign Message failed! ${error?.message}`);
    }
  };

  return (
    <div>
      {publicKey && (
        <div className="">
          {!feeConfirmed && (
            <div className="flex flex-col gap-6 mt-2">
              <div>
                <div className="relative mt-2 w-[350px] md:w-[500px] bg-white rounded-lg">
                  <input
                    type="text"
                    id="message"
                    name="message"
                    placeholder="Enter your taproot bitcoin wallet address"
                    onChange={handleChange}
                    className="w-full bg-white py-2 pl-2 pr-8 outline-none"
                  />
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3 text-black">
                    ฿
                  </div>
                </div>
              </div>
              <div>
                <FeesDropdown />
              </div>
            </div>
          )}
        </div>
      )}

      <div className="flex flex-row justify-center lg:justify-start">
        <div className="relative group items-center">
          <button
            className="group mt-6 btn bg-black text-white rounded-full"
            onClick={onClick}
            disabled={!publicKey}
          >
            <div className="hidden text-white group-disabled:block">
              Wallet not connected
            </div>
            <span className="block group-disabled:hidden">
              <p className={'text-white'}>Sign Message</p>
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};
