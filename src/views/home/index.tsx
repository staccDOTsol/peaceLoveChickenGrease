// Next, React
import { FC, useEffect, useRef } from 'react';

// Components
import { SendTransaction } from '../../components/SendTransaction';

// Store
import { SignMessage } from 'components/SignMessage';

export const HomeView: FC = ({}) => {
  const videoEl = useRef(null);

  const attemptPlay = () => {
    videoEl &&
      videoEl.current &&
      videoEl.current.play().catch((error) => {
        console.error('Error attempting to play', error);
      });
  };

  useEffect(() => {
    attemptPlay();
  }, []);

  return (
    <div className="flex flex-col md:flex-row justify-center items-center max-w-screen-2xl mx-auto">
      <div className="md:w-1/2 w-full order-2 md:order-1 mt-24 p-5 ">
        <div className="flex flex-col justify-center text-start">
          {/* <img src="OrdinalMeerkatsCountryClub.png" className="mt-40" /> */}
          <div className="max-w-sm md:max-w-4xl mx-auto ">
            <div className="md:text-8xl text-center md:text-start text-5xl mona-font">
              <p style={{fontWeight: 'bold', fontSize: 79}}>Ordinal Meerkats</p>
              <p style={{fontWeight: 'bold'}}>Country Club</p>
            </div>
            <div className="mt-10 md:text-start text-center text-xl poppins-font">
              <p >Use SOLANA to mint & have your Ordinal sent to BTC wallet</p>
            </div>
            <div className="max-w-xl overflow-hidden mt-12">
              <SignMessage />
              <SendTransaction />
            </div>
          </div>
          {/* <img src="UseSolana.png" className="mb-4 ml-28 w-604" /> */}
        </div>
      </div>
      <div className="w-full md:w-1/2 order-1 md:order-2 p-5">
        <div className="flex flex-col items-center justify-center">
          <div className="relative">
            <video
              playsInline
              loop
              muted
              controls={false}
              src="../collection.mp4"
              ref={videoEl}
            />
            <img
              src="lightning-bolt@1x.png"
              className="absolute bottom-[-198px] left-[10px] w-[350px]"
            />
          </div>
        </div>
      </div>
    </div>
  );
};
