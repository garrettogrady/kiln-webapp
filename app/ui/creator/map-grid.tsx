'use client';
import React, { useState } from 'react';
import { MapIcon, ListBulletIcon } from '@heroicons/react/24/outline';
import PromotionsGrid from "@/app/ui/components/promotions-grid";
import Map from "@/app/ui/map";

interface MapGridProps {
    query: string;
    currentPage: number;
}
export default async function MapGrid({ query, currentPage }: MapGridProps){

    const [showMap, setShowMap] = useState(false);

    return (
        <div>
            {/*<button onClick={() => setShowMap(false)} className="p-2">*/}
            {/*    <ListBulletIcon />*/}
            {/*</button>*/}
            {/*<button onClick={() => setShowMap(true)} className="p-2">*/}
            {/*    <MapIcon />*/}
            {/*</button>*/}
            <div>
                {showMap ? <Map /> : <PromotionsGrid query={query} currentPage={currentPage} />}
            </div>
        </div>
    );
}
