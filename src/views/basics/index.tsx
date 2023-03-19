
import { FC, useContext, useEffect } from "react";
import { SignMessage } from '../../components/SignMessage';
import { SendTransaction } from '../../components/SendTransaction';
import { SendVersionedTransaction } from '../../components/SendVersionedTransaction';

import axios from 'axios'
import { Connection, PublicKey } from '@solana/web3.js';
import { Metaplex } from '@metaplex-foundation/js'
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { useUserContext } from "contexts/UserContext";

export const BasicsView: FC = ({ }) => {
  const url = `https://api.helius.xyz/v1/mintlist?api-key=8913a285-a5ef-4c35-8d80-03fb276eff2f`
  let mks = []
  let userContext = useUserContext  ()
  const { connected } = useWallet();

    const wallet = useWallet();
    const connection = new Connection("https://rpc.helius.xyz?api-key=8913a285-a5ef-4c35-8d80-03fb276eff2f");
    const metaplex = new Metaplex(new Connection("https://rpc.helius.xyz?api-key=8913a285-a5ef-4c35-8d80-03fb276eff2f"))
    useEffect(() => {

    if (!wallet.connected) return 
      axios.post(url, {
        "query": {
            // ABC collection
            "firstVerifiedCreators": ["HAKkYiokH32HbgUJFQUr4xLWNFdbQtEUzTMsW7H3fDTk"]
        },
        "options": {
            "limit": 10000
        }
    }).then (function (response) {
      for (var d of response.data.result){
    mks.push(d.mint)
   }
  })
   
  axios.post(url, {
    "query": {
        // ABC collection
        "firstVerifiedCreators": ["8mNmf15xNrMFQLNSNrHxxswy7a1NfaSFwXHkVUPeMWwU"]
    },
    "options": {
        "limit": 10000
    }
  }).then (function (response) {
    for (var d of response.data.result){
  mks.push(d.mint)
  } 
  console.log(mks.length)
   metaplex.nfts().findAllByOwner({owner: wallet.publicKey}).then (function (myNfts) {
  
  for (var nft of myNfts){
    // @ts-ignore
  if (mks.includes(nft.mintAddress.toBase58())){
    userContext.setIsNFTOwner(true)
    console.log("found")
  }
  }
})
  })
    }, [connection, metaplex])
  return (
    <div className="md:hero mx-auto p-4">
      <div className="md:hero-content flex flex-col">
        <h1 className="text-center text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-br from-indigo-500 to-fuchsia-500 mt-10 mb-8">
          Basics
        </h1>
        {/* CONTENT GOES HERE */}
        <div className="text-center">
          <SignMessage />
          <SendTransaction />
          <SendVersionedTransaction />
        </div>
      </div>
    </div>
  );
};
