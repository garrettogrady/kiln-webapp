'use client';

import Price from '@/app/ui/components/price';
import {Business, Promotion} from "@/app/lib/definitions";
import Platform from "@/app/ui/components/platform";
import {enrollUserInPromotion} from "@/app/lib/actions";
import {useFormState} from "react-dom";
import {checkUserEnrollment} from "@/app/lib/data";
import {createIntl, createIntlCache} from '@formatjs/intl'



export function EnrollButton({promotion, isUserEnrolled} : {  promotion: Promotion, isUserEnrolled: boolean }) {
    const cache = createIntlCache()

    const intl = createIntl(
        {
            locale: 'en-US',
            messages: {},
        },
        cache
    )
    const date = new Date(Number(promotion.endDate));
    const formatter = intl.formatDate(date, {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
    })
    const initialState = {
        isUserEnrolled: isUserEnrolled
    }
    const enroll = enrollUserInPromotion.bind(null, promotion.id);
    const [state, formAction] = useFormState(enroll, initialState)

    const buttonClasses = state.isUserEnrolled ? 'relative flex w-full items-center justify-center rounded-full bg-gray-600 p-4 tracking-wide text-white' :  'relative flex w-full items-center justify-center rounded-full bg-blue-600 p-4 tracking-wide text-white';
    const enrollmentMessage = state.isUserEnrolled ? "You are enrolled! Redeem by " + formatter.toString() : "";

    return (
        <>
            <form action={formAction}>
                <button disabled={state.isUserEnrolled}  aria-label="Add to cart"
                        className={buttonClasses}>
                    Enroll
                </button>
                <p aria-live="polite" >
                    {enrollmentMessage}
                </p>
            </form>
        </>
    );
}