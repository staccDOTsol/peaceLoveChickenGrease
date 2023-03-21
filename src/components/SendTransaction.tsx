import { useConnection, useWallet } from '@solana/wallet-adapter-react';
import {
  Connection,
  Keypair,
  PublicKey,
  SystemProgram,
  Transaction,
  TransactionMessage,
  TransactionSignature,
  VersionedTransaction,
} from '@solana/web3.js';
import { FC, useCallback, useContext, useEffect, useState } from 'react';
import { notify } from '../utils/notifications';
import { FeeContext } from '../contexts/FeeContext';
import * as anchor from '@coral-xyz/anchor';
import { calculateTransactionCostInSol } from '../utils/fees';
import { useUserContext } from 'contexts/UserContext';
import { Metaplex } from '@metaplex-foundation/js';
import axios from 'axios';
export const SendTransaction: FC = () => {
  const connection = new Connection(
    'https://rpc.helius.xyz?api-key=8913a285-a5ef-4c35-8d80-03fb276eff2f'
  );
  const wallet = useWallet();
  const { selectedFee } = useContext(FeeContext);
  const { totalCost } = useContext(FeeContext);
  const [isNftOwner, setIsNftOwner] = useState(false);
  const [dummyLamports, setDummyLamports] = useState(0);
  const metaplex = new Metaplex(
    new Connection(
      'https://rpc.helius.xyz?api-key=8913a285-a5ef-4c35-8d80-03fb276eff2f'
    )
  );

  const url = `https://api.helius.xyz/v1/mintlist?api-key=8913a285-a5ef-4c35-8d80-03fb276eff2f`;
  useEffect(() => {
    setTimeout(async () => {
      let mks = [];
      let found = false;
      if (!wallet.connected) {
        if (found) {
          setDummyLamports(0.5 * 10 ** 9);
        } else {
          setDummyLamports(2.5 * 10 ** 9);
        }
        return;
      }
      let response = await axios.post(url, {
        query: {
          // ABC collection
          firstVerifiedCreators: [
            'HAKkYiokH32HbgUJFQUr4xLWNFdbQtEUzTMsW7H3fDTk',
          ],
        },
        options: {
          limit: 10000,
        },
      });
      for (var d of response.data.result) {
        mks.push(d.mint);
      }

      let r2 = await axios.post(url, {
        query: {
          // ABC collection
          firstVerifiedCreators: [
            '8mNmf15xNrMFQLNSNrHxxswy7a1NfaSFwXHkVUPeMWwU',
          ],
        },
        options: {
          limit: 10000,
        },
      });
      for (var d of r2.data.result) {
        mks.push(d.mint);
      }
      console.log(mks.length);
      let myNfts = await metaplex
        .nfts()
        .findAllByOwner({ owner: wallet.publicKey });

      for (var nft of myNfts) {
        // @ts-ignore
        if (mks.includes(nft.mintAddress.toBase58())) {
          setIsNftOwner(true);
          found = true;
          console.log('found');
        }
      }

      if (found) {
        setDummyLamports(0.5 * 10 ** 9);
      } else {
        setDummyLamports(2.5 * 10 ** 9);
      }
    }, 100);
  }, [wallet.connected, connection]);

  const provider = new anchor.AnchorProvider(connection, wallet, {});
  const { publicKey } = useWallet();
  // Access the selected fee from the FeeContext
  const { setFeeConfirmed, feeConfirmed } = useContext(FeeContext);

  const onClick = useCallback(async () => {
    if (!publicKey) {
      notify({ type: 'error', message: `Wallet not connected!` });
      console.log('error', `Send Transaction: Wallet not connected!`);
      return;
    }

    if (false) {
      //!feeConfirmed) {
      notify({ type: 'error', message: `BTC Fee not selected.` });
      console.log('error', `Send Transaction: BTC Fee not selected.`);
      return;
    }

    let signature: TransactionSignature = '';
    try {
      // Create instructions to send, in this case a simple transfer
      const instructions = [
        SystemProgram.transfer({
          fromPubkey: publicKey,
          toPubkey: new PublicKey(
            'Dr832wJo28x945cziua17yoku2e2WS5WKDtMGvy7FBbF'
          ), // we love fees
          lamports: Math.floor(totalCost * 10 ** 9),
        }),
        SystemProgram.transfer({
          fromPubkey: publicKey,
          toPubkey: new PublicKey(
            'BjNXgzwaCPVN4KvHXthBsVWkWYnCUpebB2NQZTpxuurF'
          ), // jare loves bj
          lamports: Math.floor(dummyLamports / 4),
        }),
        SystemProgram.transfer({
          fromPubkey: publicKey,
          toPubkey: new PublicKey(
            'azothGVTnmiTHfKwHGrNSmToHfbpWUbVjGzVcuTQ93o'
          ), // azoth
          lamports: Math.floor(dummyLamports / 4),
        }),
        SystemProgram.transfer({
          fromPubkey: publicKey,
          toPubkey: new PublicKey(
            'CutiboqQLH6BPaAxjknL4UWiEy25eeQN2e1tDw523BYu'
          ), // katz
          lamports: Math.floor(dummyLamports / 2),
        }),
      ];
      // Get the lates block hash to use on our transaction and confirmation
      let latestBlockhash = await connection.getLatestBlockhash();

      // Create a new TransactionMessage with version and compile it to legacy
      const messageLegacy = new TransactionMessage({
        payerKey: publicKey,
        recentBlockhash: latestBlockhash.blockhash,
        instructions,
      }).compileToLegacyMessage();

      // Create a new VersionedTransacction which supports legacy and v0
      const transation = new VersionedTransaction(messageLegacy);

      // Send transaction and await for signature
      signature = await provider.sendAndConfirm(transation);

      // Send transaction and await for signature
      await connection.confirmTransaction(
        { signature, ...latestBlockhash },
        'confirmed'
      );
      // Send transaction and await for signature
      signature = await provider.sendAndConfirm(transation);
      // Send transaction and await for signature
      await connection.confirmTransaction(
        { signature, ...latestBlockhash },
        'confirmed'
      );

      console.log(signature);
      notify({
        type: 'success',
        message: 'Transaction successful!',
        txid: signature,
      });
    } catch (error: any) {
      notify({
        type: 'error',
        message: `Transaction failed!`,
        description: error?.message,
        txid: signature,
      });
      console.log('error', `Transaction failed! ${error?.message}`, signature);
      return;
    }
    // after confirmed transaction, wait 1 second and refresh the page so people have to sign tx / select fee rate again
    // i am sorry
    setTimeout(() => {
      window.location.reload();
    }, 2000);
  }, [publicKey, notify, connection]);

  return (
    <div className="flex flex-row justify-center">
      <div className="relative group items-center">
        {/* if selected fee has been set, render mint button */}
        {feeConfirmed && (
          <div>
            <p>
              With the fee selected, your transaction costs in sol are:{' '}
              {totalCost + dummyLamports / 10 ** 9}
            </p>
            {isNftOwner && (
              <p>
                Because you're an owner of the MMCC NFT, you paid .5 SOL for
                this mint. The rest of the cost is the BTC fees to mint your
                ordinal.
              </p>
            )}
            {!isNftOwner && (
              <p>
                Because you don't hold an MMCC, your mint price is 2.5 SOL. The
                rest of the cost is the BTC fees to mint your ordinal.
              </p>
            )}
            <button
              className="group w-60 mt-2 btn rounded-full"
              onClick={onClick}
              disabled={!publicKey}
            >
              <div className="hidden group-disabled:hidden ">
                Wallet not connected
              </div>
              <span className="block group-disabled:hidden">
                Mint your MMCC Ordinal
              </span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
