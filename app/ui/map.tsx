'use client'

import React, { useEffect, useRef, useState } from 'react';
import { useJsApiLoader } from "@react-google-maps/api";
import {Input} from "postcss";
import {Inputs} from "preact/compat";
import Search from "@/app/ui/search";
import {MagnifyingGlassIcon} from "@heroicons/react/24/outline";

interface MapOptions {
    center: google.maps.LatLngLiteral;
    zoom: number;
    mapId: string;
}

function Map() {
    const [map, setMap] = useState<google.maps.Map | null>(null);
    const mapRef = useRef<HTMLDivElement>(null);
    const [autoComplete, setAutoComplete] = useState<google.maps.places.Autocomplete | null>(null);
    const placeAutoCompleteRef = useRef<HTMLDivElement>(null)

    const buildMapInfoCardContent = (title: string, body: string) => {
        return `
        <div class="map_infocard_content">
            <div class="map_infocard_title">${title}</div>
            <div class="map_infocard_body">${body}</div>
        </div>
        `;
    }

    const [selectedPlace, setSelectedPlace] = useState<string | null>(null);
    const { isLoaded, loadError } = useJsApiLoader({
        googleMapsApiKey: process.env.NEXT_PUBLIC_MAPS_API_KEY as string,
        libraries: ['core', 'maps', 'places', 'marker'], // Use only the required libraries
    });

    useEffect(() => {
        if (isLoaded && mapRef.current) {
            const mapOptions: MapOptions = {
                center: {
                    lat: 30.266666,
                    lng: -97.733330,
                },
                zoom: 17,
                mapId: '1234map'
            };


            // Log to verify google object
            console.log('google:', google);

            // Check if google object and Map are accessible
            if (google && google.maps && google.maps.Map) {
                const gMap = new google.maps.Map(mapRef.current as HTMLDivElement, mapOptions);
                console.log('gMap:', gMap);

                //limit place bounds
                //
                const austinBounds = new google.maps.LatLngBounds(
                    new google.maps.LatLng({lat: 30.188196, lng: -97.920885}),//austin SW = 30.188196, -97.920885
                    new google.maps.LatLng({lat: 30.447454, lng: -97.606985})//austin NE 30.447454, -97.606985
                );
                //setup autocomplete
                const gAutoComplete = new google.maps.places.Autocomplete(placeAutoCompleteRef.current as HTMLInputElement, {
                    bounds: austinBounds,
                    fields: ['formatted_address', 'geometry', 'name'],
                    componentRestrictions: {
                        country: ['us']
                    }
                })

                setAutoComplete(gAutoComplete)
                setMap(gMap);
            } else {
                console.error('Google Maps API not loaded correctly');
            }
        }
    }, [isLoaded]);

    useEffect(() => {
        if (autoComplete) {
            autoComplete.addListener('place_changed', () => {
                const place = autoComplete.getPlace();
                console.log(place)
                setSelectedPlace(place.formatted_address as string);
                const position = place.geometry?.location

                if (position) {
                    //place a marker
                    setMarker(position, place.name!);
                }
            })
        }
    }, [autoComplete])

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

    return (
        <div>
            <div className="relative flex flex-1 flex-shrink-0">
                <label htmlFor="search" className="sr-only">
                    Search
                </label>
                <input
                    className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
                    placeholder="search location"
                    ref={placeAutoCompleteRef}
                />
                <MagnifyingGlassIcon className="absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            </div>
            <label>{selectedPlace}</label>
            {/*<input ref={placeAutoCompleteRef} />*/}
            { isLoaded ?
                <div style={{ height: '600px' }} ref={mapRef} />
                : <p>Loading....</p>
            }
        </div>
    );
}

export default Map;
