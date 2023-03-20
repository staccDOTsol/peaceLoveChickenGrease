// Next, React
import { FC, useEffect, useRef } from 'react';

// Components
import { SendTransaction } from '../../components/SendTransaction';

// Store
import { SignMessage } from 'components/SignMessage';

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

  return (
      <div className="flex flex-row justify-center">
      <div className="flex-col border w-1/2" 
                              style={{
                                display: "flex",
                                alignItems: "center",
                              
                            }}>
        <img src="OrdinalMeerkatsCountryClub.png" className="mt-40"/>
        <img src="UseSolana.png" className="mb-4 ml-28 w-704"/>
              {/* <h4 className="text-2x1 md:text-2xl text-center text-white-400 my-2">
                <p>Use Solana to mint and have your Ordinal sent to your BTC wallet!</p>
              </h4> */}
          {/* CONTENT GOES HERE */}

          <div>
            <SignMessage />
            <SendTransaction />
          </div>
          {/* <div className="flex flex-row mb-0 justify-center">
                  <Link href="https://mmccsolana.com/" target="_blank" rel="noopener noreferrer" passHref className="text-secondary hover:text-white m-5 mt-12">
                      <RxGlobe/>
                  </Link>
                  <Link href="https://discord.com/invite/mmcc" target="_blank" rel="noopener noreferrer" passHref className="text-secondary hover:text-white m-5 mt-12">
                      <RxDiscordLogo height="300px"/>
                  </Link>
                  <Link href="https://twitter.com/mmccsolana" target="_blank" rel="noopener noreferrer" passHref className="text-secondary hover:text-white m-5 mt-12">
                      <RxTwitterLogo/>  
                  </Link>
                  <Link href="https://www.instagram.com/meerkatmcc/" target="_blank" rel="noopener noreferrer" passHref className="text-secondary hover:text-white m-5 mt-12">
                      <RxInstagramLogo/>
                  </Link>
              </div> */}

      </div>
      <div className="border w-1/2">
          {/* CONTENT GOES HERE */}
          <center>
          <div className="mt-40">
          <video
            style={{ maxWidth: "100%", width: "320px", margin: "0 auto" }}
            playsInline
            loop
            muted
            controls={false}
            src="../collection.mp4"
            ref={videoEl}
        />
            <img src="lightning-bolt@1x.png" className='h-80 mb-100'/>
          </div>

          {/* <div className="flex flex-row mb-0 justify-center">
                  <Link href="https://mmccsolana.com/" target="_blank" rel="noopener noreferrer" passHref className="text-secondary hover:text-white m-5 mt-12">
                      <RxGlobe/>
                  </Link>
                  <Link href="https://discord.com/invite/mmcc" target="_blank" rel="noopener noreferrer" passHref className="text-secondary hover:text-white m-5 mt-12">
                      <RxDiscordLogo height="300px"/>
                  </Link>
                  <Link href="https://twitter.com/mmccsolana" target="_blank" rel="noopener noreferrer" passHref className="text-secondary hover:text-white m-5 mt-12">
                      <RxTwitterLogo/>  
                  </Link>
                  <Link href="https://www.instagram.com/meerkatmcc/" target="_blank" rel="noopener noreferrer" passHref className="text-secondary hover:text-white m-5 mt-12">
                      <RxInstagramLogo/>
                  </Link>
              </div> */}
          </center>
      </div>
      </div>
  );
};
