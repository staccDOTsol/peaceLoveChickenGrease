import { FC } from 'react';
import Link from 'next/link';

export const Footer: FC = () => {
    return (
        <div className="relative mb-20">
            <footer className="border-t-2 border-[#141414] bg-black hover:text-white absolute w-full" >
                <div className="ml-12 py-12 mr-12 align-center">
                    <div className="grid grid-cols-1 md:grid-cols-1 gap-2 md:gap- md:space-x-12 relative text-right">
                        © The Meerkat Millionaires Country Club. All Rights Reserved.
                    </div>
                </div>
            </footer>
        </div>
    );
};
