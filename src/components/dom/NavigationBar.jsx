"use client"
import Image from "next/image";
import React, { useState } from "react";
import { Socials } from "@/helpers/info";

const Navbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    return (
        <div className="w-full h-[65px] fixed top-0 shadow-lg bg-[#03001417] z-50">
            <div className="w-full h-full flex flex-row items-center justify-between m-auto px-10 backdrop-blur-md ">
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

                {/* Mobile Menu Toggle Button */}
                <div className="md:hidden" style={{ color: "white" }}>
                    <button onClick={() => setIsMenuOpen(!isMenuOpen)}>
                        {/* Icon or text can go here to indicate menu open/close */}
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            {isMenuOpen ? (
                                // SVG for "X" icon
                                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                            ) : (
                                // SVG for hamburger icon
                                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                            )}
                        </svg>
                    </button>
                </div>

                {/* Desktop Navbar Items - Keep original styling */}
                <div className={`md:flex md:flex-row md:items-center md:justify-between hidden ${isMenuOpen ? "flex" : "hidden"} md:w-[400px]`}>
                    <div className="flex items-center justify-between w-full h-auto border border-[#7042f861] bg-[#0300145e] px-[20px] py-[10px] rounded-full text-gray-200">
                        <a href="/" className="cursor-pointer">
                            Home
                        </a>
                        <a href="/about" className="cursor-pointer">
                            About me
                        </a>
                        <a href="/projects" className="cursor-pointer">
                            Skills & Projects
                        </a>
                    </div>
                </div>

                {/* Keep the social icons as they were for desktop */}
                <div className="hidden md:flex md:w-[150px] md:flex-row md:gap-5">
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
                </div>
            </div>

            {/* Mobile Dropdown Menu */}
            <div className={`${isMenuOpen ? "flex" : "hidden"} absolute md:hidden flex flex-col items-center top-full right-0 w-full shadow-lg bg-[#03001417] backdrop-blur-md px-5 py-5`}
                style={{
                    backdropFilter: 'blur(20px)'
                }}
            >
                <a href="/" className="py-2 text-gray-200">Home</a>
                <a href="/about" className="py-2 text-gray-200">About me</a>
                <a href="/projects" className="py-2 text-gray-200">Skills & Projects</a>
                {/* Mobile Social Icons */}
                <div className="flex w-full justify-center gap-5 mt-4">
                    {Socials.map((social) => (
                        <a href={social.link} className="cursor-pointer" target="_blank" rel="noopener noreferrer" key={social.name}>
                            <Image
                                src={social.src}
                                alt={social.name}
                                width={24}
                                height={24}
                            />
                        </a>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Navbar;