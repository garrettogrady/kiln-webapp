'use client';

import { useState } from 'react';
import Price from '@/app/ui/components/price';
import { Business, Promotion } from "@/app/lib/definitions";

export function PromotionDescription({ promotion, business }: { promotion: Promotion, business: Business }) {
    const [isDetailsOpen, setDetailsOpen] = useState(false);
    const [isTableSizeOpen, setTableSizeOpen] = useState(false);
    const [isHoursOpen, setHoursOpen] = useState(false);

    const toggleDetails = () => setDetailsOpen(!isDetailsOpen);
    const toggleTableSize = () => setTableSizeOpen(!isTableSizeOpen);
    const toggleHours = () => setHoursOpen(!isHoursOpen);

    return (
        <>
            <div className="mb-6 flex flex-col border-b pb-6 dark:border-neutral-700">
                <h1 className="mb-2 text-2xl font-medium">{promotion.title}</h1>
                <span className=" text-md font-small">{business.businessName}</span>
                <span className="text-md font-small">{business.city}</span>
                <div className="mt-2 text-lg font-medium text-black dark:text-white">
                    ${promotion.maxOfferPrice}
                </div>
            </div>

            <div className="mb-6 flex flex-col border-b pb-6 dark:border-neutral-700">
                <button onClick={toggleDetails} className="flex justify-between items-center w-full text-left text-md font-medium text-black dark:text-white">
                    Promotion Details
                    <span>{isDetailsOpen ? '▲' : '▼'}</span>
                </button>
                {isDetailsOpen && (
                    <p className="mt-4 text-sm">
                        Discover the ultimate in luxury and sophistication at our exclusive Cocktail Hour hosted at Carbone, New York's premier destination for elevated experiences. Here at Sky Bar, we redefine the art of mixology amidst stunning panoramic views of the iconic Dubai skyline. Indulge in a handcrafted selection of signature cocktails meticulously crafted by our expert mixologists. Each sip is a journey of flavors, blending premium spirits with fresh ingredients and innovative techniques. Whether you prefer classic concoctions or crave something uniquely crafted, our menu promises to tantalize your taste buds. Set against the backdrop of Dubai's glittering skyscrapers and the azure sky, Sky Bar offers an unrivaled ambiance. The setting sun casts a golden glow over the city, transforming the landscape into a mesmerizing canvas. Take in the sights from our exclusive rooftop terrace, where every angle is a picture-perfect moment waiting to be captured.
                    </p>
                )}
            </div>

            <div className="mb-6 flex flex-col border-b pb-6 dark:border-neutral-700">
                <button onClick={toggleTableSize} className="flex justify-between items-center w-full text-left text-md font-medium text-black dark:text-white">
                    Table Size
                    <span>{isTableSizeOpen ? '▲' : '▼'}</span>
                </button>
                {isTableSizeOpen && <p className="mt-4 text-sm">Details about table sizes.</p>}
            </div>

            <div className="mb-6 flex flex-col border-b pb-6 dark:border-neutral-700">
                <button onClick={toggleHours} className="flex justify-between items-center w-full text-left text-md font-medium text-black dark:text-white">
                    Hours of Availability
                    <span>{isHoursOpen ? '▲' : '▼'}</span>
                </button>
                {isHoursOpen && <p className="mt-4 text-sm">Details about hours of availability.</p>}
            </div>
        </>
    );
}
