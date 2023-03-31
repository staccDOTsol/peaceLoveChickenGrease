
const verify = require('@noble/ed25519').verify
const fs = require('fs');
const { PublicKey } = require('@solana/web3.js');
const spawn = require('child_process').spawn;
const axios = require('axios')
let messages = []
const express = require('express');
const app = express();
app.use(express.static('public'))
const port = 80;
const st = new Date().getTime()/1000 - 60 * 30
const bs58 = require('bs58');
const NostrTools = require('nostr-tools');
const cors = require('cors');
const bodyParser = require('body-parser');
app.use(cors());
let somecoolshit = {}
let dones = []
let donetx = []
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
let donets =[]
const isProduction = true   
var anobject = [{"message":"bc1ptfymq2dlpxd0e0r3mx47fcn58vtr6sant2h3ete4edkke09m3jns5sjtl9\n9","signature":"4xq8a2ALAJvLMEQrPPywhaQ4h7C7q4rtW2qGzGj3tnGEsz3Ck7PbJ1P75vaH9n2wa4EVhWnUtBUS5w4Lf5mBZsSo","publicKey":"5RAVNCXurMJHeGjqGpM569nP2fxRzABXMuEX3D8Kf5dU","sigmessage":"2y6G45zk6FyAWYVbxHQFZZAondt9EooJ5wKiSabQ26kKe8e4vBHUiUF3Jeb8YT54JGqopVqcx2giqo1bwoacmY3z","collection":"Released"},
{"message":"bc1pxytyrjgd2g9gkzn2ct2r7td7hh64cjsvuwmwktv42j9sea7d9thqhkt0yc\n4","signature":"4yPzNQu6qNnUocVRx4SV9R7NC7p2DbEFJMEMbXRMQ8YVNXZibx5wv9a6nzNNfA5SRDWFzJtuJyLPnuLBCs3aH67a","publicKey":"BiChC2Mtn4Dfo1HyaZ8V89DCyQPCMNhtRueBHVHVto6Q","sigmessage":"2y6G461Ty1SwcFQgrDN1hfGth32gPrmSdBDjjRgLYk6p63bVoAGkvuUKPN9JzxJzSNkRktgSUtupvvJo68Y3gFiT","collection":"Released"},
{"message":"bc1pxytyrjgd2g9gkzn2ct2r7td7hh64cjsvuwmwktv42j9sea7d9thqhkt0yc\n4","signature":"4XWYQ2Q1R4xf1GfCGJmkF6Lo5k89dJGEM6VykK4zcvdceVfgSxqYScKiWLj3tDWHHwRBvbi6h7yH4GRR6NzKbLLx","publicKey":"Fj4xkTD86kk9NgxFjG9eFH2SApfboqikSof7cgwx4poR","sigmessage":"2y6G461Ty1SwcFQgrDN1hfGth32gPrmSdBDjjRgLYk6p63bVoAGkvuUKPN9JzxJzSNkRktgSUtupvvJo68Y3gFiT","collection":"Released"},
{"message":"bc1pdlruvxty5cce0xwgmcl68knlnuqp37a9r7hdcanfwjnkv03gmpesm9f9z3\n10","signature":"24wP4wuV7HTs3eYFrqBXUvdtDH6VVDu3u5oU2YNwsZFzuGgkMTafrDu2ezRfAdV4p6Qz3RGesKKKN1PtAREhZaZB","publicKey":"Cdww1YEUQdiA3JazKpVuM5FTcZ6fkdAndNVLtVG3GyyL","sigmessage":"9gaDScqNPxMSVuBp1p1y2vfw6Qmz1vsz5h2mDaG5F4xFAExR8KcE5Wss7vWtTKoperSf2k23n3SBxdY9as1jv8UyD"},
{"message":"bc1ptt9zhuuhm3mvm4e3ja5cj30q5r7vwpw4r5dqgz0zrdz5j9slq9rsy327qx\n10","signature":"5YcPsgKKK4G68zgBxvLmZmQXkevxSXYnpxit3XCi8aT5BVJPjoCuAihgGMCrJqTShSSBfGH53CaWTHVG8mz3No5d","publicKey":"23xrRTYdTmosbC8Z3oeG4C2522j2jqhqTCHR5V7fNexb","sigmessage":"9gaDSd3udY5R4Rb2iWuoJdzG7NXcLVqGdouY74WF28LFRWHaePhB2DdD6qLV7uxFnehB9XeAUVT1Hu4SDAD5r6BgT","collection":"Released"},
{"message":"bc1pxytyrjgd2g9gkzn2ct2r7td7hh64cjsvuwmwktv42j9sea7d9thqhkt0yc\n6","signature":"344uwiSAwB6PuKghimF5DddSUzGyfR7DAMcUBeGbYRzwatsSUCfNbtLyiaK5FABJUDzgdBzPsms2t3yizrVgDDfi","publicKey":"BiChC2Mtn4Dfo1HyaZ8V89DCyQPCMNhtRueBHVHVto6Q","sigmessage":"2y6G461Ty1SwcFQgrDN1hfGth32gPrmSdBDjjRgLYk6p63bVoAGkvuUKPN9JzxJzSNkRktgSUtupvvJo68Y3gFiV","collection":"Released"},
{"message":"bc1pxytyrjgd2g9gkzn2ct2r7td7hh64cjsvuwmwktv42j9sea7d9thqhkt0yc\n11","signature":"2tEFpvsvpLJ7rGja4DSn4cK5uhbC9cC3RybVT9i4AnVuQU9NnerAcnEkYwhYXCKFoSndVzZT3z5bPGwA1CnYDkiA","publicKey":"BiChC2Mtn4Dfo1HyaZ8V89DCyQPCMNhtRueBHVHVto6Q","sigmessage":"9gaDSd742CyW2abYtDZk6Tw99hxQstfA6g7DcFvdH7EeqGTG6jvYtvba9iKgSo8QWzzgGj75U88AYzHYReG2pFwjN","collection":"Released"},
{"message":"bc1pxytyrjgd2g9gkzn2ct2r7td7hh64cjsvuwmwktv42j9sea7d9thqhkt0yc\n10","signature":"4AivG3MVMTQLoHBLUCrcshBfcar2fZaFdqiJZTTh7SpS7WoA1WwwdcX6G3nxpKEA5qB52rk4MsaYwzf4qNN6kJQ5","publicKey":"BiChC2Mtn4Dfo1HyaZ8V89DCyQPCMNhtRueBHVHVto6Q","sigmessage":"9gaDSd742CyW2abYtDZk6Tw99hxQstfA6g7DcFvdH7EeqGTG6jvYtvba9iKgSo8QWzzgGj75U88AYzHYReG2pFwjM","collection":"Released"},
{"message":"bc1pxytyrjgd2g9gkzn2ct2r7td7hh64cjsvuwmwktv42j9sea7d9thqhkt0yc\n6","signature":"344uwiSAwB6PuKghimF5DddSUzGyfR7DAMcUBeGbYRzwatsSUCfNbtLyiaK5FABJUDzgdBzPsms2t3yizrVgDDfi","publicKey":"BiChC2Mtn4Dfo1HyaZ8V89DCyQPCMNhtRueBHVHVto6Q","sigmessage":"2y6G461Ty1SwcFQgrDN1hfGth32gPrmSdBDjjRgLYk6p63bVoAGkvuUKPN9JzxJzSNkRktgSUtupvvJo68Y3gFiV","collection":"Released"},
{"message":"bc1p8fdqg6lp55a2jfjgf5nv9rzs3up40htqg79p6trhs796vjla37zq99hhwc\n6","signature":"3Ywpux1KBZAHU2eCF5Tnxzx5gHWhyaNDqHPAGi2jiqQiW4kQEU7C5N44qh8BbtV44hJNMvBWSP6nsHMGoqz8wKm3","publicKey":"BAedTDxdbXR2UnbhFGxWZRgq9S1RgrmjsDAKk6zrHtd8","sigmessage":"2y6G45p7PpJWFKD5QxevAmRpWDAziLKVpEzbwGtj2QoAwGCHmskR8bPxfTWPPXDfUPDFDnpVuRojwVafZRX28znR","collection":"Released"},
{"message":"bc1pc58vsm96v9ppzdzng0x226cmlr3rhnrjfs0yu7a5pmdaltvw4veqlry2zg\n6","signature":"5WQtr6cZaycmGHGX7sgy3j1TBKDKYxS9yMTPS9vNX91rZmPhGnzb6cpQ7qYhtZtuuKtnjcvAfayoqXVzDG3mf8iS","publicKey":"57UmkN9ffM3Zy8ifq6GJEUgWXdX145iWkXWNVcRB6hPi","sigmessage":"2y6G45whPE2xJEgziMWaUdd91hVrBdxiBinLdMgUmEJukS5fE7JDYkhKt51NhbEFPPLgpygZYNSMuNxs1SpDfnt5","collection":"Released"},
{"message":"bc1pgdaz2cjwp8ft52qsvq60yxtrv5uua9uk6xasfxf6fqgn3g2smmwsazul6s\n6","signature":"9AxKj5NTmocVZMDCABXAc6MTSUo2JFBz582rbXYD5VMitQmHFofo6R25vNfm8s3WJRcZVE1yseeFDDTsbZc4whx","publicKey":"J18YMTAoEBduNS7ZvfqAZZa2HiRH5UKXwNEtURP141Wf","sigmessage":"2y6G45xSPbWhXkkprXUj6G8rKL66tGknwHJUV7o6v77v5cmtmaDzMZwhLfsXRfnwBaDtppKYEnEZPjoSQqU7vjZ7","collection":"Released"},
{"message":"bc1ptt9zhuuhm3mvm4e3ja5cj30q5r7vwpw4r5dqgz0zrdz5j9slq9rsy327qx\n6","signature":"jnG46Cgfc8bCZmNHXqDnE6C86YqmUdXWLC2WaYQfZuQS9LcMVFjZ2tcKEPGGqh8778jAUZ47PS1FQvevDXiixK7","publicKey":"23xrRTYdTmosbC8Z3oeG4C2522j2jqhqTCHR5V7fNexb","sigmessage":"2y6G45zkeH6z7DNJcEaG2H5pNqNtWLg2jKnSAyyvUSgFbZ1auRdHmgZfzWXhMbetqQVb22WGHeiEfGRLkzNKKNZs","collection":"Released"},
{"message":"bc1ptt9zhuuhm3mvm4e3ja5cj30q5r7vwpw4r5dqgz0zrdz5j9slq9rsy327qx\n6","signature":"jnG46Cgfc8bCZmNHXqDnE6C86YqmUdXWLC2WaYQfZuQS9LcMVFjZ2tcKEPGGqh8778jAUZ47PS1FQvevDXiixK7","publicKey":"23xrRTYdTmosbC8Z3oeG4C2522j2jqhqTCHR5V7fNexb","sigmessage":"2y6G45zkeH6z7DNJcEaG2H5pNqNtWLg2jKnSAyyvUSgFbZ1auRdHmgZfzWXhMbetqQVb22WGHeiEfGRLkzNKKNZs","collection":"Released"},
{"message":"bc1ptt9zhuuhm3mvm4e3ja5cj30q5r7vwpw4r5dqgz0zrdz5j9slq9rsy327qx\n6","signature":"jnG46Cgfc8bCZmNHXqDnE6C86YqmUdXWLC2WaYQfZuQS9LcMVFjZ2tcKEPGGqh8778jAUZ47PS1FQvevDXiixK7","publicKey":"23xrRTYdTmosbC8Z3oeG4C2522j2jqhqTCHR5V7fNexb","sigmessage":"2y6G45zkeH6z7DNJcEaG2H5pNqNtWLg2jKnSAyyvUSgFbZ1auRdHmgZfzWXhMbetqQVb22WGHeiEfGRLkzNKKNZs","collection":"Released"},
{"message":"bc1ptt9zhuuhm3mvm4e3ja5cj30q5r7vwpw4r5dqgz0zrdz5j9slq9rsy327qx\n9","signature":"2482qLswfhyVSMdM7hwvGDF2pkDzCuDLZyhcUUBtCfPtYaNx1HwR95CsQKsU8GcWqeMovh1ZyrU2vkwZSbZwudeV","publicKey":"23xrRTYdTmosbC8Z3oeG4C2522j2jqhqTCHR5V7fNexb","sigmessage":"2y6G45zkeH6z7DNJcEaG2H5pNqNtWLg2jKnSAyyvUSgFbZ1auRdHmgZfzWXhMbetqQVb22WGHeiEfGRLkzNKKNZv","collection":"Released"},
{"message":"bc1ptt9zhuuhm3mvm4e3ja5cj30q5r7vwpw4r5dqgz0zrdz5j9slq9rsy327qx\n6","signature":"jnG46Cgfc8bCZmNHXqDnE6C86YqmUdXWLC2WaYQfZuQS9LcMVFjZ2tcKEPGGqh8778jAUZ47PS1FQvevDXiixK7","publicKey":"23xrRTYdTmosbC8Z3oeG4C2522j2jqhqTCHR5V7fNexb","sigmessage":"2y6G45zkeH6z7DNJcEaG2H5pNqNtWLg2jKnSAyyvUSgFbZ1auRdHmgZfzWXhMbetqQVb22WGHeiEfGRLkzNKKNZs","collection":"Released"},
{"message":"bc1ptt9zhuuhm3mvm4e3ja5cj30q5r7vwpw4r5dqgz0zrdz5j9slq9rsy327qx\n6","signature":"jnG46Cgfc8bCZmNHXqDnE6C86YqmUdXWLC2WaYQfZuQS9LcMVFjZ2tcKEPGGqh8778jAUZ47PS1FQvevDXiixK7","publicKey":"23xrRTYdTmosbC8Z3oeG4C2522j2jqhqTCHR5V7fNexb","sigmessage":"2y6G45zkeH6z7DNJcEaG2H5pNqNtWLg2jKnSAyyvUSgFbZ1auRdHmgZfzWXhMbetqQVb22WGHeiEfGRLkzNKKNZs","collection":"Released"},
{"message":"bc1prn93k30a6xfx6w0qwh5gpssfw6twamek3a0v86qyd2xg5ehesljs3ddjju\n10","signature":"4naVFgvmBX2XXFyiFGBE9AKnjqTRPxu3ZkWoGiaHEjRk6dVitqFyZESaDEsrPnEeWxRiCjxZ5HjCA1NXBKx68zWe","publicKey":"2jj4YoNyKVycdPSFT6ZRTzhdURiLuJwdV5jt3PWefpp7","sigmessage":"9gaDSd2KqQC68HG87Mr6Fybyiem6SP45wM19nXyf9uAoTtT3mTu9q8TJEa8QBwcJCP2NhNQgdXAYxcR7AdKvWULg7","collection":"Released"},]
const ordinalsExplorerUrl = isProduction
  ? 'https://8529-20-232-28-243.ngrok.io'
  : 'https://explorer-signet.openordex.org';
