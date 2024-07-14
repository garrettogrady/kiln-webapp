'use client';

import React, { useEffect, useRef, useState } from 'react';
import { useJsApiLoader } from "@react-google-maps/api";

interface MapOptions {
    center: google.maps.LatLngLiteral;
    zoom: number;
    mapId: string;
}

interface PromotionMapProps {
    placeId: string;
}

function PromotionMap({ placeId }: PromotionMapProps) {
    const [map, setMap] = useState<google.maps.Map | null>(null);
    const mapRef = useRef<HTMLDivElement>(null);
    const [showMap, setShowMap] = useState(true);
    const buildMapInfoCardContent = (title: string, body: string) => {
        return `
        <div class="map_infocard_content">
            <div class="map_infocard_title">${title}</div>
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
                center: { lat: 30.266666, lng: -97.733330 },
                zoom: 17,
                mapId: '1234map',
            };

            const gMap = new google.maps.Map(mapRef.current as HTMLDivElement, mapOptions);
            setMap(gMap);
        }
    }, [isLoaded]);

    useEffect(() => {
        if (isLoaded && map && placeId) {
            const service = new google.maps.places.PlacesService(map);

            service.getDetails({ placeId }, (place, status) => {
                if (status === google.maps.places.PlacesServiceStatus.OK && place && place.geometry && place.geometry.location) {
                    const location = place.geometry.location;
                    const name = place.name || "Unknown Place";
                    console.log(place)
                    setMarker(location, name);
                } else {
                    console.error('Failed to fetch place details:', status);
                }
            });
        }
    }, [isLoaded, map, placeId]);

    const setMarker = (location: google.maps.LatLng, name: string) => {
        if (!map) return;

        map.setCenter(location);

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

    if (loadError) {
        return <div>Error loading maps</div>;
    }

    return (
        <div>
            {isLoaded && showMap ? (
                <div style={{ height: '200px' }} ref={mapRef} />
            ) : (
                <p>Loading...</p>
            )}
        </div>
    );
}

export default PromotionMap;
