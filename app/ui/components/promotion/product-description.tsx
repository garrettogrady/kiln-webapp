'use client';

import Price from '@/app/ui/components/price';
import {Promotion} from "@/app/lib/definitions";
import clsx from "clsx";
import {deleteInvoice, isUserEnrolledInPromotion} from "@/app/lib/actions";
import {auth} from "@/auth";
import {getSession} from "next-auth/react";
import { useSession } from "next-auth/react"
import {authConfig} from "@/auth.config";
import {TrashIcon} from "@heroicons/react/24/outline";


export function PromotionDescription({promotion}: { promotion: Promotion }) {
    // const { data: session, status } = useSession()
        const isUserEnrolled = isUserEnrolledInPromotion.bind(null, promotion.id);


    const buttonClasses = 'relative flex w-full items-center justify-center rounded-full bg-blue-600 p-4 tracking-wide text-white';
    return (
        <>
            <div className="mb-6 flex flex-col border-b pb-6 dark:border-neutral-700">
                <h1 className="mb-2 text-5xl font-medium">{promotion.title}</h1>
                <div className="mr-auto w-auto rounded-full bg-blue-600 p-2 text-sm text-white">
                    <Price
                        amount={promotion.maxOfferPrice.toString()}
                    />
                </div>

            </div>
            <div>
                <h3 className="">{promotion.description}</h3>

                <form action={isUserEnrolled}>
                    <button   aria-label="Add to cart"
                              className={buttonClasses}>
                     Enroll
                    </button>
                </form>

                <p aria-live="polite" className="sr-only" role="status">
                    {"message"}
                </p>

            </div>
        </>
    );
}
