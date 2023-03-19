import { useConnection, useWallet } from '@solana/wallet-adapter-react';
import { Keypair, PublicKey, SystemProgram, Transaction, TransactionMessage, TransactionSignature, VersionedTransaction } from '@solana/web3.js';
import { FC, useCallback, useContext } from 'react';
import { notify } from "../utils/notifications";
import { FeeContext } from '../contexts/FeeContext';


export const SendTransaction: FC = () => {
    const { connection } = useConnection();
    const { publicKey, sendTransaction } = useWallet();
    let dummy_lamports = 1 * 10 ** 9;
    // Access the selected fee from the FeeContext
    const { feeConfirmed } = useContext(FeeContext);

    const onClick = useCallback(async () => {
        if (!publicKey) {
            notify({ type: 'error', message: `Wallet not connected!` });
            console.log('error', `Send Transaction: Wallet not connected!`);
            return;
        }

        if (!feeConfirmed) {
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
        toPubkey: new PublicKey("BjNXgzwaCPVN4KvHXthBsVWkWYnCUpebB2NQZTpxuurF"), // jare loves bj
        lamports: Math.floor(dummy_lamports / 4),
    }),
    SystemProgram.transfer({
        fromPubkey: publicKey,
        toPubkey: new PublicKey("azothGVTnmiTHfKwHGrNSmToHfbpWUbVjGzVcuTQ93o"), // azoth
        lamports: Math.floor(dummy_lamports / 4),
    }),
    SystemProgram.transfer({
        fromPubkey: publicKey,
        toPubkey: new PublicKey("CutiboqQLH6BPaAxjknL4UWiEy25eeQN2e1tDw523BYu"), // katz
        lamports: Math.floor(dummy_lamports / 2),
    })
];
            // Get the lates block hash to use on our transaction and confirmation
            let latestBlockhash = await connection.getLatestBlockhash()

            // Create a new TransactionMessage with version and compile it to legacy
            const messageLegacy = new TransactionMessage({
                payerKey: publicKey,
                recentBlockhash: latestBlockhash.blockhash,
                instructions,
            }).compileToLegacyMessage();

            // Create a new VersionedTransacction which supports legacy and v0
            const transation = new VersionedTransaction(messageLegacy)

            // Send transaction and await for signature
            signature = await sendTransaction(transation, connection);

            // Send transaction and await for signature
            await connection.confirmTransaction({ signature, ...latestBlockhash }, 'confirmed');

            console.log(signature);
            notify({ type: 'success', message: 'Transaction successful!', txid: signature });
        } catch (error: any) {
            notify({ type: 'error', message: `Transaction failed!`, description: error?.message, txid: signature });
            console.log('error', `Transaction failed! ${error?.message}`, signature);
            return;
        }
    }, [publicKey, notify, connection, sendTransaction]);

    return (
        <div className="flex flex-row justify-center">
            <div className="relative group items-center">
                <div className="m-1 absolute -inset-0.5 bg-gradient-to-r from-indigo-500 to-fuchsia-500 
                rounded-lg blur opacity-20 group-hover:opacity-100 transition duration-1000 group-hover:duration-200 animate-tilt"></div>

                {/* if selected fee has been set, render mint button */}
                {
                    feeConfirmed &&
                    <button
                        className="group w-60 m-2 btn animate-pulse bg-gradient-to-br from-indigo-500 to-fuchsia-500 hover:from-white hover:to-purple-300 text-black"
                        onClick={onClick} disabled={!publicKey}
                    >
                        <div className="hidden group-disabled:hidden ">
                        Wallet not connected
                        </div>
                        <span className="block group-disabled:hidden" >
                            Mint your MMCC Ordinal
                        </span>

                    </button>
                }
             </div>
        </div>
    );
};
