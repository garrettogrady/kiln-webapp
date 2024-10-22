import React from 'react';
import { Promotion } from '@/app/lib/definitions';
import {UpdateCampaign, UpdatePromotion, updatePromotion} from "@/app/ui/campaigns/buttons";
import { createIntl, createIntlCache } from "@formatjs/intl";
import { formatCurrency } from "@/app/lib/utils";

export default async function ShowForm({ promotion, businessId}: { promotion: Promotion, businessId: string }) {
    const cache = createIntlCache();
    const intl = createIntl(
        {
            locale: 'en-US',
            messages: {},
        },
        cache
    );

    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return intl.formatDate(date, {
            day: 'numeric',
            month: 'short',
            year: 'numeric',
        });
    };

    const renderField = (label: string, value: any) => {
        if (value === "" || value === null) return null;
        return (
            <div className="mb-4">
                <label className="mb-2 block text-sm font-medium">{label}</label>
                <div className="relative mt-2 rounded-md">
                    <div className="relative">
                        {Array.isArray(value) ? value.join(', ') : value.toString()}
                    </div>
                </div>
            </div>
        );
    };

    return (
        <div>
            <div className="mt-4 flex items-center justify-between gap-2 md:mt-8">
                <h3>Promotion Details</h3>
                <UpdatePromotion promotionId={promotion.id} businessId={businessId}/>
            </div>
            <div className="rounded-md bg-gray-50 p-4 md:p-6">
                {renderField('Promotion Type', promotion.promotionType)}
                {renderField('Start Date', promotion.startDate && formatDate(promotion.startDate))}
                {renderField('End Date', promotion.endDate && formatDate(promotion.endDate))}
                {renderField('Quantity', promotion.quantity)}
                {renderField('Title', promotion.title)}
                {renderField('Description', promotion.description)}
                {renderField('Suggested Items', promotion.suggestedItems)}
                {renderField('Availability Start', promotion.availabilityStart && promotion.availabilityStart)}
                {renderField('Availability End', promotion.availabilityEnd && promotion.availabilityEnd)}
                {renderField('Pricing Type', promotion.pricingType)}
                {renderField('Fixed Offer', promotion.fixedOffer && formatCurrency(promotion.fixedOffer))}
                {renderField('Platform', promotion.platform)}
                {renderField('Tier One Offer', promotion.tierOneOffer && formatCurrency(promotion.tierOneOffer))}
                {renderField('Tier Two Offer', promotion.tierTwoOffer && formatCurrency(promotion.tierTwoOffer))}
                {renderField('Tier Three Offer', promotion.tierThreeOffer && formatCurrency(promotion.tierThreeOffer))}
                {renderField('Max Total Spend', promotion.maxTotalSpend && formatCurrency(promotion.maxTotalSpend))}
                {renderField('Post Type', promotion.postType)}
                {renderField('Media Type', promotion.mediaType)}
                {renderField('Tags', promotion.tags)}
            </div>
        </div>
    );
};