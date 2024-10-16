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
import BusinessTable from "@/app/ui/admin/business-table";
import AdminCardWrapper from "@/app/ui/admin/cards";

export const metadata: Metadata = {
    title: 'admin business',
};
export default async function Page() {

    return (
        <div className="w-full">
            <div className="flex w-full items-center justify-between">
                <h1 className={`${lusitana.className} text-2xl`}>Business Promotions</h1>
            </div>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                <Suspense fallback={<CardsSkeleton />}>
                    <AdminCardWrapper  />
                </Suspense>
            </div>
            <BusinessTable />
        </div>
    );
}