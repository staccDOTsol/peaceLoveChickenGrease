// Next, React
import { FC, useEffect, useRef } from 'react';

// Wallet
import { useWallet, useConnection } from '@solana/wallet-adapter-react';

// Components
import { SendTransaction } from '../../components/SendTransaction';

// Store
import useUserSOLBalanceStore from '../../stores/useUserSOLBalanceStore';
import { FeeProvider } from 'contexts/FeeContext';
import { SignMessage } from 'components/SignMessage';
import { Connection } from '@solana/web3.js';


export const HomeView: FC = ({ }) => {

  const videoEl = useRef(null);

  const attemptPlay = () => {
    videoEl &&
      videoEl.current &&
      videoEl.current.play().catch(error => {
        console.error("Error attempting to play", error);
      });
  };

  useEffect(() => {
    attemptPlay();
  }, []);


  const wallet = useWallet();
  const connection = new Connection("https://rpc.helius.xyz?api-key=8913a285-a5ef-4c35-8d80-03fb276eff2f");

  const balance = useUserSOLBalanceStore((s) => s.balance)
  const { getUserSOLBalance } = useUserSOLBalanceStore()

  useEffect(() => {
    if (wallet.publicKey) {
      console.log(wallet.publicKey.toBase58())
      getUserSOLBalance(wallet.publicKey, connection)
    }
  }, [wallet.publicKey, connection, getUserSOLBalance])

  return (

    <div className="md:hero mx-auto p-4">
      <div className="md:hero-content flex flex-col">
        <div>
        <h1 className="text-center text-5xl md:pl-12 font-bold text-transparent bg-clip-text bg-gradient-to-br from-green-500 to-fuchsia-100 mb-4">
          Ordinal Meerkats Country Club
        </h1>
        {/* </div>
        <div> */}
              <h4 className="text-2x1 md:text-2xl text-center text-slate-300 my-2">
                <p>Use Solana to mint and have your Ordinal sent to your BTC wallet!</p>
              </h4>
            </div>
        <div className="flex flex-col mt-2 center-items">
          {/* CONTENT GOES HERE */}
          <center>
          <div>
          <video
            style={{ maxWidth: "100%", width: "320px", margin: "0 auto" }}
            playsInline
            loop
            muted
            controls={false}
            src="../collection.mp4"
            ref={videoEl}
        />
          </div>
          <div className="text-center mt-4">
            <SignMessage />
            <SendTransaction />
          </div>
          </center>
        </div>
      </div>
    </div>
  );
};
