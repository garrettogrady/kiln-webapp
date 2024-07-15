'use client';

import React, { useEffect, useRef, useState } from 'react';
import { useJsApiLoader } from "@react-google-maps/api";
import { PromotionGrid } from "@/app/lib/definitions";

interface MapOptions {
    center: google.maps.LatLngLiteral;
    zoom: number;
    mapId: string;
}

interface MapProps {
    promotions: PromotionGrid[];
}

function Map({ promotions }: MapProps) {
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

            if (google && google.maps && google.maps.Map) {
                const gMap = new google.maps.Map(mapRef.current as HTMLDivElement, mapOptions);
                setMap(gMap);
            } else {
                console.error('Google Maps API not loaded correctly');
            }
        }
    }, [isLoaded]);

    useEffect(() => {
        if (isLoaded && map && promotions.length > 0) {
            addMarkers(promotions);
        }
    }, [isLoaded, map, promotions]);

    const setMarker = (location: google.maps.LatLng, name: string) => {
        if (!map) return;

        const marker = new google.maps.Marker({
            map,
            position: location,
            title: name,
        });

        const infoWindow = new google.maps.InfoWindow({
            content: buildMapInfoCardContent(name, ""),
        });

        marker.addListener("click", () => {
            infoWindow.open(map, marker);
        });

        infoWindow.open(map, marker);
    };

    const addMarkers = (promotions: PromotionGrid[]) => {
        if (!map) return;

        promotions.forEach((promotion) => {
            const location = new google.maps.LatLng({
                lat: Number(promotion.locationLat),
                lng: Number(promotion.locationLng),
            });

            setMarker(location, promotion.title);
        });
    };

    if (loadError) {
        return <div>Error loading maps</div>;
    }

    return (
        <div>
            {isLoaded && showMap ? (
                <div style={{ height: '600px' }} ref={mapRef} />
            ) : (
                <p>Loading...</p>
            )}
        </div>
    );
}

export default Map;
