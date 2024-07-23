import {CustomerField, Promotion} from '@/app/lib/definitions';
import Link from 'next/link';
import React, { useState } from "react";

import {CreateCampaign, UpdateCampaign} from "@/app/ui/campaigns/buttons";
import {createIntl, createIntlCache} from "@formatjs/intl";


export default async function ShowForm(promotion: Promotion) {
    console.log(promotion)
    const cache = createIntlCache();
    const intl = createIntl(
        {
            locale: 'en-US',
            messages: {},
        },
        cache
    );
    const startDate = new Date(promotion.startDate.toString());
    console.log("start date hi hi hi " + promotion.startDate)
    console.log(startDate)
    const endDate = new Date(promotion.endDate);
    const startFormatter = intl.formatDate(startDate, {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
    });
    const endFormatter = intl.formatDate(endDate, {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
    });

    const promotionDetails = promotion;
    return (
        <div>
            <div className="mt-4 flex items-center justify-between gap-2 md:mt-8">
                <h3>Promotion Details</h3>
                <UpdateCampaign id={promotion.id}/>
            </div>
            <div className="rounded-md bg-gray-50 p-4 md:p-6">
                <div className="mb-4">
                    <label htmlFor="promotionType" className="mb-2 block text-sm font-medium">
                        Promotion Type
                    </label>
                    <div className="relative mt-2 rounded-md">
                        <div className="relative">
                            {promotionDetails.promotionType}
                        </div>
                    </div>
                </div>

                {/* \Start Date */}
                <div className="mb-4">
                    <label htmlFor="startDate" className="mb-2 block text-sm font-medium">
                        Start Date
                    </label>
                    <div className="relative mt-2 rounded-md">
                        <div className="relative">
                            {startFormatter.toString()}
                        </div>
                    </div>
                </div>

                {/* End Date */}
                <div className="mb-4">
                    <label htmlFor="endDate" className="mb-2 block text-sm font-medium">
                        Choose an End Date
                    </label>
                    <div className="relative mt-2 rounded-md">
                        <div className="relative">
                            {endFormatter.toString()}
                        </div>
                    </div>
                </div>

                {/* Invoice Amount */}
                <div className="mb-4">
                    <label htmlFor="amount" className="mb-2 block text-sm font-medium">
                        Choose an amount
                    </label>
                    <div className="relative mt-2 rounded-md">
                        <div className="relative">
                            {promotionDetails.maxOfferPrice}
                        </div>
                    </div>
                </div>

                {/* Campaign Quantity */}
                <div className="mb-4">
                    <label htmlFor="quantity" className="mb-2 block text-sm font-medium">
                        Choose a Quantity Cap
                    </label>

                    <div className="relative mt-2 rounded-md">
                        <div className="relative">
                            {promotionDetails.quantity}
                        </div>
                    </div>
                </div>

                {/* Campaign Title */}
                <div className="mb-4">
                    <label htmlFor="title" className="mb-2 block text-sm font-medium">
                        Promotion Title
                    </label>
                    <div className="relative mt-2 rounded-md">
                        <div className="relative">
                            {promotionDetails.title}
                        </div>
                    </div>
                </div>

                {/* Campaign Description */}
                <div className="mb-4">
                    <label htmlFor="description" className="mb-2 block text-sm font-medium">
                        Promotion Description
                    </label>
                    <div className="relative mt-2 rounded-md">
                        <div className="relative">
                            {promotionDetails.description}
                        </div>
                    </div>
                </div>

                {/* Campaign Description */}
                <div className="mb-4">
                    <label htmlFor="description" className="mb-2 block text-sm font-medium">
                        Creator Platform Used
                    </label>
                    <div className="relative mt-2 rounded-md">
                        <div className="relative">
                            {promotionDetails.platform}
                        </div>
                    </div>
                </div>


                {/* Campaign Description */}
                <div className="mb-4">
                    <label htmlFor="description" className="mb-2 block text-sm font-medium">
                        Post Type
                    </label>
                    <div className="relative mt-2 rounded-md">
                        <div className="relative">
                            {promotionDetails.postType}
                        </div>
                    </div>
                </div>
                {/* Tags */}
                <div className="mb-4">
                    <label htmlFor="tags" className="mb-2 block text-sm font-medium">
                       Tags
                    </label>
                    <div className="relative mt-2 rounded-md">
                        <div className="relative">
                            {promotionDetails.tags}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