const baseMempoolUrl = isProduction
  ? 'https://mempool.space'
  : 'https://mempool.space/signet';
const networkName = isProduction ? 'mainnet' : 'signet';
const baseMempoolApiUrl = `${baseMempoolUrl}/api`;
const bitcoinPriceApiUrl = 'https://blockchain.info/ticker?cors=true';

const nostrRelayUrl = 'wss://nostr.openordex.org';
const collectionsRepo = 'ordinals-wallet/ordinals-collections';
const exchangeName = 'candyMachine';
const feeLevel = 'hourFee'; // "fastestFee" || "halfHourFee" || "hourFee" || "economyFee" || "minimumFee"
const nostrOrderEventKind = 666
let bads = {}
async function getLatestSuccesses(limit, nostrLimit = 2000, filters = {}) {
    console.log(1);
      nostrRelay = NostrTools.relayInit(nostrRelayUrl);
      nostrRelay.connect();
    await nostrRelay.connect();
    const latestOrders = [];
    const inscriptionDataCache = {};

    const orders = await nostrRelay.list([
      {
        kinds: [nostrOrderEventKind+1],
        limit: nostrLimit,
        ...filters,
      },
    ]);

    for (const order of orders) {
        try {
      console.log(order);
        latestOrders.push(order.content);{}

        if (latestOrders.length >= limit) {
          break;
        }
      } catch (e) {
        console.error(e);
      }
    }

    return latestOrders;
  }
  var pubkeys = {}
