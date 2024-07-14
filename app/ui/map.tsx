'use client'

import React, { useEffect, useRef, useState } from 'react';
import { useJsApiLoader } from "@react-google-maps/api";
import {Promotion, PromotionGrid} from "@/app/lib/definitions";

interface MapOptions {
    center: google.maps.LatLngLiteral;
    zoom: number;
    mapId: string;
}
interface MapProps {
    promotions: PromotionGrid[];
}

function Map({promotions}: MapProps) {
    const [map, setMap] = useState<google.maps.Map | null>(null);
    const mapRef = useRef<HTMLDivElement>(null);
    const [showMap, setShowMap] = useState(true);

    const buildMapInfoCardContent = (title: string, body: string) => {
        return `
        <div class="map_infocard_content">
            <div class="map_infocard_title">${title}</div>
            <div class="map_infocard_body">${body}</div>
        </div>
        `;
    }

    const { isLoaded, loadError } = useJsApiLoader({
        googleMapsApiKey: process.env.NEXT_PUBLIC_MAPS_API_KEY as string,
        libraries: ['core', 'maps', 'places', 'marker'], // Use only the required libraries
    });

    useEffect(() => {
        if (isLoaded && mapRef.current) {
            const mapOptions: MapOptions = {
                center: {
                    lat: 34.0211,
                    lng: -118.3965,
                },
                zoom: 12,
                mapId: '1234map'
            };

            // Check if google object and Map are accessible
            if (google && google.maps && google.maps.Map) {
                const gMap = new google.maps.Map(mapRef.current as HTMLDivElement, mapOptions);
                console.log('gMap:', gMap);

                setMap(gMap);
                console.log(promotions)
                promotions.map((promotion) => {
                    const myLatLng = { lat: Number(promotion.locationLat) , lng: Number(promotion.locationLng) };
                    new google.maps.marker.AdvancedMarkerElement({
                        position: myLatLng,
                        map,
                        title: promotion.title,
                    });
                })
            } else {
                console.error('Google Maps API not loaded correctly');
            }
        }
    }, [isLoaded]);

    if (loadError) {
        return <div>Error loading maps</div>;
    }

    function setMarker(location: google.maps.LatLng, name: string) {
        if (!map) return;

        map.setCenter(location)
        const marker = new google.maps.marker.AdvancedMarkerElement({
            map: map,
            position: location,
            title: "marker"

        })
        const infoCard = new google.maps.InfoWindow({
            position: location,
            content: buildMapInfoCardContent(name, name),
            maxWidth: 200
        })
        infoCard.open({
            map: map,
            anchor: marker
        })
    }

    // @ts-ignore
    // @ts-ignore
    return (
        <div>
            { isLoaded && showMap ?
                <div style={{ height: '600px' }} ref={mapRef} />
                : <p>Loading....</p>
            }
        </div>
    );
}

export default Map;
