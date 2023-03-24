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
    <div className="flex flex-col lg:flex-row justify-center  max-w-screen-2xl mx-auto">
      <div className="lg:w-1/2 w-full order-2 lg:order-1 mt-24 p-5 ">
        <div className="flex flex-col justify-center text-start">
          <div className="max-w-sm md:max-w-4xl mx-auto ">
            <div className="md:text-[79px] text-center lg:text-start text-5xl mona-font">
              <h1>Ordinal Meerkats</h1>
              <p>Country Club</p>
            </div>
            <div className="mt-4 lg:text-start text-center text-xl poppins-font">
              <p>Use SOLANA to mint & have your Ordinal sent to BTC wallet</p>
            </div>
            <div className="w-full overflow-hidden flex text-center lg:text-start justify-center lg:justify-start mt-2">
              <SignMessage />
              <SendTransaction />
            </div>
          </div>
        </div>
      </div>
      <div className="w-full lg:w-1/2 order-1 lg:order-2 p-5">
        <div className="flex flex-col items-center justify-center md:mt-10">
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
