'use client';

import { useState } from 'react';
import Price from '@/app/ui/components/price';
import { Business, Promotion } from "@/app/lib/definitions";
import PromotionMap from "@/app/ui/promotion-map";

export function PromotionDescription({ promotion, business }: { promotion: Promotion, business: Business }) {
    const [isDetailsOpen, setDetailsOpen] = useState(false);
    const [isTableSizeOpen, setTableSizeOpen] = useState(false);
    const [isHoursOpen, setHoursOpen] = useState(false);

    const toggleDetails = () => setDetailsOpen(!isDetailsOpen);
    const toggleTableSize = () => setTableSizeOpen(!isTableSizeOpen);
    const toggleHours = () => setHoursOpen(!isHoursOpen);

    console.log(business)

    return (
        <>
            <div className="mb-6 flex flex-col border-b pb-6 dark:border-neutral-700">
                <h1 className="mb-2 text-2xl font-medium">{promotion.title}</h1>
                <span className=" text-md font-small">{business.businessName}</span>
                <div className="mt-2 text-lg font-medium text-black dark:text-white">
                    <span className="text-md font-small">Budget: </span> ${promotion.maxOfferPrice}
                </div>
            </div>

            <div className="mb-6 flex flex-col border-b pb-6 dark:border-neutral-700">
                <button onClick={toggleDetails} className="flex justify-between items-center w-full text-left text-md font-medium text-black dark:text-white">
                    Promotion Details
                    <span>{isDetailsOpen ? '▲' : '▼'}</span>
                </button>
                {isDetailsOpen && (
                    <p className="mt-4 text-sm">
                        {promotion.description}
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
            <div className="mt-2 font-small text-black dark:text-white">
                {business.address}
            </div>
            <PromotionMap placeId={business.placesId}/>
        </>
    );
}
