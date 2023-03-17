// Next, React
import { FC, useEffect, useState } from 'react';
import Link from 'next/link';

// Wallet
import { useWallet, useConnection } from '@solana/wallet-adapter-react';

// Components
import { RequestAirdrop } from '../../components/RequestAirdrop';
import { SendTransaction } from '../../components/SendTransaction';
import pkg from '../../../package.json';

// Store
import useUserSOLBalanceStore from '../../stores/useUserSOLBalanceStore';

import Image from 'react-image-webp';


export const HomeView: FC = ({ }) => {
  const wallet = useWallet();
  const { connection } = useConnection();

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
        <div className='mt-6'>
        <h1 className="text-center text-5xl md:pl-12 font-bold text-transparent bg-clip-text bg-gradient-to-br from-green-500 to-fuchsia-100 mb-4">
          Meerkat Millionaires Country Club
        </h1>
        </div>
        <h4 className="md:w-full text-2x1 md:text-4xl text-center text-slate-300 my-2">
          <p>Mint on Solana, receive an ordinal on BTC.</p>
        </h4>
        <div className="flex flex-col mt-2">
        <h4 className="md:w-full text-2x1 md:text-4xl text-center text-slate-300 my-2">
          <p className='text-slate-500 text-2x1 leading-relaxed'>BRRRBRRR</p>
        </h4>
        {/* CONTENT GOES HERE */}
        <picture>
          <source srcSet="/mmcc.webp" />
          <img src="/mmcc.webp" />  
        </picture>
        <div className="text-center">
          <SendTransaction />
        </div>

          <h4 className="md:w-full text-2xl text-slate-300 my-2">
          {wallet &&
          <div className="flex flex-row justify-center">
            <div>
              {(balance || 0).toLocaleString()}
              </div>
              <div className='text-slate-600 ml-2'>
                SOL
              </div>
          </div>
          }
          </h4>
        </div>
      </div>
    </div>
  );
};
