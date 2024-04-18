'use client';

import Price from '@/app/ui/components/price';
import {Business, Promotion} from "@/app/lib/definitions";
import { enrollUserInPromotion} from "@/app/lib/actions";
import Platform from "@/app/ui/components/platform";
import {checkUserEnrollment} from "@/app/lib/data";


export async function PromotionDescription({promotion, business}: { promotion: Promotion, business: Business }) {
    // const { data: session, status } = useSession()
        const enroll = enrollUserInPromotion.bind(null, promotion.id);
        //const isUserEnrolled = await checkUserEnrollment(promotion.id);


    //const buttonClasses = isUserEnrolled ? 'disabled' : 'relative flex w-full items-center justify-center rounded-full bg-blue-600 p-4 tracking-wide text-white';
    const buttonClasses = 'disabled'
    return (
        <>
            <div className="mb-6 flex flex-col border-b pb-6 dark:border-neutral-700">
                <h1 className="mb-2 text-5xl font-medium">{promotion.title}</h1>
                <span>
                    <h3 className="mb-2 text-2xl font-small">{business.businessName} </h3>

                    <h4 className="mb-2 text-1xl font-small">{business.city} </h4>
                </span>
                <div className="mr-auto w-auto rounded-full bg-blue-600 p-2 text-sm text-white">
                    <Price
                        amount={promotion.maxOfferPrice.toString()}
                    />
                </div>

                <Platform platform={promotion.platform} type={promotion.postType}

                />


            </div>
            <div className="mb-6 flex flex-col border-b pb-6 dark:border-neutral-700">

                <h3 className="">{promotion.description}</h3>

            </div>
            {}
            <form action={enroll}>
                <button   aria-label="Add to cart"
                          className={buttonClasses}>
                    Enroll
                </button>
            </form>

            <p aria-live="polite" className="sr-only" role="status">
                {"message"}
            </p>
        </>
    );
}
