'use server';
import React, {Suspense} from 'react';
import { fetchPromotionsPages} from "@/app/lib/data";
import Search from "@/app/ui/search";
import Pagination from "@/app/ui/invoices/pagination";
import PromotionsGrid from "@/app/ui/components/promotions-grid";


export default async function PromotionsList({searchParams}: {
    searchParams?: {
        query?: string;
        page?: string;
    };
}) {
    const query = searchParams?.query || '';
    const currentPage = Number(searchParams?.page) || 1;
    const totalPages = await fetchPromotionsPages(query);

    return (

        <div>
            <div className="mt-4 flex items-center justify-between gap-2 md:mt-8">
                <Search placeholder="Search promotions..." />
            </div>
            <PromotionsGrid query={query} currentPage={currentPage} />
            <div className="mt-5 flex w-full justify-center">
                <Pagination totalPages={totalPages} />
            </div>
        </div>
    );
}
