import { FC } from 'react';
import Link from 'next/link';
import Image from 'next/image';
export const Footer: FC = () => {
    return (
        <div className="relative mb-40 mt-10">
            {/* <footer className="border-t-2 border-[#141414] bg-black hover:text-white absolute w-full" >
                <div className="ml-12 py-12 mr-12">
                    <div className="grid grid-cols-2 md:grid-cols-6 gap-2 md:gap- md:space-x-12 relative">
                        <div className="mb-6 items-center mx-auto max-w-screen-lg"></div>
                        <div className="mb-6 items-center mx-auto max-w-screen-lg">
                            <div className="font-normal capitalize mb-2.5">Project Info</div>

                            <div className="flex flex-col mb-0 gap-2">
                                <Link href="https://mmccsolana.com/" target="_blank" rel="noopener noreferrer" passHref className="text-secondary hover:text-white">
                                    Website
                                </Link>
                                <Link href="https://discord.com/invite/mmcc" target="_blank" rel="noopener noreferrer" passHref className="text-secondary hover:text-white">
                                    Discord
                                </Link>
                                <Link href="https://twitter.com/mmccsolana" target="_blank" rel="noopener noreferrer" passHref className="text-secondary hover:text-white">
                                    <svg aria-hidden="true"
                                        focusable="false"
                                        data-prefix="fab"
                                        data-icon="twitter"
                                        className="w-4 h-full mx-auto"
                                        role="img"
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 512 512"
                                    >
                                    <path
                                        fill="currentColor"
                                        d="M459.37 151.716c.325 4.548.325 9.097.325 13.645 0 138.72-105.583 298.558-298.558 298.558-59.452 0-114.68-17.219-161.137-47.106 8.447.974 16.568 1.299 25.34 1.299 49.055 0 94.213-16.568 130.274-44.832-46.132-.975-84.792-31.188-98.112-72.772 6.498.974 12.995 1.624 19.818 1.624 9.421 0 18.843-1.3 27.614-3.573-48.081-9.747-84.143-51.98-84.143-102.985v-1.299c13.969 7.797 30.214 12.67 47.431 13.319-28.264-18.843-46.781-51.005-46.781-87.391 0-19.492 5.197-37.36 14.294-52.954 51.655 63.675 129.3 105.258 216.365 109.807-1.624-7.797-2.599-15.918-2.599-24.04 0-57.828 46.782-104.934 104.934-104.934 30.213 0 57.502 12.67 76.67 33.137 23.715-4.548 46.456-13.32 66.599-25.34-7.798 24.366-24.366 44.833-46.132 57.827 21.117-2.273 41.584-8.122 60.426-16.243-14.292 20.791-32.161 39.308-52.628 54.253z"
                                    ></path>
                                    </svg>
                                </Link>
                                <Link href="https://www.instagram.com/meerkatmcc/" target="_blank" rel="noopener noreferrer" passHref className="text-secondary hover:text-white">
                                    instagram
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </footer> */}
        </div>
    );
};
