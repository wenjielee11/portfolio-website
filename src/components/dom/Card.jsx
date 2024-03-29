import Image from "next/image";
import React from "react";


const Card = ({ src, title, description, imageStyle, link }) => {

    return (
        <div className="relative overflow-hidden rounded-lg shadow-lg border border-[#2A0E61] bg-[#03001417] backdrop-blur-md">
            <div className="flex justify-center items-center">
                {src && <Image
                    src={src}
                    alt={title}
                    width={1000}
                    height={1000}
                    className={`object-contain w-full ${imageStyle} `}
                />}
            </div>

            <div className="relative p-4">
                {title && (
                    link ? (
                        <a href={link} target="_blank" className="text-2xl font-semibold text-white hover:text-gray-300">
                            {title}
                        </a>
                    ) : (
                        <h1 className="text-2xl font-semibold text-white">{title}</h1>
                    )
                )}
                {description && <div className="mt-2 text-gray-300">{description}</div>}
            </div>
        </div>
    );
};

export default Card;