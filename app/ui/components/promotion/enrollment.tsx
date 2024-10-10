'use client';

import { useFormState } from "react-dom";
import { createIntl, createIntlCache } from '@formatjs/intl';
import { enrollUserInPromotion } from "@/app/lib/actions";
import { Promotion } from "@/app/lib/definitions";
import { formatCurrency } from "@/app/lib/utils";

export function EnrollButton({ promotion, isUserEnrolled, tier }: { promotion: Promotion, isUserEnrolled: boolean, tier: string }) {
    const cache = createIntlCache();

    const intl = createIntl(
        {
            locale: 'en-US',
            messages: {},
        },
        cache
    );
    const date = new Date(promotion.endDate);
    const formatter = intl.formatDate(date, {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
    });

    const calculateOfferAmounts = (promotion: Promotion, tier: string) => {
        if (promotion.pricingType === 'fixed') {
            return promotion.fixedOffer;
        }
        if (promotion.pricingType === 'tiered') {
            if (tier == '1') {
                return promotion.tierOneOffer;
            } else if (tier == '2') {
                return promotion.tierTwoOffer;
            }
        }
        return promotion.tierThreeOffer;
    }

    const initialState = {
        isUserEnrolled: isUserEnrolled,
    };
    const enroll = enrollUserInPromotion.bind(null, promotion.id, promotion.businessId, calculateOfferAmounts(promotion, tier));
    const [state, formAction] = useFormState(enroll, initialState);

    const buttonClasses = "relative flex w-full items-center justify-center rounded border border-gray-600 bg-white p-4 tracking-wide text-gray-600";

    const enrollmentMessage = state.isUserEnrolled ? "You are enrolled! Redeem by " + formatter.toString() : "";

    return (
        <div className="md:mt-8 lg:static fixed bottom-0 left-0 right-0 bg-white p-4 shadow-md lg:shadow-none lg:p-0">
            <form action={formAction}>
                {!state.isUserEnrolled && (
                    <button disabled={state.isUserEnrolled} aria-label="Enroll" className={buttonClasses}>
                        Enroll
                    </button>
                )}
                <p className="text-md font-small mt-2 text-center lg:text-left" aria-live="polite">
                    {enrollmentMessage}
                </p>
            </form>
        </div>
    );
}