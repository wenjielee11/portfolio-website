import Image from "next/image";
import React from "react";


const Card = ({ src, title, description }) => {
    return (
        <div className="relative overflow-hidden rounded-lg shadow-lg border border-[#2A0E61] bg-[#03001417] backdrop-blur-md">
            {src && <Image
                src={src}
                alt={title}
                width={1000}
                height={1000}
                className="w-full object-contain"
            />}

            <div className="relative p-4">
                {title && <h1 className="text-2xl font-semibold text-white">{title}</h1>}
                {description && <p className="mt-2 text-gray-300">{description}</p>}
            </div>
        </div>
    );
};

export default Card;