import Image from "next/image";
import React from "react";
import Link from "next/link";
const Navbar = () => {
    return (
        <div className="w-full h-[65px] fixed top-0 shadow-lg bg-[#03001417] backdrop-blur-md z-50 px-10">
            <div className="w-full h-full flex flex-row items-center justify-between m-auto px-[10px]">
                <a className="h-auto w-auto flex flex-row items-center" href="/">
                    <Image
                        src="/icons/NavLogoCat.png"
                        alt="logo"
                        width={70}
                        height={70}
                        className="cursor-pointer hover:animate-slowspin"
                    />
                    <span className="font-bold ml-[10px] hidden md:block text-gray-400">
                        Wen Jie
                    </span>
                </a>

                <div className="hidden md:w-[500px] md:flex md:flex-row md:items-center md:justify-between md:mr-20">
                    <div className="flex items-center justify-between w-full h-auto border border-[#7042f861] bg-[#0300145e] mr-[15px] px-[20px] py-[10px] rounded-full text-gray-200">
                        <a href="/" className="cursor-pointer">
                            About me
                        </a>
                        <a href="/" className="cursor-pointer">
                            Skills
                        </a>
                        <a href="/" className="cursor-pointer">
                            Projects
                        </a>
                    </div>
                </div>
                {/* <div className="flex flex-row gap-5">
                    {Socials.map((social) => (
                        <a href={social.link} className="cursor-pointer" target="_blank" key={social.name}>
                            <Image
                                src={social.src}
                                alt={social.name}
                                width={24}
                                height={24}
                                style={{ cursor: "pointer" }}
                            />
                        </a>
                    ))}
                </div> */}
            </div>
        </div>
    );
};
export default Navbar;