setTimeout(async () => {
  let successes = await getLatestSuccesses(1000)
  for (var o of successes){
    var ourobj = (JSON.parse(o))
    var pubkey = ourobj.message 
    if (!Object.keys(pubkeys).includes(pubkey)){
      pubkeys[pubkey] = 1
    } else {
      pubkeys[pubkey] += 1
    }
    
     
    }

  for (var i of anobject){
    var good = false 
     console.log(i)
     if (!Object.keys(bads).includes(i.message)){
       bads[i.message] = 1
     } else {


        bads[i.message] += 1
      }
   


  }
  console.log(bads)
  console.log(pubkeys)
  for (var success of Object.keys(pubkeys)){
    if (Object.keys(bads).includes(success)){
      bads[success]--
    }
  }
  console.log(bads)
  for (var bad of Object.keys(bads)){
    for (var i = 0 ; i<= bads[bad]; i++){
      random = Math.floor(Math.random() * 10000)
      console.log(" sudo ./target/release/ord --cookie-file /media/ubuntu/.cookie --index /media/ubuntu/indexes/index --wallet ord wallet inscribe --destination "+bad.split('\n')[0]+" --fee-rate 12 /home/ubuntu/Released/"+random.toString()+".webp && sudo mv /home/ubuntu/Released/"+random.toString()+".webp /home/ubuntu/Inscribed")
    console.log("print " + random.toString())
    }
  
  }


  
}, 1000);