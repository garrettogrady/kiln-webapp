import Pagination from '@/app/ui/campaigns/pagination';
import Search from '@/app/ui/search';
import Table from '@/app/ui/campaigns/table';
import { lusitana } from '@/app/ui/fonts';
import {CardsSkeleton, InvoicesTableSkeleton} from '@/app/ui/skeletons';
import {fetchInvoicesPages, fetchLatestTransactionsFromUser} from "@/app/lib/data";
import { Suspense } from 'react';
import { Metadata } from 'next';
import {CreateCampaign} from "@/app/ui/campaigns/buttons";
import CardWrapper from "@/app/ui/campaigns/cards";
import clsx from "clsx";
import {ArrowPathIcon} from "@heroicons/react/24/outline";

export const metadata: Metadata = {
    title: 'Campaigns',
};
export default async function Page() {
    //const totalPages = await fetchInvoicesPages(query);
    const weeklyTransactions = await fetchLatestTransactionsFromUser("id");

    return (
        <div className="w-full">
            <div className="flex w-full items-center justify-between">
                <h1 className={`${lusitana.className} text-2xl`}>Campaigns</h1>
            </div>
            <div className="flex w-full flex-col md:col-span-4">
                <h2 className={`${lusitana.className} mb-4 text-xl md:text-2xl`}>
                    Bank Account Transactions
                </h2>
                <div className="flex grow flex-col justify-between rounded-xl bg-gray-50 p-4">
                    <div className="bg-white px-6">
                        {weeklyTransactions.map((promotion, i) => {
                            console.log(promotion.amount);
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
                                        className={`${lusitana.className} text-sm font-medium md:text-base`}
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
}