'use client'
import React, { useState, useEffect } from 'react';
import { useFormState } from 'react-dom';
import Link from 'next/link';
import { TagsInput } from "react-tag-input-component";
import {
    CalendarIcon,
    CameraIcon,
    ChatBubbleBottomCenterIcon,
    CurrencyDollarIcon,
    ReceiptPercentIcon,
    UserCircleIcon,
    ClockIcon,
} from '@heroicons/react/24/outline';
import { Button } from '@/app/ui/button';
import { updatePromotion } from '@/app/lib/actions'; // Assume this function exists
import Tooltip from "@/app/ui/campaigns/tooltip";
import {Promotion} from "@/app/lib/definitions";

export default function EditPromotionForm({ promotion }: { promotion: Promotion }) {
    const initialState = { message: null, errors: {} };
    const [state, dispatch] = useFormState(updatePromotion, initialState);
    const [pricingType, setPricingType] = useState(promotion.pricingType);
    const [tags, setTags] = useState<string[]>(promotion.tags);
    const [postType, setPostType] = useState("story");

    const [mediaTypes, setMediaTypes] = useState({ picture: promotion.mediaType === "picture" ||  promotion.mediaType === "both", video: promotion.mediaType === "video" ||  promotion.mediaType === "both" });


    useEffect(() => {
        // Set initial values based on the promotion prop
        setPricingType(promotion.pricingType);
        setTags(promotion.tags);
        setPostType(promotion.postType);
        setMediaTypes({ picture: promotion.mediaType === "picture" ||  promotion.mediaType === "both", video: promotion.mediaType === "video" ||  promotion.mediaType === "both" });
    }, [promotion]);


    return (
        <form action={dispatch}>
            <input type="hidden" name="id" value={promotion.id} />
            <div className="rounded-md bg-gray-50 p-4 md:p-6">
                {/* Promotion Type */}
                <div className="mb-4">
                    <label htmlFor="promotionType" className="mb-2 block text-sm font-medium">
                        Promotion Type
                    </label>
                    <div className="relative mt-2 rounded-md">
                        <div className="relative">
                            <UserCircleIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500"/>
                            <select
                                id="promotionType"
                                name="promotionType"
                                className="peer block w-full cursor-pointer rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                                defaultValue={promotion.promotionType}
                                aria-describedby="promotionType-error"
                            >
                                <option value="" disabled>Select a promotion type</option>
                                <option value="restaurant">Restaurant</option>
                                <option value="bar">Bar</option>
                                <option value="hotel">Hotel</option>
                                <option value="shopping">Shopping</option>
                                <option value="spa">Spa</option>
                            </select>
                        </div>
                    </div>
                </div>
                <input
                    id="businessId"
                    name="businessId"
                    type="hidden"
                    value={promotion.businessId}
                    className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                />

                {/* Start Date */}
                <div className="mb-4">
                    <label htmlFor="startDate" className="mb-2 block text-sm font-medium">
                        Start Date
                    </label>
                    <div className="relative mt-2 rounded-md">
                        <div className="relative">
                            <CalendarIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500"/>
                            <input
                                id="startDate"
                                name="startDate"
                                type="date"
                                defaultValue={promotion.startDate}
                                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                            />
                        </div>
                    </div>
                </div>

                {/* End Date */}
                <div className="mb-4">
                    <label htmlFor="endDate" className="mb-2 block text-sm font-medium">
                        End Date
                    </label>
                    <div className="relative mt-2 rounded-md">
                        <div className="relative">
                            <CalendarIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500"/>
                            <input
                                id="endDate"
                                name="endDate"
                                type="date"
                                defaultValue={promotion.endDate}
                                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                            />
                        </div>
                    </div>
                </div>

                {/* Quantity */}
                <div className="mb-4">
                    <label htmlFor="quantity" className="mb-2 block text-sm font-medium">
                        Quantity
                    </label>
                    <div className="relative mt-2 rounded-md">
                        <div className="relative">
                            <ReceiptPercentIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500"/>
                            <input
                                id="quantity"
                                name="quantity"
                                type="number"
                                defaultValue={promotion.quantity}
                                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                                placeholder="Enter quantity"
                            />
                        </div>
                    </div>
                </div>

                {/* Title */}
                <div className="mb-4">
                    <label htmlFor="title" className="mb-2 block text-sm font-medium">
                        Title
                    </label>
                    <div className="relative mt-2 rounded-md">
                        <div className="relative">
                            <ChatBubbleBottomCenterIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500"/>
                            <input
                                id="title"
                                name="title"
                                type="text"
                                defaultValue={promotion.title}
                                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                                placeholder="Enter title"
                            />
                        </div>
                    </div>
                </div>

                {/* Description */}
                <div className="mb-4">
                    <label htmlFor="description" className="mb-2 block text-sm font-medium">
                        Description
                    </label>
                    <div className="relative mt-2 rounded-md">
                        <div className="relative">
                            <ChatBubbleBottomCenterIcon className="pointer-events-none absolute left-3 top-3 h-[18px] w-[18px] text-gray-500"/>
                            <textarea
                                id="description"
                                name="description"
                                rows="4"
                                defaultValue={promotion.description}
                                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                                placeholder="Enter description"
                            ></textarea>
                        </div>
                    </div>
                </div>

                {/* Suggested Items */}
                <div className="mb-4">
                    <label htmlFor="suggestedItems" className="mb-2 block text-sm font-medium">
                        Suggested Items
                    </label>
                    <div className="relative mt-2 rounded-md">
                        <div className="relative">
                            <ReceiptPercentIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500"/>
                            <input
                                id="suggestedItems"
                                name="suggestedItems"
                                type="text"
                                defaultValue={promotion.suggestedItems}
                                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                                placeholder="Enter suggested items"
                            />
                        </div>
                    </div>
                </div>

                {/* Availability Start */}
                <div className="mb-4">
                    <label htmlFor="availabilityStart" className="mb-2 block text-sm font-medium">
                        Availability Start
                    </label>
                    <div className="relative mt-2 rounded-md">
                        <div className="relative">
                            <ClockIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500"/>
                            <input
                                id="availabilityStart"
                                name="availabilityStart"
                                type="time"
                                defaultValue={promotion.availabilityStart}
                                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                            />
                        </div>
                    </div>
                </div>

                {/* Availability End */}
                <div className="mb-4">
                    <label htmlFor="availabilityEnd" className="mb-2 block text-sm font-medium">
                        Availability End
                    </label>
                    <div className="relative mt-2 rounded-md">
                        <div className="relative">
                            <ClockIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500"/>
                            <input
                                id="availabilityEnd"
                                name="availabilityEnd"
                                type="time"
                                defaultValue={promotion.availabilityEnd}
                                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                            />
                        </div>
                    </div>
                </div>

                {/* Pricing Type */}
                <div className="mb-4">
                    <label className="mb-2 block text-sm font-medium">Pricing Type</label>
                    <div className="flex gap-4">
                        <div className="flex items-center">
                            <input
                                id="fixed"
                                name="pricingType"
                                type="radio"
                                value="fixed"
                                checked={pricingType === "fixed"}
                                onChange={() => setPricingType("fixed")}
                                className="h-4 w-4 cursor-pointer border-gray-300 bg-gray-100 text-gray-600 focus:ring-2"
                            />
                            <label htmlFor="fixed" className="ml-2 text-sm font-medium text-gray-900">Fixed</label>
                        </div>
                        <div className="flex items-center">
                            <input
                                id="tiered"
                                name="pricingType"
                                type="radio"
                                value="tiered"
                                checked={pricingType === "tiered"}
                                onChange={() => setPricingType("tiered")}
                                className="h-4 w-4 cursor-pointer border-gray-300 bg-gray-100 text-gray-600 focus:ring-2"
                            />
                            <label htmlFor="tiered" className="ml-2 text-sm font-medium text-gray-900">Tiered</label>
                        </div>
                    </div>
                </div>

                {/* Conditional Pricing Inputs */}
                {pricingType === "fixed" ? (
                    <div className="mb-4">
                        <label htmlFor="fixedOffer" className="mb-2 block text-sm font-medium">
                            Fixed Offer
                        </label>
                        <div className="relative mt-2 rounded-md">
                            <div className="relative">
                                <CurrencyDollarIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500"/>
                                <input
                                    id="fixedOffer"
                                    name="fixedOffer"
                                    type="number"
                                    step="0.01"
                                    defaultValue={promotion.fixedOffer}
                                    className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                                    placeholder="Enter fixed offer amount"
                                />
                            </div>
                        </div>
                    </div>
                ) : (
                    <>
                        <div className="mb-4">
                            <label htmlFor="tierOneOffer" className="mb-2 block text-sm font-medium">
                                Tier One Offer
                            </label>
                            <div className="relative mt-2 rounded-md">
                                <div className="relative">
                                    <CurrencyDollarIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500"/>
                                    <input
                                        id="tierOneOffer"
                                        name="tierOneOffer"
                                        type="number"
                                        step="0.01"
                                        defaultValue={promotion.tierOneOffer}
                                        className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                                        placeholder="Enter tier one offer amount"
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="mb-4">
                            <label htmlFor="tierTwoOffer" className="mb-2 block text-sm font-medium">
                                Tier Two Offer
                            </label>
                            <div className="relative mt-2 rounded-md">
                                <div className="relative">
                                    <CurrencyDollarIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500"/>
                                    <input
                                        id="tierTwoOffer"
                                        name="tierTwoOffer"
                                        type="number"
                                        step="0.01"
                                        defaultValue={promotion.tierTwoOffer}
                                        className="peer block w-full rounded-md border border-gray-200 py-2 pl-10text-sm outline-2 placeholder:text-gray-500"
                                        placeholder="Enter tier two offer amount"
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="mb-4">
                            <label htmlFor="tierThreeOffer" className="mb-2 block text-sm font-medium">
                                Tier Three Offer
                            </label>
                            <div className="relative mt-2 rounded-md">
                                <div className="relative">
                                    <CurrencyDollarIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500"/>
                                    <input
                                        id="tierThreeOffer"
                                        name="tierThreeOffer"
                                        type="number"
                                        step="0.01"
                                        defaultValue={promotion.tierThreeOffer}
                                        className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                                        placeholder="Enter tier three offer amount"
                                    />
                                </div>
                            </div>
                        </div>
                    </>
                )}
                {/* Max Total Spend */}
                <div className="mb-4">
                    <label htmlFor="maxTotalSpend" className="mb-2 block text-sm font-medium">
                        Max Total Spend
                    </label>
                    <div className="relative mt-2 rounded-md">
                        <div className="relative">
                            <CurrencyDollarIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500"/>
                            <input
                                id="maxTotalSpend"
                                name="maxTotalSpend"
                                type="number"
                                step="0.01"
                                defaultValue={promotion.maxTotalSpend}
                                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                                placeholder="Enter max total spend"
                            />
                        </div>
                    </div>
                </div>

                {/* Pricing Type */}
                <div className="mb-4">
                    <label className="mb-2 block text-sm font-medium">Post Type</label>
                    <div className="flex gap-4">
                        <div className="flex items-center">
                            <input
                                id="fixed"
                                name="postType"
                                type="radio"
                                value="story"
                                checked={postType === "story"}
                                onChange={() => setPostType("story")}
                                className="h-4 w-4 cursor-pointer border-gray-300 bg-gray-100 text-gray-600 focus:ring-2"
                            />
                            <label htmlFor="story" className="ml-2 text-sm font-medium text-gray-900">Story</label>
                        </div>
                        <div className="flex items-center">
                            <input
                                id="reel"
                                name="postType"
                                type="radio"
                                value="reel"
                                checked={postType === "reel"}
                                onChange={() =>  {
                                    setMediaTypes({ picture: false, video: false });
                                    setPostType("reel")
                                }}
                                className="h-4 w-4 cursor-pointer border-gray-300 bg-gray-100 text-gray-600 focus:ring-2"
                            />
                            <label htmlFor="reel" className="ml-2 text-sm font-medium text-gray-900">Reel</label>
                        </div>
                    </div>
                </div>

                {postType === "story" ? (
                    <div className="mb-4">
                        <label className="mb-2 block text-sm font-medium">
                            Story Type
                        </label>
                        <div className="relative mt-2 rounded-md">
                            <div className="flex items-center space-x-4">
                                <div className="flex items-center">
                                    <input
                                        id="picture"
                                        name="mediaType"
                                        type="checkbox"
                                        checked={mediaTypes.picture}
                                        onChange={(e) => setMediaTypes(prev => ({ ...prev, picture: e.target.checked }))}
                                        className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                                    />
                                    <label htmlFor="picture" className="ml-2 block text-sm text-gray-900">
                                        Picture
                                    </label>
                                </div>
                                <div className="flex items-center">
                                    <input
                                        id="video"
                                        name="mediaType"
                                        type="checkbox"
                                        checked={mediaTypes.video}
                                        onChange={(e) => setMediaTypes(prev => ({ ...prev, video: e.target.checked }))}
                                        className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                                    />
                                    <label htmlFor="post" className="ml-2 block text-sm text-gray-900">
                                        Video
                                    </label>
                                </div>
                            </div>
                        </div>
                        {/* Hidden input to store the selected post types as a string */}
                        <input
                            type="hidden"
                            name="mediaType"
                            value={Object.entries(mediaTypes)
                                .filter(([_, isChecked]) => isChecked)
                                .map(([type, _]) => type)
                                .join(',')}
                        />
                    </div>
                ):(<div>
                </div>)}

                {/* Tags */}
                <div className="mb-4">
                    <label htmlFor="tags" className="mb-2 block text-sm font-medium">
                        Tags
                    </label>
                    <div className="relative mt-2 rounded-md">
                        <TagsInput
                            value={tags}
                            onChange={setTags}
                            name="tags"
                            placeHolder="Enter tags"
                        />
                        <input
                            type="hidden"
                            name="tags"
                            value={JSON.stringify(tags)}
                        />
                    </div>
                </div>
            </div>

            {/* Form Actions */}
            <div className="mt-6 flex justify-end gap-4">
                <Link
                    href={`/business/${promotion.businessId}/promotions/${promotion.id}`}
                    className="flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200"
                >
                    Cancel
                </Link>
                <Button type="submit">Update Promotion</Button>
            </div>
        </form>
    );
}