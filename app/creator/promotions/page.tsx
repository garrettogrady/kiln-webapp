import React from 'react';
import { fetchPromotionsPages} from "@/app/lib/data";
import {lusitana} from "@/app/ui/fonts";
import Search from "@/app/ui/search";
import Pagination from "@/app/ui/invoices/pagination";
import PromotionsGrid from "@/app/ui/components/promotions-grid";
import MapButtons from "@/app/ui/map-buttons";

export const metadata = {
    description: 'High-performance ecommerce store built with Next.js, Vercel, and Shopify.',
    openGraph: {
        type: 'website'
    }
};

// export default async function HomePage({searchParams}: {
//     searchParams?: {
//         query?: string;
//         page?: string;
//         map?: boolean;
//     };
// }) {
export default async function HomePage() {
    // const query = searchParams?.query || '';
    // const currentPage = Number(searchParams?.page) || 1;
    // const showMap = Boolean(searchParams?.map) || false;
    const totalPages = await fetchPromotionsPages('');
    //const { replace } = useRouter();
    console.log("" +
        "show map: " + showMap);

    return (

        <div className="w-full">
            <div className="flex w-full items-center justify-between">
                <h1 className={`${lusitana.className} text-2xl`}>Promotions</h1>
            </div>
            <MapButtons></MapButtons>
            <div className="mt-4 flex items-center justify-between gap-2 md:mt-8">
                <Search placeholder="Search promotions..." />
            </div>
             <PromotionsGrid  query={""} currentPage={1} showMap={false} />
            <div className="mt-5 flex w-full justify-center">
                <Pagination totalPages={totalPages} />
            </div>
            <div className="order-none flex-none md:order-last md:w-[125px]">
                {/*<Filter list={sorting} title="Sort by" />*/}
            </div>
        </div>
    );
}
