import { FC } from 'react';
import Link from 'next/link';

export const Footer: FC = () => {
    return (
        <div className="relative mb-20 mt-60">
            <footer className="border-t-2 border-[#141414] bg-black hover:text-white absolute w-full" >
                <div className="ml-12 py-12 mr-12">
                    <div className="grid grid-cols-1 md:grid-cols-1 gap-2 md:gap- md:space-x-12 relative">
                        <div className="items-center mx-auto max-w-screen-lg">
                        <center>
                        <img src="../../gumballlogo.png" width={"20%"} />
                            </center>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
};
