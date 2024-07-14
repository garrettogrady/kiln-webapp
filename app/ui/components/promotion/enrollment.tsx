'use client';

import { useFormState } from "react-dom";
import { createIntl, createIntlCache } from '@formatjs/intl';
import { enrollUserInPromotion } from "@/app/lib/actions";
import { Promotion } from "@/app/lib/definitions";

export function EnrollButton({ promotion, isUserEnrolled }: { promotion: Promotion, isUserEnrolled: boolean }) {
    const cache = createIntlCache();

    const intl = createIntl(
        {
            locale: 'en-US',
            messages: {},
        },
        cache
    );
    const date = new Date(Number(promotion.endDate));
    const formatter = intl.formatDate(date, {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
    });

    const initialState = {
        isUserEnrolled: isUserEnrolled,
    };
    const enroll = enrollUserInPromotion.bind(null, promotion.id);
    const [state, formAction] = useFormState(enroll, initialState);

    const buttonClasses = "relative flex w-full items-center justify-center rounded border border-gray-600 bg-white p-4 tracking-wide text-gray-600";

    const enrollmentMessage = state.isUserEnrolled ? "You are enrolled! Redeem by " + formatter.toString() : "";

    console.log(buttonClasses)
    return (
        <div className="md:mt-8">
            <form action={formAction}>
                {!state.isUserEnrolled && (
                    <button disabled={state.isUserEnrolled} aria-label="Enroll" className={buttonClasses}>
                        Enroll
                    </button>
                )}
                <p className="text-md font-small" aria-live="polite">
                    {enrollmentMessage}
                </p>
            </form>
        </div>
    );
}
