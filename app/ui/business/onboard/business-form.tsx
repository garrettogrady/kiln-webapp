'use client'
import React, {useEffect, useRef, useState} from 'react'
import {updateBusinessData, updateUserData} from "@/app/lib/actions";
import {BusinessOnboardData} from "@/app/lib/definitions";
import {useJsApiLoader} from "@react-google-maps/api";

interface UserFormProps {
    initialData: BusinessOnboardData
    onComplete: (updatedData: BusinessOnboardData) => void
}

const UserForm: React.FC<UserFormProps> = ({ initialData, onComplete }) => {
    const [formData, setFormData] = useState<BusinessOnboardData>(initialData)
    const placeAutoCompleteRef = useRef<HTMLDivElement>(null)
    const [selectedPlaceAddress, setSelectedPlaceAddress] = useState<string | null>(null);
    const [selectedPlaceId, setSelectedPlaceId] = useState<string | null>(null);
    const [autoComplete, setAutoComplete] = useState<google.maps.places.Autocomplete | null>(null);
    const { isLoaded, loadError } = useJsApiLoader({
        googleMapsApiKey: process.env.NEXT_PUBLIC_MAPS_API_KEY as string,
        libraries: ['core', 'maps', 'places', 'marker'], // Use only the required libraries
    });
    useEffect(() => {
        if (isLoaded ) {
            //limit place bounds
            //
            const austinBounds = new google.maps.LatLngBounds(
                new google.maps.LatLng({lat: 30.188196, lng: -97.920885}),//austin SW = 30.188196, -97.920885
                new google.maps.LatLng({lat: 30.447454, lng: -97.606985})//austin NE 30.447454, -97.606985
            );
            //setup autocomplete
            const gAutoComplete = new google.maps.places.Autocomplete(placeAutoCompleteRef.current as HTMLInputElement, {
                // bounds: austinBounds,
                fields: ['formatted_address', 'geometry', 'name', 'place_id'],
                componentRestrictions: {
                    country: ['us']
                }
            })
            console.log(gAutoComplete)
            setAutoComplete(gAutoComplete)
        } else {
            console.error('Google Maps API not loaded correctly');
        }
    }, [isLoaded]);

    useEffect(() => {
        if (autoComplete) {
            autoComplete.addListener('place_changed', () => {
                const place = autoComplete.getPlace();
                console.log(place)
                const position = place.geometry?.location
                console.log(position);
                setFormData(prevState => ({ ...prevState,
                    ["address"]: place.formatted_address as string,
                    ["placesId"]: place.place_id as string,
                    ["locationLat"]: position?.lat().toString(),
                    ["locationLng"]: position?.lng().toString() }))
            })
        }
    }, [autoComplete])

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target
        setFormData(prevState => ({ ...prevState, [name]: value }))
    }

    const handleSubmit = async () => {
        try {
            //await updateBusinessData(formData)
            onComplete(formData)
        } catch (error) {
            console.error('Error updating user data:', error)
        }
    }
    console.log(formData)

    return (
        <div className="space-y-6">
            <div>
                <label htmlFor="companyName" className="block text-sm font-medium text-gray-700 capitalize">
                    Business Name
                </label>
                <div className="mt-1">
                    <input
                        type="text"
                        name="companyName"
                        id="companyName"
                        value={formData.businessName == null ? '' : formData.businessName}
                        onChange={handleChange}
                        className={`appearance-none block w-full px-3 py-2 border border-transparent rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-[#254442] focus:border-[#254442] sm:text-sm`}
                    />
                </div>
            </div>
            <div>
                <label htmlFor="businessDescription" className="block text-sm font-medium text-gray-700 capitalize">
                    Business Description
                </label>
                <div className="mt-1">
                     <textarea
                         name="businessDescription"
                         id="businessDescription"
                         value={formData.businessDescription == null ? '' : formData.businessDescription}
                         onChange={handleChange}
                         rows={2} // Set the number of rows here
                         className="appearance-none block w-full px-3 py-2 border border-transparent rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-[#254442] focus:border-[#254442] sm:text-sm"
                     />
                </div>
            </div>
            <div>
                <label htmlFor="contactName" className="block text-sm font-medium text-gray-700 capitalize">
                    Contact Name
                </label>
                <div className="mt-1">
                    <input
                        type="text"
                        name="contactName"
                        id="contactName"
                        value={formData.contactName == null ? '' : formData.contactName}
                        onChange={handleChange}
                        className={`appearance-none block w-full px-3 py-2 border border-transparent rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-[#254442] focus:border-[#254442] sm:text-sm`}
                    />
                </div>
            </div>
            <div>
                <label htmlFor="jobTitle" className="block text-sm font-medium text-gray-700 capitalize">
                    Job Title
                </label>
                <div className="mt-1">
                    <input
                        type="text"
                        name="jobTitle"
                        id="jobTitle"
                        value={formData.jobTitle == null ? '' : formData.jobTitle}
                        onChange={handleChange}
                        className={`appearance-none block w-full px-3 py-2 border border-transparent rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-[#254442] focus:border-[#254442] sm:text-sm`}
                    />
                </div>
            </div>
            <div>
                <label htmlFor="jobTitle" className="block text-sm font-medium text-gray-700 capitalize">
                    Contact Email
                </label>
                <div className="mt-1">
                    <input
                        type="email"
                        name="contactEmail"
                        id="contactEmail"
                        value={formData.contactEmail == null ? '' : formData.contactEmail}
                        onChange={handleChange}
                        className={`appearance-none block w-full px-3 py-2 border border-transparent rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-[#254442] focus:border-[#254442] sm:text-sm`}
                    />
                </div>
            </div>
            <div>
                <label htmlFor="contactPhoneNumber" className="block text-sm font-medium text-gray-700 capitalize">
                    Contact Phone
                </label>
                <div className="mt-1">
                    <input
                        type="phone"
                        name="contactPhoneNumber"
                        id="contactPhoneNumber"
                        value={formData.contactPhoneNumber == null ? '' : formData.contactPhoneNumber}
                        onChange={handleChange}
                        className={`appearance-none block w-full px-3 py-2 border border-transparent rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-[#254442] focus:border-[#254442] sm:text-sm`}
                    />
                </div>
            </div>
            <div>
                <label htmlFor="businessInstagram" className="block text-sm font-medium text-gray-700 capitalize">
                    Business Instagram
                </label>
                <div className="mt-1">
                    <input
                        type="text"
                        name="businessInstagram"
                        id="businessInstagram"
                        value={formData.businessInstagram == null ? '' : formData.businessInstagram}
                        onChange={handleChange}
                        className={`appearance-none block w-full px-3 py-2 border border-transparent rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-[#254442] focus:border-[#254442] sm:text-sm`}
                    />
                </div>
            </div>
            <div>
                <label htmlFor="businessType" className="block text-sm font-medium text-gray-700 capitalize">
                    Business Type
                </label>
                <div className="mt-1">
                    <select
                        name="businessType"
                        id="businessType"
                        value={formData.businessType == null ? "" : formData.businessType}
                        onChange={handleChange}
                        className="appearance-none block w-full px-3 py-2 border border-transparent rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-[#254442] focus:border-[#254442] sm:text-sm"
                    >
                        <option value="">Select a business type</option>
                        <option value="bar">Bar</option>
                        <option value="restaurant">Restaurant</option>
                        <option value="cafe">Cafe</option>
                        <option value="spa">Spa</option>
                        <option value="retail">Retail</option>
                    </select>
                </div>
            </div>
            <div>
                <label htmlFor="businessType" className="block text-sm font-medium text-gray-700 capitalize">
                    Business Address
                </label>
                <div className="mt-1">
                    <input
                        type="text"
                        id="addressSearch"
                        name="addressSearch"
                        placeholder="Search Business"
                        onChange={handleChange}
                        ref={placeAutoCompleteRef}
                        className={`appearance-none block w-full px-3 py-2 border border-transparent rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-[#254442] focus:border-[#254442] sm:text-sm`}
                    />
                    <input
                        className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
                        id="address"
                        type="hidden"
                        value={selectedPlaceAddress!}
                        name="address"
                        placeholder="Address "
                        required
                    />
                    <input
                        className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
                        id="placesId"
                        type="hidden"
                        name="placesId"
                        placeholder="place ID "
                        value={selectedPlaceId!}
                    />
                </div>
            </div>
            <div className="flex flex-col space-y-4">
                <button
                    type="button"
                    onClick={handleSubmit}
                    className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[#254442] hover:bg-[#78a5a2] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#254442]"
                >
                    Looks Good!
                </button>
            </div>
        </div>
    )
}

export default UserForm