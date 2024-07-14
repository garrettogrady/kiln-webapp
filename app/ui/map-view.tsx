'use client';
import React, {Suspense, useState} from 'react';
import { fetchPromotionsPages} from "@/app/lib/data";
import Search from "@/app/ui/search";
import Pagination from "@/app/ui/invoices/pagination";
import PromotionsGrid from "@/app/ui/components/promotions-grid";
import {ListBulletIcon, MapIcon} from "@heroicons/react/24/outline";
import Map from "@/app/ui/map";


export default async function MapView() {

    const [showMap, setShowMap] = useState(true);

    return (
        <div>
            <div className="flex w-full justify-end">
                <button  onClick={() => setShowMap(false)} >
                    <ListBulletIcon width={32} height={32} className="mr-4 rounded-full" />
                </button>
                <button onClick={() => setShowMap(true)} >
                    <MapIcon width={32} height={32} className="mr-4 rounded-full" />
                </button>
            </div>
            <Map />
        </div>
    );
}
