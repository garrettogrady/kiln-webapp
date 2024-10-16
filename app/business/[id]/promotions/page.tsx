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
import PromotionsTable from "@/app/ui/campaigns/table";

export const metadata: Metadata = {
    title: 'Promotions',
};
export default async function Page({ params }: { params: { id: string }}) {

    const businessId = params.id;
    return (
        <div className="w-full">
            <div className="flex w-full items-center justify-between">
                <h1 className={`${lusitana.className} text-2xl`}>Campaigns</h1>
            </div>
            <div className="mt-4 flex items-center justify-between gap-2 md:mt-8">
                <CreateCampaign businessId={businessId} />
            </div>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                <CardWrapper />
            </div>
            <PromotionsTable id={businessId} />
        </div>
    );
}