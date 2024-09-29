import Pagination from '@/app/ui/campaigns/pagination';
import Search from '@/app/ui/search';
import Table from '@/app/ui/campaigns/table';
import { lusitana } from '@/app/ui/fonts';
import {CardsSkeleton, InvoicesTableSkeleton} from '@/app/ui/skeletons';
import {fetchInvoicesPages} from "@/app/lib/data";
import { Suspense } from 'react';
import { Metadata } from 'next';
import {CreateCampaign} from "@/app/ui/campaigns/buttons";
import CardWrapper from "@/app/ui/campaigns/cards";

export const metadata: Metadata = {
    title: 'Campaigns',
};
export default async function Page({searchParams}: {
    searchParams?: {
        query?: string;
        page?: string;
    };
}) {
    const query = searchParams?.query || '';
    const currentPage = Number(searchParams?.page) || 1;
    const totalPages = await fetchInvoicesPages(query);

    return (
        <div className="w-full">
            <div className="flex w-full items-center justify-between">
                <h1 className={`${lusitana.className} text-2xl`}>Campaigns</h1>
            </div>
            <div className="mt-4 flex items-center justify-between gap-2 md:mt-8">
                <CreateCampaign />
            </div>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                <CardWrapper />
            </div>
            <Suspense key={query + currentPage} fallback={<InvoicesTableSkeleton />}>
                <Table query={query} currentPage={currentPage} />
            </Suspense>
           
        </div>
    );
}