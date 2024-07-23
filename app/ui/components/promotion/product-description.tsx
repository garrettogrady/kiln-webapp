'use client';

import { useState } from 'react';
import Price from '@/app/ui/components/price';
import { Business, Promotion } from "@/app/lib/definitions";
import PromotionMap from "@/app/ui/promotion-map";

export function PromotionDescription({ promotion, business }: { promotion: Promotion, business: Business }) {
    const [isDetailsOpen, setDetailsOpen] = useState(false);
    const [isSuggestedItemsOpen, setSuggestedItemsOpen] = useState(false);
    const [isHoursOpen, setHoursOpen] = useState(false);

    const toggleDetails = () => setDetailsOpen(!isDetailsOpen);
    const toggleSuggestedItems = () => setSuggestedItemsOpen(!isSuggestedItemsOpen);
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
                <div className="mt-2 font-medium dark:text-white">
                    <span className="rounded border border-gray-600 bg-[#254442] text-white">Instagram Story Picture</span>
                    <br/>
                    <span className="rounded border border-gray-600 bg-[#254442] text-white">Instagram Story Video</span>
                    {/*<span className="rounded border border-gray-600 bg-[#254442] text-white">{promotion.platform} {promotion.postType}</span>*/}
                </div>
            </div>

            {promotion.description && (
                <div className="mb-6 flex flex-col border-b pb-6 dark:border-neutral-700">
                    <button onClick={toggleDetails} className="flex justify-between items-center w-full text-left text-md font-medium text-black dark:text-white">
                        Merchant Information
                        <span>{isDetailsOpen ? '▲' : '▼'}</span>
                    </button>
                    {isDetailsOpen && (
                        <p className="mt-4 text-sm">
                            {promotion.description}
                        </p>
                    )}
                </div>
            )}
            {promotion.suggestedItems && (
                <div className="mb-6 flex flex-col border-b pb-6 dark:border-neutral-700">
                    <button onClick={toggleSuggestedItems} className="flex justify-between items-center w-full text-left text-md font-medium text-black dark:text-white">
                        Suggested Items
                        <span>{isSuggestedItemsOpen ? '▲' : '▼'}</span>
                    </button>
                    {isSuggestedItemsOpen && <p className="mt-4 text-sm">{promotion.suggestedItems}</p>}
                </div>
            )}
            {promotion.availabilityStart && promotion.availabilityEnd && (
                <div className="mb-6 flex flex-col border-b pb-6 dark:border-neutral-700">
                    <button onClick={toggleHours} className="flex justify-between items-center w-full text-left text-md font-medium text-black dark:text-white">
                        Hours of Availability
                        <span>{isHoursOpen ? '▲' : '▼'}</span>
                    </button>
                    {isHoursOpen && <p className="mt-4 text-sm">{promotion.availabilityStart}-{promotion.availabilityEnd}</p>}
                </div>
            )}
            <div className="mt-2 font-small text-black dark:text-white">
                {business.address}
            </div>
            <PromotionMap placeId={business.placesId}/>
        </>
    );
}
