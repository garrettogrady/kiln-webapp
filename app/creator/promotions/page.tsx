import React, { Suspense } from 'react';
import {fetchInvoicesPages, fetchPromotions, fetchPromotionsPages} from "@/app/lib/data";
import {lusitana} from "@/app/ui/fonts";
import Search from "@/app/ui/search";
import {CreateInvoice} from "@/app/ui/invoices/buttons";
import {InvoicesTableSkeleton} from "@/app/ui/skeletons";
import Table from "@/app/ui/invoices/table";
import Pagination from "@/app/ui/invoices/pagination";
import PromotionsGrid from "@/app/ui/components/promotions-grid";
import Map from "@/app/ui/map";
import MapGrid from "@/app/ui/creator/map-grid";
import {ListBulletIcon, MapIcon} from "@heroicons/react/24/outline";
import {usePathname, useRouter, useSearchParams} from "next/navigation";
import MapButtons from "@/app/ui/map-buttons";

// export const metadata = {
//     description: 'High-performance ecommerce store built with Next.js, Vercel, and Shopify.',
//     openGraph: {
//         type: 'website'
//     }
// };

export default async function HomePage({searchParams}: {
    searchParams?: {
        query?: string;
        page?: string;
        map?: boolean;
    };
}) {
    const query = searchParams?.query || '';
    const currentPage = Number(searchParams?.page) || 1;
    const showMap = Boolean(searchParams?.map) || false;
    const totalPages = await fetchPromotionsPages(query);
    //const { replace } = useRouter();
    console.log("show map: " + showMap);

    return (

        <div className="w-full">
            <div className="flex w-full items-center justify-between">
                <h1 className={`${lusitana.className} text-2xl`}>Promotions</h1>
            </div>
            <MapButtons></MapButtons>
            <div className="mt-4 flex items-center justify-between gap-2 md:mt-8">
                <Search placeholder="Search promotions..." />
            </div>
             <PromotionsGrid  query={query} currentPage={currentPage} showMap={showMap} />
            <div className="mt-5 flex w-full justify-center">
                <Pagination totalPages={totalPages} />
            </div>
            <div className="order-none flex-none md:order-last md:w-[125px]">
                {/*<Filter list={sorting} title="Sort by" />*/}
            </div>
        </div>
    );
}
