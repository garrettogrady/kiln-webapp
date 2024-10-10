"use client";
import React, { useState, useEffect } from 'react';
import Image from 'next/image';

export function Gallery({ images }: { images: { src: string; altText: string }[] }) {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const checkIsMobile = () => {
            setIsMobile(window.innerWidth < 1024); // Adjust this breakpoint as needed
        };

        checkIsMobile();
        window.addEventListener('resize', checkIsMobile);

        return () => window.removeEventListener('resize', checkIsMobile);
    }, []);

    const nextImage = () => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    };

    const prevImage = () => {
        setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
    };

    if (isMobile) {
        return (
            <div className="relative w-full aspect-[4/3]"> {/* Set aspect ratio for cropped height */}
                <div className="absolute inset-0">
                    <Image
                        className="object-cover w-full h-full"
                        fill
                        sizes="100vw"
                        alt={images[currentIndex].altText}
                        src={images[currentIndex].src}
                        priority
                    />
                </div>
                <button
                    className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-50 p-2 rounded-full z-10"
                    onClick={prevImage}
                >
                    &#8592;
                </button>
                <button
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-50 p-2 rounded-full z-10"
                    onClick={nextImage}
                >
                    &#8594;
                </button>
                <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2 z-10">
                    {images.map((_, index) => (
                        <div
                            key={index}
                            className={`w-2 h-2 rounded-full ${
                                index === currentIndex ? 'bg-white' : 'bg-gray-400'
                            }`}
                        />
                    ))}
                </div>
            </div>
        );
    }

    return (
        <div className="flex flex-col gap-8 overflow-y-auto h-[100vh]">
            {images.map((image, index) => (
                <div key={index} className="relative aspect-square w-full overflow-hidden">
                    <Image
                        className="h-full w-full object-cover"
                        fill
                        sizes="(min-width: 1024px) 66vw, 100vw"
                        alt={image.altText}
                        src={image.src}
                        priority={index === 0}
                    />
                </div>
            ))}
        </div>
    );
}