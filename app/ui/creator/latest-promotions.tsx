import {
    ArrowPathIcon, BuildingOfficeIcon, BuildingStorefrontIcon,
    CreditCardIcon,
    MusicalNoteIcon,
    ShoppingBagIcon,
    SparklesIcon
} from '@heroicons/react/24/outline';
import clsx from 'clsx';
import Image from 'next/image';
import {lusitana} from '@/app/ui/fonts';
import {LatestInvoice} from '@/app/lib/definitions';
import {fetchLatestInvoices, fetchLatestTransactionsFromUser} from "@/app/lib/data";

export default async function LatestPromotions({id}: { id: string }) {

    const latestPromotions = await fetchLatestTransactionsFromUser(id);
    return (
        <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-4 lg:grid-cols-8">
            <div className="flex w-full flex-col md:col-span-4">
                <h2 className={`${lusitana.className} mb-4 text-xl md:text-2xl`}>
                    Upcoming Enrolled Promotions
                </h2>
                <div className="flex grow flex-col justify-between rounded-xl bg-gray-50 p-4">
                    <div className="bg-white px-6">
                        {latestPromotions.map((promotion, i) => {
                            return (
                                <div
                                    key={promotion.id}
                                    className={clsx(
                                        'flex flex-row items-center justify-between py-4',
                                        {
                                            'border-t': i !== 0,
                                        },
                                    )}
                                >
                                    <div className="flex items-center">
                                        {selectPromotionIcon(promotion.promotionType)}
                                        <div className="min-w-0">
                                            <p className="truncate text-sm font-semibold md:text-base">
                                                {promotion.name}
                                            </p>
                                            <p className="hidden text-sm text-gray-500 sm:block">
                                                {promotion.business}
                                            </p>
                                        </div>
                                    </div>
                                    <p
                                        className={`${lusitana.className} truncate text-sm font-medium md:text-base`}
                                    >
                                        {promotion.amount}
                                    </p>
                                </div>
                            );
                        })}
                    </div>
                    <div className="flex items-center pb-2 pt-6">
                        <ArrowPathIcon className="h-5 w-5 text-gray-500"/>
                        <h3 className="ml-2 text-sm text-gray-500 ">Updated just now</h3>
                    </div>
                </div>
            </div>
            <div className="flex w-full flex-col md:col-span-4">
                <h2 className={`${lusitana.className} mb-4 text-xl md:text-2xl`}>
                    Past Redeemed Promotions
                </h2>
                <div className="flex grow flex-col justify-between rounded-xl bg-gray-50 p-4">
                    <div className="bg-white px-6">
                        {latestPromotions.map((promotion, i) => {
                            return (
                                <div
                                    key={promotion.id}
                                    className={clsx(
                                        'flex flex-row items-center justify-between py-4',
                                        {
                                            'border-t': i !== 0,
                                        },
                                    )}
                                >
                                    <div className="flex items-center">
                                        {selectPromotionIcon(promotion.promotionType)}
                                        <div className="min-w-0">
                                            <p className="truncate text-sm font-semibold md:text-base">
                                                {promotion.name}
                                            </p>
                                            <p className="hidden text-sm text-gray-500 sm:block">
                                                {promotion.business}
                                            </p>
                                        </div>
                                    </div>
                                    <p
                                        className={`${lusitana.className} truncate text-sm font-medium md:text-base`}
                                    >
                                        {promotion.amount}
                                    </p>
                                </div>
                            );
                        })}
                    </div>
                    <div className="flex items-center pb-2 pt-6">
                        <ArrowPathIcon className="h-5 w-5 text-gray-500"/>
                        <h3 className="ml-2 text-sm text-gray-500 ">Updated just now</h3>
                    </div>
                </div>
            </div>
        </div>
    );

    function selectPromotionIcon(businessType: string) {

        switch (businessType) {
            case "Restaurant":
                return <BuildingStorefrontIcon width={32} height={32} className="mr-4 rounded-full"/>;
            case  'Bar':
                return <MusicalNoteIcon width={32} height={32} className="mr-4 rounded-full"/>;
            case  'Hotel':
                return <BuildingOfficeIcon width={32} height={32} className="mr-4 rounded-full"/>;
            case 'Shopping':
                return <ShoppingBagIcon width={32} height={32} className="mr-4 rounded-full"/>;
            default:
                return <SparklesIcon width={32} height={32} className="mr-4 rounded-full"/>

        }
    }
}
