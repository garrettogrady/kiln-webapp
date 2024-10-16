"use client";
import React, { useState, useEffect } from 'react';
import {fetchCreatorSignups} from "@/app/lib/data";
import {CreatorOnboardData} from "@/app/lib/definitions";


export default async function CreatorOnboardPage() {
    const creators = await fetchCreatorSignups();

    // const [creators, setCreators] = useState<CreatorOnboardData[]>([]);
    //
    // useEffect(() => {
    //     fetchCreators();
    // }, []);
    //
    // const fetchCreators = async () => {
    //     try {
    //         const response = await fetchCreatorSignups();
    //         setCreators(response);
    //     } catch (error) {
    //         console.error('Error fetching creators:', error);
    //     }
    // };

    const handleApprove = async (id: string) => {
        // try {
        //     const response = await fetch(`/api/approveCreator/${id}`, {
        //         method: 'POST',
        //     });
        //     if (response.ok) {
        //         // Remove the approved creator from the list
        //         setCreators(creators.filter(creator => creator.id !== id));
        //     }
        // } catch (error) {
        //     console.error('Error approving creator:', error);
        // }
    };

    return (
        <div className="container mx-auto py-10 px-4">
            <h1 className="text-2xl font-bold mb-5">Creator Onboard Data</h1>
            <div className="overflow-x-auto">
                <div className="inline-block min-w-full shadow-md rounded-lg overflow-hidden">
                    <table className="min-w-full leading-normal">
                        <thead>
                        <tr>
                            <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                                Name
                            </th>
                            <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                                Email
                            </th>
                            <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                                Phone
                            </th>
                            <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                                Instagram
                            </th>
                            <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                                TikTok
                            </th>
                            <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                                City
                            </th>
                            <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                                Action
                            </th>
                        </tr>
                        </thead>
                        <tbody>
                        {creators.map((creator) => (
                            <tr key={creator.id}>
                                <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                    <p className="text-gray-900 whitespace-no-wrap">{creator.name}</p>
                                </td>
                                <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                    <p className="text-gray-900 whitespace-no-wrap">{creator.email}</p>
                                </td>
                                <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                    <p className="text-gray-900 whitespace-no-wrap">{creator.phone}</p>
                                </td>
                                <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                    <a
                                        href={`https://www.instagram.com/${creator.instagram}`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-gray-900 whitespace-no-wrap underline"
                                    >
                                        {creator.instagram}
                                    </a>
                                </td>
                                <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                    <a
                                        href={`https://www.tiktok.com/${creator.tiktok}`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-gray-900 whitespace-no-wrap underline"
                                    >
                                        {creator.tiktok}
                                    </a>
                                </td>
                                <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                    <p className="text-gray-900 whitespace-no-wrap">{creator.city}</p>
                                </td>
                                <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                    <button
                                        onClick={() => handleApprove(creator.id)}
                                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                                    >
                                        Approve
                                    </button>
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};