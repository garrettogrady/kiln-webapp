'use client';
import React, {Suspense, useState} from 'react';
import { fetchPromotionsPages} from "@/app/lib/data";
import Search from "@/app/ui/search";
import Pagination from "@/app/ui/invoices/pagination";
import PromotionsGrid from "@/app/ui/components/promotions-grid";
import {ListBulletIcon, MapIcon} from "@heroicons/react/24/outline";
import Map from "@/app/ui/map";
import {usePathname, useRouter, useSearchParams} from "next/navigation";
import {useDebouncedCallback} from "use-debounce";


export default async function MapButtons() {

    const searchParams = useSearchParams();
    const pathname = usePathname();
    const { replace } = useRouter();
    const handleSearch = useDebouncedCallback((mapShow) => {
        console.log(`setting show map to... ${mapShow}`);
        const params = new URLSearchParams(searchParams);
        mapShow ? params.set('map', mapShow) : params.delete('map');
        replace(`${pathname}?${params.toString()}`);
    }, 300);

    return (
        <div className="flex w-full justify-end">
            <button onClick={(e)=> {handleSearch(false)}} >
                <ListBulletIcon width={32} height={32} className="mr-4 rounded-full"   />
            </button>
            <button onClick={(e)=> { handleSearch(true)}} >
                <MapIcon width={32} height={32} className="mr-4 rounded-full" />
            </button>
        </div>
    );
}
