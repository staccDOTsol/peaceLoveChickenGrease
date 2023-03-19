import { FC } from 'react';
import Link from 'next/link';

import PublicIcon from '@mui/icons-material/Public';
import TwitterIcon from '@mui/icons-material/Twitter';
import InstagramIcon from '@mui/icons-material/Instagram';
import { RxDiscordLogo, RxTwitterLogo, RxInstagramLogo, RxGlobe } from 'react-icons/rx';

export const Footer: FC = () => {
    return (
        <div className="relative mb-40 mt-10">
            <footer className="border-t-2 border-[#141414] bg-black hover:text-white absolute w-full" >
                <div className="ml-12 py-12 mr-12">
                    <div className="grid grid-cols-1 md:grid-cols-1 gap-2 md:gap- md:space-x-12 relative">

                        <div className="mb-6 items-center mx-auto max-w-screen-lg">
                            <center>
                            </center>
                            <div className="flex flex-row mb-0 gap-2">
                                <Link href="https://mmccsolana.com/" target="_blank" rel="noopener noreferrer" passHref className="text-secondary hover:text-white m-5 mt-1">
                                   <RxGlobe/>
                                </Link>
                                <Link href="https://discord.com/invite/mmcc" target="_blank" rel="noopener noreferrer" passHref className="text-secondary hover:text-white m-5 mt-1">
                                    <RxDiscordLogo height="300px"/>
                                </Link>
                                <Link href="https://twitter.com/mmccsolana" target="_blank" rel="noopener noreferrer" passHref className="text-secondary hover:text-white m-5 mt-1">

                                    <RxTwitterLogo/>
                                    
                                </Link>
                                <Link href="https://www.instagram.com/meerkatmcc/" target="_blank" rel="noopener noreferrer" passHref className="text-secondary hover:text-white m-5 mt-1">
                                    <RxInstagramLogo/>
                                </Link>
                            </div>
                            <div className="font-normal capitalize mb-2.5 ">Meerkat Millionaires Country Club</div>

                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
};
